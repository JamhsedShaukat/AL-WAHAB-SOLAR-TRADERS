# Content & Copy Deck
## Al-Wahab Solar Traders v2.0 — every user-facing string

| | |
|---|---|
| **Document** | Content / Copy Deck (EN + UR) |
| **Version** | 2.0 |
| **Date** | 29 July 2026 |
| **Positioning** | Al-Wahab Solar Traders is the **direct supplier and installer**. There is no marketplace, no third-party installers, no "compare verified companies". |
| **Note on Urdu** | The Urdu below is production-intent copy written for a Lahore audience. **Have a native Urdu speaker review before launch** — particularly the technical terms, which are deliberately kept in transliterated English where that is what customers actually say (سولر، انورٹر، بیٹری، نیٹ میٹرنگ). |

---

## 0. Voice & rules

**Voice:** plain, confident, unhurried. Explain the number, don't sell it. Al-Wahab speaks as a company that has done this many times and has nothing to hide.

**Rules**
1. Never promise a price — always "estimated", with the range and the validity date visible.
2. Never say "quotes from companies", "verified installers", "compare installers", "marketplace", "partners", "join as installer". These strings must not exist in the codebase.
3. Say **"our team"**, **"our installers"**, **"Al-Wahab"** — first person plural.
4. Keep the customer's money in view: itemized, no hidden costs, free until they choose to buy.
5. Urdu greeting "Assalam-o-Alaikum" is retained in the English UI too — it is how Lahore speaks.
6. Numbers use the existing formats: `PKR 1,565,000`, `PKR 1.68M–1.9M`, `6.5 kW`, `980 units/mo`, `~4.3 yrs`.
7. Sentence case for headings; Title Case only for proper nouns and buttons where the current build already uses it.
8. No exclamation marks except in the brand strapline "Shine On!".

**Global find-and-replace from v1**

| v1 string | v2 replacement |
|---|---|
| "Lahore's solar estimator & marketplace" | "Lahore's solar estimator — by Al-Wahab Solar Traders" |
| "verified installers" / "verified companies" | "our certified installation team" |
| "Compare quotes from verified companies" | "Review your itemized quotation" |
| "Save & get quotes" | "Save & book a free site survey" |
| "Quotes received" | "Quotation issued" |
| "the company you hire" | "our team" |
| "For solar companies" (section) | "About Al-Wahab" (section) |
| "Join as a verified company" | "Talk to our team" |
| "Al Wahab **Solar**" (wordmark) | "Al-Wahab **Solar Traders**" |

---

## 1. Global chrome

| Key | EN | UR |
|---|---|---|
| `brand.name` | Al-Wahab Solar Traders | الوہاب سولر ٹریڈرز |
| `brand.tagline` | Shine On! | روشن رہیں! |
| `brand.descriptor` | Lahore's honest solar estimator — supplied and installed by Al-Wahab Solar Traders. | لاہور کا دیانتدار سولر تخمینہ — الوہاب سولر ٹریڈرز کی جانب سے فراہمی اور تنصیب۔ |
| `nav.home` | Home | ہوم |
| `nav.how` | How it works | یہ کیسے کام کرتا ہے |
| `nav.why` | Why us | ہمیں کیوں چنیں |
| `nav.about` | About | ہمارے بارے میں |
| `nav.faq` | FAQ | عام سوالات |
| `nav.contact` | Contact | رابطہ |
| `nav.cta` | Free estimate | مفت تخمینہ |
| `nav.dashboard` | My dashboard | میرا ڈیش بورڈ |
| `nav.login` | Log in | لاگ اِن |
| `nav.logout` | Log out | لاگ آؤٹ |
| `lang.label` | Language | زبان |
| `common.continue` | Continue | آگے بڑھیں |
| `common.back` | Back | واپس |
| `common.save` | Save | محفوظ کریں |
| `common.cancel` | Cancel | منسوخ |
| `common.download_pdf` | Download PDF | پی ڈی ایف ڈاؤن لوڈ کریں |
| `common.updated` | Updated {date} | اپ ڈیٹ شدہ {date} |
| `common.free_no_obligation` | Free, no-obligation estimate | مفت، بغیر کسی پابندی کے تخمینہ |

---

## 2. Homepage `/`

### 2.1 Hero

| Key | EN | UR |
|---|---|---|
| `home.hero.eyebrow` | Lahore's solar estimator — by Al-Wahab Solar Traders | لاہور کا سولر تخمینہ — الوہاب سولر ٹریڈرز |
| `home.hero.h1` | Get an accurate solar estimate **in 2 minutes** | صرف **2 منٹ** میں درست سولر تخمینہ حاصل کریں |
| `home.hero.lede` | Answer a few questions or upload your LESCO bill. We price your system on live Lahore market rates — then our own certified team supplies and installs it. Free, with no hidden costs. | چند سوالات کے جواب دیں یا اپنا لیسکو بل اپ لوڈ کریں۔ ہم آپ کے سسٹم کی قیمت لاہور کے موجودہ مارکیٹ ریٹ پر لگاتے ہیں — پھر ہماری اپنی تصدیق شدہ ٹیم اسے فراہم اور نصب کرتی ہے۔ مفت، بغیر کسی پوشیدہ اخراجات کے۔ |
| `home.hero.cta_primary` | Get your free solar estimate | اپنا مفت سولر تخمینہ حاصل کریں |
| `home.hero.cta_secondary` | See how it works | دیکھیں یہ کیسے کام کرتا ہے |
| `home.hero.hint` | Upload your electricity bill for the most accurate estimate | سب سے درست تخمینے کے لیے اپنا بجلی کا بل اپ لوڈ کریں |
| `home.hero.card_label` | Powered by live Lahore market prices | لاہور کی موجودہ مارکیٹ قیمتوں پر مبنی |
| `home.hero.card_size_label` | Suggested size | تجویز کردہ سائز |
| `home.hero.card_saving_label` | /mo saved | ماہانہ بچت |
| `home.hero.footnote` | Prices based on live Lahore market · updated regularly · installed by our own team | قیمتیں لاہور کی موجودہ مارکیٹ پر · باقاعدگی سے اپ ڈیٹ · ہماری اپنی ٹیم کی تنصیب |

