# Admin Panel Specification
## Al-Wahab Solar Traders v2.0

| | |
|---|---|
| **Document** | Admin Panel — functional & UI specification |
| **Version** | 2.0 |
| **Date** | 29 July 2026 |
| **Base route** | `/admin` |
| **Design language** | Identical to the public site — see `03-Design-System-and-Screen-Specs.md` §2–§3. Dark navy, glass surfaces, gold accents, Space Grotesk + Manrope. |
| **Access** | Staff roles only. Non-staff requests to `/admin/**` return **404**, not 403. |

---

## 1. Shell

```
┌──────────┬────────────────────────────────────────────────────────────────┐
│          │  Topbar 64px — breadcrumbs · ⌘K search · bell · role · avatar  │
│ Sidebar  ├────────────────────────────────────────────────────────────────┤
│  260px   │                                                                │
│          │   Page title row  ·  primary action                            │
│  glass-  │   FilterBar                                                    │
│  strong  │   Stat grid / Chart grid / DataTable                           │
│          │   Pagination                                                   │
└──────────┴────────────────────────────────────────────────────────────────┘
```

### 1.1 Sidebar navigation

| Group | Item | Route | Permission |
|---|---|---|---|
| **Overview** | Dashboard | `/admin` | `dashboard.view` |
| **Manage** | Users | `/admin/users` | `users.read` |
| | Estimations | `/admin/estimates` | `estimates.read` |
| | Projects | `/admin/projects` | `projects.read` |
| | Leads | `/admin/leads` | `leads.read` |
| | Reviews | `/admin/reviews` | `reviews.moderate` |
| **Insights** | Analytics | `/admin/analytics` | `analytics.view` |
| | Visitor traffic | `/admin/traffic` | `traffic.view` |
| | Revenue | `/admin/revenue` | `revenue.view` |
| | Activity logs | `/admin/activity` | `activity.view` |
| **System** | Notifications | `/admin/notifications` | `notifications.send` |
| | Pricing | `/admin/pricing` | `pricing.read` |
| | Content | `/admin/content` | `content.write` |
| | Roles & permissions | `/admin/roles` | `roles.manage` |
| | Settings | `/admin/settings` | `settings.read` |
| | Audit logs | `/admin/audit` | `audit.view` |

Items the current role cannot access are **hidden**, not disabled. Sidebar collapses to a 72 px icon rail (state persisted). Active item: `bg-gold/10 text-gold border-l-2 border-gold`.

### 1.2 Topbar

Breadcrumbs (`Admin / Projects / PRJ-2607-0088`) · global search opened by `⌘K` / `Ctrl+K` · notification bell with unread dot → dropdown of the last 10 admin notifications · role badge (`Super Admin`, gold outline) · avatar menu (Profile, Switch theme *(dark only in v2)*, Documentation, Sign out).

**Impersonation banner:** when active, a full-width red bar sits above the topbar — "Viewing as {name} ({email}) — all actions are audited" + **Exit impersonation**.

### 1.3 Global conventions

- **Every list page** = `FilterBar` + `DataTable` + cursor pagination (25/50/100 per page) + `ExportMenu` (CSV / PDF).
- **Every detail page** = header summary strip → tab set → right-hand meta card → activity timeline at the foot.
- **Every destructive action** = confirmation dialog requiring the record's ref to be typed.
- **Every mutation** writes an `activity_logs` row and, when privileged, an `audit_logs` row with before/after values.
- **Saved views**: any filter combination can be named and pinned to the sidebar sub-nav.
- **Density toggle**: comfortable (52 px rows) / compact (40 px rows), persisted per user.
- **Empty, loading and error states** are specified once here and reused: skeleton rows while loading; `EmptyState` with a module-appropriate icon and a "Clear filters" action when a filter set returns nothing; an inline retry card on error.

---

## A-01 · Dashboard overview `/admin`

**Purpose:** the single screen the owner opens every morning.

