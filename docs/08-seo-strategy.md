# Al-Wahab Solar Traders — SEO Strategy

| | |
| --- | --- |
| **Document** | SEO & Structured Data Strategy — **local-first** |
| **Version** | 2.0 |
| **Status** | Approved for implementation |
| **Companion** | `03-design-system.md`, `05-admin-panel.md` |

The point of this document is that SEO is **built during development, not retrofitted**.
Every section ends with a concrete checklist item tied to a build phase. If a
feature ships without its checklist item, it shipped incomplete.

> **Scope decision (v2.0): this is a LOCAL SEO strategy.**
> Al-Wahab sells and installs in Lahore. We are not competing nationally, and we
> are not chasing traffic that cannot convert. Every decision below optimises for
> one thing: *a person in Lahore, ready to buy, finds us.*
> Where local and general SEO conflict, **local wins**.

---

## 1. Why local changes the whole plan

For a local business the highest-value real estate is not the organic list — it
is the **map pack**, the three-result block with a map that sits *above* organic
results:

```
┌──────────────────────────────────────────┐
│  Google: "solar inverter shop lahore"    │
├──────────────────────────────────────────┤
│  Ads                                     │
│  ┌────────────────────────────────────┐  │
│  │  MAP PACK — 3 businesses  ← we win │  │  driven by Google Business
│  │  ★ reviews · hours · directions    │  │  Profile, reviews, proximity
│  └────────────────────────────────────┘  │
│  Organic result 1                        │  ← driven by the website
│  Organic result 2                        │
└──────────────────────────────────────────┘
```

That block is won by **Google Business Profile, reviews, and proximity** — not by
page count. So the priority order is:

| Rank | Lever | Owned by | Effort |
| --- | --- | --- | --- |
| **1** | Google Business Profile, fully populated | Business | Hours, not weeks |
| **2** | Real customer reviews on GBP | Business | Ongoing |
| **3** | NAP consistency everywhere | Both | Small, easy to get wrong |
| **4** | `LocalBusiness` schema matching GBP | Dev | Done — §3.2 |
| **5** | Locally-framed product/service pages | Both | The bulk of dev work |
| **6** | Local citations and directories | Business | A day |

**Items 1–3 are worth more than everything the developer can do**, and they cost
almost nothing. They are not optional extras; they are the strategy. A perfect
website with an unclaimed GBP loses to a mediocre website with 40 reviews.

### What we compete for, and what we ignore

| Query | Verdict |
| --- | --- |
| "solar panels" | **Ignore.** National head term, owned by aggregators, and a buyer in Karachi is worthless to us. |
| "solar panel price in pakistan" | **Ignore.** High volume, no local intent, will not convert. |
| "solar company in lahore" | **Target.** Core local intent. |
| "solar inverter shop johar town" | **Target.** Highest intent that exists — near-ready to walk in. |
| "Longi 585W price in lahore" | **Target.** Local + product + commercial intent. |
| "net metering lahore lesco" | **Target.** Local, specific, and we genuinely do it. |
| "battery bank configuration near me" | **Target.** "Near me" is pure local intent. |

Every page title in this project ends up containing **Lahore** or an area name
for exactly this reason. That is deliberate, not repetition.

### The estimator's role

The estimator is still the strategic asset, but reframed: it is a **local
trust-builder and lead capture**, not a national traffic play. It prices on live
*Lahore* rates, which no national aggregator can match. Keep it locally framed —
"Lahore solar calculator", not "Pakistan solar calculator".

---

## 2. URL architecture

**URLs are permanent.** Once Google indexes a URL, changing it costs you the
ranking and requires a 301. Decide once, here.

```
/                                     Home
/about                                About
/contact                              Contact  (NAP, LocalBusiness schema)
/faq                                  FAQ      (FAQPage schema)
/estimate                             Estimator entry
/estimate/[ref]                       Estimate result — noindex (user data)

/products                             Catalogue root, all categories
/products/[category]                  e.g. /products/inverters
/products/[category]/[slug]           e.g. /products/inverters/growatt-spf-5000es
/brands                               Brand index
/brands/[slug]                        e.g. /brands/longi

/services                             Services index
/services/[slug]                      e.g. /services/battery-bank-configuration
```

