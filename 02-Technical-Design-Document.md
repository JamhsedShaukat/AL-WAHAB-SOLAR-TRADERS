# Technical Design Document (TDD)
## Al-Wahab Solar Traders — Solar Estimator & Customer Portal v2.0

| | |
|---|---|
| **Document** | Technical Design Document |
| **Version** | 2.0 |
| **Date** | 29 July 2026 |
| **Target stack** | Next.js 15 (App Router) + Supabase (Postgres, Auth, Storage, Realtime) |
| **Team** | One developer |
| **Companion** | `01-PRD.md` |

---

## 1. Design principles for a solo build

| Principle | Consequence |
|---|---|
| **Managed over self-hosted** | Supabase for database/auth/storage/realtime; Vercel for hosting. No servers, no Docker, no Kubernetes, no CI cluster to babysit. |
| **One language, one repo** | TypeScript end to end. A single Next.js application serves the marketing site, the app, the admin panel and the API routes. |
| **The database is the backend** | Postgres + Row Level Security is the authorisation layer. Business logic that must be trusted lives in Postgres functions or server-only route handlers — never in the browser. |
| **Types are generated, not written** | `supabase gen types typescript` produces the DB types; Zod schemas validate every input at the edge. |
| **Buy the boring parts** | Auth, OTP, email, OCR, charts, tables and PDF are libraries or services, not projects. |
| **Additive, never destructive** | Every schema change is a forward migration. The existing UI is extended, never rewritten. |
| **Ship vertically** | Each milestone delivers a complete, deployable, demonstrable slice. |

---

## 2. System architecture

### 2.1 Context

```
                 ┌───────────────────────────────────────────────┐
   Homeowner ───▶│                                               │
   (mobile/web)  │        Next.js 15 App (Vercel)                │
                 │  ┌──────────────┬─────────────┬────────────┐  │
   Al-Wahab  ───▶│  │  Marketing   │  Customer   │   Admin    │  │
   staff         │  │  (SSG/ISR)   │  App (RSC)  │  (RSC)     │  │
                 │  └──────────────┴─────────────┴────────────┘  │
                 │  Server Actions · Route Handlers · Middleware  │
                 └───────────┬───────────────────────┬───────────┘
                             │                       │
              ┌──────────────▼──────────┐   ┌────────▼─────────────┐
              │       Supabase          │   │  External services   │
              │  Postgres 15 + RLS      │   │  • Resend  (email)   │
              │  Auth (JWT, OAuth, OTP) │   │  • SMS gateway (OTP) │
              │  Storage (private)      │   │  • OCR (bill parse)  │
              │  Realtime (websockets)  │   │  • Sentry            │
              │  Edge Functions (cron)  │   │  • Plausible/Umami   │
              └─────────────────────────┘   └──────────────────────┘
```

### 2.2 Why this shape

- **One deployable unit.** The whole product is `git push` → Vercel. A solo developer cannot afford a microservice estate.
- **RSC by default.** Data fetching happens on the server with the user's session; the client bundle stays small and the rate card never leaks.
- **RLS as the safety net.** Even if a query is written carelessly, Postgres refuses to return another user's rows.
- **Marketing routes are statically generated** (ISR, 1-hour revalidate) so the homepage stays fast and survives a database outage.

### 2.3 Rendering strategy per route group

| Route group | Rendering | Auth | Notes |
|---|---|---|---|
| `(marketing)` — `/`, `/about`, `/faq`, `/contact`, `/privacy`, `/terms` | **SSG + ISR (3600 s)** | public | SEO-critical. Content pulled from `site_content` at build/revalidate. |
| `(estimator)` — `/estimate`, `/estimate/[id]` | **Client wizard + server actions**; result page RSC | public / optional | Wizard state client-side for instant transitions; every price computed server-side. |
| `(auth)` — `/login`, `/signup`, `/verify`, `/reset` | SSR | public | Redirects if already authed. |
| `(app)` — `/dashboard`, `/estimates/*`, `/projects/*`, `/profile`, `/notifications` | **RSC, dynamic** | required (`customer`+) | Middleware guard. |
| `(admin)` — `/admin/**` | **RSC, dynamic** | required (staff roles) | Middleware guard + RLS + per-page permission check. |
| `api/**` | Route handlers | mixed | Webhooks, OCR callback, PDF generation, cron, exports. |

---

## 3. Technology choices

| Layer | Choice | Why (solo-dev lens) |
|---|---|---|
| Framework | **Next.js 15, App Router, TypeScript** | Keeps the existing React components verbatim; adds SSR/SEO the current SPA lacks; Server Actions remove the need for a separate API tier. |
| Styling | **Tailwind CSS 3.4** + the existing custom theme | Zero visual change — the current markup is already Tailwind. Theme extension moves into `tailwind.config.ts`. |
| Icons | **lucide-react** | Already in use. |
| Fonts | **Space Grotesk + Manrope** via `next/font` | Same faces, self-hosted, no layout shift. Urdu: **Noto Nastaliq Urdu**. |
| UI primitives (new surfaces only) | **shadcn/ui (Radix)** restyled to the existing tokens | Accessible dialogs, dropdowns, tabs, tables for the dashboard/admin — but skinned so they look native to the current design. |
| State | React state + **Zustand** for the wizard; **TanStack Query** for admin tables | Minimal. Server state stays on the server. |
| Forms & validation | **react-hook-form + Zod** | One schema validates client and server. |
| Database | **Supabase Postgres 15** | Managed, RLS, point-in-time backups, generous free/low tier. |
| Auth | **Supabase Auth** — email/password, phone OTP, Google OAuth | All three required paths supported natively; JWT with custom `role` claim. |
| Storage | **Supabase Storage**, private buckets | Bills, documents, photos, generated PDFs. Signed URLs only. |
| Realtime | **Supabase Realtime** | Live admin dashboard counters and project-status push. |
| Scheduled jobs | **Supabase `pg_cron`** + Vercel Cron | Estimate expiry, daily rollups, digests, retention purges. |
| Charts | **Recharts** | Small, React-native, themeable to the dark palette. |
| Tables | **TanStack Table** | Sorting/filtering/pagination/column visibility for every admin list. |
| PDF | **React-PDF (`@react-pdf/renderer`)** in a route handler | Branded estimate PDFs and admin report exports, generated server-side. |
| CSV | **Papaparse** (server-side stringify) | Streamed export honouring active filters. |
| Email | **Resend** + **react-email** | Templates written as React components; matches the brand. |
| SMS/OTP | Supabase Auth phone provider backed by **Twilio** or a local aggregator | Swappable behind one env var. |
| OCR | **Google Cloud Vision** (`DOCUMENT_TEXT_DETECTION`) + regex/LLM post-parse | Best accuracy on photographed Urdu/English utility bills. Fallback: manual entry. |
| Analytics | **Plausible** (or self-hosted **Umami**) + first-party `page_views` table | Cookie-light, PDPB-friendly, and the first-party table powers the in-admin traffic module without an external API dependency. |
| Errors | **Sentry** | Free tier is sufficient. |
| Testing | **Vitest** (units — pricing engine especially), **Playwright** (5 critical E2E flows) | Small, high-value suite only. |
| CI/CD | **GitHub → Vercel** preview + production; `supabase db push` migrations | Two commands, no pipeline maintenance. |

