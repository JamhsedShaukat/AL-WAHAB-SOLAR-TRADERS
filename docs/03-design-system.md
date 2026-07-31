# Design System & Screen Specifications
## Al-Wahab Solar Traders v2.0 — build brief for Claude / the design-to-code agent

| | |
|---|---|
| **Document** | Design System + Screen-by-Screen Build Spec |
| **Version** | 2.0 |
| **Date** | 29 July 2026 |
| **Audience** | The AI/agent building the screens, and the solo developer |
| **Hard constraint** | **Do not change the existing design language.** Every token, spacing rule, radius, glass treatment and animation below is taken from the live build and must be preserved. New screens extend this system; they do not replace it. |
| **Reference material** | 15 captured HTML screens supplied alongside this document |

---

## 0. How to use this document

1. Read §1–§6 (the design system) before writing any component. These are the rules.
2. For each screen, §8 onward gives: purpose, route, layout skeleton, component inventory, states, responsive behaviour, and the exact copy keys.
3. Screens marked **[EXISTING]** already exist in the supplied HTML — **port them, do not redesign them.** Only the logo and the copy change.
4. Screens marked **[NEW]** must be designed from the tokens in this document so they look like they were always part of the product.
5. Copy strings live in `06-content-copy-deck.md`. Never hard-code English into a component; use the i18n key.

---

## 1. Brand

### 1.1 The logo

The supplied mark: a **navy-blue diamond of solar panels** with a **gold sun rising behind it**, the wordmark **AL-WAHAB SOLAR TRADERS** in navy below, and the strapline **SHINE ON!** in gold beneath that.

**Required deliverables (redraw as SVG from the supplied PNG):**

| Asset | Use |
|---|---|
| `logo-stacked-dark.svg` | Mark + wordmark + strapline, **white wordmark / gold strapline** — for the dark UI |
| `logo-horizontal-dark.svg` | Mark left, wordmark right, single line — **header use** |
| `logo-mark.svg` | Diamond + sun only, no text — favicon, avatar, compact header, app icon |
| `logo-stacked-light.svg` | Navy wordmark on white — invoices, PDF, print, light email clients |
| `favicon.ico`, `icon-192/512.png`, `apple-touch-icon.png` | Browser + PWA |
| `og-image.png` (1200×630) | Social sharing — mark on the navy gradient with the strapline |

**Header lock-up rule.** The current header uses a 36 px (`h-9 w-9`) rounded-xl gold gradient tile containing a sun glyph, followed by the two-line wordmark "Al Wahab / **Solar**". Replace **only the contents of that tile** with the logo mark, and set the wordmark to "Al-Wahab" + gold "Solar Traders". The tile size, radius, gap (`gap-2.5`), glow shadow and typography must not change — this keeps the header pixel-identical in structure.

```tsx
// components/brand/Logo.tsx
<Link href="/" className="flex items-center gap-2.5 group">
  <span className="relative grid h-9 w-9 place-items-center rounded-xl
                   bg-gradient-to-br from-gold to-amber
                   shadow-[0_0_20px_-2px_rgba(255,184,0,0.6)]">
    <LogoMark className="h-5 w-5 text-navy-950" />   {/* diamond + sun, currentColor */}
  </span>
  <span className="font-display text-[18px] font-semibold leading-tight tracking-tight text-white">
    Al-Wahab <span className="text-gold">Solar Traders</span>
  </span>
</Link>
```

**Clear space:** minimum = the height of the sun arc on all sides. **Minimum sizes:** mark 24 px; horizontal lock-up 120 px wide; stacked lock-up 96 px wide. **Never:** recolour outside the two brand colours, stretch, rotate, add drop shadows to the wordmark, or place the dark lock-up on a light-gold background.

### 1.2 Brand colours vs UI palette

The logo's colours and the existing UI palette are already close relatives. **Keep the UI palette exactly as it is** — introduce the logo's blue only as a print/light-surface brand colour.

| Token | Hex | Origin | Where used |
|---|---|---|---|
| `wahab-blue` | `#023489` | **Logo** | Logo artwork, PDF header, print, light-background email |
| `wahab-gold` | `#F5AC3C` | **Logo** | Logo artwork, PDF accents |
| `gold` | `#FFB800` | **Existing UI — unchanged** | Primary accent, CTA gradient start, highlights |
| `amber` | `#FF8C00` | **Existing UI — unchanged** | CTA gradient end, warm glow |
| `cyan` | `#00E5FF` | **Existing UI — unchanged** | Secondary accent, data highlights |
| `navy-900` | `#0A0F1E` | **Existing UI — unchanged** | Page base |
| `navy-950` | `#05080F` | **Existing UI — unchanged** | Deep base, text on gold |
| `ink` | `#E7ECF5` | **Existing UI — unchanged** | Body text |

Rationale: the logo gold (`#F5AC3C`) and the UI gold (`#FFB800`) read as the same colour on a dark ground; the logo navy (`#023489`) is a mid blue that would look wrong as a dark-UI surface. So the *artwork* keeps its own colours and the *interface* keeps its own — this is standard practice and satisfies "do not change the design".

---

## 2. Design tokens (copy verbatim into `tailwind.config.ts`)