Rules, non-negotiable:

- **Subfolders, never subdomains.** `alwahabsolar.pk/products/…`, not
  `products.alwahabsolar.pk`. Subdomains split domain authority; subfolders
  compound it.
- **Lowercase, hyphenated, no IDs.** `growatt-spf-5000es`, not `product-4821`.
- **Slug is immutable.** The admin UI must warn before editing a slug on a
  published product, and write a redirect when it happens.
- **No trailing slash** (Next.js default). Be consistent — both forms indexed is
  duplicate content.
- **Category is in the product URL.** It adds a keyword and makes breadcrumbs
  natural. A product belongs to exactly one category for this reason.

> ✅ **Phase A** — implement these routes exactly. Slug uniqueness is already
> enforced in `prisma/schema.prisma` (`Product.slug`, `ProductCategory.slug`,
> `Brand.slug`, `Service.slug`).

---

## 3. Structured data (JSON-LD)

This is the part that makes Google show your product **with price, stock and
rating directly in results**. It is the highest-leverage SEO work in the whole
project.

Use JSON-LD in a `<script type="application/ld+json">`, never microdata.
Combine multiple schemas per page with `@graph`.

### 3.1 What goes on which page

Our `organizationSchema()` builder emits type **`ElectricalContractor`** — a
subtype of `LocalBusiness` — carrying address, geo, `areaServed`,
`openingHoursSpecification` and `hasMap`. That single builder is the local
backbone and is reused by `@id` everywhere else.

| Page | Schema types | Status |
| --- | --- | --- |
| Home | `LocalBusiness` + `WebSite` + `Service` | ✅ done |
| Contact | `LocalBusiness` + `ContactPage` + `BreadcrumbList` | ✅ done |
| FAQ | `FAQPage` + `BreadcrumbList` | ✅ done |
| `/products` | `+ CollectionPage`, `BreadcrumbList` |
| `/products/[category]` | `+ CollectionPage`, `ItemList`, `BreadcrumbList` |
| `/products/[category]/[slug]` | `+ Product` (+ `Offer` — see 3.3), `BreadcrumbList` |
| `/brands/[slug]` | `+ Brand`, `ItemList`, `BreadcrumbList` |
| `/services/[slug]` | `+ Service`, `BreadcrumbList` |
| `/estimate` | `+ WebApplication` or `SoftwareApplication` |

### 3.2 Organization + LocalBusiness

Al-Wahab is a physical business in Lahore. `LocalBusiness` (specifically
`ElectricalContractor` or `Store`) drives the map pack and the knowledge panel.

```ts
{
  "@context": "https://schema.org",
  "@type": "ElectricalContractor",
  "@id": "https://alwahabsolar.pk/#organization",
  name: "Al-Wahab Solar Traders",
  url: "https://alwahabsolar.pk",
  logo: "https://alwahabsolar.pk/logo.png",
  image: "https://alwahabsolar.pk/og/storefront.jpg",
  telephone: "+92-XXX-XXXXXXX",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "…",
    addressLocality: "Lahore",
    addressRegion: "Punjab",
    postalCode: "…",
    addressCountry: "PK",
  },
  geo: { "@type": "GeoCoordinates", latitude: 31.5204, longitude: 74.3587 },
  areaServed: { "@type": "City", name: "Lahore" },
  openingHoursSpecification: [{
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    opens: "09:00", closes: "19:00",
  }],
  sameAs: ["https://facebook.com/…", "https://instagram.com/…"],
}
```

`@id` matters: it lets every other schema on the site reference this one entity
instead of redeclaring it.

### 3.3 Product — and the price problem

Some products are priced, some are quote-only. This changes the markup, and
getting it wrong produces Search Console errors across the whole catalogue.

**Priced product** (`priceMode = fixed` or `from`) — emit a full `Offer`:

```ts
{
  "@type": "Product",
  name: product.nameEn,
  description: product.summaryEn,
  image: product.images.map(i => i.url),
  sku: product.sku,
  brand: { "@type": "Brand", name: product.brand.name },
  category: product.category.nameEn,
  additionalProperty: Object.entries(product.specs).map(([name, value]) => ({
    "@type": "PropertyValue", name, value: String(value),
  })),
  offers: {
    "@type": "Offer",
    url: canonicalUrl,
    price: product.pricePkr,        // number, no commas, no "PKR"
    priceCurrency: "PKR",
    availability: STOCK_MAP[product.stockStatus],
    priceValidUntil: "…",           // required for rich results
    seller: { "@id": "https://alwahabsolar.pk/#organization" },
  },
}
```

**Quote-only product** (`priceMode = on_request`) — **omit `offers` entirely.**

Do *not* emit an `Offer` with `price: 0` or a missing price. Google treats that
as invalid structured data and it can suppress rich results catalogue-wide. A
`Product` without `offers` is perfectly valid — you simply forgo the price rich
result, which you couldn't have earned anyway without a price.

Stock mapping:

```ts
const STOCK_MAP = {
  in_stock:     "https://schema.org/InStock",
  out_of_stock: "https://schema.org/OutOfStock",
  preorder:     "https://schema.org/PreOrder",
  discontinued: "https://schema.org/Discontinued",
};
```

> ⚠️ Never mark up a rating you don't have. Fake `aggregateRating` is a manual
> action risk. Only emit it once real approved reviews exist (`Review.status =
> approved`), and only with the true count.

### 3.4 Validation gate

Structured data that is never validated is usually broken. Before any catalogue
page ships:

1. Google **Rich Results Test** — must pass for a priced product, a quote-only
   product, and a category page.
2. **Schema.org validator** — zero errors.
3. Search Console → Enhancements, one week post-launch — zero invalid items.

> ✅ **Phase B** — implement `lib/seo/schema.ts` with one typed builder per
> schema type. Never hand-write JSON-LD in a page component.

---

## 4. Metadata rules

Next.js 16's Metadata API handles this. Formulas, not improvisation:

| Page | Title (≤ 60 chars) | Description (≤ 155 chars) |
| --- | --- | --- |
| Home | `Solar Panels, Inverters & Installation in Lahore — Al-Wahab` | Value prop + CTA |
| Category | `{Category} in Lahore — Prices & Models \| Al-Wahab` | What's stocked, price range, delivery |
| Product (priced) | `{Brand} {Name} Price in Lahore — PKR {price}` | Key specs + warranty + CTA |
| Product (quote) | `{Brand} {Name} in Lahore — Al-Wahab Solar` | Key specs + "WhatsApp for price" |
| Brand | `{Brand} Solar Products in Lahore \| Al-Wahab` | Range + why this brand |
| Service | `{Service} in Lahore — Al-Wahab Solar Traders` | What's included + who it's for |

Every page must have:

- Unique `<title>` and description — **duplicates are a ranking cap**, and with a
  generated catalogue they're the easiest mistake to make.
- `alternates.canonical` — absolute URL, always self-referencing.
- `openGraph` with a 1200×630 image. For products, the product photo.
- `robots: { index: false }` on: estimate results, all `/dashboard/**`,
  `/admin/**`, all auth pages. Already handled in `robots.ts`.

Admin overrides: `metaTitle` / `metaDescription` exist on `Product`,
`ProductCategory`, `Brand` and `Service`. When null, generate from the formula
above. Never leave the field to chance.

> ✅ **Phase B** — `generateMetadata()` on every dynamic route, driven by a
> shared formula helper so titles stay consistent as the catalogue grows.

---

## 5. Programmatic SEO — scaling the catalogue

The catalogue is the pSEO engine. The risk is **thin content**: 200 pages that
differ only by a swapped product name get filtered out of the index entirely.

### 5.1 Minimum bar for a product page to be indexable

A product page ships only when it has:

- [ ] ≥ 150 words of genuinely product-specific prose in `bodyEn` — not a spec
      dump, not boilerplate with the name swapped
