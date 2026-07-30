# Product Requirements Document (PRD)
## Al-Wahab Solar Traders — Solar Estimator & Customer Portal

| | |
|---|---|
| **Document** | Product Requirements Document |
| **Product** | Al-Wahab Solar Traders web platform (v2.0) |
| **Version** | 2.0 — Rebrand + Accounts + Admin Panel |
| **Date** | 29 July 2026 |
| **Owner** | Al-Wahab Solar Traders |
| **Author / Build team** | Solo developer |
| **Status** | Approved for build |
| **Baseline analysed** | `https://6a2d2b4aea01c5eca145e4d2--aesthetic-sprinkles-c49f96.netlify.app/index.html` + 15 captured screen snapshots |

---

## 1. Executive summary

Al-Wahab Solar Traders currently has a **static, front-end-only marketing site** built as a React + Tailwind single-page application. It contains a genuinely strong asset: a 7–8 step conversational solar estimator ("Roshni") that produces a fully itemized, tier-comparable solar quotation for Lahore homes, priced on local market rates.

Everything the estimator produces today is **thrown away**. There is no account system, no persistence, no CRM, no analytics, and no way for Al-Wahab to see who used the tool or what they were quoted. The site is also positioned as a *neutral marketplace* connecting homeowners to third-party "verified installers" — which does not reflect the actual business.

**Version 2.0 does four things:**

1. **Rebrands** the product to the official Al-Wahab Solar Traders identity (new logo, refined navy/gold palette, "Shine On!" tagline) — *without altering the existing visual language, layout, or look and feel*.
2. **Repositions** the product from a third-party marketplace to **Al-Wahab Solar Traders as the direct supplier and installer**. The estimator becomes Al-Wahab's own instant-quotation and lead-generation engine; "compare verified companies" becomes "get your official Al-Wahab quotation and book a free site survey."
3. **Adds accounts and persistence** — homeowners register, save estimates, convert them into projects, and track their installation through a personal dashboard.
4. **Adds a complete Admin Panel** so Al-Wahab staff can run the business from the platform: users, projects, estimations, revenue, analytics, roles, notifications, exports, and audit logs.

**Non-goal, explicitly stated:** the visual design and look-and-feel of the existing website must not change. All new surfaces extend the existing dark-glass / navy-and-gold design language rather than replacing it.

---

## 2. Analysis of the existing product (as-is)

### 2.1 Technology observed

| Aspect | Finding |
|---|---|
| Rendering | Client-side React SPA (no server rendering; page source contains only `<title>` + viewport, body is JS-rendered) |
| Styling | Tailwind CSS, compiled, with a custom theme extension |
| Icons | `lucide-react` (classes such as `lucide lucide-sun`, `lucide lucide-zap`) |
| Fonts | **Space Grotesk** (display) + **Manrope** (body), loaded from Google Fonts |
| Hosting | Netlify (deploy-preview URL, static bundle + `styles.css`) |
| Backend | **None.** No API calls, no auth, no database. All state is in-memory and lost on refresh. |
| i18n | EN / اردو toggle present in the UI, wired to a language switcher; Urdu content not fully populated |
| Persistence | None. "Save your estimate", "Sign in", "Your projects" screens are static mock-ups with hard-coded sample data |

### 2.2 Design tokens observed (to be preserved)

```
Background   radial-gradient(1200px 800px at 70% -10%, rgba(255,184,0,0.10), transparent 60%) fixed,
             radial-gradient(900px 700px at 10% 20%, rgba(0,229,255,0.06), transparent 55%),
             linear-gradient(#0A0F1E 0%, #070B16 45%, #05080F 100%)
Body text    #E7ECF5
gold         #FFB800          amber        #FF8C00
cyan         #00E5FF          navy-900     #0A0F1E     navy-950  #05080F
.glass          background rgba(255,255,255,0.035); border 1px rgba(255,255,255,0.09); backdrop-filter blur(14px)
.glass-strong   background rgba(13,20,38,0.55);     border 1px rgba(255,255,255,0.10); backdrop-filter blur(20px) saturate(140%)
Radii        rounded-xl (12px) controls · rounded-2xl (16px) cards · rounded-full pills
Primary CTA  bg-gradient-to-r from-gold to-amber, text-navy-950, shadow 0 10px 30px -8px rgba(255,140,0,0.55), animate-glow
Container    max-w-[1200px], px-6 sm:px-10
```

### 2.3 Screens that exist today (15 captured)