```ts
// tailwind.config.ts
export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold:  '#FFB800',
        amber: '#FF8C00',
        cyan:  '#00E5FF',
        navy:  { 900: '#0A0F1E', 950: '#05080F' },
        ink:   '#E7ECF5',
        wahab: { blue: '#023489', gold: '#F5AC3C' },   // brand/print only
      },
      fontFamily: {
        sans:    ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        urdu:    ['Noto Nastaliq Urdu', 'serif'],
      },
      maxWidth: { content: '1200px' },
      boxShadow: {
        cta:       '0 10px 30px -8px rgba(255,140,0,0.55)',
        'cta-hover':'0 14px 40px -6px rgba(255,140,0,0.75)',
        mark:      '0 0 20px -2px rgba(255,184,0,0.6)',
        card:      '0 20px 60px -30px rgba(0,0,0,0.8)',
      },
      keyframes: {
        glow:    { '0%,100%': { filter: 'brightness(1)' }, '50%': { filter: 'brightness(1.12)' } },
        floatUp: { '0%': { transform: 'translateY(0)', opacity: '0' },
                   '10%,90%': { opacity: 'var(--p-op,0.6)' },
                   '100%': { transform: 'translateY(-100vh) translateX(var(--p-dx,0))', opacity: '0' } },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        shimmer: { '100%': { transform: 'translateX(100%)' } },
      },
      animation: {
        glow: 'glow 2.6s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
        shimmer: 'shimmer 1.6s infinite',
      },
    },
  },
}
```

```css
/* globals.css — verbatim from the current build */
:root { color-scheme: dark; }

body {
  background:
    radial-gradient(1200px 800px at 70% -10%, rgba(255,184,0,0.10), transparent 60%) fixed,
    radial-gradient(900px 700px at 10% 20%, rgba(0,229,255,0.06), transparent 55%),
    linear-gradient(#0A0F1E 0%, #070B16 45%, #05080F 100%);
  color: #E7ECF5;
  font-family: Manrope, sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

.glass        { background: rgba(255,255,255,0.035);
                border: 1px solid rgba(255,255,255,0.09);
                backdrop-filter: blur(14px); }

.glass-strong { background: rgba(13,20,38,0.55);
                border: 1px solid rgba(255,255,255,0.10);
                backdrop-filter: blur(20px) saturate(140%); }

.text-gradient-gold { background: linear-gradient(135deg,#FFD466,#FFB800 45%,#FF8C00);
                      -webkit-background-clip: text; background-clip: text; color: transparent; }
.text-gradient-cyan { background: linear-gradient(135deg,#8AF4FF,#00E5FF);
                      -webkit-background-clip: text; background-clip: text; color: transparent; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important;
                            transition-duration: .01ms !important; scroll-behavior: auto !important; }
}
```

### 2.1 Scale reference

| Aspect | Values in use |
|---|---|
| Container | `mx-auto w-full max-w-[1200px] px-6 sm:px-10` |
| Section rhythm | `py-20 sm:py-28` between marketing sections |
| Radii | `rounded-lg` 8 (nav items) · `rounded-xl` 12 (buttons, inputs, mark tile) · `rounded-2xl` 16 (cards, header bar) · `rounded-3xl` 24 (hero panels) · `rounded-full` (pills, toggles) |
| Body sizes | 13 / 14.5 / 15 / 16 / 18 px |
| Display sizes | `clamp(2.25rem, 5vw, 4rem)` h1 · `clamp(1.75rem, 3.5vw, 2.75rem)` h2 · 20–24 px h3 |
| Borders | `border-white/10` default · `border-white/[0.06]` subtle · `border-gold/30` active |
| Hover surface | `hover:bg-white/[0.06]` |
| Transitions | `duration-200` controls · `duration-300` layout/nav · `active:scale-[0.96]` on buttons |
| Backdrop blur | 14 px (`glass`) · 20 px + 140% saturate (`glass-strong`) |

---

## 3. Component library

### 3.1 Existing components (port unchanged)