- [ ] ≥ 2 real photographs (not just the manufacturer render)
- [ ] A complete `specs` object for its category
- [ ] Warranty terms
- [ ] Unique meta title + description

Products below the bar stay `status = draft` and are **excluded from the
sitemap**. It is far better to have 40 indexed pages that rank than 200 that
Google ignores.

### 5.2 Where unique value comes from

We have genuinely proprietary data most competitors lack:

1. **Real Lahore pricing** — live market rates, already the estimator's premise.
2. **Compatibility knowledge** — which inverter pairs with which battery bank.
   "Works with" content is unique, useful, and highly searched.
3. **Installed-base experience** — "we've installed 40 of these in Lahore; here
   is how they behave in a 45 °C summer." No competitor can copy that.
4. **Net-metering specifics** — LESCO approval reality per product.

That's the difference between a page that ranks and a spec sheet.

### 5.3 Page families, in priority order

| Wave | Pattern | Count | Rationale |
| --- | --- | --- | --- |
| 1 | `/products/[category]` | ~7 | Highest intent, few pages, fastest wins |
| 2 | `/products/[category]/[slug]` | 40 → 200 | The long-tail engine |
| 3 | `/services/[slug]` | ~8 | Local service intent |
| 4 | `/brands/[slug]` | ~15 | Brand-led searches |
| 5 | Comparison pages `x-vs-y` | ~20 | High intent, later |
| 6 | Area pages `solar-installation-[area]` | ~15 | Only with genuinely local content |

**Do not build wave 6 as templates with the area name swapped.** That is a
doorway-page pattern and it is penalised. Build them only when there is a real
installation, real photos and real specifics per area.

> ✅ **Phase C** — waves 1–3. Waves 4–6 after the first pages are indexed and
> we can see what's working.

---

## 6. Technical SEO checklist

Next.js 16 gives most of this if the routes are built correctly.

**Indexing**
- [ ] `sitemap.ts` generated from the database — published products, categories,
      brands, services, plus static pages. Draft/archived excluded.
- [ ] `robots.ts` — private surfaces disallowed (done)
- [ ] Canonical on every page
- [ ] 301 redirect written automatically whenever a published slug changes
- [ ] Custom 404 that links to the catalogue rather than dead-ending

**Performance** (Core Web Vitals are a ranking factor)
- [ ] `next/image` everywhere, with explicit `width`/`height` — prevents CLS.
      `ProductImage` stores dimensions for this reason.
- [ ] Product images served as WebP/AVIF
- [ ] LCP < 2.5s, INP < 200ms, CLS < 0.1
- [ ] Catalogue pages are Server Components — the carousel may be a Client
      Component, but the **product data must be server-rendered**. A carousel
      that fetches on the client renders an empty page to Googlebot.

**Crawlability**
- [ ] Every product reachable by a crawlable `<a href>`, not only via the
      carousel. The catalogue index is what makes the long tail discoverable.
- [ ] Breadcrumbs on every catalogue page, with `BreadcrumbList` schema
- [ ] Internal linking: product → category → related products

**International**
- [ ] `hreflang` for en/ur once Urdu pages are real URLs. Today the locale is a
      cookie-driven client toggle, which Google cannot index — **the Urdu
      content is currently invisible to search**. Converting to `/ur/…` routes
      is a genuine SEO opportunity, and a decision to take deliberately.

---

## 7. Local SEO — the primary channel

This is not a supporting section. Per §1 this outranks every other lever here.

### 7.1 Google Business Profile — do this first

- [ ] **Claim and verify** the listing. Nothing else in local search works until
      this exists.
- [ ] Primary category **"Solar energy contractor"**; secondaries for
      "Solar panel shop" / "Electrician" as applicable.
- [ ] Exact address and the **map pin dropped on the actual premises**.
      Proximity to the searcher is a ranking factor, and a pin in the wrong place
      silently costs you every nearby search.
- [ ] Hours matching `SITE.openingHours` (Mon–Sat, 09:00–18:00) exactly.
- [ ] The WhatsApp number as the contact, since that is our conversion path.
- [ ] **Photos** — storefront, team, real installations. Listings with photos get
      materially more direction requests and calls.