### KPI row — eight `StatCard`s (2 cols mobile · 4 cols `lg`)

| Card | Value | Delta | Sparkline |
|---|---|---|---|
| Total users | `count(profiles where deleted_at is null)` | vs previous period | 30-day signups |
| Active users | distinct users with activity in the window | vs previous | 30-day DAU |
| Saved estimations | `count(estimates where status <> 'draft')` | vs previous | 30-day |
| Estimate value (pipeline) | `Σ price_high` of open estimates | vs previous | — |
| Projects | `count(projects)` split live: n active / n completed | vs previous | 30-day |
| Revenue booked | `Σ contract_value` of signed projects | vs previous, vs monthly target | 12-month bars |
| Revenue collected | `Σ collected_pkr` | outstanding shown beneath | — |
| Website visitors | `daily_metrics.visitors` over the window | vs previous | 30-day |

Period selector in the page header: **Today · 7d · 30d (default) · 90d · 12m · Custom**. All cards, charts and the funnel respond to it.

### Charts (2-up on `lg`)

1. **Estimates & signups over time** — dual-line area chart (estimates gold, signups cyan) with a period-appropriate granularity (hour / day / week / month).
2. **Conversion funnel** — horizontal bars with drop-off percentages: Visitors → Estimator started → Estimator completed → Account created → Estimate saved → Survey requested → Project signed → Completed.
3. **Revenue by month** — stacked bars: booked / invoiced / collected, with a dashed target line.
4. **System mix** — donut by system type (On-grid / Hybrid / Off-grid) and a second donut by tier.
5. **Average system size & value** — dual-axis line.
6. **Top areas** — horizontal bar of the top 8 Lahore areas by estimate count.

### Lower row

- **Recent activity** — the last 15 `activity_logs` entries in a `Timeline`, with a "View all" link.
- **Needs attention** — an alert list, each row linking to the record:
  - New survey requests unassigned for > 24 h *(gold)*
  - Estimates expiring within 3 days *(gold)*
  - Projects with no status change in 14 days *(amber)*
  - Overdue payments *(red)*
  - Reviews awaiting moderation *(cyan)*
  - Rate card not updated in 30+ days *(amber)*
- **Live now** — realtime visitor count and the active pages list (Supabase Realtime).

### Interaction
Every KPI card is clickable and deep-links to its module with the matching filter pre-applied. `?from=&to=` is reflected in the URL so a view can be shared.

---

## A-02 · Total users

Surfaced on the dashboard and expanded at `/admin/users?view=analytics`.

- Total registered · verified vs unverified · with at least one estimate · with at least one project.
- Growth chart with cumulative and net-new series.
- Acquisition source breakdown (organic / direct / referral / paid / WhatsApp / walk-in), from `profiles.source` and `utm`.
- Signup method split (email / phone OTP / Google).
- New vs returning users over the window.
- Geographic split by Lahore area/town.
- CSV export of the underlying rows.

---

## A-03 · Active users

- **Definition is configurable** in Settings → Analytics: default "signed in or performed any tracked action".
- DAU / WAU / MAU tiles plus the DAU-to-MAU stickiness ratio.
- Retention cohort grid: signup week × weeks 0–7, cells shaded from `gold/10` to `gold/70`, percentage labels.
- Activity heatmap: hour of day × day of week, showing when Lahore users actually engage (informs when to schedule campaigns).
- Dormant list: registered > 30 days ago, no activity in 30 days → one-click "Send re-engagement notification".

---

## A-04 · Projects `/admin/projects`

### List view
Columns: **Ref · Customer · Title (size + type) · Area · Status · Contract value · Progress · Sales owner · Crew lead · Survey date · Updated · Actions**.
Filters: status (multi), date range (created / updated / completion), size band, system type, tier, area, sales owner, crew lead, value range, overdue-payment flag.
Bulk actions: assign owner, change status, export.

