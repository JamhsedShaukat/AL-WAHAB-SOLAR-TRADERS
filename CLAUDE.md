# Al-Wahab Solar Traders — Monorepo Coding Standards

## Project Overview

Al-Wahab Solar Traders is a solar estimation platform built as a Turborepo monorepo with a Next.js frontend and NestJS backend.

## Architecture

```
apps/
  web/          → Next.js 16 frontend — marketing site, client portal, admin portal
  api/          → NestJS REST backend
packages/
  ui/           → Shared UI primitives (@wahab/ui)
  types/        → Shared domain + API types (@wahab/types)
  utils/        → Shared utility functions (@wahab/utils)
  config/       → Shared TS configs + app constants (@wahab/config)
docs/           → Product, technical, design and admin specs
design/         → Design-tool exports, reference screens, brand assets
prisma/         → Prisma schema, migrations, seed
docker/         → Dockerfiles and docker-compose
```

All three web surfaces live in **one** Next.js app, separated by route group:

| Surface       | Route group  | URLs                                                 |
| ------------- | ------------ | ---------------------------------------------------- |
| Marketing     | `(marketing)` | `/`, `/about`, `/faq`, `/contact`, `/estimate`, legal |
| Auth          | `(auth)`      | `/login`, `/signup`, `/verify`, `/reset`             |
| Client portal | `(portal)`    | `/dashboard`, `/estimates`, `/projects`, `/profile`  |
| Admin portal  | `(admin)`     | `/admin/**`                                          |

Each group owns its own `layout.tsx` (shell, chrome, metadata). Never let one
group import another group's layout or shell components.

## Tech Stack

| Layer       | Technology                                       |
| ----------- | ------------------------------------------------ |
| Frontend    | Next.js 16, React 19, Tailwind CSS 4, App Router |
| Backend     | NestJS, REST API                                 |
| Database    | PostgreSQL                                       |
| ORM         | Prisma                                           |
| Monorepo    | Turborepo                                        |
| Pkg Manager | pnpm (workspaces)                                |
| Language    | TypeScript (strict mode)                         |

## Critical Rules

### DO NOT CHANGE

- Any UI styling, spacing, colors, animations, or typography
- The visual appearance of any page
- Responsive behavior
- User flow or routing behavior
- The current user experience

### ALWAYS

- Use TypeScript with strict mode everywhere
- Use absolute imports with `@/` prefix in apps
- Use `@wahab/` scope for shared packages
- Follow SOLID principles
- Use dependency injection in NestJS
- Validate all inputs at system boundaries
- Use environment variables for configuration
- Keep components small and focused

## Frontend Standards (apps/web)

### File Structure

```
apps/web/src/
  app/
    (marketing)/  → Public site
    (auth)/       → Login, signup, verify, reset
    (portal)/     → Client portal (authenticated)
    (admin)/      → Admin portal, staff only
    layout.tsx    → Root layout: fonts, metadata, LocaleProvider
    globals.css   → Design tokens, glass surfaces, keyframes
  components/
    admin/        → Admin-only shell + widgets
    portal/       → Portal-only shell + widgets
    marketing/    → Marketing sections
    auth/         → Auth card
    layout/       → Marketing header/footer
    brand/        → Logo + logo mark
    shared/       → Used by more than one route group
  services/       → API call abstractions
  hooks/          → Custom React hooks
  lib/            → i18n, seo, navigation config
  types/          → Frontend-only types
  store/          → State management
  utils/          → Frontend-only helpers
```

### Conventions

- Use Server Components by default; add `'use client'` only when needed
- Place API calls in `services/` files, never inline in components
- Use custom hooks for reusable stateful logic
- Environment variables: prefix with `NEXT_PUBLIC_` for client-side only
- Generic, reusable primitives (Button, Input, Dialog…) live in `@wahab/ui` —
  **not** in `apps/web`. Anything route-group-specific stays in the app.
- `cn()` comes from `@wahab/utils`. Never redefine it locally.
- Tailwind only scans this app by default. Any new shared package containing
  class names needs an `@source` line in `globals.css`, or its styles are
  silently dropped from the build.