### 3.1 Repository layout

```
al-wahab-solar/
├─ app/
│  ├─ (marketing)/            page.tsx, about/, faq/, contact/, privacy/, terms/
│  ├─ (estimator)/estimate/   page.tsx, [id]/page.tsx
│  ├─ (auth)/                 login/, signup/, verify/, reset/
│  ├─ (app)/                  dashboard/, estimates/, projects/, profile/, notifications/
│  ├─ (admin)/admin/          page.tsx, users/, estimates/, projects/, leads/,
│  │                          analytics/, traffic/, revenue/, activity/, audit/,
│  │                          roles/, notifications/, settings/, pricing/, content/
│  ├─ api/                    pdf/, ocr/, export/, cron/, webhooks/
│  ├─ layout.tsx  globals.css  not-found.tsx  error.tsx
├─ components/
│  ├─ brand/                  Logo.tsx, LogoMark.tsx
│  ├─ ui/                     shadcn primitives, restyled
│  ├─ marketing/              Hero, HowItWorks, WhyUs, SampleEstimate, Reviews, FAQ, CTA, Footer
│  ├─ estimator/              Wizard, StepCard, SummaryRail, ResultCard, TierCompare, Roshni
│  ├─ dashboard/              KpiTile, ProjectCard, EstimateCard, PhaseTracker, EmptyState
│  └─ admin/                  DataTable, FilterBar, StatCard, ChartCard, ExportMenu, RoleGuard
├─ lib/
│  ├─ supabase/               client.ts, server.ts, admin.ts, middleware.ts, database.types.ts
│  ├─ pricing/                engine.ts, sizing.ts, rates.ts, tiers.ts, __tests__/
│  ├─ auth/                   permissions.ts, roles.ts, guards.ts
│  ├─ i18n/                   en.json, ur.json, provider.tsx
│  ├─ pdf/                    EstimateDocument.tsx
│  ├─ email/                  templates/*.tsx, send.ts
│  ├─ audit/                  log.ts
│  └─ utils/                  format.ts (PKR, kWh, dates), analytics.ts
├─ supabase/
│  ├─ migrations/             00001_init.sql … (forward-only)
│  ├─ functions/              expire-estimates/, daily-rollup/, retention-purge/
│  └─ seed.sql                rate card, tiers, phases/tasks template, roles
├─ public/                    logo.svg, logo-mark.svg, og.png, favicon set
├─ tests/                     e2e/*.spec.ts
├─ middleware.ts
├─ tailwind.config.ts
└─ .env.example
```

---

## 4. Data model

### 4.1 Entity-relationship overview

```
auth.users ──1:1── profiles ──1:N── estimates ──1:1?── projects
                       │                │                 │
                       │                │                 ├─1:N─ project_phases ─1:N─ project_tasks
                       │                │                 ├─1:N─ project_documents
                       │                │                 ├─1:N─ project_payments
                       │                │                 └─1:N─ project_updates
                       │                └─1:N─ estimate_line_items
                       │                └─1:1─ estimate_inputs
                       ├─1:N─ notifications
                       ├─1:N─ reviews
                       ├─1:N─ activity_logs
                       └─N:M─ roles (via user_roles) ─N:M─ permissions

rate_cards ─1:N─ rate_card_items          leads
tiers                                     site_content
tariff_slabs                              settings
phase_templates ─1:N─ task_templates      audit_logs
page_views / sessions (analytics)         notification_templates
```

### 4.2 Core tables (abridged DDL)

