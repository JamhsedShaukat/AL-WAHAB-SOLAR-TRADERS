export type ProjectStatus =
  | "survey_requested"
  | "survey_scheduled"
  | "surveyed"
  | "quotation_issued"
  | "agreement_signed"
  | "procurement"
  | "installation"
  | "commissioning"
  | "net_metering"
  | "handover"
  | "completed"
  | "cancelled"
  | "on_hold";

export type TaskStatus =
  | "pending"
  | "in_progress"
  | "completed"
  | "skipped"
  | "blocked";

export interface Project {
  id: string;
  /** Human-quotable reference, e.g. "PRJ-2607-0088". */
  publicRef: string;
  userId: string;
  estimateId?: string;
  status: ProjectStatus;
  title?: string;
  systemSizeKwp: number;
  tierId?: string;
  contractValuePkr: number;
  invoicedPkr: number;
  collectedPkr: number;
  address?: string;
  areaName?: string;
  surveyDate?: string;
  startDate?: string;
  createdAt: string;
  updatedAt: string;
}
