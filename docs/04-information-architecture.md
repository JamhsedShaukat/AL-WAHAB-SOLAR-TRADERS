# Information Architecture & User Flows
## Al-Wahab Solar Traders v2.0

| | |
|---|---|
| **Document** | IA, route map, state machines, notification matrix |
| **Version** | 2.0 |
| **Date** | 29 July 2026 |
| **Purpose** | The connective tissue between the PRD, the technical design and the screen specs. Read this to understand how the pieces link up. |

---

## 1. Sitemap

```
alwahabsolar.pk
│
├── /                                Homepage
├── /about                           About Al-Wahab
├── /faq                             FAQ
├── /contact                         Contact + lead form
├── /privacy · /terms                Legal
├── /sitemap.xml · /robots.txt
│
├── /estimate                        Estimator wizard (public)
│   └── /estimate/[ref]              Full itemized estimate
│
├── /login · /signup                 Auth
│   ├── /verify                      OTP / email verification
│   └── /reset                       Password reset
│
├── /dashboard                       Customer home  ── auth required
├── /estimates                       My estimates
│   ├── /estimates/[ref]             (redirects to /estimate/[ref] in owner mode)
│   └── /estimates/compare           Side-by-side comparison
├── /projects/[ref]                  Project detail
│   └── /projects/[ref]/review       Leave a review
├── /notifications
├── /profile                         Profile · Security · Preferences · Data
│
├── /ur/**                           Urdu mirror of every public route
│
└── /admin                           Staff only — 404 for everyone else
    ├── /admin                       Dashboard overview
    ├── /admin/users → /admin/users/[id]
    ├── /admin/estimates → /admin/estimates/[ref]
    ├── /admin/projects → /admin/projects/[ref]        (list + board views)
    ├── /admin/leads
    ├── /admin/reviews
    ├── /admin/analytics
    ├── /admin/traffic
    ├── /admin/revenue
    ├── /admin/activity
    ├── /admin/notifications         Inbox · Rules · Broadcast
    ├── /admin/pricing               Rate cards · Tiers
    ├── /admin/content
    ├── /admin/roles
    ├── /admin/settings
    └── /admin/audit
```

**Navigation depth:** no customer-facing task requires more than three clicks from the homepage. Every admin record is reachable in two (search → record).

---

## 2. Primary navigation

| Surface | Items |
|---|---|
| Marketing header | Home · How it works · Why us · About · FAQ · [EN/اردو] · **Free estimate** |
| Marketing header (signed in) | Home · How it works · About · FAQ · [EN/اردو] · **New estimate** · avatar menu (Dashboard, My estimates, Profile, Log out) |
| Customer app | Dashboard · My estimates · Notifications (badge) · avatar menu |
| Footer col 1 (Product) | Get an estimate · How it works · Why us · FAQ |
| Footer col 2 (Company) | About Al-Wahab · Our warranty · Net metering guide · Contact |
| Footer col 3 (Contact) | Address · Email · Phone · WhatsApp |
| Admin sidebar | See `05-admin-panel.md` §1.1 |

---

## 3. Estimate state machine

```
                 ┌──────────┐
   start wizard  │  draft   │  (anonymous or authed; autosaved each step)
                 └────┬─────┘
                      │ all steps answered → engine runs
                 ┌────▼──────┐
                 │ completed │  result card shown; PDF + email available
                 └────┬──────┘
                      │ user registers / logs in and claims it
                 ┌────▼──────┐◄──────────── re-price ──────────┐
                 │   saved   │                                  │
                 └────┬──────┘                                  │
        ┌─────────────┼──────────────┐                          │
        │             │              │                          │
   book survey    14 days pass    delete                        │
        │             │              │                          │
┌───────▼──────────┐  │        ┌─────▼─────┐              ┌─────┴──────┐
│ survey_requested │  └───────▶│  expired  │─────────────▶│ new version│
└───────┬──────────┘           └───────────┘              └────────────┘
        │ engineer visits
┌───────▼──────┐
│   surveyed   │
└───────┬──────┘
        │ staff issues official quotation
┌───────▼──────┐        customer declines
│    quoted    │──────────────────────────▶ ┌──────────┐
└───────┬──────┘                            │ declined │ (reason recorded)
        │ customer accepts                  └──────────┘
┌───────▼──────┐
│   accepted   │
└───────┬──────┘
        │ staff converts
┌───────▼──────┐
│  converted   │  → a Project is created
└──────────────┘
```