### 2.2 Trust marquee

| EN | UR |
|---|---|
| Live Lahore market prices | لاہور کی تازہ مارکیٹ قیمتیں |
| Our own certified team | ہماری اپنی تصدیق شدہ ٹیم |
| Itemized breakdowns | تفصیلی بریک ڈاؤن |
| No hidden costs | کوئی پوشیدہ اخراجات نہیں |
| Net-metering handled | نیٹ میٹرنگ ہم سنبھالتے ہیں |
| Free for homeowners | گھر مالکان کے لیے مفت |

### 2.3 Value strip (four cards)

| # | Title EN | Body EN | Title UR |
|---|---|---|---|
| 1 | Live Lahore prices | Estimates use current local market rates, updated regularly. | لاہور کی تازہ قیمتیں |
| 2 | Our own certified team | We supply and install ourselves — no subcontractors, no hand-offs. | ہماری اپنی تصدیق شدہ ٹیم |
| 3 | Itemized & transparent | See every line item — panels, inverter, battery, labour. No hidden costs. | تفصیلی اور شفاف |
| 4 | Free for homeowners | Estimate, plan and decide at no cost to you. | گھر مالکان کے لیے مفت |

### 2.4 How it works

| Key | EN |
|---|---|
| `home.how.eyebrow` | How it works |
| `home.how.h2` | From a high bill to a working system, in four steps |
| `home.how.lede` | No sales calls to get started — just your answers and clear, itemized numbers. |
| `home.how.1.title` | Answer a few questions — or upload your bill |
| `home.how.1.body` | Tell us your usage, or upload your LESCO bill for the most accurate read on what you need. |
| `home.how.2.title` | Get an itemized estimate |
| `home.how.2.body` | See a clear breakdown — panels, inverter, battery, structure, installation and net metering — priced on live Lahore rates. |
| `home.how.3.title` | Book a free site survey |
| `home.how.3.body` | Save your estimate and our engineer visits your roof to confirm the design and finalise your quotation. |
| `home.how.4.title` | We install, you track it |
| `home.how.4.body` | Our team installs and commissions your system while you follow every phase and task from your dashboard. |

*Urdu:* ۱ چند سوالات کے جواب دیں — یا اپنا بل اپ لوڈ کریں · ۲ تفصیلی تخمینہ حاصل کریں · ۳ مفت سائٹ سروے بک کریں · ۴ ہم نصب کرتے ہیں، آپ نظر رکھتے ہیں

### 2.5 Why Al-Wahab (six cards)

| Label EN | Title EN | Body EN |
|---|---|---|
| Live market pricing | Accurate Lahore prices | Your estimate is built on real, regularly-updated Lahore market rates — not generic guesses. |
| Full breakdown | Transparent, itemized scope | See every component — panels, inverter, battery, structure, installation and net metering — with no hidden costs. |
| In-house team | Installed by our own engineers | The people who quote you are the people who install. One company, start to finish, fully accountable. |
| Net metering | LESCO paperwork handled | We prepare the application, coordinate the inspection and see your bi-directional meter through to approval. |
| Stay in control | Track your installation | Follow your project through every phase and task, from site survey to grid connection. |
| After the install | Warranty and service | Manufacturer warranties on every component, plus our own workmanship cover and local after-sales support. |

`home.why.eyebrow` — Why Al-Wahab · `home.why.h2` — Solar decisions, minus the guesswork · `home.why.lede` — Everything you need to price, plan and trust a solar purchase in Lahore — from one company.

### 2.6 Sample estimate section

| Key | EN |
|---|---|
| `home.sample.eyebrow` | Your estimate |
| `home.sample.h2` | See exactly what you'll pay — line by line |
| `home.sample.lede` | Every estimate breaks the full system down on live Lahore prices, so there are no surprises. Here's a sample. |
| `home.sample.chip` | al-wahab · solar estimate |
| `home.sample.badge` | Sample |
| `home.sample.title` | Itemized breakdown |
| `home.sample.total_label` | Estimated total |
| `home.sample.total_note` | Indicative — your tailored estimate may differ |
| `home.sample.stat_saving` | Est. monthly saving |
| `home.sample.stat_payback` | Estimated payback |
| `home.sample.stat_size` | System size |
| `home.sample.cta` | Get your estimate |
| `home.sample.footnote` | Sample figures — illustrative only. |

Line items (unchanged): Solar panels · Hybrid inverter · Battery storage · Mounting structure · Installation & wiring · Net metering.

### 2.7 Reviews

| Key | EN |
|---|---|
| `home.reviews.eyebrow` | Reviews |
| `home.reviews.h2` | Ratings from real, completed installs |
| `home.reviews.lede` | After every completed job, homeowners rate the work our team did. |

