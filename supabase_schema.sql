-- Optional cloud sync. Run in Supabase SQL editor as project owner.
-- Clients use only the publishable / anon API key. NEVER expose service_role keys.
create table if not exists public.metria_snapshots (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null,
  updated_at timestamptz not null default now(),
  constraint metria_payload_object check (jsonb_typeof(payload) = 'object')
);
alter table public.metria_snapshots enable row level security;
revoke all on public.metria_snapshots from anon;
grant select, insert, update, delete on public.metria_snapshots to authenticated;
drop policy if exists "metria_read_own" on public.metria_snapshots;
drop policy if exists "metria_insert_own" on public.metria_snapshots;
drop policy if exists "metria_update_own" on public.metria_snapshots;
drop policy if exists "metria_delete_own" on public.metria_snapshots;
create policy "metria_read_own" on public.metria_snapshots for select to authenticated using ((select auth.uid()) = user_id);
create policy "metria_insert_own" on public.metria_snapshots for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "metria_update_own" on public.metria_snapshots for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "metria_delete_own" on public.metria_snapshots for delete to authenticated using ((select auth.uid()) = user_id);
-- Deleting an account through Supabase Auth removes its backup via cascade.
-- App Settings > Delete local data deletes only on-device data, not the account or cloud backup.