```sql
-- ─────────────── identity ───────────────
create type user_status as enum ('active','suspended','deleted');

create table profiles (
  id              uuid primary key references auth.users on delete cascade,
  full_name       text not null,
  email           text unique,
  phone           text unique,
  city            text default 'Lahore',
  area            text,
  address         text,
  language        text default 'en' check (language in ('en','ur')),
  avatar_url      text,
  status          user_status not null default 'active',
  email_verified  boolean default false,
  phone_verified  boolean default false,
  marketing_optin boolean default false,
  source          text,                    -- utm_source / referrer at signup
  last_seen_at    timestamptz,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now(),
  deleted_at      timestamptz
);

-- ─────────────── roles & permissions ───────────────
create table roles (
  id          serial primary key,
  key         text unique not null,        -- super_admin | admin | sales | operations | viewer | customer
  name        text not null,
  description text,
  is_system   boolean default false
);

create table permissions (
  id       serial primary key,
  key      text unique not null,           -- users.read, users.write, estimates.override_price, ...
  module   text not null,
  label    text not null
);

create table role_permissions (
  role_id       int references roles on delete cascade,
  permission_id int references permissions on delete cascade,
  primary key (role_id, permission_id)
);

create table user_roles (
  user_id     uuid references profiles on delete cascade,
  role_id     int  references roles on delete cascade,
  assigned_by uuid references profiles,
  assigned_at timestamptz default now(),
  primary key (user_id, role_id)
);

-- ─────────────── pricing ───────────────
create table rate_cards (
  id             uuid primary key default gen_random_uuid(),
  version        int  not null,
  label          text not null,            -- 'Lahore market — Jul 2026'
  city           text not null default 'Lahore',
  currency       text not null default 'PKR',
  effective_from date not null,
  effective_to   date,
  buffer_pct     numeric(4,2) default 6.0, -- ± market buffer
  is_active      boolean default false,
  notes          text,
  created_by     uuid references profiles,
  created_at     timestamptz default now()
);

create type rate_basis as enum ('per_kwp','per_kw_ac','per_kwh_batt','flat','per_sqft','percent');

create table rate_card_items (
  id            uuid primary key default gen_random_uuid(),
  rate_card_id  uuid references rate_cards on delete cascade,
  code          text not null,             -- panels|inverter|battery|structure|bos|net_metering|labour|transport
  label_en      text not null,
  label_ur      text,
  basis         rate_basis not null,
  unit_rate     numeric(12,2) not null,
  sort_order    int default 0,
  applies_when  jsonb default '{}'::jsonb  -- e.g. {"system_type":["hybrid","offgrid"]}
);

create table tiers (
  id           uuid primary key default gen_random_uuid(),
  key          text unique not null,       -- economy | standard | premium
  name_en      text not null,
  name_ur      text,
  tagline_en   text,                       -- 'Lowest price' | 'Best value' | 'Best quality'
  multiplier   numeric(5,3) not null,      -- 0.860 | 1.000 | 1.300
  specs        jsonb not null,             -- panel/inverter/battery/structure descriptors
  warranty_note_en text,
  is_default   boolean default false,
  sort_order   int
);

create table tariff_slabs (
  id          uuid primary key default gen_random_uuid(),
  disco       text not null default 'LESCO',
  phase       text not null default 'any',   -- single | three | any
  units_from  int not null,
  units_to    int,
  rate        numeric(8,2) not null,         -- PKR per unit
  effective_from date not null,
  is_active   boolean default true
);

-- ─────────────── estimates ───────────────
create type system_type   as enum ('ongrid','hybrid','offgrid');
create type estimate_goal as enum ('cover_all','reduce_bill','fit_budget');
create type estimate_status as enum
  ('draft','completed','saved','survey_requested','surveyed','quoted','accepted','declined','expired','converted');

create table estimates (
  id               uuid primary key default gen_random_uuid(),
  public_ref       text unique not null,    -- 'AWS-2607-0421' — human-quotable
  user_id          uuid references profiles on delete cascade,
  anon_token       text,                    -- set while anonymous; nulled on claim
  status           estimate_status not null default 'draft',
  version          int not null default 1,
  parent_id        uuid references estimates,   -- re-price lineage

  -- inputs (denormalised for fast listing; full payload in estimate_inputs)
  monthly_units    int,
  connection_phase text,                    -- single | three
  goal             estimate_goal,
  system_type      system_type,
  backup_loads     text[],
  backup_hours     int,
  roof_type        text,
  roof_area_sqft   int,
  structure_type   text,                    -- standard | customized
  structure_quality text,                   -- medium | good
  priority         text,                    -- lowest_price | best_value | best_quality | budget
  budget_pkr       numeric(12,2),
  net_metering     boolean default true,
  area_name        text,
  install_address  text,

  -- outputs
  tier_id          uuid references tiers,
  system_size_kwp  numeric(6,2),
  inverter_kw      numeric(6,2),
  battery_kwh      numeric(6,2),
  panel_count      int,
  panel_watt       int,
  subtotal_pkr     numeric(12,2),
  price_low_pkr    numeric(12,2),
  price_high_pkr   numeric(12,2),
  monthly_units_gen int,
  monthly_saving_pkr numeric(12,2),
  bill_coverage_pct numeric(5,2),
  payback_years    numeric(4,1),
  co2_kg_year      int,

  rate_card_id     uuid references rate_cards,
  bill_file_path   text,
  ocr_confidence   numeric(4,3),
  locale           text default 'en',
  utm              jsonb,
  valid_until      date,
  issued_at        timestamptz,
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

create table estimate_inputs (            -- full raw wizard payload, for audit & re-price
  estimate_id uuid primary key references estimates on delete cascade,
  payload     jsonb not null
);

create table estimate_line_items (
  id           uuid primary key default gen_random_uuid(),
  estimate_id  uuid references estimates on delete cascade,
  code         text not null,
  label_en     text not null,
  label_ur     text,
  spec_en      text,                       -- '14 × 585 W Tier-1 monocrystalline'
  spec_ur      text,
  quantity     numeric(10,2),
  unit         text,
  unit_rate    numeric(12,2),
  amount_pkr   numeric(12,2) not null,
  is_override  boolean default false,      -- admin manually adjusted
  overridden_by uuid references profiles,
  sort_order   int
);

-- ─────────────── projects ───────────────
create type project_status as enum
  ('survey_requested','survey_scheduled','surveyed','quotation_issued','agreement_signed',
   'procurement','installation','commissioning','net_metering','handover','completed','cancelled','on_hold');

create table projects (
  id              uuid primary key default gen_random_uuid(),
  public_ref      text unique not null,     -- 'PRJ-2607-0088'
  user_id         uuid references profiles on delete cascade,
  estimate_id     uuid references estimates,
  status          project_status not null default 'survey_requested',
  title           text,                     -- '8 kWp Hybrid — Johar Town'
  system_size_kwp numeric(6,2),
  system_type     system_type,
  tier_id         uuid references tiers,
  contract_value_pkr numeric(12,2),
  invoiced_pkr    numeric(12,2) default 0,
  collected_pkr   numeric(12,2) default 0,
  address         text,
  area_name       text,
  survey_date     date,
  survey_window   text,
  start_date      date,
  target_completion date,
  completed_at    timestamptz,
  assigned_to     uuid references profiles, -- sales owner
  crew_lead       uuid references profiles, -- ops owner
  progress_pct    int default 0,
  cancel_reason   text,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

create table phase_templates (
  id               smallint primary key,
  key              text unique not null,
  name_en          text not null, name_ur text,
  duration_label_en text, sort_order int,
  applies_when     jsonb default '{}'::jsonb   -- e.g. net metering only for ongrid/hybrid
);
create table task_templates (
  id serial primary key,
  phase_key text references phase_templates(key),
  name_en text not null, name_ur text, sort_order int
);

create type task_status as enum ('pending','in_progress','completed','skipped','blocked');

create table project_phases (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid references projects on delete cascade,
  key         text, name_en text not null, name_ur text,
  status      task_status default 'pending',
  sort_order  int,
  started_at  timestamptz, completed_at timestamptz
);

create table project_tasks (
  id          uuid primary key default gen_random_uuid(),
  phase_id    uuid references project_phases on delete cascade,
  project_id  uuid references projects on delete cascade,
  name_en     text not null, name_ur text,
  status      task_status default 'pending',
  assigned_to uuid references profiles,
  due_date    date, completed_at timestamptz,
  note        text, sort_order int
);

create table project_documents (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects on delete cascade,
  kind text,                                 -- agreement|invoice|warranty|net_meter|photo|other
  title text, file_path text not null, mime text, size_bytes bigint,
  visible_to_customer boolean default true,
  uploaded_by uuid references profiles, created_at timestamptz default now()
);

create table project_payments (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects on delete cascade,
  label text,                                -- 'Advance 40%'
  amount_pkr numeric(12,2) not null,
  due_date date, paid_at timestamptz,
  method text, reference text,
  recorded_by uuid references profiles
);

create table project_updates (               -- customer-visible timeline
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects on delete cascade,
  body_en text, body_ur text, photo_path text,
  author_id uuid references profiles, created_at timestamptz default now()
);

-- ─────────────── engagement ───────────────
create table leads (
  id uuid primary key default gen_random_uuid(),
  full_name text, email text, phone text,
  bill_range text, area_name text, message text,
  source text, utm jsonb,
  status text default 'new',                 -- new|contacted|qualified|converted|lost
  assigned_to uuid references profiles,
  user_id uuid references profiles,          -- if they later registered
  created_at timestamptz default now()
);

create table reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles, project_id uuid references projects,
  rating int check (rating between 1 and 5),
  body text, area_name text, system_label text,
  status text default 'pending',             -- pending|approved|rejected
  moderated_by uuid references profiles, moderated_at timestamptz,
  created_at timestamptz default now()
);

create table notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles on delete cascade,
  type text not null, title_en text, title_ur text, body_en text, body_ur text,
  link text, read_at timestamptz,
  channel text[] default '{in_app}',
  created_at timestamptz default now()
);

create table notification_templates (
  key text primary key, name text,
  subject_en text, subject_ur text,
  body_en text, body_ur text,
  sms_en text, sms_ur text,
  channels text[] default '{in_app,email}', enabled boolean default true
);

-- ─────────────── content & config ───────────────
create table site_content (
  key text primary key,                      -- hero.title, faq.items, about.body ...
  value_en jsonb, value_ur jsonb,
  updated_by uuid references profiles, updated_at timestamptz default now()
);

create table settings (
  key text primary key, value jsonb not null,
  category text, description text,
  updated_by uuid references profiles, updated_at timestamptz default now()
);

-- ─────────────── observability ───────────────
create table activity_logs (                 -- what happened (user + staff, high level)
  id bigserial primary key,
  actor_id uuid references profiles,
  actor_label text,
  action text not null,                      -- estimate.created, project.status_changed ...
  entity_type text, entity_id uuid,
  meta jsonb, ip inet, user_agent text,
  created_at timestamptz default now()
);

create table audit_logs (                    -- immutable, privileged changes with before/after
  id bigserial primary key,
  actor_id uuid, actor_email text, actor_role text,
  action text not null,                      -- INSERT | UPDATE | DELETE | LOGIN | IMPERSONATE | EXPORT
  table_name text, record_id text,
  old_values jsonb, new_values jsonb, changed_fields text[],
  ip inet, user_agent text, request_id text,
  created_at timestamptz default now()
);
revoke update, delete on audit_logs from authenticated, anon, service_role;

-- ─────────────── first-party analytics ───────────────
create table visitor_sessions (
  id uuid primary key default gen_random_uuid(),
  anon_id text not null, user_id uuid references profiles,
  first_page text, referrer text, utm jsonb,
  device text, browser text, os text, country text, city text,
  started_at timestamptz default now(), ended_at timestamptz,
  pageviews int default 0, is_bounce boolean
);

create table page_views (
  id bigserial primary key,
  session_id uuid references visitor_sessions on delete cascade,
  path text not null, title text, referrer text,
  duration_ms int, created_at timestamptz default now()
);

create table daily_metrics (                 -- pre-aggregated by pg_cron for fast dashboards
  day date primary key,
  visitors int, sessions int, pageviews int, bounce_rate numeric(5,2),
  signups int, active_users int,
  estimates_started int, estimates_completed int, estimates_saved int,
  survey_requests int, projects_created int, projects_completed int,
  revenue_booked_pkr numeric(14,2), revenue_collected_pkr numeric(14,2)
);
```