**Rule:** show only approved reviews from completed Al-Wahab projects. If fewer than three exist, hide the section. Do not ship "Sample review" cards.

### 2.8 About Al-Wahab *(replaces "For solar companies")*

| Key | EN | UR |
|---|---|---|
| `home.about.eyebrow` | About Al-Wahab | ہمارے بارے میں |
| `home.about.h2` | A Lahore solar company that shows its numbers | ایک لاہوری سولر کمپنی جو اپنے اعداد و شمار دکھاتی ہے |
| `home.about.body` | Al-Wahab Solar Traders supplies and installs solar systems across Lahore. We built this estimator because homeowners kept telling us the same thing: every dealer quotes a different number and nobody explains it. So we put our pricing online, itemized, before you ever speak to us. | الوہاب سولر ٹریڈرز پورے لاہور میں سولر سسٹم فراہم اور نصب کرتا ہے۔ ہم نے یہ تخمینہ کار اس لیے بنایا کیونکہ گھر مالکان ہمیں ایک ہی بات بتاتے رہے: ہر ڈیلر مختلف قیمت بتاتا ہے اور کوئی وضاحت نہیں کرتا۔ اس لیے ہم نے اپنی قیمتیں آن لائن، تفصیل کے ساتھ، آپ سے بات کرنے سے پہلے ہی رکھ دیں۔ |
| `home.about.cta_primary` | Learn about us | ہمارے بارے میں جانیں |
| `home.about.cta_secondary` | Talk to our team | ہماری ٹیم سے بات کریں |
| `home.about.card1.title` | One company, start to finish | Design, supply, installation, net metering and service — all in-house. No subcontractors to chase. |
| `home.about.card2.title` | Priced before you call | Our rates are published in every estimate. What you see itemized online is the basis of your quotation. |
| `home.about.card3.title` | Local, and here afterwards | We are a Lahore business. When you need service in year three, we are still a short drive away. |

### 2.9 FAQ

| Q (EN) | A (EN) |
|---|---|
| How accurate are the prices? | Estimates use live Lahore market rates that we update regularly, so they're a close, honest guide. Your final price is confirmed after a free site survey — quoted on the same itemized basis, with no new line items appearing. |
| Do I need a battery? | Not always. An on-grid system is the cheapest way to cut your bill. Add a battery (a hybrid system) if you also want backup during load-shedding. The estimator helps you decide based on what you actually need to keep running. |
| What about net metering and LESCO? | If you choose on-grid or hybrid, your estimate includes the net-metering application and bi-directional meter, and our team handles the LESCO paperwork and inspection for you. |
| Who does the installation? | Our own engineers and technicians. We do not subcontract. The team that surveys your roof is the team that installs and commissions the system. |
| Is it free to use? | Getting an estimate and a site survey is completely free, with no obligation. You only pay if you decide to go ahead with the system. |
| What warranty do I get? | Manufacturer warranties on every component — typically 12 years product and 25 years performance on panels, 5–10 years on the inverter, 8–10 years on the battery, 10 years on the structure — plus our own 1–2 year workmanship cover. |
| How long does it take? | The system is usually installed and running within about a week of order. Net metering takes longer, roughly 5–9 weeks, because LESCO approval is outside our control. We keep you updated at every step. |

`home.faq.eyebrow` — FAQ · `home.faq.h2` — Questions, answered honestly · `home.faq.lede` — The things Lahore homeowners ask us most.

### 2.10 Final CTA + lead form

| Key | EN | UR |
|---|---|---|
| `home.cta.eyebrow` | Get started | شروع کریں |
| `home.cta.h2` | Ready to see your solar number? | اپنا سولر نمبر دیکھنے کے لیے تیار ہیں؟ |
| `home.cta.lede` | Start your free estimate now, or leave your details and we'll walk you through it — no obligation. | ابھی اپنا مفت تخمینہ شروع کریں، یا اپنی تفصیلات چھوڑ دیں اور ہم آپ کی رہنمائی کریں گے — کوئی پابندی نہیں۔ |
| `home.cta.bullet1` | Free, itemized estimate in about 2 minutes | تقریباً 2 منٹ میں مفت، تفصیلی تخمینہ |
| `home.cta.bullet2` | Installed by our own certified team | ہماری اپنی تصدیق شدہ ٹیم کی تنصیب |
| `home.cta.bullet3` | No hidden costs, no obligation | کوئی پوشیدہ اخراجات نہیں، کوئی پابندی نہیں |
| `form.name` | Full name | پورا نام |
| `form.email` | Email | ای میل |
| `form.phone` | Phone | فون نمبر |
| `form.bill` | Monthly electricity bill | ماہانہ بجلی کا بل |
| `form.bill.placeholder` | Select… | منتخب کریں… |
| `form.bill.o1` | Under PKR 15,000 | 15,000 روپے سے کم |
| `form.bill.o2` | PKR 15,000 – 30,000 | 15,000 – 30,000 روپے |
| `form.bill.o3` | PKR 30,000 – 60,000 | 30,000 – 60,000 روپے |
| `form.bill.o4` | Over PKR 60,000 | 60,000 روپے سے زیادہ |
| `form.area` | Area / town (optional) | علاقہ / ٹاؤن (اختیاری) |
| `form.submit` | Start my free estimate | میرا مفت تخمینہ شروع کریں |
| `form.privacy` | No spam. Your details are only used to prepare your estimate. | کوئی سپیم نہیں۔ آپ کی تفصیلات صرف آپ کا تخمینہ تیار کرنے کے لیے استعمال ہوں گی۔ |
| `form.success` | Thank you — we'll call you within one working day. | شکریہ — ہم ایک کاروباری دن کے اندر آپ سے رابطہ کریں گے۔ |

