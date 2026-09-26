# Kaucja Wallet — Expo Go MVP

Consumer prototype for a universal digital deposit-return wallet. The product flow is:

**scan RVM QR → physical return → trusted operator confirmation → digital refund**.

The mobile client never decides the refund amount and should not hold customer money in production.

## What is implemented

- Expo Router + TypeScript app for Expo Go
- home wallet dashboard
- QR scanner with `expo-camera`
- complete mock RVM session flow
- PET / can / reusable glass refund simulation
- refund history
- return-point list and status placeholders
- operator adapter boundary
- Supabase schema with RLS-first design
- webhook/API contract for replacing the mock with a real operator

## Run

Use Node 22.13+ for Expo SDK 57.

```bash
npm install
npx expo login
npx expo start
```

Open the project in Expo Go. In the current Expo Go release, signing in to the same Expo account on the CLI and device is recommended/required depending on platform.

If camera permission is unavailable, the Scan tab includes a **Demo** button.

## Demo QR

Any QR containing:

```text
kaucja://rvm/rvm-001
```

opens the demo return session.

## Production architecture

```text
Expo app
   │ consumer identity / session QR
   ▼
API / Supabase Edge Function
   │ create session
   ▼
Operator / RVM platform
   │ signed webhook after physical acceptance
   ▼
API verifies event + persists session
   │
   ├── realtime/push → app shows refund
   └── payout instruction → operator/payment institution → user
```

### Important rule

Never expose a service-role key or operator secret in the Expo client. Client-side counts in the demo are for UX testing only.

## Supabase

Apply `supabase/migrations/0001_kaucja_wallet.sql` and implement two server-only endpoints:

1. create RVM session,
2. receive and verify operator webhook.

See `docs/API.md`.

## Next integration milestone

The key partner question is whether the operator/RVM API allows an external consumer reference or session token to be attached before return and returns a signed completion event with accepted container counts and refund value.
