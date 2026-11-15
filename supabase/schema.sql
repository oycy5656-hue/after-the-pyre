-- 葬火之后 · Supabase 初始化脚本
-- 在 SQL Editor 里整体执行，或在数据库直连里跑一次

-- 1. 账号档案
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

-- 2. 内容改动（每国一条）
create table if not exists public.edits (
  slug text primary key,
  data jsonb not null,
  updated_by uuid references auth.users (id) on delete set null,
  updated_at timestamptz not null default now()
);

-- 3. 注册时自动建 profile
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'display', new.email))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 4. 判断管理员：security definer 绕过 RLS，避免策略递归
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  );
$$;

grant execute on function public.is_admin() to anon, authenticated;

-- 5. 行级权限
alter table public.profiles enable row level security;
alter table public.edits enable row level security;

drop policy if exists profiles_read_self on public.profiles;
create policy profiles_read_self on public.profiles
  for select using (auth.uid() = id);

drop policy if exists profiles_read_admin on public.profiles;
create policy profiles_read_admin on public.profiles
  for select using (public.is_admin());

drop policy if exists profiles_update_self on public.profiles;
create policy profiles_update_self on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- 角色列不允许前端改写（只有 service_role / SQL 能改）
revoke update (role) on public.profiles from anon, authenticated;

-- 改动：所有人可读，只有管理员可写
drop policy if exists edits_read on public.edits;
create policy edits_read on public.edits
  for select using (true);

drop policy if exists edits_insert_admin on public.edits;
create policy edits_insert_admin on public.edits
  for insert with check (public.is_admin());

drop policy if exists edits_update_admin on public.edits;
create policy edits_update_admin on public.edits
  for update using (public.is_admin());

drop policy if exists edits_delete_admin on public.edits;
create policy edits_delete_admin on public.edits
  for delete using (public.is_admin());

-- 6. 允许匿名读取（站点公开内容）
grant select on public.edits to anon, authenticated;
grant insert, update, delete on public.edits to authenticated;
grant select on public.profiles to authenticated;
grant update (display) on public.profiles to authenticated;
