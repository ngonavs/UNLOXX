-- UNLOXX Young isolated backend schema. Run ONLY in a dedicated UNLOXX project.
create table if not exists public.young_dreams (
  user_id uuid primary key references auth.users(id) on delete cascade,
  description text not null check (char_length(description) <= 800),
  updated_at timestamptz not null default now()
);
create table if not exists public.young_quests (
  user_id uuid not null references auth.users(id) on delete cascade,
  quest_day date not null,
  quest_id smallint not null check (quest_id between 0 and 2),
  completed_at timestamptz not null default now(),
  primary key (user_id,quest_day,quest_id)
);
create table if not exists public.young_friend_requests (
  requester_id uuid not null references auth.users(id) on delete cascade,
  recipient_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'pending' check(status in ('pending','accepted','declined')),
  created_at timestamptz not null default now(),
  primary key (requester_id,recipient_id),
  check (requester_id <> recipient_id)
);
alter table public.young_dreams enable row level security;
alter table public.young_quests enable row level security;
alter table public.young_friend_requests enable row level security;
revoke all on public.young_dreams,public.young_quests,public.young_friend_requests from anon;
grant select,insert,update,delete on public.young_dreams,public.young_quests to authenticated;
grant select,insert,update on public.young_friend_requests to authenticated;
create policy "Dream owner read" on public.young_dreams for select to authenticated using (user_id=(select auth.uid()));
create policy "Dream owner insert" on public.young_dreams for insert to authenticated with check (user_id=(select auth.uid()));
create policy "Dream owner update" on public.young_dreams for update to authenticated using (user_id=(select auth.uid())) with check (user_id=(select auth.uid()));
create policy "Dream owner delete" on public.young_dreams for delete to authenticated using (user_id=(select auth.uid()));
create policy "Quest owner read" on public.young_quests for select to authenticated using (user_id=(select auth.uid()));
create policy "Quest owner insert" on public.young_quests for insert to authenticated with check (user_id=(select auth.uid()) and quest_day=current_date);
create policy "Quest owner delete" on public.young_quests for delete to authenticated using (user_id=(select auth.uid()));
create policy "Requests participants read" on public.young_friend_requests for select to authenticated using (requester_id=(select auth.uid()) or recipient_id=(select auth.uid()));
-- Friend requests are not enabled until verified accounts, safety controls and minor consent exist.
-- No INSERT/UPDATE policy intentionally: fail closed.
