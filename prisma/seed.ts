/**
 * Seeds reference data that the application cannot function without: roles,
 * permissions, the role-permission matrix, pricing tiers, an initial rate card,
 * LESCO tariff slabs, project phase templates and estimator settings.
 *
 * Idempotent — every write is an upsert, so it is safe to re-run.
 *
 * Run with: pnpm db:seed
 */
import { config as loadEnv } from "dotenv";
import path from "node:path";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../apps/api/src/generated/prisma/client";

loadEnv({ path: path.join(__dirname, "../apps/api/.env") });

// Seeding does bulk upserts, so use the session-mode connection and avoid
// pooler quirks entirely. Falls back to the pooled URL if DIRECT_URL is unset.
const connectionString = process.env.DIRECT_URL ?? process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "Set DIRECT_URL (or DATABASE_URL) in apps/api/.env before seeding.",
  );
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

// ─────────────────────────────────────────────────────────────
// Roles & permissions — docs/02-technical-design.md §5.1–§5.2
// ─────────────────────────────────────────────────────────────

const ROLES = [
  {
    key: "super_admin",
    name: "Super Admin",
    description: "Owner / developer. Everything, including roles and settings.",
  },
  {
    key: "admin",
    name: "Admin",
    description:
      "Manager. Everything except role management, settings, rate cards and impersonation.",
  },
  {
    key: "sales",
    name: "Sales",
    description: "Leads, estimates, price overrides, conversion to project.",
  },
  {
    key: "operations",
    name: "Operations",
    description: "Projects, phases, tasks, documents and payment recording.",
  },
  {
    key: "viewer",
    name: "Viewer",
    description: "Read-only across admin. Exports allowed, no PII downloads.",
  },
  {
    key: "customer",
    name: "Customer",
    description:
      "Homeowner. Scoped to their own records by ownership, not permissions.",
  },
] as const;

/** Every permission key, with the module it belongs to and a display label. */
const PERMISSIONS: Array<[key: string, module: string, label: string]> = [
  ["dashboard.view", "dashboard", "View dashboard"],
  ["users.read", "users", "View users"],
  ["users.write", "users", "Create and edit users"],
  ["users.suspend", "users", "Suspend users"],
  ["users.impersonate", "users", "Impersonate users"],
  ["users.delete", "users", "Delete users"],
  ["estimates.read", "estimates", "View estimates"],
  ["estimates.write", "estimates", "Create and edit estimates"],
  ["estimates.override_price", "estimates", "Override estimate pricing"],
  ["estimates.delete", "estimates", "Delete estimates"],
  ["estimates.convert", "estimates", "Convert estimate to project"],
  ["projects.read", "projects", "View projects"],
  ["projects.write", "projects", "Create and edit projects"],
  ["projects.assign", "projects", "Assign project owners and crew"],
  ["projects.delete", "projects", "Delete projects"],
  ["payments.read", "payments", "View payments"],
  ["payments.write", "payments", "Record payments"],
  ["leads.read", "leads", "View leads"],
  ["leads.write", "leads", "Create and edit leads"],
  ["reviews.moderate", "reviews", "Moderate reviews"],
  ["analytics.view", "analytics", "View website analytics"],
  ["traffic.view", "analytics", "View visitor traffic"],
  ["revenue.view", "revenue", "View revenue"],
  ["activity.view", "observability", "View activity logs"],
  ["audit.view", "observability", "View audit logs"],
  ["export.csv", "export", "Export CSV"],
  ["export.pdf", "export", "Export PDF"],
  ["settings.read", "settings", "View settings"],
  ["settings.write", "settings", "Change settings"],
  ["pricing.read", "pricing", "View pricing and rate cards"],
  ["pricing.write", "pricing", "Change pricing and rate cards"],
  ["content.write", "content", "Edit site content"],
  ["roles.manage", "roles", "Manage roles and permissions"],
  ["notifications.send", "notifications", "Send notifications"],
];

const ALL_PERMISSION_KEYS = PERMISSIONS.map(([key]) => key);

/**
 * Derived from the role capability prose in §5.1. Two judgement calls worth
 * reviewing: `viewer` is denied `audit.view` (the audit trail is privileged
 * even though the role is read-only), and `admin` is denied `users.impersonate`,
 * `settings.write`, `pricing.write` and `roles.manage` per "everything except
 * role management, settings, rate card, impersonation".
 */