### Board view *(toggle in the page header)*
Kanban by status — Survey requested · Scheduled · Surveyed · Quotation issued · Agreement signed · Procurement · Installation · Commissioning · Net metering · Handover · Completed. Cards are drag-and-drop between columns (each drop writes an audit entry and fires the customer notification). Column headers show count and total value.

### Detail `/admin/projects/[ref]`
Header strip: title, `StatusChip`, ref, customer with call/WhatsApp buttons, contract value, progress ring, primary action.
Tabs:

| Tab | Contents |
|---|---|
| **Overview** | System specs, address with a map pin, key dates, linked estimate, internal notes (staff-only, rich text) |
| **Phases & tasks** | Editable `PhaseTracker`: reorder, add/remove tasks, set status/assignee/due date, bulk-complete a phase. Progress recomputes live. |
| **Team** | Assign sales owner and crew lead; add crew members |
| **Documents** | Upload agreement, invoices, warranty certificates, net-metering approval, site photos. Per-file toggle "visible to customer". |
| **Payments** | Schedule rows (label, amount, due date, paid date, method, reference) with totals for contracted / invoiced / collected / outstanding; "Record payment" dialog |
| **Updates** | Compose a customer-visible update with optional photo → publishes to the customer timeline and notifies them |
| **Activity** | Full `activity_logs` timeline for this project |

Actions: change status · assign · reschedule survey · put on hold (reason required) · cancel (reason required) · export project PDF summary.

---

## A-05 · Saved estimations `/admin/estimates`

### List
Columns: **Ref · Customer (or "Guest") · Size · Type · Tier · Area · Price range · Monthly saving · Payback · Status · Valid until · Source · Created · Actions**.
Filters: status, tier, system type, size band, value band, area, date range, validity (valid / expiring ≤ 3 d / expired), has bill upload, converted or not, UTM source, assigned owner.
Row actions: View · Download PDF · Re-price · Convert to project · Assign owner · Mark won / lost (reason) · Email to customer · Delete *(soft)*.
Bulk: assign, export, send "expiring soon" nudge.

### Analytics strip above the table
Total estimations · average system size · average value · tier mix (Economy/Standard/Premium %) · completion rate (started → completed) · save rate (completed → saved) · conversion rate (saved → project) · median time from estimate to survey request.

### Detail `/admin/estimates/[ref]`
Left: the customer-facing estimate rendered read-only (same components as the public page).
Right: staff panel —
- **Inputs** — every wizard answer, with the uploaded bill thumbnail and OCR confidence; "View original bill" (signed URL, download audited).
- **Line-item editor** — inline-editable amounts. Any edit sets `is_override`, records who and when, and shows an amber "Adjusted by {name}" badge on the line. Subtotal and range recompute live. Requires `estimates.override_price`.
- **Rate card used** — version + effective date, with a "Re-price on current card" button that creates version n+1 and preserves the original.
- **Actions** — Issue official quotation (locks the version, generates the PDF, emails the customer) · Convert to project · Mark lost with a reason picker (price / competitor / postponed / unreachable / not qualified / other) · Add internal note.
- **Timeline** — created, viewed, PDF downloaded, tier switched, survey requested, quotation issued, accepted.

---

## A-06 · Revenue `/admin/revenue`

Permission: `revenue.view` (Super Admin, Admin, Sales lead, Viewer).

**Definitions — stated on the page so numbers are never ambiguous:**
- **Pipeline** — Σ mid-point value of open estimates (not yet won or lost).
- **Booked** — Σ `contract_value_pkr` of projects with status ≥ `agreement_signed`.
- **Invoiced** — Σ `invoiced_pkr`.
- **Collected** — Σ `collected_pkr`.
- **Outstanding** — invoiced − collected.

