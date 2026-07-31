# Al-Wahab Solar Traders

Solar estimation platform for Al-Wahab Solar Traders, Lahore. Turborepo
monorepo: a Next.js frontend serving the marketing site, client portal and
admin portal, plus a NestJS REST API.

## Layout

```
apps/
  web/        Next.js 16 — marketing, auth, client portal, admin portal
  api/        NestJS REST API
packages/
  ui/         Shared UI primitives            (@wahab/ui)
  types/      Shared domain + API types       (@wahab/types)
  utils/      Shared helpers, cn()            (@wahab/utils)
  config/     Shared TS configs + constants   (@wahab/config)
docs/         Product, technical, design and admin specs
design/       Design-tool exports, reference screens, brand assets
prisma/       Database schema, migrations, seed
docker/       Dockerfiles and compose config
```

The three web surfaces are route groups inside one Next.js app:

| Surface       | Route group   | URLs                                                  |
| ------------- | ------------- | ----------------------------------------------------- |
| Marketing     | `(marketing)` | `/`, `/about`, `/faq`, `/contact`, `/estimate`, legal  |
| Auth          | `(auth)`      | `/login`, `/signup`, `/verify`, `/reset`              |
| Client portal | `(portal)`    | `/dashboard`, `/estimates`, `/projects`, `/profile`   |
| Admin portal  | `(admin)`     | `/admin/**`                                           |

## Getting started

Requires Node 20+ and pnpm 9.

```bash
pnpm install
```

Copy the env examples and fill them in:

```bash
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env
```

`JWT_SECRET` must be at least 32 characters — the API refuses to boot otherwise.

Run everything:

```bash
pnpm dev
```

- Web → http://localhost:3000
- API → http://localhost:3001/api
- Health → http://localhost:3001/api/health

Or one at a time with `pnpm dev:web` / `pnpm dev:api`.

## Checks

```bash
pnpm type-check
pnpm lint
pnpm build
```

## Conventions

Coding standards, folder rules and architectural decisions live in
[CLAUDE.md](CLAUDE.md). Read it before adding a module or a route group.
