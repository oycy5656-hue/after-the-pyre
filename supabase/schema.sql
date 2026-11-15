-- 葬火之后 · Supabase 初始化脚本
-- 用法：Supabase 控制台 → SQL Editor → 新建查询 → 全选粘贴 → Run

-- 1. 账号档案（角色存在这里）
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

-- 2. 内容改动（每国一条，jsonb 存覆盖字段）
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

-- 4. 行级权限
alter table public.profiles enable row level security;
alter table public.edits enable row level security;

-- 所有人可读改动（匿名访客也能看到编辑后的内容）
drop policy if exists edits_read on public.edits;
create policy edits_read on public.edits
  for select using (true);

-- 只有管理员能写改动
drop policy if exists edits_insert_admin on public.edits;
create policy edits_insert_admin on public.edits
  for insert with check (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

drop policy if exists edits_update_admin on public.edits;
create policy edits_update_admin on public.edits
  for update using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

drop policy if exists edits_delete_admin on public.edits;
create policy edits_delete_admin on public.edits
  for delete using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- 自己的 profile 可读；只有管理员能改角色
drop policy if exists profiles_read_self on public.profiles;
create policy profiles_read_self on public.profiles
  for select using (auth.uid() = id);

drop policy if exists profiles_update_self on public.profiles;
create policy profiles_update_self on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- 管理员需要读取所有 profile 来判断权限
drop policy if exists profiles_read_admin on public.profiles;
create policy profiles_read_admin on public.profiles
  for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- 5. 把两个账号设为管理员（注册完这两个邮箱后再执行）
-- update public.profiles set role = 'admin' where id in (
--   select id from auth.users where email in ('admin@example.com', 'curator@example.com')
-- );