Tiles: Pipeline · Booked · Invoiced · Collected · Outstanding · Average contract value · Win rate · Target attainment.
Charts: monthly booked vs collected vs target (12 months) · revenue by system type · revenue by tier · revenue by area · cumulative year-to-date against target · payment ageing buckets (0–30 / 31–60 / 61–90 / 90+ days).
Tables: top projects by value; overdue payments with a "Send reminder" action.
Settings: monthly and annual revenue targets, fiscal-year start.
Export: full revenue report as CSV and as a branded PDF.

---

## A-07 · Website analytics `/admin/analytics`

Powered by the first-party `visitor_sessions` / `page_views` / `daily_metrics` tables, with an optional embedded Plausible view.

Tiles: Sessions · Unique visitors · Pageviews · Pages per session · Average session duration · Bounce rate · New vs returning · Estimator start rate.
Charts: sessions over time (with a compare-to-previous-period overlay) · traffic sources (donut: organic / direct / referral / social / paid / WhatsApp) · devices (mobile / tablet / desktop) · browsers · OS · language preference (EN vs UR).
Tables: **Top pages** (path, views, unique, avg time, bounce, estimator starts attributed) · **Top referrers** · **Top landing pages** · **Top exit pages** · **UTM campaign performance** (source/medium/campaign → sessions, estimates, accounts, projects, revenue).
**Funnel & drop-off:** per estimator step — how many reached step n, how many abandoned there. This is the single most actionable chart in the module; it shows exactly which question loses people.
Real-time strip: visitors in the last 5 minutes, current pages, live event feed.

---

## A-08 · Visitor traffic `/admin/traffic`

Complements A-07 with the "who and where" view.

- Live visitor counter (Realtime) and a rolling 30-minute sparkline.
- Geography: Pakistan map with per-city bubbles, drilling into Lahore areas; table of city / sessions / conversion.
- Traffic by hour-of-day × day-of-week heatmap.
- Referrer detail with full URLs.
- Campaign builder: a small UTM link generator so staff can tag WhatsApp broadcasts and flyers, plus a table of generated links and their performance.
- Bot/spam filtering toggle and an IP exclusion list (staff office IPs).
- Retention: raw `page_views` kept 12 months, then rolled up.

---

## A-09 · User management `/admin/users`

### List
Columns: **Avatar + name · Email · Phone · Role · Status · Estimates · Projects · Lifetime value · Source · Verified · Last seen · Joined · Actions**.
Filters: role, status (active / suspended / deleted), verification, has estimates, has projects, source, city/area, date joined, last seen.
Search: name, email, phone, estimate ref, project ref.
Bulk: assign role, suspend, send notification, export.

### Detail `/admin/users/[id]`
Header: avatar, name, contact chips with call/WhatsApp/email actions, role badge, status, joined, last seen.
Tabs: **Overview** (profile fields, language, source, UTM at signup, marketing consent) · **Estimates** (their list) · **Projects** (their list) · **Activity** (their `activity_logs`) · **Notifications** (what was sent, delivery status) · **Notes** (staff-only).
Actions: Edit profile · Assign / change role *(`users.write`)* · Verify email or phone manually · Reset password (sends a link — staff never see or set a password) · Suspend / reactivate (reason required) · **Impersonate** *(`users.impersonate`, super admin only — banner + full audit)* · Delete *(soft; 30-day grace then anonymisation; `users.delete`)* · Export this user's data (JSON, audited).

**Guardrails:** a user cannot change their own role; the last remaining super admin cannot be suspended, demoted or deleted; staff accounts require 2FA before they can be granted `admin` or above.

---

## A-10 · Project management
See **A-04** — list, board and detail are the project-management surface.

## A-11 · Estimation management
See **A-05** — list, analytics strip and detail with the line-item editor.

---

## A-12 · Activity logs `/admin/activity`

Human-readable, chronological feed of everything that happens across the product — the "what is going on right now" view. (Distinct from A-18 Audit logs, which is the forensic, immutable record with before/after values.)