| # | Screen | Route (implied) | State |
|---|---|---|---|
| 1 | Marketing landing page | `/` | Complete — hero, trust marquee, 4-step "How it works", 6-card "Why us", sample itemized estimate, reviews, "For companies", FAQ accordion, lead form, footer |
| 2 | Estimator — entry | `/estimate` | Roshni intro; choose **Upload bill** / **Answer questions** / **Use a sample bill** |
| 3 | Estimator — Step 1 | `/estimate` | Bill upload → OCR-extracted details to confirm (avg monthly units, connection phase, installation address) |
| 4 | Estimator — Step 2 | `/estimate` | Goal: Cover my whole bill / Reduce my bill / Fit a budget |
| 5 | Estimator — Step 3 | `/estimate` | System type: On-grid / Hybrid (most popular) / Off-grid |
| 6 | Estimator — Step 4 | `/estimate` | Backup loads multi-select + backup duration slider (1–12 h) — hybrid/off-grid only |
| 7 | Estimator — Step 5 | `/estimate` | Roof type (RCC / Metal sheet / Ground mount / Carport) + available area (sq ft ↔ marla) |
| 8 | Estimator — Step 6 | `/estimate` | Mounting structure: Standard/Customized × Medium/Good quality |
| 9 | Estimator — Step 7 | `/estimate` | Priority: Lowest price / Best value / Best quality — or switch to "By budget" |
| 10 | Estimator — Step 8 | `/estimate` | Net metering: yes / not right now |
| 11 | Estimator — result card | `/estimate` | Building animation → system size, price range, monthly saving, payback, CO₂; CTAs "View full estimate" / "Email me this estimate" |
| 12 | Full estimate detail | `/estimate/:id` | Itemized cost table (8 line items), estimated time (install ~1 week / net metering 5–9 weeks), 6 phases & 27 tasks, energy & savings, what's included / not included, warranties table, 3-tier comparison (Economy/Standard/Premium) with switch-tier modal, sticky action bar |
| 13 | Sign in / Sign up | `/auth` | Split screen — value prop panel + form. Sign up / Log in tabs, Google OAuth, name / phone-or-email / password, OTP alternative |
| 14 | Dashboard — populated | `/dashboard` | Greeting, 4 KPI tiles (Active projects, Quotes received, In progress, Completed), 5 project cards with status chips |
| 15 | Dashboard — empty | `/dashboard` | Empty state with "Get your first estimate" CTA |

**Persistent right-rail** across the estimator: a live "Your estimate so far" summary card that updates as each answer is given (Indicative system kW, ~PKR/mo saved, Usage, Goal, System, Backup, Roof, Structure, Priority, Net metering).

### 2.4 Estimator pricing engine — reverse-engineered from the live output

The existing calculator is deterministic and internally consistent. These constants are extracted from the captured screens and become the seed data for the v2 rate card.

**Generation & savings** — these fit the site's published figures exactly, not approximately.

- Specific yield: **100 units per kWp per month**, applied to the *nominal* system size (8 kWp → 800 units/mo). Equivalent to ≈3.33 kWh/kWp/day — a realistic Lahore figure (≈4.0 peak-sun-hours × ~0.83 performance ratio).
- Savings: **`PKR 48.02 × (monthly generated units − 50)`**. The 50-unit deduction represents fixed charges and meter rent that solar does not remove. Verified: 6.5 kW → 650 units → PKR 28,812 ✓ · 10 kW → 1,000 units → PKR 45,619 ✓ · 8 kWp → 800 units → PKR 36,015 (displayed as 36,000) ✓.
- CO₂ avoided: **1,015 kg per kWp per year**, on the nominal size (6.5 kW → 6,598 kg/yr ✓).
- Payback: `subtotal ÷ (monthly saving × 12)` → 4.53 / 4.35 / 4.14 years against the site's displayed 4.5 / 4.3 / 4.1 ✓.

> Note the deliberate split: **panel pricing uses the DC array size** (`panel_count × panel_watt`, e.g. 8.19 kWp), while **generation, savings and CO₂ use the nominal system size** (8 kWp). This is exactly how the current site behaves and must be preserved, or the numbers will drift.

**Rate card — Standard tier (per the 8 kWp Hybrid example)**

| Line item | Basis | Rate (PKR) | 8 kWp example |
|---|---|---|---|
| Solar panels | per kWp DC | ~75,700 / kWp | 620,000 (14 × 585 W = 8.19 kWp) |
| Inverter | per kW AC | ~45,000 / kW | 360,000 (8 kW hybrid, dual-MPPT) |
| Battery | per kWh | ~66,000 / kWh | 330,000 (5 kWh LFP) |
| Mounting structure | per kWp | ~20,150 / kWp | 165,000 (elevated, hot-dip galvanised) |
| Wiring + BOS | per kWp | ~14,650 / kWp | 120,000 |
| Net metering | flat | 60,000 | 60,000 |
| Installation labour | per kWp | ~13,430 / kWp | 110,000 |
| Transport | flat | 25,000 | 25,000 |
| **Subtotal** | | | **1,790,000** |
| Market buffer | ±6%, rounded to nearest 10,000 | | **1,680,000 – 1,900,000** |