### 2.11 Footer

| Key | EN |
|---|---|
| `footer.descriptor` | Lahore's honest solar estimator. Price your system, book a free survey, and let our own certified team install it. **Shine On!** |
| `footer.col1.title` | Product |
| `footer.col1.links` | Get an estimate · How it works · Why us · FAQ |
| `footer.col2.title` | Company |
| `footer.col2.links` | About Al-Wahab · Our warranty · Net metering guide · Contact |
| `footer.col3.title` | Contact |
| `footer.address` | Lahore, Pakistan |
| `footer.email` | info@alwahabsolar.pk |
| `footer.phone` | +92 42 111 765 765 |
| `footer.whatsapp` | WhatsApp us |
| `footer.copyright` | © 2026 Al-Wahab Solar Traders. All rights reserved. |
| `footer.legal` | Privacy · Terms · Sitemap |

> Replace the placeholder email/phone with Al-Wahab's real details before launch.

### 2.12 Mobile sticky bar

`Free solar estimate` / `Takes about 2 minutes` / `Start` — UR: `مفت سولر تخمینہ` / `تقریباً 2 منٹ` / `شروع کریں`

---

## 3. Estimator

### 3.1 Roshni & entry

| Key | EN | UR |
|---|---|---|
| `est.intro.greeting` | Assalam-o-Alaikum! I'm Roshni, your solar guide. | السلام علیکم! میں روشنی ہوں، آپ کی سولر رہنما۔ |
| `est.intro.body` | Upload your latest LESCO bill for the most accurate estimate, or answer a few quick questions — about 2 minutes. | سب سے درست تخمینے کے لیے اپنا تازہ ترین لیسکو بل اپ لوڈ کریں، یا چند مختصر سوالات کے جواب دیں — تقریباً 2 منٹ۔ |
| `est.intro.upload` | Upload your LESCO bill | اپنا لیسکو بل اپ لوڈ کریں |
| `est.intro.upload_sub` | Photo or PDF — most accurate estimate | تصویر یا پی ڈی ایف — سب سے درست تخمینہ |
| `est.intro.manual` | Answer a few questions instead | اس کے بجائے چند سوالات کے جواب دیں |
| `est.intro.sample` | Use a sample bill | نمونہ بل استعمال کریں |
| `est.begin` | Let's begin | آئیے شروع کریں |
| `est.step_of` | Step {n} of {total} | مرحلہ {n} از {total} |

### 3.2 Bill upload & confirm

| Key | EN | UR |
|---|---|---|
| `est.bill.reading_title` | Great — let me read your bill. | بہت خوب — میں آپ کا بل پڑھ لیتی ہوں۔ |
| `est.bill.reading_body` | I'll pull out your usage and connection details so you can confirm them. | میں آپ کے استعمال اور کنکشن کی تفصیلات نکالوں گی تاکہ آپ ان کی تصدیق کر سکیں۔ |
| `est.bill.confirm_title` | Found these details — please confirm | یہ تفصیلات ملی ہیں — براہِ کرم تصدیق کریں |
| `est.bill.units` | Avg monthly usage (kWh) | اوسط ماہانہ استعمال (یونٹ) |
| `est.bill.units_suffix` | units | یونٹ |
| `est.bill.phase` | Connection phase | کنکشن فیز |
| `est.bill.phase_single` | Single-phase | سنگل فیز |
| `est.bill.phase_three` | Three-phase | تھری فیز |
| `est.bill.address` | Installation address | تنصیب کا پتہ |
| `est.bill.confirm_cta` | Confirm details | تفصیلات کی تصدیق کریں |
| `est.bill.editable` | You can edit any field | آپ کوئی بھی خانہ تبدیل کر سکتے ہیں |
| `est.bill.low_confidence` | Please double-check these — the bill was hard to read. | براہِ کرم ان کی دوبارہ جانچ کریں — بل پڑھنا مشکل تھا۔ |
| `est.bill.failed_title` | I couldn't read that bill clearly | میں یہ بل واضح طور پر نہیں پڑھ سکی |
| `est.bill.failed_manual` | Enter details manually | تفصیلات خود درج کریں |
| `est.bill.failed_retry` | Try another photo | دوسری تصویر آزمائیں |

### 3.3 Questions

| Step | Question EN | Helper EN | Question UR |
|---|---|---|---|
| 2 | What should your solar system do for you? | This helps me size it to your goal. | آپ کا سولر سسٹم آپ کے لیے کیا کرے؟ |
| 3 | Which system type suits you best? | Hybrid is the most popular choice in Lahore for load-shedding cover. | کون سا سسٹم آپ کے لیے بہتر ہے؟ |
| 4 | During outages, what should keep running — and for how long? | Only the loads you pick are backed up, which keeps battery cost sensible. | بجلی نہ ہونے پر کیا چلتا رہے — اور کتنی دیر؟ |
| 5 | Where will the panels go, and how much space is there? | A rough area is fine — we confirm it on the free site survey. | پینل کہاں لگیں گے، اور کتنی جگہ ہے؟ |
| 6 | What mounting structure should we plan for? | Good-quality structures last the full 25 years in Lahore weather. | کون سا اسٹرکچر منصوبہ بندی میں رکھیں؟ |
| 7 | What matters most for your build? | Prefer a number? Switch to "By budget". | آپ کے لیے سب سے اہم کیا ہے؟ |
| 8 | Want to sell your extra units back to the grid? | Net metering credits your surplus on your monthly LESCO bill. | کیا آپ اضافی یونٹ گرڈ کو واپس بیچنا چاہتے ہیں؟ |