const ROLE_PERMISSIONS: Record<string, string[]> = {
  super_admin: ALL_PERMISSION_KEYS,

  admin: ALL_PERMISSION_KEYS.filter(
    (key) =>
      ![
        "roles.manage",
        "settings.write",
        "pricing.write",
        "users.impersonate",
      ].includes(key),
  ),

  sales: [
    "dashboard.view",
    "users.read",
    "leads.read",
    "leads.write",
    "estimates.read",
    "estimates.write",
    "estimates.override_price",
    "estimates.convert",
    "projects.read",
    "export.csv",
    "export.pdf",
  ],

  operations: [
    "dashboard.view",
    "users.read",
    "projects.read",
    "projects.write",
    "projects.assign",
    "payments.read",
    "payments.write",
    "export.csv",
    "export.pdf",
  ],

  viewer: [
    "dashboard.view",
    "users.read",
    "estimates.read",
    "projects.read",
    "payments.read",
    "leads.read",
    "analytics.view",
    "traffic.view",
    "revenue.view",
    "activity.view",
    "settings.read",
    "pricing.read",
    "export.csv",
    "export.pdf",
  ],

  // Customers are scoped by record ownership, not by permission keys.
  customer: [],
};

// ─────────────────────────────────────────────────────────────
// Pricing
// ─────────────────────────────────────────────────────────────

const TIERS = [
  {
    key: "economy",
    nameEn: "Economy",
    taglineEn: "Lowest price",
    multiplier: 0.86,
    sortOrder: 1,
    specs: {
      panel: "550–600 W polycrystalline or entry-grade mono",
      inverter: "Entry-grade string inverter",
      battery: "Lead-acid or entry LFP",
      structure: "Standard fixed-tilt, painted steel",
    },
    warrantyNoteEn: "5-year workmanship, manufacturer panel warranty only.",
  },
  {
    key: "standard",
    nameEn: "Standard",
    taglineEn: "Best value",
    multiplier: 1.0,
    sortOrder: 2,
    isDefault: true,
    specs: {
      panel: "580–600 W monocrystalline",
      inverter: "Reputable hybrid inverter",
      battery: "LFP, 6000 cycles",
      structure: "Galvanised fixed-tilt",
    },
    warrantyNoteEn: "10-year workmanship, 12-year inverter, 25-year panels.",
  },
  {
    key: "premium",
    nameEn: "Premium",
    taglineEn: "Best quality",
    multiplier: 1.3,
    sortOrder: 3,
    specs: {
      panel: "600 W+ Tier-1 monocrystalline",
      inverter: "Tier-1 hybrid inverter with monitoring",
      battery: "Tier-1 LFP, 8000 cycles",
      structure: "Hot-dip galvanised, elevated option",
    },
    warrantyNoteEn: "10-year workmanship, 25-year panel performance warranty.",
  },
] as const;

/**
 * Rate card items mirror the `best_value` column of the current frontend engine
 * (apps/web/src/lib/pricing/engine.ts) so moving the engine server-side does not
 * change any quoted price.
 */
const RATE_CARD_ITEMS = [
  {
    code: "panels",
    labelEn: "Solar panels",
    basis: "flat" as const,
    unitRate: 34_000,
    sortOrder: 1,
    appliesWhen: {},
  },
  {
    code: "inverter",
    labelEn: "Inverter",
    basis: "per_kw_ac" as const,
    unitRate: 42_000,
    sortOrder: 2,
    appliesWhen: { system_type: ["hybrid"] },
  },
  {
    code: "inverter_ongrid",
    labelEn: "On-grid inverter",
    basis: "per_kw_ac" as const,
    unitRate: 20_000,
    sortOrder: 3,
    appliesWhen: { system_type: ["ongrid"] },
  },
  {
    code: "inverter_offgrid",
    labelEn: "Off-grid inverter",
    basis: "per_kw_ac" as const,
    unitRate: 34_000,
    sortOrder: 4,
    appliesWhen: { system_type: ["offgrid"] },
  },
  {
    code: "battery",
    labelEn: "Battery storage",
    basis: "per_kwh_batt" as const,
    unitRate: 75_000,
    sortOrder: 5,
    appliesWhen: { system_type: ["hybrid", "offgrid"] },
  },
  {
    code: "structure",
    labelEn: "Mounting structure",
    basis: "per_kwp" as const,
    unitRate: 13_000,
    sortOrder: 6,
    appliesWhen: {},
  },
  {
    code: "bos",
    labelEn: "DC cables & combiner",
    basis: "per_kwp" as const,
    unitRate: 3_500,
    sortOrder: 7,
    appliesWhen: {},
  },
  {
    code: "labour",
    labelEn: "Installation & commissioning",
    basis: "per_kwp" as const,
    unitRate: 9_000,
    sortOrder: 8,
    appliesWhen: {},
  },
  {
    code: "net_metering",
    labelEn: "Net metering application",
    basis: "flat" as const,
    unitRate: 55_000,
    sortOrder: 9,
    appliesWhen: { net_metering: [true] },
  },
];