Row anatomy: actor avatar + name (or "Guest · {anon id}") → action sentence ("completed an 8 kWp Hybrid estimate", "requested a site survey", "advanced *Installation* to *Testing & Commissioning*") → entity link → relative timestamp → device/IP on hover.
Filters: actor, actor type (customer / staff / system), action type, entity type, entity id, date range.
Grouping: Today / Yesterday / This week / Earlier, with sticky date headers.
Live mode toggle: new entries stream in at the top (Realtime).
Export: CSV / PDF of the filtered set.
Retention: 24 months, then rolled into `daily_metrics` and purged.

**Tracked actions (minimum set):**
`user.signed_up · user.logged_in · user.logged_out · user.profile_updated · user.suspended · user.impersonated`
`estimate.started · estimate.step_completed · estimate.completed · estimate.saved · estimate.tier_switched · estimate.pdf_downloaded · estimate.emailed · estimate.expired · estimate.repriced · estimate.line_item_overridden · estimate.quotation_issued · estimate.converted · estimate.marked_lost`
`survey.requested · survey.scheduled · survey.completed`
`project.created · project.status_changed · project.assigned · project.task_completed · project.document_uploaded · project.payment_recorded · project.update_posted · project.completed · project.cancelled`
`review.submitted · review.approved · review.rejected`
`lead.created · lead.assigned · lead.status_changed`
`admin.setting_changed · admin.rate_card_activated · admin.role_changed · admin.export_generated · admin.notification_broadcast`

---

## A-13 · Search & filters

**Global search (`⌘K`)** — a single input searching across users (name, email, phone), estimates (ref, customer, area), projects (ref, title, address), leads, settings pages and admin actions ("Create rate card", "Export users"). Results are grouped by type with the matched substring highlighted in gold; arrow keys navigate, Enter opens. Recent searches are remembered per user.

**Per-module filters** — every list carries a `FilterBar` implementing:
- Free-text search (debounced 300 ms, server-side, uses the GIN index)
- Multi-select enums (status, tier, role, system type, area)
- Date ranges with presets (Today, Last 7/30/90 days, This month, Last month, This year, Custom)
- Numeric ranges (value, system size) as dual-handle sliders with numeric inputs
- Boolean toggles (verified, has bill, converted, overdue)
- Owner/assignee pickers with avatars

**Behaviour:** filters serialise to the URL query string (shareable and bookmarkable); active filters appear as removable gold chips; "Clear all" resets; a filter set can be saved as a named view (private or shared with a role) and pinned to the sidebar. Results counts are shown as "Showing 25 of 1,284".

---

## A-14 · Export (CSV / PDF) `ExportMenu`

Available on every list and report.

| Aspect | Behaviour |
|---|---|
| Scope | **Current filters** (default) · Selected rows · All records |
| Columns | Column picker with a saved default per module |
| CSV | UTF-8 with BOM (so Excel renders Urdu correctly), comma-delimited, ISO dates, unformatted numeric columns for pivoting |
| PDF | Branded landscape report — logo header, report title, applied-filter summary, generated-by and timestamp, table with zebra rows, page numbers, "Shine On!" footer |
| Large sets | > 5,000 rows → generated asynchronously; a notification with a signed download link (valid 24 h) arrives when ready |
| Limit | Hard cap 50,000 rows per export |
| PII | The `viewer` role's exports have email and phone columns masked (`ali****@gmail.com`, `+92 3•• ••• ••42`) |
| Audit | Every export writes an `audit_logs` entry: module, format, filter JSON, column list, row count, actor |

**Report presets:** Monthly business review (PDF) · User list (CSV) · Estimation register (CSV) · Project register (CSV) · Revenue & collections (CSV + PDF) · Traffic summary (PDF) · Audit extract (CSV).

---

## A-15 · Settings `/admin/settings`

Tabbed. Every change writes an audit entry with before/after.