**Tier multipliers** (derived from the Economy/Standard/Premium comparison)

| Tier | Multiplier vs Standard | Spec deltas |
|---|---|---|
| Economy — "Lowest price" | **× 0.86** | Tier-2 mono panels, standard galvanised-iron structure |
| Standard — "Best value" *(default)* | **× 1.00** | Tier-1 mono panels, elevated hot-dip galvanised structure |
| Premium — "Best quality" | **× 1.30** | N-type bifacial panels, Tier-1 premium inverter, 2× battery, GI + aluminium rails |

**Sizing logic**
- `Cover my whole bill` → size ≈ monthly units ÷ 100, rounded up to the nearest 0.5 kW (980 units → 10 kW).
- `Reduce my bill` → ≈ 65% of full-coverage size (980 units → 6.5 kW).
- `Fit a budget` → solve for the largest kWp whose Standard-tier total ≤ budget.
- Roof-area constraint: ~70 sq ft of usable area per kWp; if area is insufficient, cap the size and surface a note.

**Validity:** estimates are valid **14 days** from issue and display the issue date.

### 2.5 Gaps in the current product

| # | Gap | Impact |
|---|---|---|
| G1 | No persistence — every estimate is lost on refresh | Total loss of demand signal; no lead capture |
| G2 | No accounts | Users cannot return to a quote; no relationship |
| G3 | No admin visibility | Al-Wahab cannot see traffic, leads, or conversion |
| G4 | Marketplace positioning is wrong | Misrepresents the business; sends customers to competitors |
| G5 | Generic branding (generic sun glyph, "Al Wahab Solar") | No brand equity; does not match the real logo |
| G6 | Sample/mock data shown as real (reviews, projects) | Credibility risk |
| G7 | Bill upload is not functional | The strongest accuracy promise is undelivered |
| G8 | Urdu toggle present but content incomplete | Half the Lahore market underserved |
| G9 | No SEO (client-rendered, no meta, no sitemap) | Zero organic acquisition |
| G10 | No PDF export of the estimate | Customers cannot share the quote with family/decision-makers |

---

## 3. Product vision & positioning (v2.0)

> **Al-Wahab Solar Traders — Shine On!**
> Lahore's solar company that prices your system honestly, online, in two minutes — then supplies, installs and net-meters it end to end.

### 3.1 The repositioning

| Was (v1 — marketplace) | Is (v2 — direct installer) |
|---|---|
| "Lahore's solar estimator & marketplace" | "Lahore's honest solar estimator — by Al-Wahab Solar Traders" |
| "Connect with verified installers" | "Get your official Al-Wahab quotation" |
| "Compare quotes from verified companies" | "Review your itemized quotation and book a free site survey" |
| "For solar companies — get qualified leads" | *(section removed)* → replaced with **"About Al-Wahab"** — years in business, installs completed, team, warranty promise |
| "Quotes only from verified installers" | "Supplied and installed by our own certified team" |
| Reviews of third-party companies | Reviews of **Al-Wahab's own completed installations** |
| Marketplace revenue (lead fees) | Direct project revenue (system sales) |

**What is preserved unchanged:** the conversational estimator, the itemized transparency, the tier comparison, the phase/task installation tracker, the free-and-no-obligation promise, and the entire visual design language.

### 3.2 Success metrics

| Metric | Baseline | Target (6 months post-launch) |
|---|---|---|
| Estimator completion rate (start → result) | unknown | ≥ 55% |
| Estimate → account creation | 0% | ≥ 35% |
| Account → site-survey request | n/a | ≥ 25% |
| Survey → signed project | n/a | ≥ 30% |
| Saved estimates per month | 0 | 250+ |
| Median time to first quotation | days (phone) | < 3 minutes |
| Organic sessions / month | ~0 | 3,000+ |
| Bill-upload usage among completions | 0% | ≥ 40% |

---

## 4. Personas

**P1 — Ahmed, the bill-shocked homeowner (primary).** Johar Town, PKR 45,000/month LESCO bill. Has been quoted verbally by three dealers with wildly different numbers and no breakdown. Wants to know *what a fair price actually is* before he talks to anyone. Browses on an Android phone at night. Reads English but prefers Urdu for anything technical.