- Use `class-variance-authority` for component variants
- Nav entries live in `src/lib/navigation.ts`, typed against `PermissionKey`
- Never put backend logic in the frontend

### Auth gating

Route protection belongs in **`apps/web/src/proxy.ts`**. Next.js 16 renamed
`middleware.ts` → `proxy.ts`; the old filename does nothing. Portal routes
redirect to `/login` when unauthenticated, and `/admin/**` returns **404** (not
403) for non-staff, per `docs/05-admin-panel.md`.

### Component Pattern

```tsx
// ✅ Good — small, typed, focused
interface Props {
  title: string;
  variant?: "primary" | "secondary";
}

export function MyComponent({ title, variant = "primary" }: Props) {
  return <div className={cn("base-class", variants[variant])}>{title}</div>;
}
```

### API Service Pattern

```tsx
// services/estimates.ts
import { api } from "@/lib/api";
import type { Estimate } from "@wahab/types";

export async function getEstimate(id: string): Promise<Estimate> {
  return api.get(`/estimates/${id}`);
}
```

## Backend Standards (apps/api)

### File Structure

All cross-cutting concerns live under `common/` — there are no top-level
`guards/`, `filters/`, `decorators/` or `interceptors/` directories.

```
apps/api/src/
  main.ts           → Bootstrap: prefix, helmet, CORS, pipes, filters
  app.module.ts     → Composition root
  config/           → Env validation + typed config module
  common/
    decorators/     → @Public, @RequirePermissions, @CurrentUser
    dto/            → PaginationQueryDto and other shared DTOs
    filters/        → AllExceptionsFilter (the only error formatter)
    interceptors/   → ResponseInterceptor (the only envelope builder)
    guards/         → Auth and permission guards
    pagination.ts   → paginate() helper
  database/         → Prisma module + service
  modules/
    health/         → Liveness probe
    auth/           → JWT issue/refresh, OTP, guards
    users/          → Customer + staff profiles, roles
    estimates/      → Estimator engine, saved estimates
    projects/       → Installations, phases, tasks, payments
    dashboard/      → Aggregates for portal + admin overview
    analytics/      → Funnel, traffic, revenue reporting
    settings/       → Business settings, rate cards, content
```

`/admin` is **not** a module. Admin screens are served by the domain modules
above, gated with `@RequirePermissions(...)`.

### Module Pattern

Each module contains:

- `*.controller.ts` — Route handlers
- `*.service.ts` — Business logic
- `*.module.ts` — Module definition
- `dto/` — Data Transfer Objects (validated with class-validator)
- `entities/` — Type definitions

### Global wiring (already in place)

- `ValidationPipe` — `whitelist: true`, `forbidNonWhitelisted: true`
- `AllExceptionsFilter` — maps every throw to the error envelope, hides 5xx detail
- `ResponseInterceptor` — wraps handler returns in the success envelope
- `ThrottlerGuard` — registered as `APP_GUARD`, configured from env
- `helmet()` + CORS from `CORS_ORIGIN`
- Global prefix `api`, so routes are served at `/api/**`

Controllers return **plain data**. To attach pagination, return
`paginate(items, total, page, limit)` — never build the envelope by hand.

### Conventions

- One module per domain concept
- Controllers handle HTTP only — no business logic
- Services contain all business logic
- Use DTOs for all request/response shaping
- Use class-validator decorators for validation
- Use global exception filter for error responses
- Use interceptors for response transformation
- Use guards for authentication/authorization
- Return standardized response format:

```json
{
  "success": true,
  "data": {},
  "message": "Operation successful",
  "meta": { "page": 1, "total": 50 }
}
```

### API Response Codes

| Code | Usage                 |
| ---- | --------------------- |
| 200  | Success               |
| 201  | Created               |
| 400  | Validation error      |
| 401  | Unauthorized          |
| 403  | Forbidden             |
| 404  | Not found             |
| 409  | Conflict              |
| 429  | Rate limited          |
| 500  | Internal server error |