/** LESCO slabs matching `lescoPkrPerUnit()` in the current frontend engine. */
const TARIFF_SLABS = [
  { unitsFrom: 0, unitsTo: 300, rate: 30 },
  { unitsFrom: 301, unitsTo: 700, rate: 46 },
  { unitsFrom: 701, unitsTo: null, rate: 58 },
];

// ─────────────────────────────────────────────────────────────
// Project plan templates
// ─────────────────────────────────────────────────────────────

const PHASE_TEMPLATES = [
  {
    id: 1,
    key: "survey",
    nameEn: "Site survey",
    durationLabelEn: "2–3 days",
    tasks: ["Schedule visit", "Roof measurement", "Shading assessment"],
  },
  {
    id: 2,
    key: "quotation",
    nameEn: "Quotation",
    durationLabelEn: "1–2 days",
    tasks: ["Final BOM", "Issue quotation"],
  },
  {
    id: 3,
    key: "agreement",
    nameEn: "Agreement",
    durationLabelEn: "1–3 days",
    tasks: ["Sign agreement", "Collect advance"],
  },
  {
    id: 4,
    key: "procurement",
    nameEn: "Procurement",
    durationLabelEn: "5–10 days",
    tasks: ["Order panels", "Order inverter", "Order structure"],
  },
  {
    id: 5,
    key: "installation",
    nameEn: "Installation",
    durationLabelEn: "3–5 days",
    tasks: ["Erect structure", "Mount panels", "DC wiring", "Inverter mounting"],
  },
  {
    id: 6,
    key: "commissioning",
    nameEn: "Commissioning",
    durationLabelEn: "1 day",
    tasks: ["System test", "Customer walkthrough"],
  },
  {
    id: 7,
    key: "net_metering",
    nameEn: "Net metering",
    durationLabelEn: "3–8 weeks",
    // Off-grid systems never apply for net metering.
    appliesWhen: { system_type: ["ongrid", "hybrid"] },
    tasks: ["Submit LESCO application", "Meter installation", "Approval"],
  },
  {
    id: 8,
    key: "handover",
    nameEn: "Handover",
    durationLabelEn: "1 day",
    tasks: ["Final payment", "Warranty documents"],
  },
];

// ─────────────────────────────────────────────────────────────
// Estimator settings — docs §6.4: constants live here, never hard-coded
// ─────────────────────────────────────────────────────────────

const SETTINGS: Array<{
  key: string;
  value: unknown;
  category: string;
  description: string;
}> = [
  {
    key: "estimator.panel_watt",
    value: 500,
    category: "estimator",
    description: "Nameplate watts per panel used for panel-count maths.",
  },
  {
    key: "estimator.peak_sun_hours",
    value: 4.5,
    category: "estimator",
    description: "Lahore annual average peak sun hours per day.",
  },
  {
    key: "estimator.derating",
    value: 0.78,
    category: "estimator",
    description: "System derating factor (soiling, temperature, losses).",
  },
  {
    key: "estimator.standard_sizes_kw",
    value: [3, 5, 6, 8, 10, 12, 15, 20],
    category: "estimator",
    description: "Sizes we actually sell; raw sizing rounds up to one of these.",
  },
  {
    key: "estimator.coverage_pct",
    value: { cover_all: 0.92, reduce_bill: 0.7, fit_budget: 0.92 },
    category: "estimator",
    description: "Share of consumption the system targets, per goal.",
  },
  {
    key: "estimator.pkr_per_kw_budget",
    value: 155_000,
    category: "estimator",
    description: "Rule-of-thumb PKR per kW when sizing to a budget.",
  },
  {
    key: "estimator.appliance_kw",
    value: {
      fans: 0.25,
      lights: 0.08,
      fridge: 0.15,
      ac: 1.5,
      tv: 0.12,
      water_pump: 0.55,
      computer: 0.2,
      router: 0.02,
    },
    category: "estimator",
    description: "Assumed draw per backup appliance, in kW.",
  },
  {
    key: "estimator.battery_oversize",
    value: 1.25,
    category: "estimator",
    description: "Multiplier applied to raw backup demand before rounding.",
  },
  {
    key: "estimator.battery_step_kwh",
    value: 5,
    category: "estimator",
    description: "Battery capacity granularity, in kWh.",
  },
  {
    key: "estimator.co2_kg_per_kwh",
    value: 0.45,
    category: "estimator",
    description: "Grid emission factor for the CO2 avoided figure.",
  },
  {
    key: "estimator.price_buffer_pct",
    value: 6.0,
    category: "estimator",
    description: "± band applied around the subtotal to give low/high prices.",
  },
  {
    key: "estimator.estimate_validity_days",
    value: 14,
    category: "estimator",
    description: "How long a quoted price stays valid.",
  },
  {
    key: "business.city",
    value: "Lahore",
    category: "business",
    description: "Primary service city.",
  },
  {
    key: "business.disco",
    value: "LESCO",
    category: "business",
    description: "Default distribution company for tariff lookups.",
  },
  {
    key: "business.whatsapp_number",
    value: "923294777785",
    category: "business",
    description:
      "WhatsApp number in international format without + or spaces, e.g. 923001234567. Every product and service CTA links to wa.me/<this>. Set before publishing the catalogue.",
  },
  {
    key: "business.whatsapp_default_message",
    value: "Assalam o Alaikum, I'm interested in {product}. Could you share the price and availability?",
    category: "business",
    description:
      "Default WhatsApp enquiry text. {product} is replaced with the product or service name; a product's own whatsappMessage overrides this.",
  },
];

