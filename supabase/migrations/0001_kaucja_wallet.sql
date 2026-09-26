create extension if not exists pgcrypto;

create table if not exists public.rvm_points (
  id uuid primary key default gen_random_uuid(),
  operator_key text not null,
  external_rvm_id text not null,
  name text not null,
  address text,
  lat double precision,
  lng double precision,
  status text not null default 'unknown' check (status in ('online','busy','offline','unknown')),
  capabilities jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  unique(operator_key, external_rvm_id)
);

create table if not exists public.deposit_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  operator_key text not null,
  external_session_id text not null,
  external_rvm_id text not null,
  status text not null default 'started' check (status in ('started','confirmed','rejected','paid')),
  accepted_pet integer not null default 0 check (accepted_pet >= 0),
  accepted_cans integer not null default 0 check (accepted_cans >= 0),
  accepted_glass integer not null default 0 check (accepted_glass >= 0),
  refund_amount_grosz integer not null default 0 check (refund_amount_grosz >= 0),
  operator_payload jsonb,
  confirmed_at timestamptz,
  created_at timestamptz not null default now(),
  unique(operator_key, external_session_id)
);

create table if not exists public.operator_webhook_events (
  id uuid primary key default gen_random_uuid(),
  operator_key text not null,
  external_event_id text not null,
  signature_verified boolean not null default false,
  payload jsonb not null,
  created_at timestamptz not null default now(),
  unique(operator_key, external_event_id)
);

alter table public.deposit_sessions enable row level security;
alter table public.rvm_points enable row level security;
alter table public.operator_webhook_events enable row level security;

create policy "users read own sessions" on public.deposit_sessions
for select using (auth.uid() = user_id);

create policy "authenticated read return points" on public.rvm_points
for select to authenticated using (true);

-- No client INSERT/UPDATE policies for deposit_sessions or webhook_events on purpose.
-- Trusted writes should happen through Edge Functions/service-role after operator verification.