**P2 — Fatima, the researcher (secondary).** Comparing on-grid vs hybrid, worried about load-shedding backup. Wants to model different scenarios and save them. Will forward a PDF to her husband and brother before deciding.

**P3 — Bilal, the SME owner (secondary).** 15–25 kW three-phase load on a factory/shop. Cares about payback period and net metering paperwork more than aesthetics.

**P4 — Usman, Al-Wahab sales executive (internal).** Needs to see every new estimate the moment it lands, call the lead, adjust the quotation, and move it through the pipeline. Lives in the admin panel all day on a laptop.

**P5 — Sohail, Al-Wahab operations manager (internal).** Assigns installation crews, updates project phases and tasks, uploads completion photos, tracks net-metering applications with LESCO.

**P6 — The owner / super admin (internal).** Wants the number: how many leads this month, what closed, what revenue, which channel worked. Exports to Excel for the accountant.

---

## 5. Scope

### 5.1 In scope — v2.0

**A. Public / marketing**
- A1 Rebranded marketing site (new logo, refreshed copy, direct-installer positioning)
- A2 About Al-Wahab section replacing "For companies"
- A3 Real reviews/testimonials system (admin-managed, tied to completed projects)
- A4 Contact & lead-capture form → creates a lead in admin
- A5 Full EN/UR bilingual content with RTL support for Urdu
- A6 SEO: server-rendered pages, metadata, Open Graph, JSON-LD (`LocalBusiness`, `FAQPage`, `Service`), sitemap, robots

**B. Estimator**
- B1 The existing 8-step conversational flow, unchanged in design and question order
- B2 Working LESCO bill upload with OCR extraction and a confirm-and-edit step
- B3 Live right-rail estimate summary (unchanged)
- B4 Result card + full itemized estimate page (unchanged layout)
- B5 3-tier comparison and tier switching (unchanged)
- B6 Anonymous estimates that survive a page refresh (session-scoped) and are claimed on sign-up
- B7 PDF download of the estimate, branded with the new logo
- B8 "Email me this estimate" — transactional email with PDF attached
- B9 Server-side pricing (rate card lives in the database, editable by admin; never in the client bundle)

**C. Accounts**
- C1 Email + password registration and login
- C2 Phone (OTP) registration and login — primary path for Pakistani users
- C3 Google OAuth
- C4 Email verification, password reset
- C5 Profile management (name, phone, email, city/area, language preference)
- C6 Session management, "log out of all devices"
- C7 Account deletion / data export (self-service)

**D. Customer dashboard**
- D1 KPI tiles: Saved estimates · Active projects · In progress · Completed
- D2 Estimate list — every saved estimate with size, tier, area, price range, date, status
- D3 Project list — cards with status chips (Estimate saved → Survey requested → Survey done → Quotation issued → Agreement signed → In progress → Completed)
- D4 Project detail — live phase/task tracker (6 phases, 27 tasks), documents, photos, payment schedule
- D5 Actions: request site survey, accept quotation, download documents, leave a review, start a new estimate
- D6 Notification centre (in-app) + email/SMS notifications on status change
- D7 Empty states for every list

**E. Admin panel** *(full specification in `05-Admin-Panel-Spec.md`)*
- E1 Dashboard overview
- E2 Total users · E3 Active users · E4 Projects · E5 Saved estimations · E6 Revenue
- E7 Website analytics · E8 Visitor traffic
- E9 User management · E10 Project management · E11 Estimation management
- E12 Activity logs · E13 Search & filters · E14 Export (CSV/PDF)
- E15 Settings · E16 Role management · E17 Notifications · E18 Audit logs
- E19 *(additional, required to run the business)* Pricing rate-card manager, content/CMS manager, reviews moderation, lead pipeline

### 5.2 Out of scope — v2.0 (deferred to v2.1+)

- Online payments / payment gateway (payment **schedules and recording** are in scope; collecting money online is not)
- Third-party installer marketplace, installer accounts, quote bidding — removed by the repositioning
- Native mobile apps (the web app is a responsive PWA)
- Live inverter/generation monitoring integration
- Automated LESCO API integration (net-metering status is manually updated by ops)
- Multi-city / multi-DISCO expansion (architecture must not block it — see TDD §4.3)
- Customer-to-customer messaging or chat

---

## 6. Functional requirements

Priority: **M** = Must (v2.0 launch) · **S** = Should · **C** = Could

### 6.1 Marketing site