| Tab | Contents |
|---|---|
| **Company** | Legal name, trading name, logo upload (all three lock-ups), address, city, service areas, phone, WhatsApp, email, business hours, NTN/STRN, social links |
| **Branding** | Favicon, OG image, email header colour, PDF cover text, strapline ("Shine On!") |
| **Estimator** | Estimate validity days (default 14) · market buffer % (6) · yield units/kWp/month (100) · reduce-bill factor (0.65) · sq ft per kWp (70) · CO₂ kg/kWp/year (1015) · size step (0.5 kW) · battery DoD (0.90) · battery module kWh (2.5) · inverter step list · enable/disable "Fit a budget" · enable/disable bill upload |
| **Pricing** | Link to A-19 (rate cards) and tier definitions with their multipliers and spec text |
| **Tariffs** | LESCO slab table — units from/to and PKR/unit, effective date, single vs three phase |
| **Phases & tasks template** | The default 6-phase / 27-task plan: add, rename (EN + UR), reorder, set duration labels and conditional rules |
| **Notifications** | Per-event channel matrix (in-app / email / SMS) and template editor — see A-17 |
| **Integrations** | Email provider + sending domain, SMS provider + sender ID, OCR provider + quota, Google OAuth, analytics domain, Sentry DSN, WhatsApp Business number. Keys are write-only (shown masked) with a "Test connection" button each. |
| **Localisation** | Default language, enabled languages, currency, number format, timezone (Asia/Karachi), date format |
| **Security** | Session lifetime, force 2FA for staff roles, password policy, IP allowlist for `/admin`, failed-login lockout threshold |
| **Data & retention** | Bill retention (24 months), page_views retention (12 months), activity retention (24 months), audit retention (7 years, non-purgeable), backup schedule display, "Download full backup" |
| **Feature flags** | Bill upload · Budget mode · Reviews · Compare estimates · PWA install prompt · Maintenance mode (with a custom message) |
| **Legal** | Privacy Policy and Terms editors (versioned, with an effective date and a "require re-acceptance" toggle) |

---

## A-16 · Role management `/admin/roles`

**System roles** (not deletable): `super_admin`, `admin`, `sales`, `operations`, `viewer`, `customer`.
**Custom roles**: create, clone from an existing role, rename, delete (blocked while users are assigned).

**Permission matrix** — the main surface. Rows are permissions grouped by module; columns are roles; cells are gold checkboxes. System-role columns are locked with a tooltip. Bulk actions: select a whole module row-group to grant/revoke across a role. A "Compare roles" mode shows two roles side by side with differences highlighted.

**Per-role panel:** description, member count with an avatar stack, "View members", a plain-English summary of what the role can do (auto-generated from its permissions), and an audit trail of permission changes.

**Guardrails:** `roles.manage` is super-admin only; a role cannot be granted a permission the editing user does not hold; removing the last `roles.manage` holder is blocked; every change writes an audit entry naming the permission, the role and the actor.

**Default matrix**