- [ ] Products and services populated from our own catalogue.
- [ ] Q&A seeded with the real questions from `/faq`.

### 7.2 Reviews — the strongest signal we do not control

- [ ] Ask **every** completed installation for a GBP review. Build it into the
      handover phase (`phase_templates` already has `handover`).
- [ ] Reply to all of them, positive and negative.
- [ ] Reviews that mention the **area** and the **service**
      ("net metering in Johar Town") are disproportionately valuable.
- [ ] Never buy reviews and never mark up an `aggregateRating` we did not earn —
      both are manual-action risks (§3.3).

### 7.3 NAP consistency

Name, address and phone must be **byte-identical** everywhere. Ours:

```
Al-Wahab Solar Traders
Main Boulevard, Johar Town, Lahore, Punjab, PK
+92 42 111 765 765   (landline, tel: links)
+92 329 477 7785     (WhatsApp, wa.me links)
```

The site reads these from one place — `apps/web/src/lib/seo/site.ts` and the
`business.whatsapp_number` setting — so the rendered address and the JSON-LD can
never drift. Any directory listing must match this block character for character.

- [ ] Still missing: **building/plot number and postcode.** Without them the
      address cannot be verified against GBP.
- [ ] Still missing: **real lat/long.** Currently Lahore city centre.

### 7.4 Citations and directories

- [ ] Pakistani directories: Zameen, OLX business, Locanto, PakBiz
- [ ] Lahore Chamber of Commerce, local trade bodies
- [ ] Facebook and Instagram business pages with identical NAP, linked from
      `SITE.socials` so they appear in `sameAs`

### 7.5 Area pages — later, and only with real content

Pages like `/services/solar-installation-johar-town` are the natural local play,
but they are also the classic way to earn a **doorway-page penalty**. The rule:

> An area page ships only when it contains something true about that area that
> could not be copy-pasted to another — a real installation, real photos, a real
> constraint (roof types, LESCO feeder, access).

Ten area pages with genuine local content beat fifty templated ones, and fifty
templated ones can drag the whole domain down. Deferred to wave 6 (§5.3).

---

## 8. Measurement

Baseline before launch, or improvement is unprovable.

- [ ] Google Search Console — verified, sitemap submitted
- [ ] GA4 or Plausible, plus our own `visitor_sessions` / `page_views` tables
- [ ] Track as conversions: WhatsApp clicks, estimator completions, contact
      submissions
- [ ] Monthly: impressions, average position, CTR by page family

**WhatsApp clicks are the primary conversion for the catalogue.** There is no
checkout, so an unmeasured WhatsApp click means an unmeasured funnel. Wire the
event from day one.

---

## 9. Implementation checklist by phase

| Phase | Deliverable |
| --- | --- |
| **A — Schema & routes** | Catalogue models (done); routes per §2; slug immutability + redirect-on-change |
| **B — SEO primitives** | `lib/seo/schema.ts` typed builders; `generateMetadata()` on all dynamic routes; DB-driven `sitemap.ts` |
| **C — Catalogue UI** | Category + product pages server-rendered; breadcrumbs; carousel as progressive enhancement over crawlable links |
| **D — Content** | Meet §5.1 bar for the first 40 products before publishing any |
| **E — Local** | GBP, NAP, LocalBusiness schema |
| **F — Measure** | GSC, analytics, WhatsApp conversion tracking |
| **G — Expand** | Waves 4–6; comparison pages; consider `/ur/` routes |

---

## 10. Rules that override convenience

1. **Never publish a product page below the §5.1 bar.** Thin pages hurt the
   whole domain, not just themselves.
2. **Never fake structured data** — no invented ratings, no fake stock, no price
   markup on quote-only products.
3. **Never change a published slug** without a 301.
4. **Never client-render catalogue content.** If Googlebot sees an empty div,
   the page does not exist.
5. **Never duplicate a meta description.** With generated pages this is the
   default failure mode; the formula in §4 exists to prevent it.