| ID | Requirement | Pri |
|---|---|---|
| FR-M-01 | Every instance of the old generic logo is replaced by the official Al-Wahab Solar Traders logo (navy panel-diamond + gold sun) in header, footer, favicon, PDF, emails, OG image and admin panel | M |
| FR-M-02 | All marketplace language is replaced with direct-installer language per the Content Deck | M |
| FR-M-03 | The "For solar companies" section is removed and replaced by "About Al-Wahab Solar Traders" (established, installs completed, certified team, warranty promise, service area) | M |
| FR-M-04 | Hero, how-it-works, why-us, sample estimate, FAQ, reviews, CTA, footer keep their existing layouts, animations and component structure | M |
| FR-M-05 | Language toggle switches all UI and content between English and Urdu; Urdu renders RTL with an appropriate Urdu typeface | M |
| FR-M-06 | Contact/lead form submits to the server, creates a Lead record, sends a confirmation email to the user and a notification to admins, and is protected by rate limiting + honeypot/Turnstile | M |
| FR-M-07 | Reviews shown are real, admin-approved reviews from completed Al-Wahab projects; if fewer than 3 approved reviews exist, the section is hidden (never mock data) | M |
| FR-M-08 | Pages are server-rendered with correct `<title>`, meta description, canonical, OG/Twitter cards and JSON-LD | M |
| FR-M-09 | WhatsApp click-to-chat and click-to-call buttons on mobile | S |
| FR-M-10 | Blog / knowledge-base section for SEO (net metering guide, LESCO tariff explainer) | C |

### 6.2 Estimator

| ID | Requirement | Pri |
|---|---|---|
| FR-E-01 | The estimator retains the exact step sequence, question copy intent, option sets and right-rail summary of the current build | M |
| FR-E-02 | Users may enter via bill upload, manual Q&A, or a sample bill | M |
| FR-E-03 | Bill upload accepts JPG/PNG/PDF up to 10 MB; the file is stored privately; OCR extracts avg monthly units, connection phase, reference number and address | M |
| FR-E-04 | OCR results are always shown for confirmation and are fully editable; OCR failure falls back to manual entry without dead-ending the user | M |
| FR-E-05 | The step count adapts (7 steps for on-grid, 8 for hybrid/off-grid — the backup step is conditional), as it does today | M |
| FR-E-06 | All pricing, sizing and savings maths executes **server-side** against the database rate card | M |
| FR-E-07 | The result shows: recommended kW, system type, price range, monthly saving, payback, CO₂/year | M |
| FR-E-08 | The full estimate page reproduces today's sections: itemized cost, estimated time (install + net metering), 6 phases / 27 tasks, energy & savings, included / not included, warranties, tier comparison | M |
| FR-E-09 | Switching tier re-prices the whole estimate and records the selection | M |
| FR-E-10 | Estimates carry a validity window (default 14 days, admin-configurable) and display the issue date | M |
| FR-E-11 | Anonymous estimates persist against an anonymous session token and are automatically claimed when the user registers or logs in | M |
| FR-E-12 | Users can download the estimate as a branded PDF and email it to themselves | M |
| FR-E-13 | Estimates are versioned — a re-price after a rate-card change creates a new version, never mutates history | S |
| FR-E-14 | "Fit a budget" mode solves for the best system within a stated amount | S |
| FR-E-15 | Shareable read-only estimate link (unguessable token, expires with validity) | C |

### 6.3 Authentication & accounts

| ID | Requirement | Pri |
|---|---|---|
| FR-A-01 | Register with email + password (min 8 chars, strength meter, breached-password rejection) | M |
| FR-A-02 | Register / log in with phone number + 6-digit OTP SMS | M |
| FR-A-03 | Log in with Google | M |
| FR-A-04 | Email verification link; unverified accounts may browse but not request a site survey | M |
| FR-A-05 | Password reset by email link | M |
| FR-A-06 | The sign-in screen keeps its current split layout and shows the pending estimate being saved (e.g. "Save your 8 kWp estimate · PKR 1.68M–1.9M · Standard") | M |
| FR-A-07 | On first sign-in, any anonymous estimate in the session is attached to the new account | M |
| FR-A-08 | Users may edit profile, change password, change phone (re-OTP), set language preference | M |
| FR-A-09 | Users may export all their data (JSON) and request account deletion (soft delete, 30-day grace, then anonymisation) | M |
| FR-A-10 | Rate limiting on all auth endpoints; account lockout after repeated failures | M |
| FR-A-11 | Optional two-factor authentication for admin roles | S |

### 6.4 Customer dashboard

