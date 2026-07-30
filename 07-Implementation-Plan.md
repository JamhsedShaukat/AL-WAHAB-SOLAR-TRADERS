# Implementation Plan
## Al-Wahab Solar Traders v2.0 — solo-developer roadmap

| | |
|---|---|
| **Document** | Implementation plan & milestones |
| **Version** | 2.0 |
| **Date** | 29 July 2026 |
| **Team** | One developer |
| **Assumed capacity** | ~30 focused hours/week |
| **Duration** | 22 weeks to launch (≈5 months), with two usable interim releases |

---

## 1. How this plan is built for one person

1. **Every milestone is deployable.** Nothing is half-finished at a milestone boundary. If the project stops at week 10, what exists is still a working product.
2. **The customer side ships before the admin side.** Al-Wahab can run the business from email and WhatsApp for a few weeks; customers cannot run the estimator from anywhere else.
3. **Highest-risk work first inside each milestone.** The pricing engine and the OCR pipeline are tackled at the front of M2, not at the end.
4. **A hard weekly rhythm** — Mon/Tue build, Wed build, Thu test + fix, Fri deploy to preview, review, write next week's tasks. Friday afternoon is buffer, not new work.
5. **Explicit "not this week" list.** Anything not in the current milestone goes into `BACKLOG.md` and is not touched.
6. **Definition of Done, applied to every task:** typed, validated with Zod, RLS-covered, works on a 360 px screen, works in Urdu, has an empty/loading/error state, is audited if privileged, and is deployed to preview.

---

## 2. Milestone overview

| M | Milestone | Weeks | Ships |
|---|---|---|---|
| **M0** | Setup & foundations | 1 | Repo, Supabase, CI, design tokens, logo assets |
| **M1** | Rebrand & marketing site | 2–3 | The new-brand site live, SEO, EN/UR — **Release R1** |
| **M2** | Estimator on the server | 4–6 | DB rate card, server pricing, OCR, persistence, PDF — **Release R2** |
| **M3** | Accounts & dashboard | 7–10 | Auth, estimate claiming, dashboard, notifications — **Release R3** |
| **M4** | Projects | 11–13 | Projects, phases/tasks, documents, reviews — **Release R4** |
| **M5** | Admin core | 14–17 | Dashboard, users, estimates, projects, search, exports, roles, audit — **Release R5** |
| **M6** | Admin insights & system | 18–20 | Analytics, traffic, revenue, notifications engine, settings, content — **Release R6** |
| **M7** | Hardening & launch | 21–22 | A11y, performance, security, backups, cutover — **Go live** |

---

## M0 · Setup & foundations — Week 1

**Goal:** a deployable empty shell that already looks like Al-Wahab.

| # | Task | Est |
|---|---|---|
| 0.1 | Create the GitHub repo; `create-next-app` (TS, App Router, Tailwind); ESLint + Prettier + strict tsconfig | 2 h |
| 0.2 | Port the existing Tailwind theme extension verbatim (gold, amber, cyan, navy, glass, animations) and `globals.css` | 3 h |
| 0.3 | Set up `next/font` for Space Grotesk, Manrope, Noto Nastaliq Urdu | 1 h |
| 0.4 | **Redraw the logo as SVG** from the supplied PNG → mark, horizontal, stacked, light + dark; generate favicon set and OG image | 5 h |
| 0.5 | Build `<Logo>` and `<LogoMark>` components matching the existing header lock-up geometry | 1 h |
| 0.6 | Create Supabase projects (staging + production); wire env vars; `supabase init`; local Docker stack running | 3 h |
| 0.7 | Connect Vercel to the repo; preview + production deployments green | 1 h |
| 0.8 | Install shadcn/ui, restyle Button / Input / Dialog / DropdownMenu / Tabs to the existing tokens | 4 h |
| 0.9 | Set up Sentry, Vitest, Playwright; one smoke test each | 3 h |
| 0.10 | **Capture baseline screenshots** of the current Netlify site (`/` and `/estimate` at 375 px and 1440 px) for later visual diffing | 1 h |
| 0.11 | Write `README.md` + `BACKLOG.md`; create the GitHub project board with all milestones as issues | 2 h |

**Done when:** `https://<preview>.vercel.app` renders a page with the new logo on the exact existing background, and `npm run test` + `npx playwright test` both pass.

---

## M1 · Rebrand & marketing site — Weeks 2–3 → **Release R1**

**Goal:** the public site, rebranded and recopied, faster and more findable than the original.

### Week 2 — components and content