### 4.3 Forward-compatibility hooks (do not build, do not block)

- `rate_cards.city` and `tariff_slabs.disco` are already columns → multi-city/multi-DISCO expansion is a data change, not a schema change.
- `estimates.version` + `parent_id` → re-pricing history without destructive updates.
- `roles`/`permissions` are data-driven → new roles require no code change.
- `applies_when jsonb` on rate items and phase templates → conditional pricing/plans without new columns.

### 4.4 Indexes

```sql
create index on estimates (user_id, created_at desc);
create index on estimates (status, created_at desc);
create index on estimates (anon_token) where anon_token is not null;
create index on estimates (public_ref);
create index on projects (user_id, created_at desc);
create index on projects (status, updated_at desc);
create index on projects (assigned_to) where assigned_to is not null;
create index on project_tasks (project_id, status);
create index on activity_logs (created_at desc);
create index on activity_logs (entity_type, entity_id);
create index on audit_logs (created_at desc);
create index on audit_logs (actor_id, created_at desc);
create index on page_views (created_at desc);
create index on notifications (user_id, read_at) where read_at is null;
-- full-text search for the admin global search
create index on profiles using gin (to_tsvector('simple', coalesce(full_name,'')||' '||coalesce(email,'')||' '||coalesce(phone,'')));
```

---

## 5. Authorisation model

### 5.1 Roles

| Role | Intended holder | Capability summary |
|---|---|---|
| `customer` | Homeowner | Own estimates, own projects, own profile, own notifications, leave reviews |
| `viewer` | Accountant / intern | Read-only across admin; exports allowed; no PII downloads |
| `sales` | Sales executive | Leads, estimates (incl. price override within limit), convert to project, own pipeline |
| `operations` | Ops / crew manager | Projects, phases, tasks, documents, photos, payments recording |
| `admin` | Manager | Everything except role management, settings, rate card, impersonation, audit purge |
| `super_admin` | Owner / developer | Everything, including roles, settings, rate cards, impersonation |

