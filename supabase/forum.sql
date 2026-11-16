-- 论坛：帖子与回复
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  author uuid references auth.users (id) on delete set null,
  author_name text,
  title text not null,
  body text not null default '',
  tag text default '综合',
  created_at timestamptz not null default now()
);

create table if not exists public.replies (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts (id) on delete cascade,
  author uuid references auth.users (id) on delete set null,
  author_name text,
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists posts_created_idx on public.posts (created_at desc);
create index if not exists replies_post_idx on public.replies (post_id, created_at);

alter table public.posts enable row level security;
alter table public.replies enable row level security;

-- 所有人可读
drop policy if exists posts_read on public.posts;
create policy posts_read on public.posts for select using (true);

drop policy if exists replies_read on public.replies;
create policy replies_read on public.replies for select using (true);

-- 登录用户可发帖，作者名强制为本人
drop policy if exists posts_insert on public.posts;
create policy posts_insert on public.posts for insert with check (auth.uid() = author);

-- 作者或管理员可删
drop policy if exists posts_delete on public.posts;
create policy posts_delete on public.posts for delete using (
  auth.uid() = author or public.is_admin()
);

drop policy if exists posts_update on public.posts;
create policy posts_update on public.posts for update using (
  auth.uid() = author or public.is_admin()
);

-- 回复
drop policy if exists replies_insert on public.replies;
create policy replies_insert on public.replies for insert with check (auth.uid() = author);

drop policy if exists replies_delete on public.replies;
create policy replies_delete on public.replies for delete using (
  auth.uid() = author or public.is_admin()
);

grant select on public.posts, public.replies to anon, authenticated;
grant insert, update, delete on public.posts to authenticated;
grant insert, delete on public.replies to authenticated;