**Options**

| Step | Option EN | Sub-label EN | UR |
|---|---|---|---|
| 2 | Cover my whole bill | Offset close to 100% of your usage | میرا پورا بل ختم کریں |
| 2 | Reduce my bill | Trim the most expensive LESCO slabs | میرا بل کم کریں |
| 2 | Fit a budget | Best system for a set amount | بجٹ کے مطابق |
| 3 | On-grid | Lowest cost · no battery · no cover during outages | آن گرڈ |
| 3 | Hybrid *(Most popular in Lahore)* | Grid + battery — runs through load-shedding | ہائبرڈ *(لاہور میں سب سے مقبول)* |
| 3 | Off-grid | Fully independent · largest battery bank | آف گرڈ |
| 4 | Fans & lights · Refrigerator · 1 air conditioner · Internet / router · Water pump | — | پنکھے اور لائٹس · فریج · ایک اے سی · انٹرنیٹ / راؤٹر · واٹر پمپ |
| 4 | Backup duration | {n} hours | بیک اپ دورانیہ |
| 5 | RCC roof | Concrete slab — most common | آر سی سی چھت |
| 5 | Metal sheet | Tin / steel roofing | میٹل شیٹ |
| 5 | Ground mount | Open land area | زمین پر |
| 5 | Carport / shed | Over parking or canopy | کارپورٹ / شیڈ |
| 5 | Available area | sq ft / marla | دستیاب رقبہ |
| 6 | Standard | Ready design | اسٹینڈرڈ |
| 6 | Customized | Elevated / tailored | کسٹمائزڈ |
| 6 | Medium | Galvanised iron | درمیانہ |
| 6 | Good | Hot-dip / aluminium | بہتر |
| 7 | Lowest price | Most affordable components | کم سے کم قیمت |
| 7 | Best value *(Recommended)* | Smart balance of price & quality | بہترین ویلیو *(تجویز کردہ)* |
| 7 | Best quality | Premium Tier-1 throughout | بہترین معیار |
| 8 | Yes, apply for net metering | Export surplus units and earn bill credits | جی ہاں، نیٹ میٹرنگ کریں |
| 8 | Not right now | I can add it later | ابھی نہیں |

### 3.4 Right rail

| Key | EN | UR |
|---|---|---|
| `est.rail.title` | Your estimate so far | اب تک کا آپ کا تخمینہ |
| `est.rail.sub` | Updates as you answer | آپ کے جوابات کے ساتھ اپ ڈیٹ ہوتا ہے |
| `est.rail.empty` | Answer the questions and your tailored solar specs will appear here. | سوالات کے جواب دیں اور آپ کے مطابق سولر تفصیلات یہاں ظاہر ہوں گی۔ |
| `est.rail.indicative` | Indicative system | ابتدائی سسٹم |
| `est.rail.saving` | ~PKR {n}/mo saved | ~{n} روپے ماہانہ بچت |
| Labels | Usage · Goal · System · Backup · Roof · Structure · Priority · Net metering | استعمال · مقصد · سسٹم · بیک اپ · چھت · اسٹرکچر · ترجیح · نیٹ میٹرنگ |

### 3.5 Building & result

| Key | EN | UR |
|---|---|---|
| `est.building` | Building your personalised estimate… | آپ کا ذاتی تخمینہ تیار کیا جا رہا ہے… |
| `est.building.l1` | Sizing your system… | آپ کے سسٹم کا سائز طے کیا جا رہا ہے… |
| `est.building.l2` | Pricing on live Lahore rates… | لاہور کے تازہ ریٹ پر قیمت لگائی جا رہی ہے… |
| `est.building.l3` | Checking net-metering options… | نیٹ میٹرنگ کے اختیارات دیکھے جا رہے ہیں… |
| `est.result.eyebrow` | Your estimate is ready | آپ کا تخمینہ تیار ہے |
| `est.result.system` | Recommended system | تجویز کردہ سسٹم |
| `est.result.price` | Estimated price | تخمینی قیمت |
| `est.result.saving` | Saved / month | ماہانہ بچت |
| `est.result.payback` | Payback | لاگت کی واپسی |
| `est.result.co2` | CO₂ / year | سالانہ CO₂ |
| `est.result.cta_primary` | View your full estimate | اپنا مکمل تخمینہ دیکھیں |
| `est.result.cta_secondary` | Email me this estimate | یہ تخمینہ مجھے ای میل کریں |
| `est.result.disclaimer` | Indicative figures from live Lahore prices. A free site survey confirms the final quotation. | لاہور کی تازہ قیمتوں پر مبنی ابتدائی اعداد۔ مفت سائٹ سروے کے بعد حتمی قیمت طے ہوتی ہے۔ |

---

## 4. Full estimate page

