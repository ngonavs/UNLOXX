-- UNLOXX Prototype 2: run only after reviewing in a dedicated Supabase project.
-- Do not expose service-role keys in public frontend files.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('young','mentor','school','admin')),
  display_name text not null default '',
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
revoke all on public.profiles from anon;
grant select on public.profiles to authenticated;
create policy "Read own profile" on public.profiles for select to authenticated using (id = (select auth.uid()));
-- Intentionally NO insert/update/delete policies for client roles.
-- Admin/mentor/school accounts must be provisioned by a trusted server or operator,
-- never by browser JavaScript or user-editable metadata.
-- Expand with audited, role-scoped server APIs and policies before storing real data.
