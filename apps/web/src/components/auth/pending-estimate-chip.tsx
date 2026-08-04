"use client";

import { useEffect, useState } from "react";
import { Sun } from "lucide-react";
import type { EstimateResult } from "@/types/estimator";

const SYSTEM_TYPE_LABELS: Record<string, string> = {
  ongrid: "On-grid",
  hybrid: "Hybrid",
  offgrid: "Off-grid",
};

const PRIORITY_LABELS: Record<string, string> = {
  lowest_price: "Budget",
  best_value: "Standard",
  best_quality: "Premium",
};

export function PendingEstimateChip() {
  const [estimate, setEstimate] = useState<EstimateResult | null>(null);

  useEffect(() => {
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key?.startsWith("estimate-")) {
        try {
          const data = JSON.parse(sessionStorage.getItem(key)!) as EstimateResult;
          setEstimate(data);
        } catch {
          // ignore malformed entries
        }
        break;
      }
    }
  }, []);

  if (!estimate) return null;

  const systemLabel =
    SYSTEM_TYPE_LABELS[estimate.answers.systemType ?? ""] ?? estimate.answers.systemType;
  const tierLabel =
    PRIORITY_LABELS[estimate.answers.priority ?? ""] ?? estimate.answers.priority;

  const totalFormatted = `PKR ${estimate.totalPkr.toLocaleString("en-PK")}`;

  return (
    <div className="glass flex items-center gap-3 rounded-xl p-3 text-[13px]">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold/15">
        <Sun className="h-4 w-4 text-gold" />
      </div>
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="font-medium text-white">
          Save your {estimate.systemKw} kWp estimate
        </span>
        <span className="truncate text-slate-400">
          {totalFormatted} · {systemLabel} · {tierLabel}
        </span>
      </div>
    </div>
  );
}
