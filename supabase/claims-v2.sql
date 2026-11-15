-- 国策可见性与认领规则 v2（按依赖顺序）

-- 0. 判定「是否写过国策」
create or replace function public.policy_written(d jsonb)
returns boolean
language sql
immutable
as $$
  select coalesce(
    exists (
      select 1 from jsonb_array_elements(coalesce(d -> 'slots', '[]'::jsonb)) s
      where coalesce(s ->> 'title', '') <> '' or coalesce(s ->> 'body', '') <> ''
    ),
    false
  );
$$;

-- 1. 每人只能锁定一个国家
create unique index if not exists claims_one_per_user on public.claims (user_id);

-- 2. 认领记录：只能看到自己的（管理员看全部）
drop policy if exists claims_read on public.claims;
create policy claims_read on public.claims for select using (
  auth.uid() = user_id or public.is_admin()
);

-- 3. 国策：只有本国认领者或管理员可读
drop policy if exists policies_read on public.policies;
create policy policies_read on public.policies for select using (
  public.is_admin()
  or exists (select 1 from public.claims c where c.slug = policies.slug and c.user_id = auth.uid())
);

-- 4. 认领条件：无人认领、且没有任何已写国策
drop policy if exists claims_insert on public.claims;
create policy claims_insert on public.claims for insert with check (
  auth.uid() = user_id
  and not exists (select 1 from public.claims c where c.slug = claims.slug)
  and not exists (select 1 from public.policies p where p.slug = claims.slug and public.policy_written(p.data))
);

-- 5. 可认领清单
create or replace function public.claimable_slugs(candidates text[])
returns text[]
language sql
security definer
stable
set search_path = public
as $$
  select coalesce(array_agg(s), '{}')
  from unnest(candidates) as s
  where not exists (select 1 from public.claims c where c.slug = s)
    and not exists (
      select 1 from public.policies p where p.slug = s and public.policy_written(p.data)
    );
$$;

-- 6. 我的认领
create or replace function public.my_claim()
returns text
language sql
security definer
stable
set search_path = public
as $$
  select slug from public.claims where user_id = auth.uid() limit 1;
$$;

grant execute on function public.claimable_slugs(text[]) to authenticated, anon;
grant execute on function public.policy_written(jsonb) to authenticated, anon;
grant execute on function public.my_claim() to authenticated;
