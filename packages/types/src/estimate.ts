export type SystemType = "ongrid" | "hybrid" | "offgrid";

export type EstimateGoal = "cover_all" | "reduce_bill" | "fit_budget";

export type EstimateStatus =
  | "draft"
  | "completed"
  | "saved"
  | "survey_requested"
  | "surveyed"
  | "quoted"
  | "accepted"
  | "declined"
  | "expired"
  | "converted";

export type ConnectionPhase = "single" | "three";

export type StructureType = "standard" | "customized";

export type StructureQuality = "medium" | "good";

export type EstimatePriority =
  | "lowest_price"
  | "best_value"
  | "best_quality"
  | "budget";

export type TierKey = "economy" | "standard" | "premium";

/** What the customer told us — the estimator's inputs. */
export interface EstimateInputs {
  monthlyBillPkr?: number;
  monthlyUnits?: number;
  connectionPhase?: ConnectionPhase;
  goal?: EstimateGoal;
  systemType?: SystemType;
  backupLoads?: string[];
  backupHours?: number;
  roofType?: string;
  roofAreaSqft?: number;
  structureType?: StructureType;
  structureQuality?: StructureQuality;
  priority?: EstimatePriority;
  budgetPkr?: number;
  netMetering: boolean;
  areaName?: string;
  installAddress?: string;
}

/** What the engine produced. */
export interface EstimateResult {
  tierId?: string;
  systemSizeKwp: number;
  inverterKw: number;
  batteryKwh: number;
  panelCount: number;
  panelWatt: number;
  subtotalPkr: number;
  priceLowPkr: number;
  priceHighPkr: number;
  monthlyUnitsGen: number;
  monthlySavingPkr: number;
  billCoveragePct: number;
  paybackYears: number;
}

export interface EstimateLineItem {
  id: string;
  code: string;
  labelEn: string;
  labelUr?: string;
  specEn?: string;
  specUr?: string;
  quantity: number;
  unit: string;
  unitRate: number;
  amountPkr: number;
  isOverride: boolean;
  sortOrder: number;
}

export interface Estimate {
  id: string;
  /** Human-quotable reference, e.g. "AWS-2607-0421". */
  publicRef: string;
  userId?: string;
  status: EstimateStatus;
  version: number;
  parentId?: string;
  inputs: EstimateInputs;
  result: EstimateResult;
  lineItems: EstimateLineItem[];
  rateCardId?: string;
  locale: "en" | "ur";
  validUntil?: string;
  issuedAt?: string;
  createdAt: string;
  updatedAt: string;
}