**Rules**
- `draft` estimates older than 30 days with no completion are purged by cron.
- `expired` is reversible only by re-pricing, which creates version n+1 (`parent_id` = the original). History is never rewritten.
- Only `completed` or later can be claimed by an account.
- An estimate can be `converted` exactly once; the link is 1:1 with a project.

---

## 4. Project state machine

```
survey_requested → survey_scheduled → surveyed → quotation_issued → agreement_signed
   → procurement → installation → commissioning → net_metering* → handover → completed

  * skipped for off-grid systems

any state → on_hold (reason required) → returns to the prior state
any state → cancelled (reason required, terminal)
```

**Derivation rules**
- `progress_pct = completed_tasks / (total_tasks − skipped_tasks)`, recomputed by a database trigger on every task update.
- `status` is derived from the furthest phase that has at least one completed task, unless a staff member has pinned it manually.
- Entering `completed` sets `completed_at`, fires the review request 48 h later, and freezes the phase tracker.

### Default plan — 6 phases, 27 tasks

| # | Phase | Duration | Tasks |
|---|---|---|---|
| 1 | Site Survey & Design | 1–2 days | Site visit · Roof inspection · Load assessment · Final system design · Customer approval |
| 2 | Agreement & Procurement | 3–5 days | Agreement signing · Advance payment · Ordering panels, inverter, battery & structure · Delivery to site |
| 3 | Installation | 2–3 days | Mounting structure · Installing panels · Installing inverter & battery · DC/AC wiring · Earthing & protections |
| 4 | Testing & Commissioning | 1 day | System testing · Safety checks · Monitoring setup · Power-on |
| 5 | Net Metering *(on-grid / hybrid only)* | 4–8 weeks | LESCO application · Documentation · Technical inspection · Bi-directional meter installation · Approval |
| 6 | Handover | 1 day | Walkthrough · Warranty documents · Customer training · Final payment |

*(5 + 4 + 5 + 4 + 5 + 4 = 27 tasks.)*

---

## 5. User state machine

```
anonymous ──signup──▶ registered (unverified) ──verify──▶ active
                                                    │
                                    suspended ◀─────┤─────▶ dormant (no activity 30d)
                                        │
                              deleted (soft, 30-day grace) ──▶ anonymised
```

An unverified account may browse and keep estimates but cannot request a site survey.

---

## 6. Cross-cutting flow — anonymous estimate to project