| # | Task | Est |
|---|---|---|
| 1.1 | Port `Header`, `MobileNav`, `LangToggle`, `AmbientBlobs`, `Footer` from the captured HTML — no restyling | 5 h |
| 1.2 | Port `Hero` (incl. the tilt card), `Marquee`, value strip | 4 h |
| 1.3 | Port `HowItWorks`, `WhyUs` (6 cards), `SampleEstimate` receipt card | 5 h |
| 1.4 | Port `Reviews` (wired to a `reviews` query, hidden below 3 approved), `FAQAccordion`, final CTA + lead form | 5 h |
| 1.5 | Build the **About Al-Wahab** section replacing "For solar companies" (same layout, new content) | 3 h |
| 1.6 | Migration `00001_init`: `site_content`, `settings`, `leads`, `reviews`, `profiles`, `roles`, `permissions`, `role_permissions`, `user_roles` + RLS + seeds | 4 h |

### Week 3 — i18n, SEO, launch R1

| # | Task | Est |
|---|---|---|
| 1.7 | i18n provider, `en.json` + `ur.json` from the Copy Deck, language cookie, `/ur` route mirror | 6 h |
| 1.8 | RTL: swap directional utilities for logical properties; verify every marketing section mirrors correctly | 4 h |
| 1.9 | `/about`, `/faq`, `/contact`, `/privacy`, `/terms` pages | 5 h |
| 1.10 | Contact/lead form → server action → `leads` + confirmation email + admin alert; Turnstile + honeypot + rate limit | 4 h |
| 1.11 | SEO: metadata per route, OG/Twitter, JSON-LD (`LocalBusiness`, `FAQPage`, `Service`), `sitemap.xml`, `robots.txt` | 3 h |
| 1.12 | Analytics beacon `/api/track` + `visitor_sessions` / `page_views` tables | 3 h |
| 1.13 | Lighthouse pass (target ≥ 90/95/100 mobile); visual diff against the M0 baseline | 3 h |
| 1.14 | **Deploy R1** to production on a staging subdomain | 1 h |

**Done when:** a stakeholder can open the rebranded site on a phone in both English and Urdu, submit the lead form, and see the lead arrive in the database.
**Risk:** RTL mirroring is always fiddlier than expected — 1.8 has a full day of slack behind it.

---

## M2 · Estimator on the server — Weeks 4–6 → **Release R2**

**Goal:** the estimator produces real, server-priced, persisted, downloadable estimates.

### Week 4 — the engine (highest risk, done first)

| # | Task | Est |
|---|---|---|
| 2.1 | Migration: `rate_cards`, `rate_card_items`, `tiers`, `tariff_slabs`; seed from TDD §6 with the extracted rates | 4 h |
| 2.2 | `lib/pricing/sizing.ts` — goal sizing, roof-area cap, inverter stepping, battery sizing | 5 h |
| 2.3 | `lib/pricing/engine.ts` — line-item generation, tier multipliers, buffer, savings, payback, CO₂ | 6 h |
| 2.4 | **Vitest suite covering the 12 verification cases in TDD §6.5** — must all pass before anything else proceeds | 4 h |
| 2.5 | Migration: `estimates`, `estimate_inputs`, `estimate_line_items` + RLS + ref generator | 3 h |

### Week 5 — wizard and persistence

| # | Task | Est |
|---|---|---|
| 2.6 | Port the wizard shell: step frame, Roshni bubbles, `OptionCard`, collapsed summaries, progress, back navigation | 7 h |
| 2.7 | Port the sticky right rail with live updates and count-up animation | 4 h |
| 2.8 | Anonymous session cookie + `saveEstimateStep` autosave; refresh-safe resume | 4 h |
| 2.9 | `computeEstimate` server action; building animation; result card | 4 h |
| 2.10 | Port the full estimate page — all nine sections | 8 h |

### Week 6 — bill upload, tiers, PDF

| # | Task | Est |
|---|---|---|
| 2.11 | Storage bucket + signed upload; `FileDrop` with mobile camera capture | 3 h |
| 2.12 | `/api/ocr` — Vision integration, LESCO parsers, confidence scoring | 6 h |
| 2.13 | Confirm-and-edit step, low-confidence hint, failure fallback | 3 h |
| 2.14 | Tier comparison modal + `switchTier` re-pricing | 4 h |
| 2.15 | `@react-pdf/renderer` estimate document (branded) + `/api/pdf/estimate/[id]` | 6 h |
| 2.16 | "Email me this estimate" — Resend template with the PDF attached | 3 h |
| 2.17 | E2E: complete an estimate anonymously and download the PDF; **deploy R2** | 3 h |