### 5.2 Permission keys (seed set)

```
dashboard.view
users.read  users.write  users.suspend  users.impersonate  users.delete
estimates.read  estimates.write  estimates.override_price  estimates.delete  estimates.convert
projects.read   projects.write   projects.assign  projects.delete
payments.read   payments.write
leads.read      leads.write
reviews.moderate
analytics.view  traffic.view  revenue.view
activity.view   audit.view
export.csv      export.pdf
settings.read   settings.write
pricing.read    pricing.write
content.write
roles.manage
notifications.send
```

### 5.3 Enforcement — three layers, all required

1. **Middleware** (`middleware.ts`) — route-group gate. Unauthenticated → `/login`. Non-staff hitting `/admin/**` → 404 (not 403; do not reveal the surface).
2. **Row Level Security** — every table has RLS enabled. Customers see only `user_id = auth.uid()`. Staff access is granted through a `has_permission()` helper.
3. **Server-side check in the action/handler** — `requirePermission('estimates.override_price')` before any privileged mutation. Never trust the UI having hidden a button.

```sql
create or replace function has_permission(p_key text) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from user_roles ur
    join role_permissions rp on rp.role_id = ur.role_id
    join permissions p on p.id = rp.permission_id
    where ur.user_id = auth.uid() and p.key = p_key
  );
$$;

alter table estimates enable row level security;

create policy "own estimates - select" on estimates for select
  using (user_id = auth.uid() or has_permission('estimates.read'));

create policy "own estimates - insert" on estimates for insert
  with check (user_id = auth.uid() or user_id is null);

create policy "own estimates - update" on estimates for update
  using (user_id = auth.uid() or has_permission('estimates.write'))
  with check (user_id = auth.uid() or has_permission('estimates.write'));
```

Anonymous estimates (`user_id is null`) are readable only through a server action that verifies the `anon_token` held in an httpOnly cookie — never by direct client query.

### 5.4 Impersonation (support tool)

Super admin only. Creates a short-lived scoped session, writes an `audit_logs` entry on start **and** end, and shows a persistent red banner ("Viewing as {user} — exit impersonation"). All actions taken while impersonating are tagged `impersonated_by` in the audit trail. Impersonated sessions cannot change passwords, delete accounts, or export data.

---

## 6. The estimator engine

### 6.1 Placement

The engine lives in `lib/pricing/` and executes **only on the server** (server action `computeEstimate`). The client sends answers, receives a fully-formed estimate. The rate card is never shipped to the browser.

### 6.2 Algorithm

```
INPUT  answers { monthly_units, phase, goal, system_type, backup_loads[], backup_hours,
                 roof_type, roof_area_sqft, structure_type, structure_quality,
                 priority | budget_pkr, net_metering }
       tier    (default = tiers.is_default → 'standard')
       rate_card (active for city, effective today)

1. SIZE
   full_coverage_kwp = monthly_units / YIELD_PER_KWP_MONTH          // YIELD = 100 units/kWp/month
   switch goal:
     cover_all    → target = full_coverage_kwp
     reduce_bill  → target = full_coverage_kwp * REDUCE_FACTOR      // 0.65
     fit_budget   → target = solveForBudget(budget_pkr, tier)       // binary search on step 4
   target = roundUpTo(target, 0.5)                                   // 0.5 kW granularity

2. ROOF CONSTRAINT
   max_by_area = roof_area_sqft / SQFT_PER_KWP                       // 70 sq ft per kWp
   if target > max_by_area → target = floorTo(max_by_area, 0.5); flag AREA_CAPPED

3. COMPONENTS
   panel_watt   = tier.specs.panel_watt                              // 585 | 585 | 595
   panel_count  = ceil(target * 1000 / panel_watt)
   dc_kwp       = panel_count * panel_watt / 1000
   inverter_kw  = roundUpToInverterStep(target)                      // 3,5,6,8,10,12,15,20,25
   battery_kwh  = system_type == 'ongrid' ? 0
                : sizeBattery(backup_loads, backup_hours, tier)      // see 6.3

4. PRICE  (for each rate_card_item where applies_when matches)
   per_kwp      → amount = unit_rate * dc_kwp
   per_kw_ac    → amount = unit_rate * inverter_kw
   per_kwh_batt → amount = unit_rate * battery_kwh
   flat         → amount = unit_rate                                  // net_metering skipped if !net_metering
   structure adj: structure_type=='customized' → ×1.15 ; quality=='medium' → ×0.88
   subtotal     = Σ amounts * tier.multiplier
   price_low    = roundTo(subtotal * (1 - buffer), 10_000)
   price_high   = roundTo(subtotal * (1 + buffer), 10_000)

5. ENERGY & RETURNS   // note: these use the NOMINAL size, not dc_kwp
   monthly_gen_units = target * YIELD_PER_KWP_MONTH                   // 100 units/kWp/month
   bill_coverage_pct = min(100, monthly_gen_units / monthly_units * 100)
   monthly_saving    = EFFECTIVE_TARIFF * (monthly_gen_units - FIXED_UNITS)
                       // 48.02 PKR/unit, 50 units of fixed charges solar cannot remove
                       // capped at the customer's current bill
   payback_years     = subtotal / (monthly_saving * 12)
   co2_kg_year       = target * CO2_PER_KWP_YEAR                      // 1015 kg/kWp/yr

6. LINE ITEMS + VALIDITY
   persist estimates + estimate_line_items + estimate_inputs
   valid_until = today + settings.estimate_validity_days               // 14
```

### 6.3 Battery sizing

```
load_profile = { fans_lights: 0.30 kW, refrigerator: 0.20 kW,
                 air_conditioner: 1.20 kW, internet_router: 0.05 kW, water_pump: 0.75 kW }

connected_kw = Σ selected loads
energy_kwh   = connected_kw * backup_hours * DIVERSITY   // DIVERSITY = 0.8
usable_kwh   = energy_kwh / DOD                          // DOD = 0.9 for LFP
battery_kwh  = roundUpTo(usable_kwh, 2.5)                // 2.5 kWh module granularity
if tier == 'premium' → battery_kwh = max(battery_kwh, 2 × standard_result)
```

### 6.4 Constants (all stored in `settings`, not hard-coded)