| ID | Requirement | Pri |
|---|---|---|
| FR-D-01 | Greeting header ("Assalam-o-Alaikum, {first name}") with a persistent "New estimate" CTA — as today | M |
| FR-D-02 | Four KPI tiles reflecting the user's real counts | M |
| FR-D-03 | Saved estimates list: size, tier, area, price range, created date, validity state (valid / expiring / expired), actions (view, re-price, duplicate, request survey, download PDF, delete) | M |
| FR-D-04 | Projects list of status cards mirroring today's card design, with status chips and a contextual primary action per status | M |
| FR-D-05 | Project detail page: header summary, phase/task tracker with per-task status and dates, assigned team, documents, site photos, payment schedule, activity timeline | M |
| FR-D-06 | The customer can request a free site survey from an estimate and propose preferred date windows | M |
| FR-D-07 | The customer can accept or decline an issued quotation; acceptance is recorded with timestamp and IP | M |
| FR-D-08 | The customer can leave a star rating + written review once a project reaches Completed | M |
| FR-D-09 | In-app notification centre with unread badge; email notification on every project status change; SMS on major milestones | M |
| FR-D-10 | Distinct, on-brand empty states for estimates, projects and notifications | M |
| FR-D-11 | Side-by-side comparison of two or three of the user's own saved estimates | S |
| FR-D-12 | Document vault — agreement, warranty certificates, net-metering approval, invoices | S |

### 6.5 Admin panel — requirement index

Full behaviour, screens, columns, filters and permissions are specified in **`05-Admin-Panel-Spec.md`**. Summary index:

| ID | Module | Pri |
|---|---|---|
| FR-AD-01 | Dashboard overview — KPI row, trend charts, funnel, recent activity, alerts | M |
| FR-AD-02 | Total users — count, growth trend, source breakdown, new vs returning | M |
| FR-AD-03 | Active users — DAU/WAU/MAU, active definition configurable, retention cohorts | M |
| FR-AD-04 | Projects — count by status, pipeline board, value by stage | M |
| FR-AD-05 | Saved estimations — count, average size, average value, tier mix, conversion rate | M |
| FR-AD-06 | Revenue — booked / invoiced / collected / outstanding, by month, by system type, target vs actual | M |
| FR-AD-07 | Website analytics — sessions, users, pageviews, sources, devices, top pages, bounce, funnel | M |
| FR-AD-08 | Visitor traffic — real-time and historical visitors, geography, referrers, campaigns | M |
| FR-AD-09 | User management — list, detail, create, edit, suspend, verify, impersonate (audited), reset password, assign role | M |
| FR-AD-10 | Project management — create from estimate, assign team, edit phases/tasks, upload docs & photos, update status, payment schedule | M |
| FR-AD-11 | Estimation management — list, detail, adjust line items, override price, re-issue, mark won/lost with reason, convert to project | M |
| FR-AD-12 | Activity logs — chronological feed of all user and staff actions, filterable | M |
| FR-AD-13 | Search & filters — global search plus per-module filter sets, saved views | M |
| FR-AD-14 | Export — CSV and PDF for every list and report, with the applied filters | M |
| FR-AD-15 | Settings — company profile, contact details, pricing rate card, tier definitions, tariffs, estimate validity, email/SMS templates, integrations, feature flags, maintenance mode | M |
| FR-AD-16 | Role management — Super Admin, Admin, Sales, Operations, Viewer; granular permission matrix; custom roles | M |
| FR-AD-17 | Notifications — admin notification centre, rules engine, broadcast to users, template editor | M |
| FR-AD-18 | Audit logs — immutable, append-only record of every privileged/data-changing action with before/after values | M |
| FR-AD-19 | Pricing rate-card manager with effective dates and version history | M |
| FR-AD-20 | Content manager for hero copy, FAQs, reviews moderation, About section | S |
| FR-AD-21 | Lead pipeline / CRM board with assignment and follow-up reminders | S |

---

## 7. Non-functional requirements