| Permission group | super_admin | admin | sales | operations | viewer |
|---|:--:|:--:|:--:|:--:|:--:|
| dashboard.view | ✓ | ✓ | ✓ | ✓ | ✓ |
| users.read | ✓ | ✓ | ✓ | ✓ | ✓ |
| users.write | ✓ | ✓ | – | – | – |
| users.suspend | ✓ | ✓ | – | – | – |
| users.impersonate | ✓ | – | – | – | – |
| users.delete | ✓ | – | – | – | – |
| estimates.read | ✓ | ✓ | ✓ | ✓ | ✓ |
| estimates.write | ✓ | ✓ | ✓ | – | – |
| estimates.override_price | ✓ | ✓ | ✓ | – | – |
| estimates.convert | ✓ | ✓ | ✓ | – | – |
| estimates.delete | ✓ | ✓ | – | – | – |
| projects.read | ✓ | ✓ | ✓ | ✓ | ✓ |
| projects.write | ✓ | ✓ | ✓ | ✓ | – |
| projects.assign | ✓ | ✓ | ✓ | ✓ | – |
| projects.delete | ✓ | ✓ | – | – | – |
| payments.read | ✓ | ✓ | ✓ | – | ✓ |
| payments.write | ✓ | ✓ | – | ✓ | – |
| leads.read / leads.write | ✓ | ✓ | ✓ | – | read |
| reviews.moderate | ✓ | ✓ | ✓ | – | – |
| analytics.view / traffic.view | ✓ | ✓ | ✓ | – | ✓ |
| revenue.view | ✓ | ✓ | ✓ | – | ✓ |
| activity.view | ✓ | ✓ | ✓ | ✓ | ✓ |
| audit.view | ✓ | ✓ | – | – | – |
| export.csv / export.pdf | ✓ | ✓ | ✓ | ✓ | ✓ (masked) |
| pricing.read | ✓ | ✓ | ✓ | ✓ | ✓ |
| pricing.write | ✓ | – | – | – | – |
| content.write | ✓ | ✓ | – | – | – |
| notifications.send | ✓ | ✓ | – | – | – |
| settings.read | ✓ | ✓ | – | – | ✓ |
| settings.write | ✓ | – | – | – | – |
| roles.manage | ✓ | – | – | – | – |

---

## A-17 · Notifications `/admin/notifications`

Three tabs.

**1. Inbox** — the admin's own notification feed (new estimate, new survey request, project stalled, payment overdue, review submitted, export ready, system alert). Filter by type, mark read, bulk clear.

**2. Rules** — an event → channel → audience matrix. For each event (`estimate.saved`, `survey.requested`, `quotation.issued`, `project.status_changed`, `payment.due`, `estimate.expiring`, `review.submitted`, `user.signed_up`) configure: enabled, channels (in-app / email / SMS), audience (the customer / assigned staff / a role / specific users), delay (immediate or n hours), and quiet hours (default: no SMS between 22:00 and 08:00 PKT).

**3. Broadcast** — compose a message to a filtered audience (e.g. "users with a saved estimate expiring this week"). Fields: audience filter with a live recipient count, channel selection, EN and UR bodies, optional CTA link, schedule now/later, test-send to self. Requires `notifications.send`. Every broadcast is audited and its delivery/open stats are recorded.

**Template editor** — per template: subject, body with `{{variables}}` (a helper lists the available ones), EN and UR versions, SMS variant with a character counter and segment estimate, live preview in the email frame, "Send test".

---

## A-18 · Audit logs `/admin/audit`

The forensic record. **Append-only** — `UPDATE` and `DELETE` are revoked at the database level for every role including service. Retention 7 years, not purgeable from the UI.

Row: timestamp (absolute, `Asia/Karachi`) · actor (name, email, role; `impersonated_by` if applicable) · action (`INSERT` / `UPDATE` / `DELETE` / `LOGIN` / `LOGIN_FAILED` / `IMPERSONATE` / `EXPORT` / `PERMISSION_CHANGE` / `SETTING_CHANGE`) · table · record id (linked) · changed fields · IP · user agent · request id.
Expanding a row shows a **field-level diff** — old value struck through in red, new value in emerald, unchanged fields hidden by default.

Filters: date range, actor, role, action type, table, record id, IP, "privileged only", "failed only".
Views: **All** · **Security** (logins, failures, permission and role changes, impersonation) · **Data changes** · **Exports**.
Export: CSV / PDF, itself audited.
Integrity: a monthly job writes a hash chain (`sha256(previous_hash || row)`) into a `audit_checkpoints` table so tampering is detectable.

---

## A-19 · Pricing & rate cards `/admin/pricing`

*Not in the original numbered list, but the platform cannot function without it — prices must be editable without a deployment.*