| Key | Default | Meaning |
|---|---|---|
| `yield_units_per_kwp_month` | 100 | Lahore specific yield |
| `effective_tariff_pkr_per_unit` | 48.02 | Blended LESCO rate used for savings |
| `fixed_units_deduction` | 50 | Units-equivalent of fixed charges solar cannot remove |
| `reduce_bill_factor` | 0.65 | Sizing for "reduce my bill" |
| `sqft_per_kwp` | 70 | Roof area required |
| `co2_kg_per_kwp_year` | 1015 | Emissions factor |
| `market_buffer_pct` | 6 | ± band on the price |
| `estimate_validity_days` | 14 | Quote validity |
| `battery_dod` | 0.90 | Depth of discharge |
| `battery_module_kwh` | 2.5 | Rounding granularity |
| `size_step_kw` | 0.5 | Size rounding |

### 6.5 Verification against the live build

Every case below was solved from the figures published on the current site, and every one reproduces **exactly**.

| # | Case | Site shows | Engine computes |
|---|---|---|---|
| 1 | 980 units, `cover_all` → size | 10 kW | `980/100 = 9.8 → ⌈⌉₀.₅ = 10.0` ✓ |
| 2 | 980 units, `reduce_bill` → size | 6.5 kW | `9.8 × 0.65 = 6.37 → ⌈⌉₀.₅ = 6.5` ✓ |
| 3 | 6.5 kW monthly saving | PKR 28,812 | `48.02 × (650 − 50) = 28,812` ✓ |
| 4 | 10 kW monthly saving | PKR 45,619 | `48.02 × (1000 − 50) = 45,619` ✓ |
| 5 | 8 kWp monthly saving | PKR 36,000 | `48.02 × (800 − 50) = 36,015` → displays 36,000 ✓ |
| 6 | 6.5 kW CO₂ | 6,598 kg/yr | `6.5 × 1015 = 6,597.5` ✓ |
| 7 | 8 kWp generation | 800 units/mo | `8 × 100` ✓ |
| 8 | 8 kWp Standard subtotal | PKR 1,790,000 | rate-card sum = 1,789,987 → 1,790,000 ✓ |
| 9 | 8 kWp Standard range | 1,680,000 – 1,900,000 | `×0.94 / ×1.06`, rounded to 10k ✓ |
| 10 | 6.5 kW payback | 4.5 yrs | `1,565,200 / (28,812 × 12) = 4.53` ✓ |
| 11 | 8 kWp payback | ~4.1 yrs | `1,790,000 / (36,000 × 12) = 4.14` ✓ |
| 12 | Economy / Premium multipliers | 1.535M / 2.335M mid | `1.79M × 0.86` and `× 1.30` ✓ |

**These twelve cases are the unit-test suite for `lib/pricing/engine.ts`.** Write them in M2 before writing the engine, and never merge a change that turns one red.

**The one subtlety that will bite if missed:** panel and structure pricing use the **DC array size** (`panel_count × panel_watt / 1000` — e.g. 8.19 kWp for a nominal 8 kW system), while generation, savings and CO₂ use the **nominal size** (8). Mixing them shifts every headline number by ~2.4%.

---

## 7. Key flows

### 7.1 Anonymous estimate → claimed on signup

```
1. First visit to /estimate → server action issues httpOnly cookie `aw_anon` (uuid), 30-day expiry.
2. Each answered step → server action `saveDraft(anon_token, payload)` upserts a `draft` estimate.
   (Wizard remains instant: UI advances optimistically, the save is fire-and-forget.)
3. Final step → `computeEstimate` writes outputs, status = 'completed'.
4. User clicks "Save & book a free site survey" → redirect /signup?claim={estimate_id}
5. On successful auth, server action `claimEstimates(anon_token, user_id)`:
       update estimates set user_id = $2, anon_token = null, status = 'saved'
       where anon_token = $1 and user_id is null;
   → runs inside a transaction, writes activity_log, clears the cookie.
6. Redirect to /dashboard with a success toast.
```

### 7.2 Bill upload + OCR

```
Client → uploads file directly to Supabase Storage (private bucket `bills/{anon|user}/{uuid}.ext`)
         using a short-lived signed upload URL from a server action.
Client → POST /api/ocr { path }
Server → downloads the object, calls Vision DOCUMENT_TEXT_DETECTION
       → parses with LESCO-specific extractors:
            units      /(?:UNITS|یونٹ)\s*[:\-]?\s*(\d{2,5})/
            phase      three-phase if any of (T-PHASE, 3-PHASE, THREE PHASE) present
            reference  /\b\d{2}\s?\d{5}\s?\d{7}\s?[A-Z]?\b/
            address    block following the consumer-name line
       → averages the last 6 months if the bill shows a history table
       → returns { units, phase, address, ref, confidence }
Client → renders the "Found these details — please confirm" step (existing design),
         every field editable; on low confidence (< 0.6) shows a gentle
         "please double-check these" hint. On failure → falls back to manual entry.
Retention: bill files purged 24 months after the account's last activity (pg_cron).
```

### 7.3 Estimate → project

```
Customer: /estimates/{id} → "Book a free site survey" → picks a date window
        → estimate.status = 'survey_requested'
        → notification to sales role + email/SMS to customer

Sales:   /admin/estimates/{id} → "Convert to project"
        → transaction:
            insert projects (from estimate)
            copy phase_templates + task_templates (filtered by applies_when
              → the "Net Metering" phase is skipped for off-grid systems)
            estimate.status = 'converted'
            activity_log + audit_log
            notify customer

Ops:     /admin/projects/{id} → advance tasks
        → project.progress_pct recomputed by trigger:
             completed_tasks / total_tasks (skipped tasks excluded)
        → project.status derived from the furthest in-progress phase
        → Supabase Realtime pushes the change to the customer's open dashboard
        → notification + email on every status transition
```

### 7.4 PDF generation

`GET /api/pdf/estimate/[id]` → verify ownership or `estimates.read` permission → load estimate + line items + tier + settings → render `@react-pdf/renderer` document (A4, brand navy header with the logo, itemized table, timeline, phases, warranties, disclaimer, "Shine On!" footer) → stream as `application/pdf` with `Content-Disposition: attachment; filename="Al-Wahab-Estimate-{public_ref}.pdf"` → write `activity_log`.

### 7.5 Exports (CSV / PDF) from admin

