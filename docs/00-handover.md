# Al-Wahab Solar Traders v2.0 — Handover Pack

**Prepared:** 29 July 2026
**Baseline analysed:** `https://6a2d2b4aea01c5eca145e4d2--aesthetic-sprinkles-c49f96.netlify.app/index.html` + 15 captured screen snapshots
**Decisions locked in this pack:** Next.js 15 + Supabase · direct-installer positioning (no marketplace) · solo developer · **no change to the existing visual design**

---

## 1. What's in this pack

| File | What it is | Give it to |
|---|---|---|
| `00-handover.md` | This file — reading order and the build brief to paste into Claude | You |
| `01-prd.md` | Product Requirements Document — as-is analysis, repositioning, personas, 90+ numbered requirements, acceptance criteria | Business + developer |
| `02-technical-design.md` | Architecture, full database schema, RLS, APIs, the reverse-engineered pricing engine, security, deployment | Developer |
| `03-design-system.md` | **The main build brief.** Tokens, component library, and a screen-by-screen spec for all 40+ screens | Claude / the design-to-code agent |
| `04-information-architecture.md` | Sitemap, route map, state machines, notification matrix, analytics taxonomy | Developer |
| `05-admin-panel.md` | All 18 required admin modules plus 4 more the business needs, with columns, filters and permissions | Claude + developer |
| `06-content-copy-deck.md` | Every user-facing string, English + Urdu, under the new positioning | Claude + copy reviewer |
| `07-implementation-plan.md` | 22-week solo-dev roadmap, 8 milestones, task-level estimates, risks, budget | You |
| `assets/al-wahab-logo.png` | The supplied logo (source for the SVG redraw) | Designer |
| `reference-screens/*.html` | The 15 existing screens, extracted from your MHTML captures into plain HTML | Claude |

**Reading order:** 01 → 04 → 02 → 03 → 05 → 06 → 07.

---

## 2. What I found in the existing site

A **static React + Tailwind SPA on Netlify with no backend at all.** Design language: dark navy gradient, glass surfaces, gold-and-cyan accents, Space Grotesk + Manrope, lucide icons. The estimator is genuinely good — a 7–8 step conversational wizard with a live summary rail that produces a fully itemized, tier-comparable quotation.

Everything it produces is thrown away on refresh. There is no account system, no persistence, no analytics, and no way for Al-Wahab to see who used it.

I also **reverse-engineered the pricing engine** from the numbers on your screens, so the rebuild produces identical results rather than new ones:

- 100 units per kWp per month (Lahore yield)
- Savings = `PKR 48.02 × (generated units − 50)` — this reproduces all three published savings figures *exactly*, to the rupee
- 1,015 kg CO₂ avoided per kWp per year
- 70 sq ft of roof per kWp
- ±6% market buffer, rounded to the nearest PKR 10,000
- Tier multipliers: Economy ×0.86 · Standard ×1.00 · Premium ×1.30
- Full rate card (panels PKR ~75,700/kWp, inverter ~45,000/kW, battery ~66,000/kWh, structure ~20,150/kWp, BOS ~14,650/kWp, net metering 60,000 flat, labour ~13,430/kWp, transport 25,000 flat)

**Twelve verification cases** derived from your live site are in TDD §6.5 and become the unit-test suite. All twelve reproduce exactly. If those pass, the rebuild prices identically to the current one — no customer sees a number change.

---

## 3. The positioning change

You chose **Al-Wahab as the installer itself**, so the marketplace framing is removed everywhere:

- "Compare quotes from verified companies" → "Review your itemized quotation and book a free site survey"
- The "For solar companies / join as installer" section → **"About Al-Wahab"**
- Dashboard tile "Quotes received" → "Saved estimates"
- Reviews now come from Al-Wahab's own completed installs
- Revenue becomes real project revenue, which is why the admin panel has a full revenue module

A find-and-replace table of every v1 string that must disappear is at the top of `06-content-copy-deck.md`.

---

## 4. The build brief to paste into Claude

Copy the block below, attach the reference HTML files and `assets/al-wahab-logo.png`, and upload documents 03, 05 and 06 alongside it.