| Component | Anatomy |
|---|---|
| `Button` | Variants: **primary** (`bg-gradient-to-r from-gold to-amber text-navy-950 font-semibold shadow-cta hover:shadow-cta-hover hover:brightness-105 animate-glow`), **secondary** (`glass text-white hover:bg-white/[0.08]`), **ghost** (`text-slate-300 hover:bg-white/[0.06] hover:text-white`), **danger** (`bg-red-500/15 text-red-300 border border-red-500/30`). Sizes sm `text-sm px-4 py-2 gap-1.5` / md `text-[15px] px-5 py-2.5 gap-2` / lg `text-base px-6 py-3 gap-2`. All `rounded-xl`, `active:scale-[0.96]`, optional leading lucide icon. |
| `Header` | Fixed, `inset-x-0 top-0 z-50`, `py-5` → shrinks to `py-2` on scroll with a `glass-strong rounded-2xl` inner bar. Logo left, nav centre-right, EN/اردو pill toggle, primary CTA, hamburger below `lg`. |
| `MobileNav` | `overflow-hidden transition-all duration-300 max-h-0 → max-h-[420px]`, `glass-strong rounded-2xl p-3`, stacked `rounded-xl px-4 py-3` links. |
| `LangToggle` | `inline-flex rounded-full border border-white/10 bg-white/[0.04] p-0.5 text-[13px]`; active segment `bg-white/10 text-white`, inactive `text-slate-400`. |
| `GlassCard` | `glass rounded-2xl p-6 sm:p-8`; hover lift `hover:-translate-y-0.5 hover:border-white/20 transition`. |
| `SectionHeading` | Gold eyebrow (`text-[13px] font-semibold uppercase tracking-[0.18em] text-gold`) → `font-display` h2 → `text-slate-400 max-w-[620px]` lede. |
| `Marquee` | Duplicated track, `animate-marquee`, edge mask `mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent)`, pauses on hover. |
| `AmbientBlobs` | `pointer-events-none fixed inset-0 z-0 overflow-hidden` with three `rounded-full blur-[90–110px]` gold/cyan blobs at the exact positions in the current build. |
| `FAQAccordion` | `glass rounded-2xl divide-y divide-white/[0.06]`; row `py-5 px-6` with a chevron rotating 180°; body `text-slate-400`; `aria-expanded` + `aria-controls`. |
| `StatPill` | `rounded-full glass px-4 py-1.5 text-[13px]` with a leading gold dot. |
| `Tilt` | Pointer-driven 3D transform on the hero estimate card; disabled under `prefers-reduced-motion` and on touch. |
| `RangeSlider` (`.sv-range`) | Gold-filled track, gold thumb with the `mark` glow — used for backup hours. |

### 3.2 New components (build from the same tokens)

| Component | Spec |
|---|---|
| `DataTable` | `glass-strong rounded-2xl overflow-hidden`. Header row `bg-white/[0.04] text-[13px] uppercase tracking-wider text-slate-400 border-b border-white/10`, sticky. Body rows `border-b border-white/[0.06] hover:bg-white/[0.03]`, 52 px tall. Sortable headers show a lucide chevron. Row-select checkboxes gold when checked. Sticky right actions column with a `MoreHorizontal` menu. Footer: row count, page size select, cursor pager. |
| `StatCard` | `glass rounded-2xl p-5`. Layout: icon tile (`h-10 w-10 rounded-xl bg-gold/10 text-gold grid place-items-center`) + label (`text-[13px] text-slate-400`) → value (`font-display text-[28px] font-semibold text-white`) → delta chip (`text-[12px]`, `text-emerald-400` up / `text-red-400` down, with `TrendingUp`/`TrendingDown`) + "vs last period". Optional 40 px sparkline in `cyan`. |
| `ChartCard` | `glass rounded-2xl p-6`; title + period selector (7d / 30d / 90d / 12m / custom) in the header; Recharts inside. **Chart palette:** primary `#FFB800`, secondary `#00E5FF`, tertiary `#8AF4FF`, quaternary `#FF8C00`, positive `#34D399`, negative `#F87171`. Grid `rgba(255,255,255,0.06)`, axis text `#94A3B8` 12 px, tooltip = `glass-strong rounded-xl p-3 text-[13px]`. Area charts use a gold gradient fill fading to transparent. |
| `FilterBar` | `glass rounded-2xl p-3 flex flex-wrap gap-2 items-center`. Search input with a leading `Search` icon; filter pills that open Radix popovers; a date-range picker; "Clear all"; a "Saved views" dropdown; an `ExportMenu` on the right. Active filters render as removable gold-outlined chips below the bar. |
| `StatusChip` | `rounded-full px-2.5 py-1 text-[12px] font-medium border`. Map: *draft* slate · *saved* `cyan/15` + cyan text · *survey requested* `gold/15` + gold · *quoted* `violet-400/15` · *in progress* `amber/15` + amber · *completed* `emerald-400/15` + emerald · *cancelled/expired* `red-400/15` + red · *on hold* `slate-400/15`. |
| `PhaseTracker` | Vertical on mobile, horizontal stepper ≥ `lg`. Each phase = a circle (pending `border-white/20`; in-progress gold ring + pulse; complete solid gold with a `Check` in navy-950) joined by a 2 px connector that fills gold as phases complete. Expanding a phase reveals its task list with per-task status icons, assignee avatar and date. |
| `KpiTile` | The existing dashboard tile: `glass rounded-2xl p-5`, big `font-display` number, small slate label. Preserve as-is. |
| `EmptyState` | Centred: 56 px gold-tinted icon in a `rounded-2xl bg-gold/10` tile → `font-display text-[20px]` heading → `text-slate-400 max-w-[420px]` body → primary CTA. |
| `Drawer` / `SheetPanel` | Right-side Radix dialog, `glass-strong`, `w-full sm:max-w-[520px]`, slides in 300 ms, used for admin record detail and quick edit. |
| `Modal` | Radix dialog, `glass-strong rounded-2xl`, `max-w-[560px]`, overlay `bg-navy-950/70 backdrop-blur-sm`. The existing "Compare & switch tier" modal is the reference. |
| `Toast` | Bottom-right (bottom-centre on mobile), `glass-strong rounded-xl px-4 py-3`, left accent bar in gold/emerald/red, auto-dismiss 4 s. |
| `Timeline` | Left rail with 8 px dots on a `border-l border-white/10`; each entry: actor avatar, action sentence, relative time, expandable JSON diff for audit entries. |
| `Skeleton` | `rounded-xl bg-white/[0.05] relative overflow-hidden` with a `animate-shimmer` white/8% sweep. |
| `AdminSidebar` | 260 px fixed, `glass-strong border-r border-white/10`. Logo top; grouped nav (Overview / Manage / Insights / System); active item `bg-gold/10 text-gold border-l-2 border-gold`; collapsible to 72 px icon rail; user block pinned at the bottom. |
| `AdminTopbar` | 64 px, `glass-strong`, breadcrumbs left; global search (`⌘K`) centre; notification bell with an unread dot, role badge and avatar menu right. |
| `CommandPalette` | `⌘K` Radix dialog searching users, estimates, projects, settings pages and actions. Gold-highlighted matches. |
| `PermissionMatrix` | Sticky-header grid: roles as columns, permissions grouped by module as rows, gold checkbox cells; system roles rendered read-only with a lock icon. |