// ─────────────────────────────────────────────────────────────

async function seedRolesAndPermissions() {
  for (const role of ROLES) {
    await prisma.role.upsert({
      where: { key: role.key },
      update: { name: role.name, description: role.description },
      create: {
        key: role.key,
        name: role.name,
        description: role.description,
        isSystem: true,
      },
    });
  }
  console.log(`  roles: ${ROLES.length}`);

  for (const [key, module, label] of PERMISSIONS) {
    await prisma.permission.upsert({
      where: { key },
      update: { module, label },
      create: { key, module, label },
    });
  }
  console.log(`  permissions: ${PERMISSIONS.length}`);

  let grants = 0;
  for (const [roleKey, permissionKeys] of Object.entries(ROLE_PERMISSIONS)) {
    const role = await prisma.role.findUniqueOrThrow({
      where: { key: roleKey },
    });

    // Re-derive from scratch so removing a key from the matrix revokes it.
    await prisma.rolePermission.deleteMany({ where: { roleId: role.id } });

    if (permissionKeys.length === 0) continue;

    const permissions = await prisma.permission.findMany({
      where: { key: { in: permissionKeys } },
      select: { id: true },
    });

    await prisma.rolePermission.createMany({
      data: permissions.map((permission) => ({
        roleId: role.id,
        permissionId: permission.id,
      })),
      skipDuplicates: true,
    });

    grants += permissions.length;
  }
  console.log(`  role-permission grants: ${grants}`);
}

async function seedPricing() {
  for (const tier of TIERS) {
    await prisma.tier.upsert({
      where: { key: tier.key },
      update: {
        nameEn: tier.nameEn,
        taglineEn: tier.taglineEn,
        multiplier: tier.multiplier,
        specs: tier.specs,
        warrantyNoteEn: tier.warrantyNoteEn,
        isDefault: "isDefault" in tier ? tier.isDefault : false,
        sortOrder: tier.sortOrder,
      },
      create: {
        key: tier.key,
        nameEn: tier.nameEn,
        taglineEn: tier.taglineEn,
        multiplier: tier.multiplier,
        specs: tier.specs,
        warrantyNoteEn: tier.warrantyNoteEn,
        isDefault: "isDefault" in tier ? tier.isDefault : false,
        sortOrder: tier.sortOrder,
      },
    });
  }
  console.log(`  tiers: ${TIERS.length}`);

  const existingCard = await prisma.rateCard.findFirst({
    where: { version: 1, city: "Lahore" },
  });

  const rateCard =
    existingCard ??
    (await prisma.rateCard.create({
      data: {
        version: 1,
        label: "Lahore market — baseline",
        city: "Lahore",
        currency: "PKR",
        effectiveFrom: new Date("2026-01-01"),
        bufferPct: 6.0,
        isActive: true,
        notes:
          "Mirrors the best_value column of the original frontend pricing engine.",
      },
    }));

  for (const item of RATE_CARD_ITEMS) {
    const existing = await prisma.rateCardItem.findFirst({
      where: { rateCardId: rateCard.id, code: item.code },
    });

    if (existing) {
      await prisma.rateCardItem.update({
        where: { id: existing.id },
        data: {
          labelEn: item.labelEn,
          basis: item.basis,
          unitRate: item.unitRate,
          sortOrder: item.sortOrder,
          appliesWhen: item.appliesWhen,
        },
      });
    } else {
      await prisma.rateCardItem.create({
        data: { rateCardId: rateCard.id, ...item },
      });
    }
  }
  console.log(`  rate card items: ${RATE_CARD_ITEMS.length}`);

  for (const slab of TARIFF_SLABS) {
    const existing = await prisma.tariffSlab.findFirst({
      where: { disco: "LESCO", unitsFrom: slab.unitsFrom },
    });

    if (existing) {
      await prisma.tariffSlab.update({
        where: { id: existing.id },
        data: { unitsTo: slab.unitsTo, rate: slab.rate, isActive: true },
      });
    } else {
      await prisma.tariffSlab.create({
        data: {
          disco: "LESCO",
          phase: "any",
          unitsFrom: slab.unitsFrom,
          unitsTo: slab.unitsTo,
          rate: slab.rate,
          effectiveFrom: new Date("2026-01-01"),
          isActive: true,
        },
      });
    }
  }
  console.log(`  tariff slabs: ${TARIFF_SLABS.length}`);
}