## Database Standards

### Prisma Conventions

- Schema lives in `prisma/schema.prisma`
- Use `snake_case` for database columns (`@map`)
- Use `PascalCase` for model names
- Always add `createdAt` and `updatedAt` to models
- Use UUID for primary keys
- Add indexes for frequently queried fields
- Write migrations with `pnpm prisma migrate dev --name descriptive_name`

### Example Model

```prisma
model Estimate {
  id          String   @id @default(uuid())
  userId      String   @map("user_id")
  systemSize  Float    @map("system_size")
  monthlyBill Int      @map("monthly_bill")
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")
  user        User     @relation(fields: [userId], references: [id])

  @@map("estimates")
}
```

## Security Requirements

- Helmet middleware on all responses
- CORS configured per environment
- Rate limiting on all endpoints (100 req/min default)
- ValidationPipe globally enabled
- Sanitize all user input
- Hash passwords with bcrypt (min 12 rounds)
- JWT for authentication (access + refresh tokens)
- Never log sensitive data (passwords, tokens)
- Use parameterized queries (Prisma handles this)

## Performance Guidelines

- Use React Server Components for data fetching
- Lazy load heavy components with `dynamic()`
- Use `loading.tsx` for streaming
- Paginate all list endpoints (default 20, max 100)
- Cache static data with appropriate TTL
- Use database indexes for common queries
- Optimize images with `next/image`

## Environment Variables

Each app owns its own env files. There is **no** root `.env`.

- `apps/web/.env.example` → `apps/web/.env.local`
- `apps/api/.env.example` → `apps/api/.env`

The API validates its environment at boot in `src/config/env.validation.ts`;
a missing or malformed value fails startup rather than surfacing later. Add new
variables there, to the app's `.env.example`, and to `turbo.json`'s `build.env`
list so caching stays correct.

Numeric env fields need an explicit `@Type(() => Number)` — inferred property
types emit `design:type` of `Object`, so class-transformer cannot coerce the
string on its own.

## Git Conventions

- Branch naming: `feature/`, `fix/`, `chore/`
- Commit format: `type(scope): message` (conventional commits)
- Keep commits atomic and focused
- Never commit `.env` files
- Always commit `.env.example` files

## Commands

```bash
# Development
pnpm dev              # Start all apps
pnpm dev:web          # Frontend only  (http://localhost:3000)
pnpm dev:api          # Backend only   (http://localhost:3001/api)

# Build
pnpm build            # Build all
pnpm build:web
pnpm build:api

# Database
pnpm prisma migrate dev    # Run migrations
pnpm prisma generate       # Generate client
pnpm prisma db seed        # Seed database

# Lint & Type Check
pnpm lint
pnpm type-check

# Docker
docker compose up -d       # Start all services
docker compose down        # Stop all services
```

## Migration Phases

The project is being migrated in phases. Each phase must:

1. Be completed fully before moving to the next
2. Not break any existing UI or functionality
3. Be verified with a working build

Current phases:

- Phase 1: Monorepo setup, move frontend ✓
- Phase 2a: Shared packages (`@wahab/ui`, `types`, `utils`, `config`) ✓
- Phase 2b: NestJS skeleton — config, envelope, filter, throttling, health ✓
- Phase 2c: Route groups for auth, client portal, admin portal ✓
- Phase 3: Prisma schema + PostgreSQL, `database/` module
- Phase 4: Authentication — JWT, OTP, guards, `apps/web/src/proxy.ts` gating
- Phase 5: Estimator engine + portal/admin screens against real data
- Phase 6: Docker & production config

## Known inconsistency

`docs/02-technical-design.md` (v2.0) specifies **Supabase with Next.js route
handlers** — no separate backend. This repo instead uses a **standalone NestJS
API with Prisma and PostgreSQL**, per this file and the current project
direction. Where the two disagree on *architecture*, this file wins. The docs
remain authoritative for **domain content**: the data model, pricing engine,
permission matrix, screen specs and copy.
