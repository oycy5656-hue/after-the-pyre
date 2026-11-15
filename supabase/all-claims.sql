-- 管理员读取全部认领（绕过 RLS，仅管理员返回数据）
create or replace function public.all_claims()
returns table (slug text, display text)
language sql
security definer
stable
set search_path = public
as $$
  select c.slug, c.display
  from public.claims c
  where public.is_admin();
$$;

grant execute on function public.all_claims() to authenticated;