### 3.3 Form controls

```
Input / Select / Textarea
  base   rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3 text-[15px]
         text-white placeholder:text-slate-500 transition
  focus  border-gold/50 ring-2 ring-gold/20 outline-none
  error  border-red-500/50 ring-2 ring-red-500/15  + text-[13px] text-red-400 helper
  disabled  opacity-50 cursor-not-allowed
  label  text-[13px] font-medium text-slate-300 mb-1.5

Checkbox / Radio   h-5 w-5 rounded-md border-white/20; checked bg-gold text-navy-950
Switch             rounded-full w-11 h-6; on bg-gradient-to-r from-gold to-amber
OptionCard         (estimator answer cards) glass rounded-2xl p-5 text-left w-full
                   hover:border-white/20; selected → border-gold/60 bg-gold/[0.07]
                   with a gold Check badge top-right; optional "Most popular" gold pill
FileDrop           border-2 border-dashed border-white/15 rounded-2xl p-8 text-center
                   drag-over → border-gold/60 bg-gold/[0.05]
```

---

## 4. Layout patterns

| Pattern | Definition |
|---|---|
| **Marketing** | Fixed header → sections in `max-w-[1200px]` → footer. Ambient blobs behind everything at `z-0`. |
| **Estimator** | Two-column ≥ `lg`: conversation column `flex-1` (max 720 px) + sticky right rail `w-[340px]` holding "Your estimate so far". Below `lg` the rail collapses into a bottom sheet with a summary bar handle. Progress indicator "Step n of N" sits in the header. |
| **Customer app** | Header (same as marketing, with the account menu replacing the CTA) → `max-w-[1200px]` content → no footer on app routes. |
| **Admin** | Sidebar 260 px + topbar 64 px + content `p-6 lg:p-8` on a `max-w-[1600px]` canvas. Page pattern: title row → `FilterBar` → content (stat grid / chart grid / `DataTable`) → pagination. |
| **Auth** | Split screen ≥ `lg`: left 45% value-prop panel on `glass-strong` with the logo, three benefit rows and a copyright line; right 55% the form on the page background. Below `lg` the panel becomes a compact header above the form. |

**Breakpoints:** 360 (floor) · `sm` 640 · `md` 768 · `lg` 1024 · `xl` 1280 · `2xl` 1536.

---

## 5. Motion

| Element | Motion |
|---|---|
| Page/section entry | Fade + 12 px rise, 400 ms `cubic-bezier(.16,1,.3,1)`, staggered 60 ms per child, triggered by IntersectionObserver at 15% |
| Wizard step change | Outgoing fades + slides −16 px (150 ms); incoming fades + slides +16 px (250 ms). Right rail values crossfade with a count-up on numbers. |
| Primary CTA | `animate-glow` idle pulse; `hover:brightness-105` + shadow expansion; `active:scale-[0.96]` |
| Result reveal | "Building your personalised estimate…" for 1.6–2.4 s with a gold progress sweep and rotating status lines, then the result card scales in from 0.96 |
| Number displays | Count-up over 800 ms with `Intl.NumberFormat` easing |
| Marquee | 28 s linear loop, pause on hover |
| Phase tracker | Connector fills left→right over 600 ms when a phase completes; the newly active dot pulses |
| Skeletons | 1.6 s shimmer |
| Toasts | Slide up 12 px + fade, 200 ms |
| **Reduced motion** | All of the above collapse to instant state changes; the ambient blobs stop animating; the marquee becomes a static, horizontally scrollable strip |

---

## 6. Accessibility rules

- Contrast: body `#E7ECF5` on `#0A0F1E` ≈ 14:1. **`text-slate-500` is forbidden for body copy** — minimum `text-slate-400` (≈ 5.2:1). Gold on navy ≈ 9.8:1; navy-950 on gold ≈ 11:1.
- Every interactive element has a visible focus ring: `focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900`.
- The wizard is a labelled `<form>` per step; option cards are real `<button role="radio">` inside a `role="radiogroup"` with `aria-checked`; progress uses `aria-live="polite"` ("Step 3 of 8").
- Accordions: `<button aria-expanded aria-controls>` + panel `role="region"`.
- Tables: `<caption class="sr-only">`, `<th scope="col">`, sort state via `aria-sort`.
- Modals/drawers: focus trap, `Esc` to close, focus restored to the trigger.
- Charts: every chart is accompanied by a visually-hidden data table.
- Touch targets ≥ 44×44 px.
- Icon-only buttons carry `aria-label`.
- Urdu: `dir="rtl"` on `<html>`, logical-property spacing utilities so the layout mirrors automatically.

