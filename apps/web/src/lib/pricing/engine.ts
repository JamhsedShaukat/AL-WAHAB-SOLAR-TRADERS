import type {
  WizardAnswers,
  EstimateResult,
  EstimateLineItem,
  Priority,
  SystemType,
  StructureType,
  StructureQuality,
} from "@/types/estimator";

const PANEL_W = 500; // 500 W panels standard in Pakistan 2025
const PEAK_SUN_HOURS = 4.5; // Lahore annual average
const DERATING = 0.78;

const PANEL_PRICE: Record<Priority, number> = {
  lowest_price: 27_000,
  best_value: 34_000,
  best_quality: 44_000,
};

const INVERTER_PRICE: Record<SystemType, Record<Priority, number>> = {
  ongrid: { lowest_price: 14_000, best_value: 20_000, best_quality: 26_000 },
  hybrid: { lowest_price: 30_000, best_value: 42_000, best_quality: 56_000 },
  offgrid: { lowest_price: 24_000, best_value: 34_000, best_quality: 44_000 },
};

const BATTERY_PRICE: Record<Priority, number> = {
  lowest_price: 55_000,
  best_value: 75_000,
  best_quality: 100_000,
};

const STRUCTURE_PRICE: Record<
  StructureType,
  Record<StructureQuality, number>
> = {
  standard: { medium: 8_000, good: 13_000 },
  customized: { medium: 14_000, good: 22_000 },
};

const INSTALL_PER_KW = 9_000;
const WIRING_PER_KW = 3_500;

const APPLIANCE_KW: Record<string, number> = {
  fans: 0.25,
  lights: 0.08,
  fridge: 0.15,
  ac: 1.5,
  tv: 0.12,
  water_pump: 0.55,
  computer: 0.2,
  router: 0.02,
};

const STANDARD_SIZES = [3, 5, 6, 8, 10, 12, 15, 20];

function pickSize(rawKw: number): number {
  return STANDARD_SIZES.find((s) => s >= rawKw) ?? 20;
}

function lescoPkrPerUnit(monthlyUnits: number): number {
  if (monthlyUnits > 700) return 58;
  if (monthlyUnits > 300) return 46;
  return 30;
}

export function computeEstimate(answers: WizardAnswers): EstimateResult {
  const priority = answers.priority ?? "best_value";
  const systemType = answers.systemType ?? "hybrid";
  const structType = answers.structureType ?? "standard";
  const structQual = answers.structureQuality ?? "good";
  const monthlyUnits = answers.monthlyUnits ?? 500;
  const coverPct = answers.goal === "reduce_bill" ? 0.7 : 0.92;

  // System size
  let rawKw: number;
  if (answers.goal === "fit_budget" && answers.budgetPkr) {
    rawKw = answers.budgetPkr / 155_000;
  } else {
    rawKw = (monthlyUnits * coverPct) / (PEAK_SUN_HOURS * 30 * DERATING);
  }
  const systemKw = pickSize(rawKw);
  const panelCount = Math.ceil((systemKw * 1000) / PANEL_W);

  // Battery sizing for hybrid/offgrid
  let batteryKwh = 0;
  if (systemType !== "ongrid" && answers.backupHours) {
    const loads = (answers.backupLoads ?? ["fans", "lights", "fridge"]).reduce(
      (s, id) => s + (APPLIANCE_KW[id] ?? 0.1),
      0,
    );
    const raw = loads * answers.backupHours * 1.25;
    batteryKwh = Math.max(5, Math.ceil(raw / 5) * 5);
  }

  const panelsCost = panelCount * PANEL_PRICE[priority];
  const inverterCost = systemKw * INVERTER_PRICE[systemType][priority];
  const batteryCost = batteryKwh * BATTERY_PRICE[priority];
  const structCost = systemKw * STRUCTURE_PRICE[structType][structQual];
  const wiringCost = Math.round(systemKw * WIRING_PER_KW);
  const installCost = systemKw * INSTALL_PER_KW;
  const nmCost = answers.netMetering ? 55_000 : 0;

  const lineItems: EstimateLineItem[] = [
    {
      label: "Solar panels",
      qty: panelCount,
      unitLabel: `${PANEL_W} W mono${priority === "best_quality" ? " Tier-1" : ""}`,
      unitPricePkr: PANEL_PRICE[priority],
      totalPkr: panelsCost,
    },
    {
      label:
        systemType === "ongrid"
          ? "On-grid inverter"
          : systemType === "hybrid"
            ? "Hybrid inverter"
            : "Off-grid inverter",
      qty: 1,
      unitLabel: `${systemKw} kW`,
      unitPricePkr: inverterCost,
      totalPkr: inverterCost,
    },
    ...(batteryKwh > 0
      ? [
          {
            label: "Battery storage",
            qty: 1,
            unitLabel: `${batteryKwh} kWh LFP`,
            unitPricePkr: batteryCost,
            totalPkr: batteryCost,
          },
        ]
      : []),
    {
      label: "Mounting structure",
      qty: 1,
      unitLabel: `${structType === "customized" ? "Custom elevated" : "Fixed tilt"}, ${structQual === "good" ? "galvanised" : "standard"}`,
      unitPricePkr: structCost,
      totalPkr: structCost,
    },
    {
      label: "DC cables & combiner",
      qty: 1,
      unitLabel: "Complete BOS",
      unitPricePkr: wiringCost,
      totalPkr: wiringCost,
    },
    {
      label: "Installation & commissioning",
      qty: 1,
      unitLabel: `${systemKw} kW system`,
      unitPricePkr: installCost,
      totalPkr: installCost,
    },
    ...(nmCost > 0
      ? [
          {
            label: "Net metering application",
            qty: 1,
            unitLabel: "LESCO application + meter",
            unitPricePkr: nmCost,
            totalPkr: nmCost,
          },
        ]
      : []),
  ];

  const totalPkr = lineItems.reduce((s, i) => s + i.totalPkr, 0);

  const tariff = lescoPkrPerUnit(monthlyUnits);
  const monthlySavedUnits = Math.round(monthlyUnits * coverPct);
  const monthlySavingsPkr = Math.round(monthlySavedUnits * tariff);
  const annualSavingsPkr = monthlySavingsPkr * 12;
  const paybackYears = Math.round((totalPkr / annualSavingsPkr) * 10) / 10;
  const generationKwhAnnual = Math.round(
    systemKw * PEAK_SUN_HOURS * 365 * DERATING,
  );
  const co2KgAnnual = Math.round(generationKwhAnnual * 0.45);
  const monthlyBillBefore = Math.round(monthlyUnits * tariff);
  const monthlyBillAfter = Math.max(0, monthlyBillBefore - monthlySavingsPkr);

  const now = new Date();
  const datePart = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();

  return {
    ref: `AWE-${datePart}-${rand}`,
    systemKw,
    panelCount,
    panelWatts: PANEL_W,
    batteryKwh,
    inverterKw: systemKw,
    lineItems,
    totalPkr,
    monthlyBillBefore,
    monthlyBillAfter,
    monthlySavingsPkr,
    annualSavingsPkr,
    paybackYears,
    co2KgAnnual,
    generationKwhAnnual,
    answers,
    createdAt: now.toISOString(),
  };
}