| ID | Area | Requirement |
|---|---|---|
| NFR-01 | Performance | LCP < 2.5 s on 4G mobile; INP < 200 ms; CLS < 0.1. Estimator step transitions < 100 ms. Server-side pricing response < 400 ms p95. |
| NFR-02 | Availability | 99.5% monthly. Static marketing pages must remain served even if the database is degraded. |
| NFR-03 | Scale | Designed for 50k sessions/month, 5k accounts, 20k estimates in year one — well within a single managed Postgres instance. |
| NFR-04 | Security | HTTPS only, HSTS, CSP, row-level security on every table, server-side authorisation on every mutation, secrets never in the client bundle, signed URLs for private files. |
| NFR-05 | Privacy | LESCO bills and CNIC-adjacent data are private-bucket only. Data-retention policy: bills auto-purged 24 months after last activity. Consent checkbox on lead capture. |
| NFR-06 | Accessibility | WCAG 2.2 AA: contrast ≥ 4.5:1 on the dark theme, full keyboard navigation, visible focus rings, ARIA on the wizard and accordions, `prefers-reduced-motion` respected. |
| NFR-07 | Localisation | Full EN/UR parity, RTL layout mirroring, Urdu numerals optional, PKR formatting with lakh/crore-aware abbreviations (PKR 1.68M style retained as today). |
| NFR-08 | Browser support | Last 2 versions of Chrome, Safari, Edge, Firefox; Android Chrome ≥ 100; iOS Safari ≥ 15. |
| NFR-09 | Responsiveness | Mobile-first from 360 px; breakpoints 360 / 640 / 768 / 1024 / 1280 / 1536. Admin panel usable from 1024 px, read-only-friendly on tablet. |
| NFR-10 | Maintainability | One developer must be able to ship a change end-to-end. Typed end-to-end, generated DB types, no hand-written SQL in components, ≤ 3 deployment surfaces. |
| NFR-11 | Observability | Error tracking (Sentry), structured logs, uptime monitor, weekly automated KPI email to the owner. |
| NFR-12 | Backup & DR | Daily automated database backup with 30-day retention; documented restore procedure tested once before launch. RPO 24 h, RTO 4 h. |
| NFR-13 | SEO | Server-rendered marketing routes, sitemap.xml, robots.txt, structured data, Core Web Vitals in the green. |
| NFR-14 | Legal | Privacy Policy, Terms of Service, and an estimate disclaimer ("indicative, valid 14 days, confirmed after site survey") must be present and versioned. |

---

## 8. User journeys

### 8.1 Cold visitor → paying customer (happy path)

1. Ahmed finds the site via Google ("solar price in Lahore").
2. Lands on the rebranded homepage; sees the sample itemized estimate and the "no hidden costs" promise.
3. Taps **Get your free estimate** → Roshni greets him in Urdu.
4. Uploads a photo of his LESCO bill → OCR reads 980 units, three-phase, Johar Town → he confirms.
5. Answers goal → *Reduce my bill*; type → *Hybrid*; backup → fans, lights, fridge, 4 h; roof → RCC 600 sq ft; structure → Standard/Good; priority → *Best value*; net metering → yes.
6. Result: **6.5 kW Hybrid · PKR 1.47M–1.66M · saves ~PKR 28,800/mo · payback 4.5 yrs.**
7. Taps **View your full estimate** → reads the itemized table, the 6-phase plan and the warranty table; switches to Premium to compare, switches back.
8. Taps **Save & book a free site survey** → sign-up screen shows "Save your 6.5 kW estimate"; he registers with phone + OTP.
9. Estimate is attached to his new account. He picks a preferred survey window. Confirmation SMS + email arrive.
10. Admin sees the new estimate and survey request in the pipeline within seconds; Usman calls him the next morning.
11. Survey completed → Usman adjusts two line items and issues the official quotation → Ahmed accepts in his dashboard.
12. Project is created; Sohail assigns a crew and advances phases; Ahmed watches the tracker move from Site Survey through Handover.
13. On completion Ahmed is prompted to leave a review, which — once approved — appears on the homepage.

### 8.2 Returning user

Logs in → dashboard → sees 2 saved estimates (one expiring in 3 days) and 1 in-progress project at 60% → opens the project → sees that "LESCO inspection" completed yesterday and "Meter install" is next → downloads the net-metering acknowledgement PDF.

### 8.3 Sales executive (admin)

Logs in → dashboard shows 7 new estimates and 3 survey requests today → opens the pipeline board → filters *Estimation > PKR 2M, last 7 days, no owner* → assigns three to himself → opens one, reads the customer's answers and their uploaded bill, adjusts the battery line item, adds an internal note, and re-issues → the customer is notified automatically.

### 8.4 Owner (admin)

Logs in monthly → revenue card shows PKR 18.4M booked vs a PKR 20M target → drills into revenue by system type → exports the closed-projects list to CSV for the accountant → checks the audit log to confirm who changed the panel rate last Tuesday.

---

## 9. Content & branding requirements

| ID | Requirement |
|---|---|
| CB-01 | The supplied logo (navy solar-panel diamond with a gold sun, wordmark "AL-WAHAB SOLAR TRADERS", strapline "SHINE ON!") is the single brand mark. |
| CB-02 | The logo must be delivered as SVG (redrawn from the PNG) in three lock-ups: full stacked, horizontal, and mark-only. Light and dark variants (the supplied PNG is a light-background lock-up; a knockout version with white/gold wordmark is required for the dark UI). |
| CB-03 | Brand colours derived from the logo — Wahab Blue `#023489`, Wahab Gold `#F5AC3C` — must be reconciled with the existing UI palette without changing the site's appearance (see Design Spec §2). |
| CB-04 | "Shine On!" becomes the brand strapline, used in the footer, PDF cover and email signature. |
| CB-05 | All copy is rewritten per `06-Content-Copy-Deck.md`; no string in the shipped product may still refer to third-party installers, marketplace, or "verified companies". |
| CB-06 | Every user-facing surface (web, PDF, email, SMS sender name, favicon, OG image, admin) carries the new identity. |
| CB-07 | Sample/placeholder data must be visually and textually labelled as such, or removed. |

