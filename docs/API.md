# Operator integration contract

The app does **not** decide how much money is due. A trusted backend receives a signed operator event after the physical return.

## 1. Start consumer session

`POST /v1/rvm-sessions`

```json
{
  "rvm_id": "rvm-001",
  "consumer_ref": "usr_123"
}
```

Response:

```json
{
  "session_id": "sess_abc",
  "qr_payload": "kaucja://session/sess_abc",
  "expires_at": "2026-09-26T12:00:00+02:00"
}
```

## 2. Operator webhook

`POST /webhooks/operators/:operator`

```json
{
  "event_id": "evt_987",
  "session_id": "sess_abc",
  "rvm_id": "rvm-001",
  "accepted": { "pet": 6, "cans": 4, "glass": 1 },
  "refund_amount_grosz": 600,
  "status": "confirmed",
  "signed_at": "2026-09-26T10:55:00+02:00"
}
```

Backend requirements:

- verify signature before any write;
- enforce event idempotency by `event_id`;
- never trust counts or amount from the mobile client;
- map operator `session_id` to the authenticated consumer;
- request payout from operator/payment partner after confirmation;
- keep payment credentials and operator secrets server-side only.