```
┌─ VISITOR ────────────────────────────────────────────────────────────┐
│ / → "Get your free estimate" → /estimate                             │
│   cookie aw_anon issued (httpOnly, 30d)                              │
│   each answer → server action saveEstimateStep() → estimates(draft)  │
│   final answer → computeEstimate() → status=completed                │
│   result card → "View your full estimate" → /estimate/{ref}          │
└──────────────────────────────┬───────────────────────────────────────┘
                               │ "Save & book a free site survey"
┌─ AUTH ───────────────────────▼───────────────────────────────────────┐
│ /signup?claim={ref}  — pending-estimate chip shown                   │
│   phone OTP | email+password | Google                                │
│   on success → claimEstimates(anon_token, user_id) in a transaction  │
│   → estimates.status = saved, anon_token cleared, cookie cleared     │
└──────────────────────────────┬───────────────────────────────────────┘
                               │
┌─ CUSTOMER ───────────────────▼───────────────────────────────────────┐
│ /dashboard → estimate card → "Book a free site survey"               │
│   pick preferred date windows → status = survey_requested            │
│   notifications: customer (SMS+email), sales role (in-app+email)     │
└──────────────────────────────┬───────────────────────────────────────┘
                               │
┌─ STAFF ──────────────────────▼───────────────────────────────────────┐
│ /admin → "Needs attention" → /admin/estimates/{ref}                  │
│   assign owner → call customer → schedule survey                     │
│   after survey: adjust line items → "Issue official quotation"       │
│   → PDF generated, emailed; status = quoted                          │
└──────────────────────────────┬───────────────────────────────────────┘
                               │ customer accepts in /dashboard
┌─ STAFF ──────────────────────▼───────────────────────────────────────┐
│ "Convert to project" → project + phases + tasks created from         │
│   templates (Net Metering phase skipped for off-grid)                │
│   ops assigns crew → advances tasks → customer sees it live          │
│   completion → review request → approved review appears on /         │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 7. Notification matrix

| Event | Customer in-app | Customer email | Customer SMS | Staff |
|---|:--:|:--:|:--:|---|
| Account created | ✓ | ✓ welcome | – | – |
| Email verification | – | ✓ | – | – |
| Phone OTP | – | – | ✓ | – |
| Password reset | – | ✓ | – | – |
| Estimate saved | ✓ | ✓ + PDF | – | sales (in-app) |
| Estimate expiring in 3 days | ✓ | ✓ | – | – |
| Estimate expired | ✓ | – | – | – |
| Survey requested | ✓ | ✓ | ✓ | sales (in-app + email) |
| Survey scheduled | ✓ | ✓ | ✓ | ops (in-app) |
| Quotation issued | ✓ | ✓ + PDF | ✓ | – |
| Quotation accepted | ✓ | ✓ | – | sales + ops (in-app + email) |
| Project created | ✓ | ✓ | – | ops (in-app) |
| Phase completed | ✓ | ✓ | – | – |
| Net metering applied / approved | ✓ | ✓ | ✓ (approved only) | ops (in-app) |
| Project completed | ✓ | ✓ | ✓ | admin (in-app) |
| Review request (48 h after completion) | ✓ | ✓ | – | – |
| Review submitted | – | – | – | admin (in-app) |
| Payment due / overdue | ✓ | ✓ | ✓ (overdue only) | sales (in-app) |
| New lead from contact form | – | ✓ confirmation | – | sales (in-app + email) |
| Project stalled 14 days | – | – | – | admin (in-app) |
| Export ready | – | – | – | requester (in-app + email) |
| Weekly KPI digest | – | – | – | super admin (email) |

**Quiet hours:** no SMS between 22:00 and 08:00 PKT — queued and sent at 08:00. Configurable in Settings → Notifications.

---

## 8. Permission map by route

| Route pattern | Required |
|---|---|
| `/`, `/about`, `/faq`, `/contact`, `/privacy`, `/terms`, `/estimate*` | public |
| `/login`, `/signup`, `/verify`, `/reset` | public (redirect if authed) |
| `/dashboard`, `/estimates*`, `/projects*`, `/notifications`, `/profile` | authenticated, own records only (RLS) |
| `/admin` | `dashboard.view` |
| `/admin/users*` | `users.read` (+ `users.write` for mutations) |
| `/admin/estimates*` | `estimates.read` |
| `/admin/projects*` | `projects.read` |
| `/admin/revenue` | `revenue.view` |
| `/admin/analytics`, `/admin/traffic` | `analytics.view` / `traffic.view` |
| `/admin/activity` | `activity.view` |
| `/admin/audit` | `audit.view` |
| `/admin/roles` | `roles.manage` |
| `/admin/settings`, `/admin/pricing` | `settings.read` / `pricing.read` |
| `/api/export` | `export.csv` or `export.pdf` |

Unauthorised access to `/admin/**` returns **404**, never 403 — the existence of the surface is not disclosed.

---

## 9. Analytics event taxonomy

| Event | Properties |
|---|---|
| `page_view` | path, referrer, utm{}, device, locale |
| `estimate_started` | entry_method (bill / manual / sample) |
| `estimate_step_completed` | step_number, step_key, answer_summary, ms_on_step |
| `estimate_abandoned` | last_step, ms_total |
| `bill_uploaded` | file_type, size, ocr_confidence, ocr_success |
| `estimate_completed` | size_kwp, system_type, tier, value_mid, goal |
| `tier_switched` | from, to |
| `estimate_pdf_downloaded` | ref |
| `estimate_emailed` | ref |
| `account_created` | method (email / phone / google), had_pending_estimate |
| `estimate_claimed` | ref |
| `survey_requested` | ref, days_since_estimate |
| `quotation_accepted` | ref, value |
| `project_completed` | ref, value, days_total |
| `review_submitted` | rating |
| `lead_submitted` | source, bill_range |

These feed both the funnel in `/admin/analytics` and the `activity_logs` timeline.

---

## 10. URL and reference conventions

| Thing | Format | Example |
|---|---|---|
| Estimate ref | `AWS-YYMM-NNNN` | `AWS-2607-0421` |
| Project ref | `PRJ-YYMM-NNNN` | `PRJ-2607-0088` |
| Public estimate URL | `/estimate/{ref}` | `/estimate/AWS-2607-0421` |
| Shared read-only link | `/e/{token}` (22-char random, expires with validity) | `/e/8fJq2Lp...` |
| Admin deep link with filters | `/admin/estimates?status=saved&from=2026-07-01` | — |
| Urdu mirror | `/ur{path}` | `/ur/estimate` |

Refs are human-quotable over the phone — this matters, because most Lahore customers will call.

---

*Companion documents: `01-prd.md`, `02-technical-design.md`, `03-design-system.md`, `05-admin-panel.md`, `06-content-copy-deck.md`, `07-implementation-plan.md`.*