---

## 10. Assumptions, dependencies, risks

**Assumptions**
- Al-Wahab operates in Lahore under LESCO; single-city at launch.
- Al-Wahab supplies and installs directly; no partner installers are onboarded in v2.0.
- Staff headcount is small (< 10), so five roles are sufficient.
- Prices are maintained manually by an admin from real supplier quotes; no live market feed exists.

**Dependencies**
- SMS gateway for OTP (Pakistani provider — Telenor/Jazz aggregator or Twilio).
- Transactional email provider (Resend / Postmark / AWS SES).
- OCR service for LESCO bills.
- Google OAuth credentials.
- Final logo source file (SVG or high-resolution vector) from the business.

**Risks**

| Risk | Impact | Mitigation |
|---|---|---|
| OCR accuracy on crumpled/photographed LESCO bills | Wrong estimates, lost trust | Always show a confirm-and-edit step; never auto-proceed; manual fallback one tap away |
| Rate card goes stale → estimates diverge from reality | Margin loss or lost deals | Admin reminder every 30 days; estimates stamped with rate-card version and a 14-day validity |
| Solo developer bandwidth | Slipped timeline | Managed services (Supabase, Vercel) over custom infra; strict milestone scope; admin panel built on a component kit, not from scratch |
| SMS OTP cost and deliverability in Pakistan | Blocked sign-ups | Email+password and Google always available as alternatives; OTP rate-limited |
| Scope creep from the admin panel | Launch delay | Admin split into M1 (read + manage) and M2 (analytics + audit); ship the customer side first |
| Storing customer bills (PII) | Legal/reputational | Private buckets, signed URLs, retention policy, documented in the Privacy Policy |

---

## 11. Release plan

| Release | Contents | Target |
|---|---|---|
| **R1 — Foundation & rebrand** | Next.js migration, new logo/brand, rewritten copy, SEO, EN/UR | Weeks 1–3 |
| **R2 — Estimator on the server** | DB rate card, server pricing, persisted anonymous estimates, PDF | Weeks 4–6 |
| **R3 — Accounts & dashboard** | Auth (email/phone/Google), estimate claiming, dashboard, notifications | Weeks 7–10 |
| **R4 — Projects** | Project creation, phases/tasks, documents, reviews | Weeks 11–13 |
| **R5 — Admin core** | Dashboard, users, estimations, projects, search/filters, exports, roles, audit | Weeks 14–17 |
| **R6 — Admin analytics & polish** | Analytics, traffic, revenue, notifications engine, settings, activity logs | Weeks 18–20 |
| **R7 — Hardening & launch** | Accessibility, performance, security review, backups, load test, go-live | Weeks 21–22 |

Detailed week-by-week tasks are in **`07-Implementation-Plan.md`**.

---

## 12. Acceptance criteria (launch gate)

1. Not a single string, image or route in the shipped product refers to third-party installers or a marketplace.
2. The new logo appears in header, footer, favicon, PDF, emails, OG image and admin.
3. A visual regression comparison of the homepage and estimator against the current build shows **no unintended layout or style changes** beyond the logo and copy.
4. A user can complete an estimate on a mobile phone, register with OTP, and find that estimate in their dashboard.
5. An estimate PDF downloads, is branded, and matches the on-screen figures exactly.
6. All 18 required admin modules are reachable, functional against real data, and permission-gated.
7. Every list in the admin exports to both CSV and PDF, honouring the active filters.
8. Every privileged action writes an immutable audit-log entry with actor, timestamp, and before/after values.
9. Lighthouse: Performance ≥ 90, Accessibility ≥ 95, SEO = 100 on the homepage (mobile).
10. A database restore from backup has been performed successfully in a staging environment.
11. Privacy Policy, Terms and estimate disclaimer are live and linked.
12. Urdu mode renders correctly in RTL across the homepage, estimator and dashboard.

---

*End of PRD. Companion documents: `02-Technical-Design-Document.md`, `03-Design-System-and-Screen-Specs.md`, `05-Admin-Panel-Spec.md`, `06-Content-Copy-Deck.md`, `07-Implementation-Plan.md`.*
