-- UNLOXX STUDENT DATA FOUNDATION — REVIEW BEFORE APPLYING.
-- Only for a NEW, DEDICATED UNLOXX Supabase project. Do NOT run in hotel projects.
-- Private by default; authenticated users can read/write only their own profile/projects.
-- XP and badge awards are server-controlled. No public leaderboard or profile discovery.
begin;
create extension if not exists pgcrypto;
create table if not exists public.unloxx_student_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  nickname text not null default 'Explorer' check (char_length(nickname) between 1 and 32),
  bio text not null default '' check (char_length(bio)<=350),
  dream text not null default '' check (char_length(dream)<=800),
  show_badges boolean not null default true,
  show_dream boolean not null default false,
  show_projects boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.unloxx_student_projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 70),
  description text not null check (char_length(description) between 1 and 400),
  created_at timestamptz not null default now()
);
create index if not exists unloxx_projects_owner_idx on public.unloxx_student_projects(user_id,created_at desc);
create table if not exists public.unloxx_student_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  xp integer not null default 0 check (xp>=0),
  updated_at timestamptz not null default now()
);
create table if not exists public.unloxx_badge_catalog (
  id text primary key,
  title text not null,
  description text not null,
  icon text not null
);
insert into public.unloxx_badge_catalog(id,title,description,icon) values
('first','First Steps','Complete your first verified quest','🌱'),
('three','Quest Starter','Complete three verified quests','⚡'),
('days','Steady Explorer','Complete quests on three different days','🔥'),
('dream','Dream Chaser','Complete a verified dream milestone','🌌'),
('circle','Friendly Explorer','Complete a verified collaboration activity','🤝'),
('collector','Badge Collector','Earn five other badges','👑')
on conflict (id) do nothing;
create table if not exists public.unloxx_student_badges (
  user_id uuid not null references auth.users(id) on delete cascade,
  badge_id text not null references public.unloxx_badge_catalog(id),
  awarded_at timestamptz not null default now(),
  primary key(user_id,badge_id)
);
-- Only owner rows are readable. No public discovery or anonymous access.
alter table public.unloxx_student_profiles enable row level security;
alter table public.unloxx_student_projects enable row level security;
alter table public.unloxx_student_progress enable row level security;
alter table public.unloxx_badge_catalog enable row level security;
alter table public.unloxx_student_badges enable row level security;
create policy "students read own profile" on public.unloxx_student_profiles for select to authenticated using ((select auth.uid())=user_id);
create policy "students create own profile" on public.unloxx_student_profiles for insert to authenticated with check ((select auth.uid())=user_id);
create policy "students edit own profile" on public.unloxx_student_profiles for update to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);
create policy "students read own projects" on public.unloxx_student_projects for select to authenticated using ((select auth.uid())=user_id);
create policy "students add own projects" on public.unloxx_student_projects for insert to authenticated with check ((select auth.uid())=user_id);
create policy "students edit own projects" on public.unloxx_student_projects for update to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);
create policy "students remove own projects" on public.unloxx_student_projects for delete to authenticated using ((select auth.uid())=user_id);
create policy "students read own progress" on public.unloxx_student_progress for select to authenticated using ((select auth.uid())=user_id);
create policy "students see badge catalog" on public.unloxx_badge_catalog for select to authenticated using (true);
create policy "students read own badges" on public.unloxx_student_badges for select to authenticated using ((select auth.uid())=user_id);
-- Explicit API grants. No client INSERT/UPDATE/DELETE on progress or awarded badges.
revoke all on public.unloxx_student_profiles,public.unloxx_student_projects,public.unloxx_student_progress,public.unloxx_badge_catalog,public.unloxx_student_badges from anon,authenticated;
grant select,insert,update on public.unloxx_student_profiles to authenticated;
grant select,insert,update,delete on public.unloxx_student_projects to authenticated;
grant select on public.unloxx_student_progress,public.unloxx_badge_catalog,public.unloxx_student_badges to authenticated;
-- Keep private profile data private even if an auth token is present for another user.
commit;