**Done when:** an anonymous visitor can finish the wizard on a phone, get the same numbers the current site produces, refresh without losing anything, and receive the PDF by email.
**Risk:** OCR accuracy. Mitigation: the manual path is always one tap away, so a poor OCR week does not block the milestone.

---

## M3 · Accounts & dashboard — Weeks 7–10 → **Release R3**

### Week 7 — authentication

| # | Task | Est |
|---|---|---|
| 3.1 | Supabase Auth: email+password, verification, reset; `profiles` trigger on signup | 5 h |
| 3.2 | Phone OTP provider + `/verify` screen | 5 h |
| 3.3 | Google OAuth | 2 h |
| 3.4 | Port the split-screen auth design; pending-estimate chip; error states; rate limiting | 6 h |

### Week 8 — claiming and dashboard

| # | Task | Est |
|---|---|---|
| 3.5 | `claimEstimates` transaction + redirect flow from the estimator | 4 h |
| 3.6 | Middleware auth guard; signed-in header variant; account menu | 3 h |
| 3.7 | Port the dashboard: greeting, KPI tiles, card grid, empty state | 7 h |
| 3.8 | `/estimates` list with `FilterBar` + `DataTable` / card fallback | 6 h |

### Week 9 — actions and notifications

| # | Task | Est |
|---|---|---|
| 3.9 | Request-a-survey flow with preferred windows | 4 h |
| 3.10 | Migration: `notifications`, `notification_templates`; in-app centre + badge | 5 h |
| 3.11 | Email + SMS dispatch layer; the six launch-critical templates | 6 h |
| 3.12 | `/profile` — Profile, Security, Preferences, Data tabs | 6 h |

### Week 10 — polish and release

| # | Task | Est |
|---|---|---|
| 3.13 | Estimate expiry cron + "expiring in 3 days" nudge | 3 h |
| 3.14 | `/estimates/compare` (2–3 side by side) | 5 h |
| 3.15 | Data export + account deletion (soft, 30-day grace) | 4 h |
| 3.16 | E2E: sign up → claim → request survey; a11y pass; **deploy R3** | 6 h |

**Done when:** a real person can complete an estimate, register with a Pakistani phone number, find it in their dashboard, and request a survey — and Al-Wahab receives the alert.

---

## M4 · Projects — Weeks 11–13 → **Release R4**

| Week | # | Task | Est |
|---|---|---|---|
| 11 | 4.1 | Migration: `projects`, `project_phases`, `project_tasks`, `phase_templates`, `task_templates` + seeds (6/27) + RLS | 5 h |
| | 4.2 | Progress + status derivation triggers | 3 h |
| | 4.3 | `createProjectFromEstimate` (template copy, conditional net-metering phase) | 4 h |
| | 4.4 | `PhaseTracker` component — horizontal and vertical | 7 h |
| 12 | 4.5 | `/projects/[ref]` — header, tracker, updates timeline | 7 h |
| | 4.6 | Documents card + storage + signed downloads | 4 h |
| | 4.7 | Payments card (schedule, paid/due, totals) | 4 h |
| | 4.8 | Team card with call/WhatsApp deep links | 2 h |
| 13 | 4.9 | Accept / decline quotation flow | 4 h |
| | 4.10 | Reviews: submit form, moderation status, homepage wiring | 5 h |
| | 4.11 | Realtime push of project status to an open dashboard | 3 h |
| | 4.12 | Project notification templates; E2E; **deploy R4** | 5 h |

**Done when:** a project can be created from an estimate, advanced through all six phases, and the customer sees each change live with a notification.

---

## M5 · Admin core — Weeks 14–17 → **Release R5**

### Week 14 — shell, roles, audit

| # | Task | Est |
|---|---|---|
| 5.1 | Admin route group, middleware 404 guard, `AdminSidebar`, `AdminTopbar` | 6 h |
| 5.2 | `has_permission()` + `requirePermission()` + `RoleGuard`; seed the default permission matrix | 5 h |
| 5.3 | Migration: `audit_logs` (append-only, UPDATE/DELETE revoked) + `withAudit()` wrapper | 4 h |
| 5.4 | Migration: `activity_logs` + the logging helper wired into existing actions | 3 h |
| 5.5 | `/admin/roles` — permission matrix UI | 6 h |

### Week 15 — the reusable table stack