---

## 7. Screen index

| # | Screen | Route | Status |
|---|---|---|---|
| S-01 | Homepage | `/` | [EXISTING] — rebrand + recopy |
| S-02 | About Al-Wahab | `/about` | [NEW] — replaces "For companies" |
| S-03 | FAQ | `/faq` | [EXISTING] section → also a standalone page |
| S-04 | Contact | `/contact` | [NEW] |
| S-05 | Privacy / Terms | `/privacy`, `/terms` | [NEW] |
| S-06 | Estimator — entry | `/estimate` | [EXISTING] |
| S-07 | Estimator — bill upload + confirm | `/estimate` step 1 | [EXISTING] design, [NEW] functionality |
| S-08 | Estimator — steps 2–8 | `/estimate` | [EXISTING] |
| S-09 | Estimator — building + result | `/estimate` | [EXISTING] |
| S-10 | Full estimate detail | `/estimate/[ref]` | [EXISTING] |
| S-11 | Tier comparison modal | overlay | [EXISTING] |
| S-12 | Sign up / Log in | `/signup`, `/login` | [EXISTING] design, [NEW] functionality |
| S-13 | Phone OTP verification | `/verify` | [NEW] |
| S-14 | Forgot / reset password | `/reset` | [NEW] |
| S-15 | Customer dashboard | `/dashboard` | [EXISTING] |
| S-16 | Dashboard empty state | `/dashboard` | [EXISTING] |
| S-17 | My estimates | `/estimates` | [NEW] |
| S-18 | Estimate compare | `/estimates/compare` | [NEW] |
| S-19 | Project detail | `/projects/[ref]` | [NEW] |
| S-20 | Notifications | `/notifications` | [NEW] |
| S-21 | Profile & settings | `/profile` | [NEW] |
| S-22 | Leave a review | `/projects/[ref]/review` | [NEW] |
| A-01…A-18 | Admin panel | `/admin/**` | [NEW] — see `05-admin-panel.md` |
| E-01 | 404 / 500 / offline | — | [NEW] |

---

## 8. Public screens

### S-01 · Homepage `/` **[EXISTING — rebrand only]**

**Do not restructure.** Section order, spacing, animations and component anatomy stay exactly as in the captured HTML. Only these change:

1. Logo → new mark and wordmark.
2. All copy → `06-content-copy-deck.md`.
3. The **"For solar companies"** section is replaced in place by **"About Al-Wahab Solar Traders"** — same two-column layout, same card grid, same CTA position; new content (established since, installs completed, certified in-house team, warranty promise) and CTAs "Learn about us" / "Talk to our team".
4. Reviews are wired to real approved reviews; if fewer than 3 exist, hide the section (never show "Sample review").
5. The bottom lead form posts to the server and creates a Lead.

**Section inventory (preserve):**

| # | Section | Notes |
|---|---|---|
| 1 | Fixed header | Logo · Home / How it works / Why us / About / FAQ · EN-اردو · "Free estimate" CTA |
| 2 | Hero | Gold eyebrow pill "Lahore's solar estimator" · h1 with `text-gradient-gold` on "in 2 minutes" · lede · two CTAs · bill-upload hint line · floating tilt card showing "6.5 kW / ~PKR 28k per month saved" with a live "Updated {date}" stamp |
| 3 | Trust marquee | Six pills, looping |
| 4 | Four-card value strip | Live Lahore prices · Certified in-house team · Itemized & transparent · Free for homeowners |
| 5 | How it works | Four numbered steps (Step 01–04) in a 2×2 → 4-col grid |
| 6 | Why Al-Wahab | Six cards, each: small gold category label + `font-display` title + body |
| 7 | Sample itemized estimate | Receipt-style card: header chip "al-wahab · solar estimate" + "Sample" badge, six line items with spec sub-labels and right-aligned PKR, total row, three stat tiles (saving / payback / size), CTA "Get your estimate" |
| 8 | Reviews | Three cards with a 5-star gold row, quote, "Homeowner · {area}, Lahore" and a system chip |
| 9 | About Al-Wahab | *(replaces "For companies")* |
| 10 | FAQ | Five-item accordion |
| 11 | Final CTA + lead form | Left: heading, lede, three ticked assurances. Right: `glass-strong` form — Full name, Email, Phone, Monthly electricity bill (select), Area/town (optional), submit "Start my free estimate", micro-copy "No spam…" |
| 12 | Footer | Logo + descriptor + "Shine On!" strapline · Product column · Company column · Contact block (Lahore, Pakistan / email / phone / WhatsApp) · © line · Privacy / Terms / Sitemap |
| 13 | Mobile sticky bar | "Free solar estimate · Takes about 2 minutes" + "Start" — `glass-strong`, appears after 40% scroll, below `sm` only |

### S-02 · About Al-Wahab `/about` **[NEW]**

Hero band (h1 + lede) → "Our story" two-column (text + image) → stat row of four `KpiTile`s (years in business, installs completed, kW deployed, average rating) → "How we work" four-step reuse of the How-it-works component → "Our promise" six-card grid reusing the Why-us card → team strip (optional) → CTA band identical to the homepage's.
*If real numbers are unavailable, omit the stat row entirely rather than showing placeholders.*