| Key | EN |
|---|---|
| `det.eyebrow` | Your estimate is ready |
| `det.h1` | Your solar estimate |
| `det.lede` | A transparent, itemized estimate for an **{size} {type}** system in Lahore — built on live market prices. Review the cost, timeline and what to expect, then save it and book your free site survey. |
| `det.s1.title` | Cost breakdown |
| `det.s1.sub` | Every component, itemized — no hidden costs. |
| `det.s1.recommended` | Recommended system |
| `det.s1.tier_note` | The sweet spot of price, efficiency and warranty for most Lahore homes. |
| `det.s1.itemized` | Itemized cost |
| `det.s1.subtotal` | Subtotal |
| `det.s1.range` | Estimated range |
| `det.s1.buffer` | ±{n}% market buffer applied · Prices valid as of {date} |
| `det.s2.title` | Estimated time |
| `det.s2.sub` | Your system runs within a week — net metering takes longer because of LESCO approval. |
| `det.s2.install` | System installed & running |
| `det.s2.install_time` | ~1 week from order |
| `det.s2.netmeter` | Net metering live |
| `det.s2.netmeter_time` | ~5–9 weeks |
| `det.s2.netmeter_note` | LESCO approval is the longest step |
| `det.s3.title` | Project phases & tasks |
| `det.s3.sub` | What to expect, start to finish. |
| `det.s3.note` | This is our standard plan, shown for transparency. Our engineer confirms and adjusts the exact phases and tasks after your free site survey. |
| `det.s3.counter` | {phases} phases · {tasks} tasks |
| `det.s4.title` | Energy & savings |
| `det.s4.gen` | Monthly generation |
| `det.s4.coverage` | Bill coverage |
| `det.s4.saving` | Estimated savings |
| `det.s4.payback` | Payback period |
| `det.s4.note` | Based on LESCO net metering — surplus daytime units are credited against your grid usage. Actual savings vary with tariff slabs and weather. |
| `det.s5.included` | What's included |
| `det.s5.excluded` | Not included |
| `det.s6.title` | Warranties |
| `det.s7.title` | Compare equipment tiers |
| `det.s7.sub` | Switch tier to re-price your estimate. Standard is pre-selected as the best value. |
| `det.s7.chosen` | Chosen |
| `det.s7.choose` | Choose {tier} |
| `det.s7.apply` | Apply {tier} tier |
| `det.disclaimer` | This estimate is indicative and valid for {n} days from {date}. Final pricing, specifications, phases and tasks are confirmed by our engineer after a free site survey. |
| `det.cta_primary` | Save & book a free site survey |
| `det.cta_switch` | Switch tier |
| `det.cta_pdf` | Download PDF |

**Phase names (6):** Site Survey & Design · Agreement & Procurement · Installation · Testing & Commissioning · Net Metering *(if on-grid / hybrid)* · Handover
**Urdu:** سائٹ سروے اور ڈیزائن · معاہدہ اور خریداری · تنصیب · ٹیسٹنگ اور کمیشننگ · نیٹ میٹرنگ · حوالگی

**Included list:** Supply of all listed equipment · Mounting structure & complete installation · DC/AC wiring, breakers, SPDs & earthing · Net-metering application & meter coordination · Testing, commissioning & power-on · Monitoring app setup · Standard component warranties · Our 1–2 year workmanship cover

**Not included:** Roof waterproofing or major civil / roof repairs · Extra elevated structure beyond standard height · Home load / DB upgrades or rewiring · LESCO security fees & applicable taxes · Diesel-generator integration · Battery expansion beyond quoted capacity · Price changes after the validity date (FX / market)

---

## 5. Auth

| Key | EN | UR |
|---|---|---|
| `auth.panel.h` | Save your estimate. Book a survey. Track your install. | اپنا تخمینہ محفوظ کریں۔ سروے بک کریں۔ تنصیب پر نظر رکھیں۔ |
| `auth.panel.body` | Create a free homeowner account to keep your solar estimate, book a free site survey, and follow your installation to completion. | مفت گھر مالک اکاؤنٹ بنائیں تاکہ آپ اپنا تخمینہ محفوظ رکھ سکیں، مفت سائٹ سروے بک کر سکیں، اور اپنی تنصیب مکمل ہونے تک نظر رکھ سکیں۔ |
| `auth.panel.b1` | Installed by our own certified team | ہماری اپنی تصدیق شدہ ٹیم کی تنصیب |
| `auth.panel.b2` | Your itemized estimate, saved | آپ کا تفصیلی تخمینہ، محفوظ |
| `auth.panel.b3` | Track every phase of your install | تنصیب کے ہر مرحلے پر نظر |
| `auth.badge` | Homeowner account | گھر مالک اکاؤنٹ |
| `auth.signup.h` | Create your account | اپنا اکاؤنٹ بنائیں |
| `auth.signup.sub` | It takes less than a minute. | ایک منٹ سے بھی کم وقت لگتا ہے۔ |
| `auth.pending` | Save your {size} estimate | اپنا {size} تخمینہ محفوظ کریں |
| `auth.tab.signup` | Sign up | سائن اپ |
| `auth.tab.login` | Log in | لاگ اِن |
| `auth.google` | Continue with Google | گوگل سے جاری رکھیں |
| `auth.or` | or | یا |
| `auth.field.name` | Full name | پورا نام |
| `auth.field.identifier` | Phone or email | فون یا ای میل |
| `auth.field.password` | Password | پاس ورڈ |
| `auth.otp_link` | Use a one-time code instead | اس کے بجائے ایک بار کا کوڈ استعمال کریں |
| `auth.submit.signup` | Create account | اکاؤنٹ بنائیں |
| `auth.submit.login` | Log in | لاگ اِن |
| `auth.have_account` | Already have an account? **Log in** | پہلے سے اکاؤنٹ ہے؟ **لاگ اِن** |
| `auth.legal` | By continuing you agree to our Terms & Privacy Policy. | جاری رکھنے سے آپ ہماری شرائط و ضوابط اور پرائیویسی پالیسی سے اتفاق کرتے ہیں۔ |
| `auth.help` | Questions? **Talk to our team →** | سوالات ہیں؟ **ہماری ٹیم سے بات کریں ←** |
| `auth.otp.h` | Enter the code we sent to {phone} | ہم نے {phone} پر جو کوڈ بھیجا وہ درج کریں |
| `auth.otp.resend` | Resend code in {n}s | {n} سیکنڈ میں دوبارہ بھیجیں |
| `auth.otp.change` | Change number | نمبر تبدیل کریں |
| `auth.reset.h` | Reset your password | اپنا پاس ورڈ ری سیٹ کریں |
| `auth.reset.sent` | If that address exists, a reset link is on its way. | اگر یہ پتہ موجود ہے تو ری سیٹ لنک بھیج دیا گیا ہے۔ |
| `auth.error.credentials` | Those details don't match our records. | یہ تفصیلات ہمارے ریکارڈ سے مطابقت نہیں رکھتیں۔ |
| `auth.error.ratelimit` | Too many attempts. Please try again in a few minutes. | بہت زیادہ کوششیں۔ براہِ کرم چند منٹ بعد دوبارہ کوشش کریں۔ |

