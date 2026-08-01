export type SystemType = "ongrid" | "hybrid" | "offgrid";
export type EstimateGoal = "cover_all" | "reduce_bill" | "fit_budget";
export type RoofType = "rcc" | "metal_sheet" | "ground_mount" | "carport";
export type StructureType = "standard" | "customized";
export type StructureQuality = "medium" | "good";
export type Priority = "lowest_price" | "best_value" | "best_quality";
export type EntryMethod = "upload" | "manual" | "sample";

export interface WizardAnswers {
  entryMethod?: EntryMethod;
  monthlyUnits?: number;
  connectionPhase?: "single" | "three";
  installAddress?: string;
  goal?: EstimateGoal;
  systemType?: SystemType;
  backupLoads?: string[];
  backupHours?: number;
  roofType?: RoofType;
  roofAreaSqft?: number;
  structureType?: StructureType;
  structureQuality?: StructureQuality;
  priority?: Priority;
  budgetPkr?: number;
  netMetering?: boolean;
}

export interface WizardState {
  currentStep: number;
  totalSteps: number;
  answers: WizardAnswers;
  started: boolean;
}

export type WizardAction =
  | { type: "START"; entryMethod: EntryMethod }
  | { type: "SET_ANSWER"; payload: Partial<WizardAnswers> }
  | { type: "NEXT_STEP" }
  | { type: "GO_TO_STEP"; step: number }
  | { type: "RESET" };