### S-03 · FAQ `/faq` **[EXISTING component]**
Same accordion, expanded to categories (Pricing · Technical · Net metering · Installation · Warranty & service) with a sticky category nav on `lg`. Emits `FAQPage` JSON-LD.

### S-04 · Contact `/contact` **[NEW]**
Two columns: left `glass` info card (address, phone, WhatsApp, email, opening hours, embedded map) and right the lead form (same fields as the homepage plus a Message textarea). Success state replaces the form in place with a gold check and "We'll call you within one working day."

### S-05 · Privacy / Terms **[NEW]**
Single `max-w-[760px]` prose column, `glass rounded-2xl p-8`, sticky table of contents on `lg`, "Last updated" stamp.

---

## 9. Estimator screens

> **Global rule:** the estimator's design, question order, option copy and right-rail behaviour are already correct. Port them. The only functional additions are real persistence, real OCR and server-side pricing.

### S-06 · Entry `/estimate` **[EXISTING]**
Roshni avatar (gold ring, sun glyph) + greeting bubble; three choice cards stacked full-width: **Upload your LESCO bill** (badge "Most accurate", `Upload` icon, sub-label "Photo or PDF"), **Answer a few questions instead**, **Use a sample bill** (ghost). Right rail shows the empty state: "Answer the questions and your tailored solar specs will appear here."

### S-07 · Bill upload → confirm **[EXISTING design, NEW function]**
- **Upload state:** `FileDrop` with camera capture on mobile (`accept="image/*,application/pdf" capture="environment"`), thumbnail preview, remove button.
- **Reading state:** Roshni bubble "Great — let me read your bill." + a shimmer skeleton of the confirm card, 2–6 s.
- **Confirm state:** card titled "Found these details — please confirm" with editable **Avg monthly usage (kWh)** (numeric + "units" suffix), **Connection phase** (Single-phase / Three-phase segmented), **Installation address**; helper "You can edit any field"; primary "Confirm details".
- **Low confidence (< 0.6):** add an amber inline note "Please double-check these — the bill was hard to read."
- **Failure:** amber card "I couldn't read that bill clearly" + "Enter details manually" + "Try another photo".

### S-08 · Question steps 2–8 **[EXISTING]**

Each step renders as: a Roshni bubble (question + one-line rationale), an `OptionCard` group, and a `Continue` button that stays disabled until a valid selection. Answered steps collapse upward into a compact grey summary line (e.g. "980 units/mo · Three-phase") — exactly as today.

| Step | Question | Options / control |
|---|---|---|
| 2 | What should your solar system do for you? | Cover my whole bill · Reduce my bill · Fit a budget (budget input reveals inline) |
| 3 | Which system type suits you best? | On-grid · **Hybrid** *(gold "Most popular in Lahore" pill)* · Off-grid |
| 4 *(hybrid/off-grid only)* | During outages, what should keep running — and for how long? | Multi-select load chips (Fans & lights · Refrigerator · 1 air conditioner · Internet/router · Water pump) + `RangeSlider` 1–12 h with a live "4 hours" readout |
| 5 | Where will the panels go, and how much space is there? | RCC roof · Metal sheet · Ground mount · Carport/shed + area input with a sq ft ⇄ marla unit toggle (1 marla = 272.25 sq ft) |
| 6 | What mounting structure should we plan for? | Two grouped choices: Standard / Customized, and Medium (galvanised iron) / Good (hot-dip / aluminium) |
| 7 | What matters most for your build? | Segmented "By priority / By budget"; priority → Lowest price · **Best value** *(gold "Recommended" pill)* · Best quality |
| 8 | Want to sell your extra units back to the grid? | Yes, apply for net metering · Not right now |

**Right rail** ("Your estimate so far", `glass-strong rounded-2xl p-5`, sticky `top-28`): title + "Updates as you answer"; then **Indicative system** (`font-display text-[32px] text-gold`) with "~PKR n/mo saved" beneath; then a definition list of answered facts (Usage, Goal, System, Backup, Roof, Structure, Priority, Net metering) each appearing with a 200 ms fade; footer badge "Free, no-obligation estimate". Below `lg`: a fixed bottom bar showing size + saving, expanding to a full sheet on tap.

**Back navigation:** every collapsed summary line is clickable to re-open that step; browser back moves one step.

### S-09 · Building + result **[EXISTING]**
Building: centred gold ring progress with rotating lines ("Sizing your system…", "Pricing on live Lahore rates…", "Checking net-metering options…"), 1.6–2.4 s.
Result card (`glass-strong rounded-3xl p-8`): "Your estimate is ready" eyebrow → **6.5 kW** + `Hybrid` chip → **Estimated price** range in `text-gradient-gold` → three stat tiles (Saved/month · Payback · CO₂/year) → primary **View your full estimate** → secondary **Email me this estimate** → disclaimer "Indicative figures from live Lahore prices. A free site survey confirms the final quote."

### S-10 · Full estimate `/estimate/[ref]` **[EXISTING]**

Numbered sections, all preserved:

1. **Cost breakdown** — recommended-system panel (size + type + tier name + rationale + four spec rows) and the itemized table (8 rows: Solar panels, Inverter, Battery, Mounting structure, Wiring + BOS, Net metering, Installation labour, Transport), each with a spec sub-label and right-aligned amount; **Subtotal**; **Estimated range** in gold with "±6% market buffer applied · Prices valid as of {date}".
2. **Estimated time** — two side-by-side timelines: *System installed & running ~1 week* (Order confirmed → Procurement → Installation → Commissioning) and *Net metering live ~5–9 weeks* (Application → Documentation → LESCO inspection → Meter install → Approval), each step a numbered node with a duration chip.
3. **Project phases & tasks** — "6 phases · 27 tasks" counter, note that Al-Wahab confirms the exact plan after the survey, then six expandable phase cards each listing its tasks with a task count and duration.
4. **Energy & savings** — four stat tiles (Monthly generation, Bill coverage, Estimated savings, Payback) + explanatory note on net metering and tariff slabs.
5. **What's included / Not included** — two columns, gold checks vs slate dashes.
6. **Warranties** — five-row table (Solar panels, Inverter, Battery, Mounting structure, Workmanship).
7. **Compare equipment tiers** — three cards (Economy/Standard/Premium) with price ranges and four spec rows; the active tier shows a gold border + "Chosen" badge; others show "Choose {tier}".
8. **Disclaimer** paragraph with the validity date.
9. **Sticky action bar** (bottom on mobile, right-aligned on desktop): **Save & book a free site survey** (primary) · **Switch tier** · **Download PDF**.

*Copy change:* "Save & get quotes from verified companies" → **"Save & book a free site survey"**; all "the company you hire" phrasing → "our team".

### S-11 · Tier comparison modal **[EXISTING]**
Full-width comparison table (rows: Panels, Inverter, Battery, Structure, Price, Warranty; columns: the three tiers with their taglines), active column highlighted gold; footer "Apply {tier} tier" / "Cancel". Below `sm` it becomes a horizontally-swipeable card row.

---

## 10. Auth screens

### S-12 · Sign up / Log in **[EXISTING design]**

Split layout. **Left panel** (`glass-strong`, hidden below `lg`): logo, `font-display` headline "Save your estimate. Compare. Track.", supporting line, three benefit rows with gold check icons — *Installed by our own certified team* · *Your itemized estimate, saved* · *Track every phase of your install* — and the © line.

**Right panel:** header row "Homeowner account" + EN/اردو toggle → `font-display` "Create your account" + "It takes less than a minute." → **pending-estimate chip** when arriving from the estimator (`glass rounded-xl p-3`: "Save your 6.5 kW estimate · PKR 1.47M–1.66M · Standard") → Sign up / Log in segmented tabs → **Continue with Google** → "or" divider → fields (Full name · Phone or email · Password with a strength meter and show/hide) → link "Use a one-time code instead" → primary **Create account** → "Already have an account? Log in" → legal line → footer link "Are you a solar company?" **removed** and replaced with "Questions? Talk to our team →".

States: field-level errors, disabled submit while pending with a spinner, generic "Those details don't match" on login failure (never reveal which field), rate-limit notice after 5 attempts.

### S-13 · OTP verification `/verify` **[NEW]**
Centred `glass-strong rounded-2xl max-w-[420px] p-8`: logo, "Enter the code we sent to +92 3•• ••• ••42", six auto-advancing single-digit inputs (paste-aware), 60 s resend countdown, "Change number", error shake on invalid.

### S-14 · Reset password `/reset` **[NEW]**
Same centred card. Step 1 email input → success confirmation ("If that address exists, a reset link is on its way"). Step 2 (from the link) new password + confirm with the strength meter → success → auto sign-in.

---

## 11. Customer app screens

### S-15/16 · Dashboard `/dashboard` **[EXISTING]**

Header: "Assalam-o-Alaikum, {first name}" (`font-display text-[28px]`), sub-line "Your projects", a **With projects / Empty** view toggle *(this is a demo affordance in the captured build — remove it in production)*, and a primary **New estimate** CTA.

KPI row — four `KpiTile`s: **Saved estimates** · **Active projects** · **In progress** · **Completed**.
*(Replaces the v1 "Quotes received" tile, which no longer applies under direct-installer positioning.)*

Project/estimate cards (`glass rounded-2xl p-5`, one column on mobile, two on `md`, three on `xl`):
row 1 — `font-display` size + tier chip (e.g. "8 kWp · Standard"); row 2 — area, slate; row 3 — `StatusChip` + price range; row 4 — context line ("Survey booked for Thu 6 Aug", "Installation 60% done", "Commissioned · net metering live"); row 5 — "Updated {relative}" + a contextual primary action:

| Status | Action |
|---|---|
| Estimate saved | **Book a free site survey** |
| Survey requested / scheduled | **View survey details** |
| Quotation issued | **Review quotation** |
| In progress | **Track installation** |
| Completed | **Leave a review** |
| Expired | **Re-price this estimate** |

In-progress cards carry a 4 px gold progress bar at the card's foot.

Final card in the grid: dashed-border **"Start a new estimate — price another home or system in ~2 minutes"**.

**Empty state** (existing): centred sun-in-tile icon, "No projects yet", the two-line explainer, **Get your first estimate**.