---

## 6. Customer dashboard

| Key | EN | UR |
|---|---|---|
| `dash.greeting` | Assalam-o-Alaikum, {first_name} | السلام علیکم، {first_name} |
| `dash.title` | Your projects | آپ کے پروجیکٹس |
| `dash.new_estimate` | New estimate | نیا تخمینہ |
| `dash.kpi.saved` | Saved estimates | محفوظ تخمینے |
| `dash.kpi.active` | Active projects | جاری پروجیکٹس |
| `dash.kpi.progress` | In progress | زیرِ تکمیل |
| `dash.kpi.completed` | Completed | مکمل |
| `dash.empty.h` | No projects yet | ابھی کوئی پروجیکٹ نہیں |
| `dash.empty.body` | Get a free, itemized solar estimate for your home in about two minutes — then save it here and book a free site survey. | تقریباً دو منٹ میں اپنے گھر کے لیے مفت، تفصیلی سولر تخمینہ حاصل کریں — پھر اسے یہاں محفوظ کریں اور مفت سائٹ سروے بک کریں۔ |
| `dash.empty.cta` | Get your first estimate | اپنا پہلا تخمینہ حاصل کریں |
| `dash.new_card.h` | Start a new estimate | نیا تخمینہ شروع کریں |
| `dash.new_card.body` | Price another home or system in ~2 minutes | تقریباً 2 منٹ میں دوسرے گھر یا سسٹم کی قیمت لگائیں |

**Status chips & their contextual actions**

| Status EN | UR | Card action EN |
|---|---|---|
| Estimate saved | تخمینہ محفوظ | Book a free site survey |
| Survey requested | سروے کی درخواست | View survey details |
| Survey scheduled | سروے مقرر | View survey details |
| Quotation issued | قیمت جاری | Review quotation |
| Agreement signed | معاہدہ مکمل | View project |
| In progress | جاری ہے | Track installation |
| Completed | مکمل | Leave a review |
| Expired | میعاد ختم | Re-price this estimate |
| On hold | روکا گیا | View project |
| Cancelled | منسوخ | View project |

---

## 7. Project detail

| Key | EN |
|---|---|
| `proj.progress` | {n}% complete |
| `proj.system` | Your system |
| `proj.team` | Your team |
| `proj.team.sales` | Your advisor |
| `proj.team.crew` | Installation lead |
| `proj.docs` | Documents |
| `proj.docs.empty` | Documents will appear here as your project progresses. |
| `proj.payments` | Payments |
| `proj.payments.due` | Due {date} |
| `proj.payments.paid` | Paid {date} |
| `proj.updates` | Updates from our team |
| `proj.updates.empty` | Your team will post updates here as work progresses. |
| `proj.accept_quote` | Accept quotation |
| `proj.decline_quote` | I have a question first |
| `proj.message` | Message our team |
| `proj.review_cta` | Leave a review |
| `proj.review.h` | How did we do? |
| `proj.review.body` | Your honest review helps other Lahore homeowners decide. |
| `proj.review.consent` | You may publish this review with my first name and area. |
| `proj.review.success` | Thank you — your review is with our team for approval. |

---

## 8. Notifications (customer-facing templates)