async function seedProjectTemplates() {
  let taskCount = 0;

  for (const phase of PHASE_TEMPLATES) {
    await prisma.phaseTemplate.upsert({
      where: { key: phase.key },
      update: {
        nameEn: phase.nameEn,
        durationLabelEn: phase.durationLabelEn,
        sortOrder: phase.id,
        appliesWhen: phase.appliesWhen ?? {},
      },
      create: {
        id: phase.id,
        key: phase.key,
        nameEn: phase.nameEn,
        durationLabelEn: phase.durationLabelEn,
        sortOrder: phase.id,
        appliesWhen: phase.appliesWhen ?? {},
      },
    });

    // Rebuild this phase's task list so edits above take effect on re-run.
    await prisma.taskTemplate.deleteMany({ where: { phaseKey: phase.key } });
    await prisma.taskTemplate.createMany({
      data: phase.tasks.map((nameEn, index) => ({
        phaseKey: phase.key,
        nameEn,
        sortOrder: index + 1,
      })),
    });

    taskCount += phase.tasks.length;
  }

  console.log(
    `  phase templates: ${PHASE_TEMPLATES.length} (${taskCount} tasks)`,
  );
}

async function seedSettings() {
  for (const setting of SETTINGS) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: {
        value: setting.value as never,
        category: setting.category,
        description: setting.description,
      },
      create: {
        key: setting.key,
        value: setting.value as never,
        category: setting.category,
        description: setting.description,
      },
    });
  }
  console.log(`  settings: ${SETTINGS.length}`);
}

// ─────────────────────────────────────────────────────────────
// Product catalogue — categories, brands and services
//
// Categories and slugs are SEO-critical: once a slug is indexed it must not
// change. See docs/08-seo-strategy.md §2.
// ─────────────────────────────────────────────────────────────

const PRODUCT_CATEGORIES = [
  {
    slug: "inverters",
    nameEn: "Inverters",
    icon: "Zap",
    summaryEn:
      "On-grid, hybrid and off-grid inverters from the brands we install and support ourselves.",
    metaTitle: "Solar Inverters in Lahore — Prices & Models | Al-Wahab Solar",
    metaDescription:
      "Hybrid, on-grid and off-grid solar inverters available in Lahore. Genuine units, warranty backed, installed and configured by our own team.",
    sortOrder: 1,
  },
  {
    slug: "batteries",
    nameEn: "Batteries",
    icon: "BatteryCharging",
    summaryEn:
      "Lithium (LFP) and tubular batteries sized for real Lahore load-shedding patterns.",
    metaTitle: "Solar Batteries in Lahore — LFP & Tubular | Al-Wahab Solar",
    metaDescription:
      "Lithium LFP and tubular solar batteries in Lahore. Correct sizing, bank configuration and installation included.",
    sortOrder: 2,
  },
  {
    slug: "solar-panels",
    nameEn: "Solar Panels",
    icon: "Sun",
    summaryEn:
      "Tier-1 monocrystalline panels with verifiable warranties and datasheets.",
    metaTitle: "Solar Panels in Lahore — Tier-1 Prices | Al-Wahab Solar",
    metaDescription:
      "Tier-1 monocrystalline solar panels in Lahore with genuine warranty documentation. Current market pricing, supplied and installed.",
    sortOrder: 3,
  },
  {
    slug: "net-meters",
    nameEn: "Net Meters",
    icon: "Gauge",
    summaryEn:
      "Bi-directional (green) meters plus the LESCO net-metering application handled for you.",
    metaTitle: "Net Metering & Green Meters in Lahore | Al-Wahab Solar",
    metaDescription:
      "Bi-directional net meters for LESCO net metering in Lahore, including the full application and approval process.",
    sortOrder: 4,
  },
  {
    slug: "ev-chargers",
    nameEn: "EV Chargers",
    icon: "PlugZap",
    summaryEn:
      "AC and DC home and commercial EV chargers, solar-aware where supported.",
    metaTitle: "EV Chargers in Lahore — Home & Commercial | Al-Wahab Solar",
    metaDescription:
      "Home and commercial EV chargers in Lahore. Supplied, installed and integrated with your solar system.",
    sortOrder: 5,
  },
  {
    slug: "breakers-protection",
    nameEn: "Breakers & Protection",
    icon: "ShieldCheck",
    summaryEn:
      "DC/AC breakers, SPDs, isolators and fuses — the parts that keep a system safe.",
    metaTitle: "Solar DC/AC Breakers & Surge Protection in Lahore | Al-Wahab",
    metaDescription:
      "DC and AC breakers, surge protection devices, isolators and fuses for solar systems in Lahore.",
    sortOrder: 6,
  },
  {
    slug: "accessories",
    nameEn: "Accessories",
    icon: "Cable",
    summaryEn:
      "Mounting structures, DC cable, connectors, combiner boxes and earthing kits.",
    metaTitle: "Solar Accessories & Mounting in Lahore | Al-Wahab Solar",
    metaDescription:
      "Mounting structures, solar DC cable, MC4 connectors, combiner boxes and earthing kits available in Lahore.",
    sortOrder: 7,
  },
];