- **Rate cards list**: version, label, city, effective from/to, active flag, created by, and a count of estimates issued on it.
- **Editor**: per line item — code, EN/UR label, basis (per kWp / per kW AC / per kWh battery / flat / per sq ft / %), unit rate, sort order, conditional rule. A **live preview panel** re-prices a reference 8 kWp Hybrid system as the rates are typed, so the impact is visible before saving.
- **Tiers**: name, tagline, multiplier, spec text per component (EN/UR), warranty note, default flag.
- **Workflow**: duplicate the active card → edit → set `effective_from` → **Activate** (confirmation dialog stating how many open estimates will be affected). Activation is atomic, audited, and never rewrites issued estimates — those keep their `rate_card_id`.
- **History**: diff any two versions side by side, with the percentage change per line item.
- **Reminder**: if the active card is older than 30 days, a persistent gold banner appears on the admin dashboard.
- Permission: `pricing.write` — **super admin only**.

---

## A-20 · Content management `/admin/content`

Edits `site_content` so marketing copy changes without a deploy.
Editable: hero eyebrow / headline / lede / CTA labels · the four value-strip cards · the four how-it-works steps · the six why-us cards · the sample-estimate figures · the About section · FAQ items (add/reorder/delete) · footer contact block · the mobile sticky-bar text · SEO title/description/OG per page.
Every field has EN and UR inputs side by side. A "Preview" button opens the public page with draft content via a preview cookie. Publishing triggers ISR revalidation and writes an audit entry. Version history with one-click revert.

## A-21 · Reviews moderation `/admin/reviews`

List of submitted reviews: customer, project, rating, body, submitted date, status. Actions: approve (publishes to the homepage), reject with a reason (notifies nobody), edit for typos only (edit is audited and flagged), feature/unfeature. Filters by rating and status. A guard prevents publishing more than 12 reviews on the homepage carousel.

## A-22 · Leads `/admin/leads`

Kanban and list of contact-form and callback submissions: New → Contacted → Qualified → Converted → Lost. Card shows name, phone (click-to-call and WhatsApp), area, bill range, source and age. Assign an owner, set a follow-up reminder, log a call outcome, convert to a user account or link to an existing one. SLA indicator turns amber at 4 h and red at 24 h without contact.

---

## 2. Responsive behaviour

| Width | Behaviour |
|---|---|
| ≥ 1280 | Full sidebar, multi-column stat grids, full tables |
| 1024–1279 | Sidebar collapses to the icon rail; tables scroll horizontally with a sticky first column |
| 768–1023 | Sidebar becomes an overlay drawer; tables become stacked record cards; charts full width |
| < 768 | Read-and-triage mode: dashboard, lists as cards, detail pages and status changes work; bulk editing and the permission matrix show a "Best viewed on a larger screen" notice |

---

## 3. Admin acceptance criteria

1. All 18 numbered modules from the brief are present, reachable and functional against real data.
2. Every module respects the permission matrix; a `sales` user cannot see Settings, Roles or Audit, and the routes 404 for them.
3. Every list exports to CSV and PDF honouring the active filters, and the export is audited.
4. Every privileged mutation produces an `audit_logs` row with actor, IP, before and after values.
5. `audit_logs` cannot be updated or deleted through the application or a direct client connection.
6. The dashboard loads in under 2 s with 12 months of seeded data (verified against `daily_metrics`).
7. Global `⌘K` search returns results across users, estimates and projects in under 500 ms.
8. Impersonation shows a persistent banner, is limited to super admin, and logs both start and end.
9. Filters serialise to the URL; pasting a filtered URL into another admin's browser reproduces the same view.
10. The admin panel is visually indistinguishable in language from the public site — same tokens, same glass, same gold.

---

*Companion documents: `01-PRD.md`, `02-Technical-Design-Document.md`, `03-Design-System-and-Screen-Specs.md`, `04-Information-Architecture-and-Flows.md`, `06-Content-Copy-Deck.md`, `07-Implementation-Plan.md`.*