| Event | Title EN | Body EN |
|---|---|---|
| `estimate.saved` | Your estimate is saved | Your {size} {type} estimate is in your dashboard. Book a free site survey whenever you're ready. |
| `estimate.expiring` | Your estimate expires in 3 days | Prices move with the market. Re-price it in one tap, or book a free survey to lock in your quotation. |
| `estimate.expired` | Your estimate has expired | Market rates have moved on. Re-price your {size} system in one tap — it takes seconds. |
| `survey.requested` | Survey request received | Thank you. Our team will call you within one working day to confirm a time. |
| `survey.scheduled` | Your site survey is booked | Our engineer will visit on {date} between {window}. Please make sure the roof is accessible. |
| `quotation.issued` | Your quotation is ready | We've confirmed your design after the survey. Review the itemized quotation in your dashboard. |
| `project.created` | Your project has started | Welcome aboard. You can follow every phase and task from your dashboard. |
| `project.status_changed` | {phase} complete | We've finished {phase} on your {size} system. Next up: {next_phase}. |
| `netmeter.applied` | Net-metering application submitted | We've filed your application with LESCO. Approval usually takes 5–9 weeks; we'll keep you posted. |
| `project.completed` | Your system is live | Congratulations — your {size} system is commissioned and running. Shine on! |
| `review.request` | How did we do? | Your project is complete. A short review helps other Lahore homeowners decide. |
| `payment.due` | Payment due {date} | {label} of PKR {amount} is due on {date}. |

---

## 9. Errors & system messages

| Key | EN | UR |
|---|---|---|
| `err.404.h` | This page has set | یہ صفحہ موجود نہیں |
| `err.404.body` | The link you followed doesn't exist any more. Let's get you back to the sunny side. | آپ نے جو لنک کھولا وہ اب موجود نہیں۔ آئیے واپس چلتے ہیں۔ |
| `err.500.h` | Something went dark | کچھ گڑبڑ ہو گئی |
| `err.500.body` | Our team has been notified. Please try again in a moment. | ہماری ٹیم کو اطلاع دے دی گئی ہے۔ براہِ کرم تھوڑی دیر بعد کوشش کریں۔ |
| `err.offline.h` | You're offline | آپ آف لائن ہیں |
| `err.offline.body` | Your saved estimates will sync when you reconnect. | دوبارہ منسلک ہونے پر آپ کے محفوظ تخمینے سنک ہو جائیں گے۔ |
| `err.maintenance.h` | We're upgrading | ہم اپ گریڈ کر رہے ہیں |
| `err.maintenance.body` | Back shortly. Need something urgently? WhatsApp us on {phone}. | جلد واپس آ رہے ہیں۔ فوری ضرورت ہو تو {phone} پر واٹس ایپ کریں۔ |
| `err.generic` | Something didn't work. Please try again. | کچھ کام نہیں ہوا۔ براہِ کرم دوبارہ کوشش کریں۔ |
| `err.upload.size` | That file is too large — please keep it under 10 MB. | فائل بہت بڑی ہے — براہِ کرم 10 MB سے کم رکھیں۔ |
| `err.upload.type` | Please upload a photo (JPG/PNG) or a PDF. | براہِ کرم تصویر (JPG/PNG) یا پی ڈی ایف اپ لوڈ کریں۔ |
| `err.expired_estimate` | This estimate has expired. Re-price it to see current rates. | اس تخمینے کی میعاد ختم ہو چکی ہے۔ موجودہ ریٹ دیکھنے کے لیے دوبارہ قیمت لگائیں۔ |

---

## 10. SEO metadata

| Route | Title | Description |
|---|---|---|
| `/` | Solar Price Calculator Lahore \| Al-Wahab Solar Traders | Get a free, itemized solar estimate for your Lahore home in 2 minutes. Live market prices, no hidden costs. Supplied and installed by Al-Wahab Solar Traders. |
| `/estimate` | Free Solar Estimate \| Al-Wahab Solar Traders | Upload your LESCO bill or answer a few questions and get an itemized solar system estimate priced on live Lahore rates. |
| `/about` | About Al-Wahab Solar Traders \| Solar Installers in Lahore | Al-Wahab Solar Traders designs, supplies, installs and net-meters solar systems across Lahore — one team, start to finish. |
| `/faq` | Solar FAQs — Prices, Net Metering & Warranty \| Al-Wahab Solar | Honest answers on solar pricing, batteries, LESCO net metering, installation time and warranties in Lahore. |
| `/contact` | Contact Al-Wahab Solar Traders, Lahore | Call, WhatsApp or email Al-Wahab Solar Traders for a free solar site survey in Lahore. |

**JSON-LD:** `LocalBusiness` (name, logo, address, geo, telephone, openingHours, areaServed: Lahore, aggregateRating once real reviews exist) on `/`; `FAQPage` on `/` and `/faq`; `Service` (Solar Panel Installation) on `/about`; `BreadcrumbList` on inner pages.

**OG image copy:** "Free itemized solar estimate — in 2 minutes" over the navy gradient with the logo and "Shine On!".

---

## 11. Transactional SMS (160-char discipline)

| Event | EN |
|---|---|
| OTP | Your Al-Wahab Solar code is {code}. Valid 10 minutes. Never share this code. |
| Survey booked | Al-Wahab Solar: your free site survey is booked for {date}, {window}. Questions? {phone} |
| Quotation ready | Al-Wahab Solar: your itemized quotation is ready. View it here: {link} |
| Installation done | Al-Wahab Solar: your {size} system is commissioned and running. Shine on! |
| Net metering approved | Al-Wahab Solar: LESCO has approved your net metering. Your bi-directional meter is live. |

---

*Companion documents: `01-PRD.md`, `02-Technical-Design-Document.md`, `03-Design-System-and-Screen-Specs.md`, `04-Information-Architecture-and-Flows.md`, `05-Admin-Panel-Spec.md`, `07-Implementation-Plan.md`.*