/**
 * Starter brand list for the Pakistani market. Admin can add, edit or
 * deactivate these — nothing here implies stock.
 */
const BRANDS = [
  { slug: "longi", name: "Longi", originCountry: "China", sortOrder: 1 },
  { slug: "jinko", name: "Jinko Solar", originCountry: "China", sortOrder: 2 },
  { slug: "ja-solar", name: "JA Solar", originCountry: "China", sortOrder: 3 },
  {
    slug: "canadian-solar",
    name: "Canadian Solar",
    originCountry: "Canada",
    sortOrder: 4,
  },
  { slug: "growatt", name: "Growatt", originCountry: "China", sortOrder: 5 },
  { slug: "solis", name: "Solis", originCountry: "China", sortOrder: 6 },
  { slug: "goodwe", name: "GoodWe", originCountry: "China", sortOrder: 7 },
  { slug: "huawei", name: "Huawei", originCountry: "China", sortOrder: 8 },
  { slug: "sungrow", name: "Sungrow", originCountry: "China", sortOrder: 9 },
  { slug: "inverex", name: "Inverex", originCountry: "Pakistan", sortOrder: 10 },
  { slug: "tesla-pk", name: "Tesla Power", originCountry: "Pakistan", sortOrder: 11 },
  { slug: "pylontech", name: "Pylontech", originCountry: "China", sortOrder: 12 },
  { slug: "dyness", name: "Dyness", originCountry: "China", sortOrder: 13 },
  { slug: "narada", name: "Narada", originCountry: "China", sortOrder: 14 },
  { slug: "phoenix", name: "Phoenix", originCountry: "Pakistan", sortOrder: 15 },
];