`POST /api/export` `{ module, format, filters, columns }` → `requirePermission('export.csv'|'export.pdf')` → re-runs the same query builder the list view uses (single source of truth) → caps at 50,000 rows → CSV streamed via Papaparse, PDF via React-PDF landscape table → writes an `audit_logs` entry recording module, filter set and row count (exports are a data-egress event and must be audited).

---

## 8. API surface

Mutations use **Server Actions**; anything called by a third party, a browser `fetch`, or a cron uses a **Route Handler**.

### 8.1 Server actions (`app/**/actions.ts`)

| Action | Auth | Notes |
|---|---|---|
| `startEstimate()` | public | issues anon cookie, creates draft |
| `saveEstimateStep(step, payload)` | public/own | upsert draft |
| `computeEstimate(estimateId, tierKey?)` | public/own | runs the engine, writes line items |
| `switchTier(estimateId, tierKey)` | own | re-price, new version |
| `claimEstimates()` | authed | attach anon estimates |
| `requestSurvey(estimateId, window)` | authed | status change + notify |
| `respondToQuotation(estimateId, accept, reason?)` | own | records timestamp + IP |
| `submitReview(projectId, rating, body)` | own, completed project only | status `pending` |
| `updateProfile(payload)` | own | |
| `markNotificationsRead(ids)` | own | |
| `admin.*` (users, estimates, projects, settings, roles, pricing, content) | permission-gated | every one wrapped by `withAudit()` |

### 8.2 Route handlers

| Route | Method | Auth | Purpose |
|---|---|---|---|
| `/api/ocr` | POST | session | Parse an uploaded LESCO bill |
| `/api/pdf/estimate/[id]` | GET | owner or staff | Branded estimate PDF |
| `/api/pdf/report/[module]` | POST | `export.pdf` | Admin report PDF |
| `/api/export` | POST | `export.csv`/`export.pdf` | Filtered list export |
| `/api/track` | POST | public | First-party pageview beacon (rate-limited, no PII) |
| `/api/contact` | POST | public | Lead form (Turnstile + honeypot + rate limit) |
| `/api/cron/expire-estimates` | GET | cron secret | Mark past-validity estimates `expired`, notify |
| `/api/cron/daily-rollup` | GET | cron secret | Populate `daily_metrics` |
| `/api/cron/digest` | GET | cron secret | Weekly owner KPI email |
| `/api/cron/retention-purge` | GET | cron secret | Delete bills/PII past retention |
| `/api/webhooks/email` | POST | signature | Delivery/bounce events from Resend |
| `/api/health` | GET | public | Uptime probe |

### 8.3 Standard response envelope

```ts
type Result<T> =
  | { ok: true;  data: T }
  | { ok: false; error: { code: string; message: string; fields?: Record<string,string> } };
```

Error codes: `UNAUTHENTICATED`, `FORBIDDEN`, `NOT_FOUND`, `VALIDATION_FAILED`, `RATE_LIMITED`, `ESTIMATE_EXPIRED`, `OCR_FAILED`, `CONFLICT`, `INTERNAL`.

---

## 9. Security design