| # | Task | Est |
|---|---|---|
| 5.6 | `DataTable` (TanStack) — sorting, column visibility, density, selection, cursor pagination | 8 h |
| 5.7 | `FilterBar` — search, multi-select, date range, numeric range, URL serialisation, saved views | 8 h |
| 5.8 | `ExportMenu` + `/api/export` (CSV + PDF, filtered, audited, async over 5k rows) | 7 h |

### Week 16 — the management modules

| # | Task | Est |
|---|---|---|
| 5.9 | `/admin/users` list + detail + actions (suspend, verify, role, reset, impersonate, delete) | 9 h |
| 5.10 | `/admin/estimates` list + analytics strip + detail with the line-item editor and override audit | 9 h |
| 5.11 | `/admin/projects` list + board + detail tabs | 10 h |

### Week 17 — the rest of core

| # | Task | Est |
|---|---|---|
| 5.12 | `/admin/leads` (kanban + SLA) and `/admin/reviews` (moderation) | 6 h |
| 5.13 | `/admin/activity` with live mode | 4 h |
| 5.14 | `/admin/audit` with field-level diffs, views and the hash-chain job | 6 h |
| 5.15 | `CommandPalette` global search (⌘K) | 5 h |
| 5.16 | `/admin` dashboard v1 — KPI row + recent activity + needs-attention | 6 h |
| 5.17 | E2E: admin converts an estimate and exports CSV; **deploy R5** | 4 h |

**Done when:** Al-Wahab staff can run the entire sales-and-installation process from the admin panel, with every action audited.

---

## M6 · Admin insights & system — Weeks 18–20 → **Release R6**

| Week | # | Task | Est |
|---|---|---|---|
| 18 | 6.1 | `daily_metrics` rollup job (pg_cron) + backfill | 4 h |
| | 6.2 | `ChartCard` + the Recharts theme; accessible data-table companions | 5 h |
| | 6.3 | `/admin/analytics` — tiles, sources, devices, top pages, **estimator funnel & drop-off** | 9 h |
| | 6.4 | `/admin/dashboard` v2 — all six charts, period selector, deep links | 6 h |
| 19 | 6.5 | `/admin/traffic` — live counter, geography, heatmap, referrers, UTM builder | 8 h |
| | 6.6 | `/admin/revenue` — definitions, tiles, charts, ageing, targets, exports | 8 h |
| | 6.7 | Retention cohorts + active-user definitions (A-03) | 5 h |
| 20 | 6.8 | `/admin/pricing` — rate cards, live preview, activation, version diff | 8 h |
| | 6.9 | `/admin/settings` — all 12 tabs | 9 h |
| | 6.10 | `/admin/notifications` — inbox, rules engine, broadcast, template editor | 8 h |
| | 6.11 | `/admin/content` — CMS with EN/UR, preview, revalidation, version history | 6 h |
| | 6.12 | **Deploy R6** | 2 h |

**Done when:** the owner can answer "how did this month go?" without asking the developer, and can change a price without a deployment.

---

## M7 · Hardening & launch — Weeks 21–22

### Week 21 — quality

| # | Task | Est |
|---|---|---|
| 7.1 | Accessibility sweep: axe on 8 key screens, keyboard-only walkthrough, focus rings, ARIA on the wizard, contrast audit | 8 h |
| 7.2 | Performance: bundle analysis, dynamic imports for charts/PDF, image optimisation, Lighthouse ≥ 90/95/100 | 6 h |
| 7.3 | Security review against TDD §9: headers, CSP, RLS test suite, rate limits, secret audit, dependency audit | 7 h |
| 7.4 | **Visual regression against the M0 baseline** — confirm differences are confined to logo and copy | 3 h |
| 7.5 | Urdu review with a native speaker; fix RTL and typography issues | 5 h |

### Week 22 — launch

| # | Task | Est |
|---|---|---|
| 7.6 | Seed production: rate card from real supplier prices, tariff slabs, phase templates, company settings, staff accounts and roles | 5 h |
| 7.7 | Backup + restore rehearsal into a scratch project; document the runbook | 4 h |
| 7.8 | Load test: 200 concurrent estimator sessions; tune indexes | 4 h |
| 7.9 | Legal: Privacy Policy, Terms, estimate disclaimer, cookie notice | 4 h |
| 7.10 | Real-bill OCR validation with 10 actual LESCO bills; tune the parsers | 4 h |
| 7.11 | DNS cutover to `alwahabsolar.pk`; email domain SPF/DKIM/DMARC; keep Netlify reachable for one week | 3 h |
| 7.12 | Staff training session + a one-page admin cheat sheet | 4 h |
| 7.13 | Monitoring: uptime checks, Sentry alerts, weekly digest verified | 2 h |
| 7.14 | **Go live**, then a 48-hour watch window | — |