> **Project:** Rebuild and extend the Al-Wahab Solar Traders website as a Next.js 15 (App Router) + Supabase application.
>
> **Attached:** 15 HTML files showing every screen of the existing site · the new logo PNG · the Design System & Screen Spec · the Admin Panel Spec · the Content Copy Deck.
>
> **The single hardest constraint: do not change the visual design.** The dark navy gradient background, the glass surfaces, the gold `#FFB800` → amber `#FF8C00` accents, the cyan `#00E5FF` highlights, Space Grotesk + Manrope, the 1200 px container, the card radii and the glow animations are all fixed. Extract them from the attached HTML and reproduce them exactly. New screens must look like they were always part of this product. Section 2 of the Design Spec contains the exact token values — use them verbatim.
>
> **What changes:** the logo (redraw the attached PNG as SVG and use it in the existing 36 px gold-gradient header tile), and all copy (use the Content Copy Deck — every string, English and Urdu).
>
> **What to build:**
> 1. All public screens marked `[EXISTING]` in the Design Spec — ported from the attached HTML, not redesigned.
> 2. The 8-step estimator wizard with its sticky right-hand summary rail, exactly as in the attached files, but with pricing computed server-side.
> 3. All screens marked `[NEW]` — About, Contact, OTP verification, password reset, My estimates, Compare estimates, Project detail, Notifications, Profile, Review, error pages.
> 4. The full admin panel — all modules in the Admin Panel Spec, in the same design language.
>
> **Work screen by screen.** For each one: read its spec section, produce the component, list the states you handled (empty, loading, error, success), and confirm it works at 360 px and in Urdu RTL.
>
> **Non-negotiables:** every screen responsive from 360 px · WCAG 2.2 AA (`text-slate-500` is banned for body copy) · every list has an empty state · every async action has loading and error states · no English hard-coded in components, use i18n keys · `prefers-reduced-motion` respected · no browser storage APIs.
>
> Start with the design tokens and the shared component library, then the homepage, then the estimator, then auth, then the dashboard, then the admin panel.

---

## 5. Things you need to decide or supply

| # | Item | Needed by | Default if you say nothing |
|---|---|---|---|
| 1 | A vector version of the logo (AI / EPS / SVG) | Week 1 | Redraw from the PNG |
| 2 | Real contact details — the current site shows `hello@alwahabsolar.pk` and `+92 42 111 765 765` | Week 3 | Placeholders ship |
| 3 | Real "About" numbers — years in business, installs completed, kW deployed | Week 3 | Section ships without the stat row |
| 4 | Real supplier prices for the launch rate card | Week 6 | The extracted rates from your current site |
| 5 | Current LESCO slab rates | Week 6 | Blended ≈ PKR 44.3/unit implied by the current site |
| 6 | SMS provider preference for OTP in Pakistan | Week 7 | Twilio |
| 7 | Whether payments are recorded in-app or kept in your books | Week 11 | Recorded in-app, no gateway |
| 8 | Final domain and email sending domain | Week 22 | `alwahabsolar.pk` |

---

## 6. Timeline at a glance

| Milestone | Weeks | What you can show people |
|---|---|---|
| M0 Setup | 1 | — |
| M1 Rebrand & marketing | 2–3 | The new-brand site, live, in English and Urdu |
| M2 Estimator on the server | 4–6 | Real estimates that persist and download as branded PDFs |
| M3 Accounts & dashboard | 7–10 | Customers registering and saving estimates |
| M4 Projects | 11–13 | Live installation tracking |
| M5 Admin core | 14–17 | Staff running the business from the panel |
| M6 Admin insights | 18–20 | Analytics, traffic, revenue, settings |
| M7 Hardening & launch | 21–22 | Go live |

≈22 weeks at 30 focused hours a week. Running cost after launch: roughly $40–140 a month.

---

## 7. One caution

The Urdu in the Copy Deck is production-intent, but **have a native Urdu speaker read it before launch** — particularly the technical lines. Half your Lahore market will read that column first.

---

*Questions about any of these documents, or want one of them expanded — the estimator engine, the admin panel, or the Urdu copy — say which and I'll go deeper.*
