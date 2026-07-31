# Al-Wahab Solar Traders — Monorepo Coding Standards

## Project Overview

Al-Wahab Solar Traders is a solar estimation platform built as a Turborepo monorepo with a Next.js frontend and NestJS backend.

## Architecture

```
apps/
  web/          → Next.js 16 frontend (App Router)
  api/          → NestJS REST backend
packages/
  ui/           → Shared UI components
  types/        → Shared TypeScript types/interfaces
  config/       → Shared configuration (ESLint, Tailwind, TypeScript)
  utils/        → Shared utility functions
prisma/         → Prisma schema, migrations, seed
docker/         → Dockerfiles and docker-compose
```

## Tech Stack

| Layer        | Technology                  |
| ------------ | --------------------------- |
| Frontend     | Next.js 16, React 19, Tailwind CSS 4, App Router |
| Backend      | NestJS, REST API            |
| Database     | PostgreSQL                  |
| ORM          | Prisma                      |
| Monorepo     | Turborepo                   |
| Pkg Manager  | pnpm (workspaces)           |
| Language     | TypeScript (strict mode)    |

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
  app/            → Next.js App Router pages and layouts
  components/     → UI components (organized by feature)
  services/       → API call abstractions
  hooks/          → Custom React hooks
  lib/            → Utility libraries (i18n, seo, etc.)
  types/          → Frontend-specific types
  store/          → State management
  utils/          → Helper functions
```

### Conventions

- Use Server Components by default; add `'use client'` only when needed
- Place API calls in `services/` files, never inline in components
- Use custom hooks for reusable stateful logic
- Environment variables: prefix with `NEXT_PUBLIC_` for client-side only
- Import shared packages as `@wahab/types`, `@wahab/utils`, etc.
- Use `class-variance-authority` for component variants
- Use `clsx` + `tailwind-merge` via the `cn()` utility for class merging
- Never put backend logic in the frontend

### Component Pattern

```tsx
// ✅ Good — small, typed, focused
interface Props {
  title: string;
  variant?: 'primary' | 'secondary';
}

export function MyComponent({ title, variant = 'primary' }: Props) {
  return <div className={cn('base-class', variants[variant])}>{title}</div>;
}
```

### API Service Pattern

```tsx
// services/estimates.ts
import { api } from '@/lib/api';
import type { Estimate } from '@wahab/types';

export async function getEstimate(id: string): Promise<Estimate> {
  return api.get(`/estimates/${id}`);
}
```

## Backend Standards (apps/api)

### File Structure

```
apps/api/src/
  modules/
    auth/           → Authentication (JWT, guards)
    users/          → User management
    estimates/      → Solar estimates
    dashboard/      → Dashboard data
    analytics/      → Usage analytics
    settings/       → App settings
  common/           → Shared decorators, pipes, filters
  config/           → Configuration module
  database/         → Database module, Prisma service
  middlewares/      → HTTP middlewares
  guards/           → Auth & role guards
  decorators/       → Custom decorators
  filters/          → Exception filters
  interceptors/    → Response interceptors
```

### Module Pattern

Each module contains:
- `*.controller.ts` — Route handlers
- `*.service.ts` — Business logic
- `*.module.ts` — Module definition
- `dto/` — Data Transfer Objects (validated with class-validator)
- `entities/` — Type definitions

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

| Code | Usage                        |
| ---- | ---------------------------- |
| 200  | Success                      |
| 201  | Created                      |
| 400  | Validation error             |
| 401  | Unauthorized                 |
| 403  | Forbidden                    |
| 404  | Not found                    |
| 409  | Conflict                     |
| 429  | Rate limited                 |
| 500  | Internal server error        |

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

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Backend (.env)
```
DATABASE_URL=postgresql://user:pass@localhost:5432/wahab_solar
JWT_SECRET=your-secret-key
JWT_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d
PORT=3001
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
```

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
pnpm dev --filter web # Start frontend only
pnpm dev --filter api # Start backend only

# Build
pnpm build            # Build all
pnpm build --filter web

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
- Phase 2: NestJS backend, Prisma, PostgreSQL
- Phase 3: Connect frontend to backend
- Phase 4: Authentication architecture
- Phase 5: Shared packages
- Phase 6: Docker & production config
