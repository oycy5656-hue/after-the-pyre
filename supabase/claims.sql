-- 国家认领与国策
create table if not exists public.claims (
  slug text primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  display text,
  created_at timestamptz not null default now()
);

create table if not exists public.policies (
  slug text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_by uuid references auth.users (id) on delete set null,
  updated_at timestamptz not null default now()
);

alter table public.claims enable row level security;
alter table public.policies enable row level security;

-- 认领：所有人可读；登录用户可认领未被占用的国家；本人或管理员可释放
drop policy if exists claims_read on public.claims;
create policy claims_read on public.claims for select using (true);

drop policy if exists claims_insert on public.claims;
create policy claims_insert on public.claims for insert with check (
  auth.uid() = user_id and not exists (select 1 from public.claims c where c.slug = claims.slug)
);

drop policy if exists claims_delete on public.claims;
create policy claims_delete on public.claims for delete using (
  auth.uid() = user_id or public.is_admin()
);

-- 国策：所有人可读；认领者本人或管理员可写
drop policy if exists policies_read on public.policies;
create policy policies_read on public.policies for select using (true);

drop policy if exists policies_write on public.policies;
create policy policies_write on public.policies for insert with check (
  exists (select 1 from public.claims c where c.slug = policies.slug and (c.user_id = auth.uid() or public.is_admin()))
);

drop policy if exists policies_update on public.policies;
create policy policies_update on public.policies for update using (
  exists (select 1 from public.claims c where c.slug = policies.slug and (c.user_id = auth.uid() or public.is_admin()))
);

grant select on public.claims to anon, authenticated;
grant insert, delete on public.claims to authenticated;
grant select on public.policies to anon, authenticated;
grant insert, update on public.policies to authenticated;