/** Installation and configuration services sold alongside hardware. */
const SERVICES = [
  {
    slug: "solar-system-installation",
    nameEn: "Solar System Installation",
    icon: "Sun",
    summaryEn:
      "Complete supply and installation — structure, panels, inverter, wiring and commissioning by our own certified crew.",
    status: "published" as const,
    priceUnit: "per kW",
    isFeatured: true,
    sortOrder: 1,
    metaTitle: "Solar System Installation in Lahore | Al-Wahab Solar Traders",
    metaDescription:
      "End-to-end solar installation in Lahore by our own certified team. Structure, panels, inverter, wiring and commissioning.",
  },
  {
    slug: "inverter-installation-configuration",
    nameEn: "Inverter Installation & Configuration",
    icon: "Zap",
    summaryEn:
      "Mounting, wiring and full parameter configuration — charge curves, grid settings, load priority and monitoring.",
    status: "published" as const,
    priceUnit: "per inverter",
    isFeatured: true,
    sortOrder: 2,
    metaTitle: "Inverter Installation & Configuration in Lahore | Al-Wahab",
    metaDescription:
      "Professional solar inverter installation and configuration in Lahore — grid settings, charge curves, load priority and monitoring setup.",
  },
  {
    slug: "battery-bank-configuration",
    nameEn: "Battery Bank Configuration",
    icon: "BatteryCharging",
    summaryEn:
      "Correct series/parallel design, BMS setup, and charge parameters matched to your inverter so the bank actually lasts.",
    status: "published" as const,
    priceUnit: "per bank",
    isFeatured: true,
    sortOrder: 3,
    metaTitle: "Battery Bank Configuration in Lahore | Al-Wahab Solar",
    metaDescription:
      "Solar battery bank design and configuration in Lahore — series/parallel layout, BMS setup and inverter-matched charge parameters.",
  },
  {
    slug: "net-metering-application",
    nameEn: "Net Metering Application",
    icon: "Gauge",
    summaryEn:
      "The full LESCO net-metering process — documentation, application, inspection and meter installation.",
    status: "published" as const,
    priceUnit: "per site",
    sortOrder: 4,
    metaTitle: "LESCO Net Metering Application in Lahore | Al-Wahab Solar",
    metaDescription:
      "We handle the complete LESCO net metering process in Lahore: documentation, application, inspection and bi-directional meter installation.",
  },
  {
    slug: "system-health-check",
    nameEn: "System Health Check & Maintenance",
    icon: "Activity",
    summaryEn:
      "Panel cleaning, connection torque check, inverter fault review and a written performance report.",
    status: "published" as const,
    priceUnit: "per visit",
    sortOrder: 5,
    metaTitle: "Solar Maintenance & Health Check in Lahore | Al-Wahab Solar",
    metaDescription:
      "Solar system maintenance in Lahore — panel cleaning, connection checks, inverter diagnostics and a written performance report.",
  },
  {
    slug: "fault-diagnosis-repair",
    nameEn: "Fault Diagnosis & Repair",
    icon: "Wrench",
    summaryEn:
      "Underperforming or dead system? We diagnose the cause and quote the repair before doing the work.",
    status: "published" as const,
    priceUnit: "per visit",
    sortOrder: 6,
    metaTitle: "Solar Fault Diagnosis & Repair in Lahore | Al-Wahab Solar",
    metaDescription:
      "Solar fault diagnosis and repair in Lahore. We find the cause, explain it, and quote before any work starts.",
  },
];

/**
 * DEVELOPMENT SAMPLE PRODUCTS — replace or delete before launch.
 *
 * These are real products sold in this market and the specs are public
 * manufacturer data, but nothing here implies Al-Wahab stocks them. Every entry
 * is deliberately `on_request`: no price is invented. Add real photos, real
 * prices and real copy through the admin UI, and delete anything you do not
 * actually sell — see docs/08-seo-strategy.md §5.1 for the bar a product page
 * must clear before it is published.
 */
