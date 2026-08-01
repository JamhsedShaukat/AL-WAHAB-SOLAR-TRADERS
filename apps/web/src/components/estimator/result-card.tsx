"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle, Calendar, Leaf, TrendingDown } from "lucide-react";
import type { EstimateResult } from "@/types/estimator";

function fmt(n: number) {
  return n.toLocaleString("en-PK");
}

const SYSTEM_LABELS: Record<string, string> = {
  ongrid: "On-grid",
  hybrid: "Hybrid",
  offgrid: "Off-grid",
};

interface ResultCardProps {
  result: EstimateResult;
  onReset: () => void;
}

export function ResultCard({ result, onReset }: ResultCardProps) {
  const systemLabel = SYSTEM_LABELS[result.answers.systemType ?? "hybrid"];

  return (
    <div className="space-y-6">
      {/* Success header */}
      <div className="flex items-center gap-3">
        <CheckCircle className="h-7 w-7 shrink-0 text-gold" />
        <div>
          <p className="font-display text-[18px] font-semibold text-white">
            Your estimate is ready
          </p>
          <p className="text-[13px] text-slate-400">Ref: {result.ref}</p>
        </div>
      </div>

      {/* Receipt card */}
      <div className="glass rounded-2xl p-5 sm:p-6">
        {/* Header row */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            al-wahab · solar estimate
          </span>
          <span className="rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-[11px] font-semibold text-gold">
            {result.systemKw} kWp {systemLabel}
          </span>
        </div>

        {/* Line items */}
        <div className="mt-5 divide-y divide-white/[0.06]">
          {result.lineItems.map((item) => (
            <div
              key={item.label}
              className="flex items-start justify-between gap-4 py-3"
            >
              <div>
                <div className="text-[14px] font-medium text-white">
                  {item.label}
                </div>
                <div className="mt-0.5 text-[12px] text-slate-500">
                  {item.qty > 1 ? `${item.qty} × ` : ""}
                  {item.unitLabel}
                </div>
              </div>
              <div className="shrink-0 text-[14px] font-medium text-white">
                PKR {fmt(item.totalPkr)}
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-1 flex items-center justify-between border-t border-white/10 pt-4">
          <div>
            <div className="text-[13px] font-medium text-slate-400">
              Estimated total
            </div>
            <div className="mt-0.5 text-[11px] text-slate-500">
              Indicative — subject to site survey
            </div>
          </div>
          <div className="font-display text-[22px] font-semibold text-gradient-gold">
            PKR {fmt(result.totalPkr)}
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
          {[
            {
              icon: TrendingDown,
              label: "Monthly saving",
              value: `PKR ${fmt(result.monthlySavingsPkr)}`,
            },
            {
              icon: Calendar,
              label: "Payback period",
              value: `${result.paybackYears} yrs`,
            },
            {
              icon: Leaf,
              label: "CO₂ offset",
              value: `${fmt(result.co2KgAnnual)} kg/yr`,
            },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-xl bg-white/4 p-3 text-center">
              <Icon className="mx-auto mb-1.5 h-4 w-4 text-gold" />
              <div className="font-display text-[14px] font-semibold text-white">
                {value}
              </div>
              <div className="mt-0.5 text-[10.5px] text-slate-500">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href={`/estimate/${result.ref}`}
          className="focus-ring group flex flex-1 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-gold to-amber px-6 py-3 text-[15px] font-semibold text-navy-950 shadow-cta transition-all duration-200 hover:shadow-cta-hover hover:brightness-105 active:scale-[0.96]"
        >
          View full breakdown
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <button
          type="button"
          onClick={onReset}
          className="focus-ring rounded-xl border border-white/10 bg-white/4 px-5 py-3 text-[14px] font-medium text-slate-300 transition-all hover:bg-white/8 hover:text-white"
        >
          Start over
        </button>
      </div>
    </div>
  );
}