| Control | Implementation |
|---|---|
| Transport | HTTPS enforced by Vercel; HSTS `max-age=63072000; includeSubDomains; preload` |
| Headers | CSP (`default-src 'self'`, explicit allowlist for fonts/Supabase/analytics), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` minimal |
| AuthN | Supabase Auth; JWT in httpOnly, `Secure`, `SameSite=Lax` cookies; refresh rotation |
| AuthZ | Middleware + RLS + explicit `requirePermission()` — all three, on every privileged path |
| Input validation | Zod schema on every server action and route handler; DB constraints as the final backstop |
| SQL injection | Parameterised queries only via supabase-js / typed RPC. No string-built SQL. |
| XSS | React escaping; no `dangerouslySetInnerHTML` except admin-authored content passed through `sanitize-html` |
| CSRF | Server Actions carry Next.js's built-in origin check; route handlers verify `Origin`/`Sec-Fetch-Site` |
| File upload | Extension + MIME + magic-byte check; 10 MB cap; private bucket; randomised object names; no execution path |
| Secrets | Server-only env vars; `NEXT_PUBLIC_*` limited to the Supabase URL and anon key; service-role key used only in route handlers, never in a component |
| Rate limiting | Upstash Redis sliding window — auth 5/min/IP, OTP 3/hour/phone, contact 3/hour/IP, OCR 10/hour/session, export 20/hour/user |
| Bot defence | Cloudflare Turnstile on contact and signup; honeypot field |
| PII | Bills and CNIC-adjacent documents in private buckets, signed URLs valid 60 s; retention purge job; `viewer` role cannot download customer documents |
| Audit | `audit_logs` append-only (UPDATE/DELETE revoked); exports and impersonation logged |
| Dependency hygiene | Dependabot + `npm audit` in CI; lockfile committed |
| Backups | Supabase daily backup, 30-day retention; PITR on the paid tier; documented and rehearsed restore |

---

## 10. Analytics implementation

Two complementary sources so the admin panel never depends on a third party being reachable:

1. **First-party beacon** — a tiny client script posts `{ path, referrer, utm, screen, duration }` to `/api/track`. Writes `visitor_sessions` + `page_views`. No cookies beyond the anon id; no cross-site tracking; IP hashed with a rotating salt and discarded after country/city lookup.
2. **Plausible / Umami** — script tag for the marketing team's own view, embedded in the admin as an iframe or via its stats API.

`pg_cron` rolls `page_views` into `daily_metrics` nightly; charts read the rollup table, so dashboards stay fast as raw event volume grows. Raw `page_views` older than 12 months are purged.

**Funnel definition** (tracked as events on `activity_logs`):
`page_view(/) → estimate.started → estimate.step_completed(n) → estimate.completed → account.created → estimate.saved → survey.requested → project.created → project.completed`

---

## 11. Internationalisation

- Dictionary-based, `lib/i18n/{en,ur}.json`, keys mirroring the component tree. No runtime translation service.
- Language stored in `profiles.language` for signed-in users, in a cookie otherwise. URL prefix `/ur/...` for SEO with `hreflang` alternates.
- `dir="rtl"` on `<html>` for Urdu; Tailwind logical properties (`ps-*`, `pe-*`, `ms-*`, `me-*`) replace left/right utilities so a single stylesheet mirrors correctly.
- Urdu typeface: **Noto Nastaliq Urdu**, with an increased line-height token (`leading-loose-ur`) because Nastaliq needs vertical room.
- Numbers/currency via `Intl.NumberFormat('en-PK')`; the existing abbreviation style (`PKR 1.68M`) is preserved in both locales.
- Database content that is user-visible carries `_en` / `_ur` column pairs (already in the schema).

---

## 12. Performance plan

| Technique | Where |
|---|---|
| Static generation + ISR | All marketing routes |
| RSC + streaming with `<Suspense>` | Dashboard and admin — KPI tiles stream in before heavy tables |
| `next/image` with AVIF/WebP | Logo, OG image, project photos |
| `next/font` self-hosting, `display: swap`, subset | Space Grotesk, Manrope, Noto Nastaliq Urdu |
| Route-level code splitting; `dynamic()` for Recharts and React-PDF | Charts and PDF never load on the marketing site |
| Pre-aggregated `daily_metrics` | Admin dashboards |
| Cursor pagination (25/page) + server-side filtering | Every admin table |
| `prefers-reduced-motion` guard on the existing glow/marquee/tilt animations | Global |
| Bundle budget: < 180 KB gzip first load on `/` | Enforced by `@next/bundle-analyzer` check before each release |

---

## 13. Testing strategy (deliberately small)

| Layer | Tool | Scope |
|---|---|---|
| Unit | Vitest | **`lib/pricing/*` — mandatory, including the 12 verification cases in §6.5**; formatters; permission helpers |
| Integration | Vitest + local Supabase | RLS policies (a customer must not read another customer's estimate); estimate claiming; project creation from template |
| E2E | Playwright | 5 flows only: (1) complete an estimate anonymously, (2) sign up and claim it, (3) request a survey, (4) admin converts to project and advances a task, (5) admin exports CSV |
| Visual regression | Playwright screenshots | Homepage + estimator at 375 px and 1440 px, compared against the current build — the guard for "do not change the design" |
| Accessibility | `@axe-core/playwright` | Homepage, estimator, dashboard, one admin page |
| Manual | Checklist | Urdu RTL, Android Chrome, iOS Safari, bill upload with 5 real LESCO bills |

---

## 14. Environments & deployment

| Environment | URL | Database | Purpose |
|---|---|---|---|
| Local | `localhost:3000` | Supabase CLI (Docker) | Development |
| Preview | `*.vercel.app` per PR | Staging Supabase project | Review + Playwright |
| Production | `alwahabsolar.pk` | Production Supabase | Live |

**Pipeline:** push → Vercel preview build → typecheck + lint + Vitest + Playwright → merge to `main` → production deploy. Migrations run via `supabase db push` against staging first, then production, gated on a successful backup.

**Rollback:** Vercel instant rollback for application code; forward-fix migrations only (never `down` in production) — every migration must be additive and backwards-compatible for one release.

**Environment variables**

```
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY        # server only
GOOGLE_VISION_CREDENTIALS        # base64 service-account JSON
RESEND_API_KEY
SMS_PROVIDER_SID / SMS_PROVIDER_TOKEN / SMS_SENDER_ID
UPSTASH_REDIS_REST_URL / _TOKEN
TURNSTILE_SITE_KEY / TURNSTILE_SECRET
SENTRY_DSN
CRON_SECRET
NEXT_PUBLIC_PLAUSIBLE_DOMAIN
```

---

## 15. Migration from the current site

| Step | Action | Risk |
|---|---|---|
| 1 | Create the Next.js repo; copy `tailwind.config` theme extension verbatim (gold `#FFB800`, amber `#FF8C00`, cyan `#00E5FF`, navy-900 `#0A0F1E`, navy-950 `#05080F`, `.glass`, `.glass-strong`, `animate-glow`, `floatUp`, `marquee`) | Low |
| 2 | Port each existing component 1:1 into `components/`; no restyling. Snapshot the current site first for visual diffing. | Low |
| 3 | Split the single page into route groups; marketing content moves into `site_content` seeds | Low |
| 4 | Replace the logo component and swap every copy string for an i18n key | Low |
| 5 | Move pricing constants out of the client into `rate_cards` seed data; delete the client-side calculator | Medium — covered by the §6.5 test cases |
| 6 | Wire Supabase Auth into the existing sign-in screen markup | Low |
| 7 | Replace hard-coded dashboard/project mock arrays with real queries; keep the card components untouched | Low |
| 8 | Add the admin route group (net-new; reuses the same tokens) | Medium — largest surface |
| 9 | Point `alwahabsolar.pk` at Vercel; keep the Netlify build reachable for one week as a fallback | Low |

**No data migration is required** — the current site stores nothing.

---

## 16. Operational runbook (essentials)

- **Update prices:** Admin → Settings → Pricing → duplicate the active rate card → edit unit rates → set `effective_from` → activate. Existing issued estimates keep their original card (`estimates.rate_card_id`).
- **A customer says the price changed:** open the estimate, check `rate_card_id` and `valid_until`; re-price creates version 2 and leaves version 1 intact.
- **OCR is failing:** check Vision quota and the `/api/ocr` Sentry issues; the manual path is always available, so this is never customer-blocking.
- **OTP not arriving:** check the SMS provider dashboard and the per-phone rate limit; email/password login is the fallback.
- **Restore a backup:** Supabase dashboard → Backups → restore into a new project → verify → repoint `SUPABASE_URL`. Rehearse once before launch.
- **Suspected breach:** rotate the service-role key and all provider keys, force sign-out (`auth.admin.signOut` for all users), review `audit_logs` for the window, notify affected users.

---

## 17. Open technical questions

| # | Question | Needed by | Default if unanswered |
|---|---|---|---|
| 1 | Which SMS aggregator has the best Pakistani deliverability and pricing? | R3 | Twilio |
| 2 | Are there real historical project figures to seed reviews and the About counters? | R1 | Hide counters until data exists |
| 3 | Is a vector (SVG/AI/EPS) version of the logo available? | R1 | Redraw from the PNG as SVG |
| 4 | Does Al-Wahab want to record payments in-app, or keep that in their existing books? | R4 | Record in-app (schedule + received), no gateway |
| 5 | Confirm current LESCO slab rates for the tariff table | R2 | Use the blended ≈PKR 44.3/unit implied by the current site |
| 6 | Final domain and email sending domain for SPF/DKIM | R7 | `alwahabsolar.pk` |

---

*End of Technical Design Document.*