---

## 3. Dependency graph

```
M0 ──▶ M1 ──▶ M2 ──▶ M3 ──▶ M4 ──▶ M5 ──▶ M6 ──▶ M7
        │       │       │       │       │
        │       │       │       │       └─ needs projects to manage
        │       │       │       └───────── needs accounts to own projects
        │       │       └───────────────── needs persisted estimates to claim
        │       └───────────────────────── needs tokens + i18n
        └───────────────────────────────── needs the shell
```

Only two things can be parallelised if help ever becomes available: the **logo/SVG work (0.4)** and the **Urdu translation review (7.5)** — both are non-code and can run alongside anything.

---

## 4. Risk register

| Risk | P | Impact | Mitigation | Trigger to act |
|---|---|---|---|---|
| OCR accuracy on real bills is poor | High | Medium | Manual path always available; validate with 10 real bills in week 22; budget a week in the backlog for parser tuning | < 70% field accuracy in 7.10 |
| Milestone slippage from admin scope | Medium | High | M5/M6 split; anything not in the required 18 modules goes to the backlog | Two weeks behind at the end of M5 |
| SMS deliverability/cost in Pakistan | Medium | Medium | Email + Google always available; test two providers in week 7 | OTP delivery < 95% |
| RTL/Urdu layout breakage | Medium | Medium | Logical properties from day one; native review in week 21 | Any RTL bug found after M3 |
| Rate card goes stale post-launch | High | High | 30-day admin banner; validity stamped on every estimate | Card age > 30 days |
| Solo-developer illness/absence | Medium | High | Every milestone deployable; README and runbook current from week 1 | Any week lost |
| Visual drift from the original design | Medium | High | Baseline screenshots at M0, diff at 7.4, do-not-change checklist in the Design Spec | Any diff outside logo/copy |
| Supabase free-tier limits reached | Low | Medium | Monitor DB size and egress monthly; the paid tier is inexpensive | > 400 MB DB or > 80% egress |

---

## 5. Budget (indicative monthly running costs)

| Item | Cost |
|---|---|
| Vercel Pro (or Hobby at launch) | $0–20 |
| Supabase Pro (recommended from launch, for PITR backups) | $25 |
| Domain | ~$1 |
| Resend (up to 50k emails) | $0–20 |
| SMS OTP (~1,000/month) | $10–30 |
| Google Vision OCR (~1,000 pages) | ~$1.50 |
| Sentry | $0–26 |
| Plausible (or self-hosted Umami on Supabase) | $0–9 |
| Upstash Redis | $0–10 |
| **Total** | **≈ $40–140 / month** |

One-time: logo vectorisation (if outsourced), Urdu proofreading, legal review of the Privacy Policy and Terms.

---

## 6. Post-launch (first 90 days)

| Weeks | Focus |
|---|---|
| 1–2 | Watch Sentry and the funnel daily; fix whatever the first 100 real users break; tune OCR parsers on real bills |
| 3–4 | Act on the estimator drop-off chart — the step with the worst completion gets rewritten or removed |
| 5–8 | Backlog items: shareable estimate links, document vault, WhatsApp notification channel, blog for SEO |
| 9–12 | Evaluate v2.1: multi-city (Islamabad/Faisalabad via the existing `city` columns), commercial/industrial estimator mode, payment gateway |

**Standing weekly ritual (30 minutes, Friday):** review the funnel, review "needs attention", check the rate card's age, read the audit log's security view, triage the backlog.

---

## 7. Handover checklist (what must exist at go-live)

- [ ] `README.md` — local setup in under 10 minutes from a clean machine
- [ ] `RUNBOOK.md` — price updates, backup restore, incident response, provider dashboards
- [ ] `.env.example` complete, with a note on where each secret is issued
- [ ] All migrations in `supabase/migrations`, applied in order on a clean database
- [ ] `seed.sql` producing a demo-ready environment
- [ ] Admin cheat sheet (one page, printable, in English and Urdu)
- [ ] Credentials handed over in a password manager, not in chat
- [ ] Backup restore rehearsed and documented with a date
- [ ] Domain, DNS, email domain and analytics all under Al-Wahab's own accounts

---

*Companion documents: `01-PRD.md`, `02-Technical-Design-Document.md`, `03-Design-System-and-Screen-Specs.md`, `04-Information-Architecture-and-Flows.md`, `05-Admin-Panel-Spec.md`, `06-Content-Copy-Deck.md`.*
