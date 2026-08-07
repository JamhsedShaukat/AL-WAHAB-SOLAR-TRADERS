# Prisma

PostgreSQL schema, migrations and seed data. The database is **Supabase-managed
Postgres**; the API that talks to it runs on **EC2**.

Supabase is used purely as a managed Postgres host. We do not use Supabase Auth,
Storage, Realtime or RLS — authentication and authorisation live in the NestJS
API. See the *Known inconsistency* note in [../CLAUDE.md](../CLAUDE.md).

## Files

| Path                  | Purpose                                                     |
| --------------------- | ----------------------------------------------------------- |
| `schema.prisma`       | 28 models, translated from `docs/02-technical-design.md` §4  |
| `seed.ts`             | Roles, permissions, tiers, rate card, tariffs, settings      |
| `migrations/`         | Generated migration history (created by the first `db:migrate`) |
| `../prisma.config.ts` | Prisma 7 config — schema path, migrations path, connections  |

## Two connection URLs are required

Supabase puts a connection pooler (Supavisor) in front of Postgres, and Prisma
needs both sides of it. Both go in `apps/api/.env`:

| Variable       | Port | Mode        | Used by                        |
| -------------- | ---- | ----------- | ------------------------------ |
| `DATABASE_URL` | 6543 | transaction | every runtime query            |
| `DIRECT_URL`   | 5432 | session     | `prisma migrate`, `prisma db`  |

Why both:

- `DIRECT_URL` must be session mode. `prisma migrate` takes a Postgres advisory
  lock for the duration of the migration, and advisory locks do not survive
  transaction pooling — migrations hang or fail without it.
- `DATABASE_URL` carries `?pgbouncer=true` by convention. Note that under
  Prisma 7 this flag is effectively **inert**: it instructed the old Rust
  engine to stop issuing named prepared statements, and that engine is gone.
  What actually keeps us safe on the transaction pooler is `@prisma/adapter-pg`,
  which only names prepared statements when a `statementNameGenerator` is
  supplied — we do not supply one, so every statement is unnamed and safe to
  run across pooled connections. Keep the flag (harmless, and it matches the
  Supabase and Prisma docs), but do not rely on it for correctness.

**Use the pooler hostname for both.** The `db.<project-ref>.supabase.co:5432`
direct host resolves to IPv6 only; an EC2 instance in an IPv4-only VPC cannot
reach it. The pooler host answers on IPv4 on both ports.

Copy `apps/api/.env.example` and fill in the project ref, password and region
from Supabase → Project Settings → Database → Connection string.

## Commands

Run from the repo root (that is where `prisma.config.ts` lives).

```bash
pnpm db:generate   # regenerate the client — also runs on postinstall
pnpm db:migrate    # create + apply a migration in development
pnpm db:deploy     # apply pending migrations (use this on EC2)
pnpm db:status     # show which migrations have been applied
pnpm db:seed       # upsert reference data; safe to re-run
pnpm db:studio     # browse data
pnpm db:reset      # DROP everything, re-migrate, re-seed
```

`db:reset` destroys all data. Never point it at production.

## The generated client

Prisma 7 generates the client as **TypeScript source**, not into
`node_modules`. It is written to `apps/api/src/generated/prisma` so it sits
inside the API's `tsc` `rootDir` and gets compiled with the rest of the app.

That directory is gitignored. `pnpm install` regenerates it via `postinstall`,
so a fresh clone builds without a database. Import it as:

```ts
import { PrismaClient } from "@/generated/prisma/client";
```

In application code, inject `PrismaService` from `@/database` instead — it owns
the single client instance and the pg pool.

## Conventions

- Models `PascalCase`, tables and columns `snake_case` via `@map` / `@@map`
- UUID primary keys, `createdAt` / `updatedAt` on every mutable model
- Money is `Decimal @db.Decimal(12, 2)` — never a float
- Timestamps are `@db.Timestamptz`
- `pnpm db:migrate --name descriptive_name` for every schema change

## Not yet applied

No migration has been generated — that needs live Supabase credentials. Once
`apps/api/.env` is filled in:

```bash
pnpm db:migrate --name init
pnpm db:seed
```

Two things from the design doc are not expressible in `schema.prisma` and should
be added as raw SQL in a follow-up migration:

1. **Partial indexes** from §4.4 — e.g. `estimates (anon_token) where anon_token
   is not null` and `notifications (user_id, read_at) where read_at is null`.
   Plain indexes on those columns exist today, which is correct but larger.
2. **The audit-log lockdown** — `revoke update, delete on audit_logs`, plus the
   `reviews.rating between 1 and 5` check constraint.

## Connection budget

Supabase counts every client connection against the project pool, and an EC2
autoscaling group multiplies `DATABASE_POOL_MAX` by the instance count. Keep it
low (default 10) and size it against the Supabase plan's limit rather than the
instance's capacity.