const SAMPLE_PRODUCTS = [
  {
    slug: "growatt-spf-5000es",
    categorySlug: "inverters",
    brandSlug: "growatt",
    nameEn: "Growatt SPF 5000 ES",
    summaryEn:
      "5 kW off-grid/hybrid inverter with built-in MPPT — a common choice for 5–6 kW Lahore homes wanting battery backup.",
    specs: {
      rated_power_kw: 5,
      type: "hybrid",
      mppt_trackers: 1,
      max_pv_input_v: 450,
      battery_voltage_v: 48,
      phase: "single",
    },
    warrantyMonths: 24,
    isFeatured: true,
    sortOrder: 1,
  },
  {
    slug: "solis-s6-gr1p5k",
    categorySlug: "inverters",
    brandSlug: "solis",
    nameEn: "Solis S6-GR1P5K",
    summaryEn:
      "5 kW single-phase on-grid inverter suited to net-metered rooftops with no battery.",
    specs: {
      rated_power_kw: 5,
      type: "ongrid",
      mppt_trackers: 2,
      max_efficiency_pct: 97.8,
      phase: "single",
    },
    warrantyMonths: 60,
    isFeatured: true,
    sortOrder: 2,
  },
  {
    slug: "pylontech-us5000",
    categorySlug: "batteries",
    brandSlug: "pylontech",
    nameEn: "Pylontech US5000",
    summaryEn:
      "4.8 kWh 48 V LFP battery module, stackable — the safe default when a customer wants reliable evening backup.",
    specs: {
      capacity_kwh: 4.8,
      chemistry: "LFP",
      nominal_voltage_v: 48,
      cycles: 6000,
      depth_of_discharge_pct: 95,
      stackable: true,
    },
    warrantyMonths: 120,
    isFeatured: true,
    sortOrder: 1,
  },
  {
    slug: "dyness-b4850",
    categorySlug: "batteries",
    brandSlug: "dyness",
    nameEn: "Dyness B4850",
    summaryEn:
      "4.8 kWh 48 V LFP module with wall or rack mounting, widely supported by hybrid inverters here.",
    specs: {
      capacity_kwh: 4.8,
      chemistry: "LFP",
      nominal_voltage_v: 48,
      cycles: 6000,
      stackable: true,
    },
    warrantyMonths: 60,
    sortOrder: 2,
  },
  {
    slug: "longi-hi-mo-6-585w",
    categorySlug: "solar-panels",
    brandSlug: "longi",
    nameEn: "Longi Hi-MO 6 585 W",
    summaryEn:
      "585 W monocrystalline module with strong high-temperature performance — relevant in a 45 °C Lahore summer.",
    specs: {
      power_w: 585,
      cell_type: "monocrystalline PERC",
      efficiency_pct: 22.6,
      temperature_coefficient: "-0.29%/°C",
      dimensions_mm: "2278 × 1134 × 30",
    },
    warrantyMonths: 300,
    isFeatured: true,
    sortOrder: 1,
  },
  {
    slug: "ja-solar-jam72d40-580w",
    categorySlug: "solar-panels",
    brandSlug: "ja-solar",
    nameEn: "JA Solar JAM72D40 580 W",
    summaryEn:
      "580 W bifacial double-glass module — extra yield where the roof surface reflects.",
    specs: {
      power_w: 580,
      cell_type: "monocrystalline",
      bifacial: true,
      efficiency_pct: 22.5,
    },
    warrantyMonths: 360,
    sortOrder: 2,
  },
  {
    slug: "bidirectional-net-meter-3phase",
    categorySlug: "net-meters",
    brandSlug: null,
    nameEn: "Bi-directional Net Meter (3-Phase)",
    summaryEn:
      "LESCO-approved bi-directional meter for three-phase connections, supplied with the full net-metering application.",
    specs: { phase: "three", type: "bi-directional", approval: "LESCO" },
    sortOrder: 1,
  },
  {
    slug: "dc-isolator-1000v",
    categorySlug: "breakers-protection",
    brandSlug: null,
    nameEn: "DC Isolator 1000 V",
    summaryEn:
      "Rooftop DC isolator — required for safe maintenance and for a compliant net-metering inspection.",
    specs: { voltage_v: 1000, poles: 4, ip_rating: "IP66" },
    sortOrder: 1,
  },
];

async function seedSampleProducts() {
  const categories = new Map(
    (await prisma.productCategory.findMany({ select: { id: true, slug: true } })).map(
      (c) => [c.slug, c.id],
    ),
  );
  const brands = new Map(
    (await prisma.brand.findMany({ select: { id: true, slug: true } })).map((b) => [
      b.slug,
      b.id,
    ]),
  );

  for (const p of SAMPLE_PRODUCTS) {
    const categoryId = categories.get(p.categorySlug);
    if (!categoryId) continue;

    const data = {
      nameEn: p.nameEn,
      summaryEn: p.summaryEn,
      specs: p.specs,
      categoryId,
      brandId: p.brandSlug ? (brands.get(p.brandSlug) ?? null) : null,
      warrantyMonths: p.warrantyMonths ?? null,
      isFeatured: p.isFeatured ?? false,
      sortOrder: p.sortOrder ?? 0,
      // No invented prices — every sample is quote-on-request.
      priceMode: "on_request" as const,
      status: "published" as const,
      publishedAt: new Date("2026-01-01"),
    };

    await prisma.product.upsert({
      where: { slug: p.slug },
      update: data,
      create: { slug: p.slug, ...data },
    });
  }

  console.log(`  sample products: ${SAMPLE_PRODUCTS.length} (replace before launch)`);
}

async function seedCatalogue() {
  for (const category of PRODUCT_CATEGORIES) {
    await prisma.productCategory.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
  }
  console.log(`  product categories: ${PRODUCT_CATEGORIES.length}`);

  for (const brand of BRANDS) {
    await prisma.brand.upsert({
      where: { slug: brand.slug },
      update: brand,
      create: brand,
    });
  }
  console.log(`  brands: ${BRANDS.length}`);

  for (const service of SERVICES) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }
  console.log(`  services: ${SERVICES.length}`);
}

async function main() {
  console.log("Seeding reference data…");
  await seedRolesAndPermissions();
  await seedPricing();
  await seedProjectTemplates();
  await seedSettings();
  await seedCatalogue();
  await seedSampleProducts();
  console.log("Done.");
}

main()
  .catch((error: unknown) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(() => {
    void prisma.$disconnect();
  });