### S-17 · My estimates `/estimates` **[NEW]**
`FilterBar` (search, status, tier, date range, size range) → responsive `DataTable` on `lg` / card list below. Columns: Ref · Size & type · Tier · Area · Price range · Created · Valid until (amber chip when < 3 days, red when expired) · Status · Actions (View, Download PDF, Duplicate, Re-price, Book survey, Delete). Multi-select enables **Compare (2–3)**.

### S-18 · Compare estimates `/estimates/compare` **[NEW]**
Two or three columns side by side sharing aligned rows: system size, type, tier, each line item, subtotal, range, monthly saving, payback, CO₂. Differing rows are highlighted with a subtle gold left border. Sticky header row. Below `md`, horizontal swipe with a sticky label column.

### S-19 · Project detail `/projects/[ref]` **[NEW]**

1. **Header** — back link, `font-display` title "8 kWp Hybrid — Johar Town", `StatusChip`, ref, contract value, overall progress ring.
2. **PhaseTracker** — the six phases; the active phase auto-expands showing tasks with status icons, owner and date.
3. **Two-column body ≥ `lg`:** left = timeline of `project_updates` (photos inline, newest first); right = stacked `glass` cards — **Your system** (specs), **Your team** (assigned sales + crew lead with call/WhatsApp buttons), **Documents** (agreement, invoices, warranty, net-metering approval — each with a download button), **Payments** (schedule with paid/due chips and totals).
4. **Sticky footer bar** — contextual action (Accept quotation / Confirm survey slot / Leave a review) + "Message our team" (WhatsApp deep link).

### S-20 · Notifications `/notifications` **[NEW]**
Grouped by Today / This week / Earlier. Each row: type icon in a tinted tile, title, body, relative time, unread gold dot; row click navigates to the entity. Header actions: "Mark all read", filter by type. Empty state: "You're all caught up."

### S-21 · Profile & settings `/profile` **[NEW]**
Left vertical tab rail (`lg`) / top tabs (mobile): **Profile** (avatar, name, phone with re-verify, email, city, area, address) · **Security** (change password, 2FA toggle, active sessions list with "Sign out everywhere") · **Preferences** (language EN/اردو, notification channel matrix — in-app / email / SMS per event type) · **Data** (Download my data, Delete my account with a typed-confirmation dialog).

### S-22 · Leave a review `/projects/[ref]/review` **[NEW]**
Centred card: project summary strip, 5-star gold selector with hover labels, textarea (min 20 chars, counter), optional photo upload, consent checkbox "You may publish this review with my first name and area", submit. Success: "Thank you — your review is with our team for approval."

---

## 12. System screens

### E-01 · Errors **[NEW]**
Shared centred layout on the standard background: large `font-display` code in `text-gradient-gold`, headline, one-line explanation, **Back to home** + **Get an estimate**.
- **404** "This page has set." / "The link you followed doesn't exist any more."
- **500** "Something went dark." / "Our team has been notified. Please try again in a moment."
- **Offline (PWA)** "You're offline." / "Your saved estimates will sync when you reconnect."
- **Maintenance** logo, "We're upgrading. Back shortly." plus the WhatsApp number.

---

## 13. Email & PDF design

**Email** (react-email, 600 px, light background so it renders everywhere): navy `#023489` header band with the light logo lock-up → white content card → gold CTA button (`#F5AC3C`, navy text, 8 px radius) → footer with address, phone, "Shine On!" and an unsubscribe link for marketing mail.
Templates: welcome · verify email · OTP · password reset · estimate ready (PDF attached) · estimate expiring in 3 days · survey confirmed · quotation issued · project status changed · project completed + review request · admin new-lead alert · weekly owner digest.

**Estimate PDF** (A4, React-PDF): cover band in `wahab-blue` with the light logo, estimate ref, date and validity → customer + site block → recommended system panel → itemized table → range with the buffer note → timeline → phases & tasks → energy & savings → included / not included → warranties → tier comparison → terms and disclaimer → footer on every page with the mark, page number and "Shine On!". Typography: Space Grotesk headings, Manrope body, navy text on white, gold rules.

---

## 14. Do-not-change checklist (for visual review before release)

- [ ] Body background gradient stack is byte-identical to the current build
- [ ] `.glass` / `.glass-strong` values unchanged
- [ ] Gold `#FFB800`, amber `#FF8C00`, cyan `#00E5FF`, navy `#0A0F1E` / `#05080F` unchanged
- [ ] Space Grotesk + Manrope, same weights
- [ ] Header height, scroll-shrink behaviour, nav item padding and radii unchanged
- [ ] Primary CTA gradient, shadow and glow animation unchanged
- [ ] Container width 1200 px and section rhythm unchanged
- [ ] Estimator two-column layout with the sticky right rail unchanged
- [ ] Estimate detail section order and receipt-style table unchanged
- [ ] Dashboard card anatomy unchanged
- [ ] Playwright screenshot diff of `/` and `/estimate` at 375 px and 1440 px shows differences confined to the logo and text

---

*Companion documents: `01-prd.md`, `02-technical-design.md`, `05-admin-panel.md`, `06-content-copy-deck.md`, `07-implementation-plan.md`.*
