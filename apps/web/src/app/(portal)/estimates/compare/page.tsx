import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Minus } from "lucide-react";
import { cn } from "@wahab/utils";

export const metadata: Metadata = {
  title: "Compare estimates",
};

// Mock estimates for comparison — replaced with real data in Phase 5
const COMPARE_ESTIMATES = [
  {
    ref: "AWS-2607-0421",
    sizeKwp: 5,
    systemType: "On-grid",
    tier: "Economy",
    area: "Model Town, Lahore",
    panelCount: 10,
    panelWatt: 500,
    inverterKw: 5,
    batteryKwh: 0,
    subtotalPkr: 1050000,
    priceLowPkr: 1050000,
    priceHighPkr: 1200000,
    monthlySavingPkr: 18000,
    paybackYears: 5.0,
    co2TonnesPerYear: 4.2,
    billCoveragePct: 90,
  },
  {
    ref: "AWS-2607-0355",
    sizeKwp: 8,
    systemType: "On-grid",
    tier: "Standard",
    area: "Bahria Town, Lahore",
    panelCount: 16,
    panelWatt: 500,
    inverterKw: 8,
    batteryKwh: 0,
    subtotalPkr: 2100000,
    priceLowPkr: 2100000,
    priceHighPkr: 2400000,
    monthlySavingPkr: 29000,
    paybackYears: 6.5,
    co2TonnesPerYear: 6.7,
    billCoveragePct: 100,
  },
  {
    ref: "AWS-2607-0388",
    sizeKwp: 12,
    systemType: "Hybrid",
    tier: "Premium",
    area: "DHA Phase 6, Lahore",
    panelCount: 24,
    panelWatt: 500,
    inverterKw: 12,
    batteryKwh: 10,
    subtotalPkr: 3100000,
    priceLowPkr: 3100000,
    priceHighPkr: 3100000,
    monthlySavingPkr: 42000,
    paybackYears: 6.2,
    co2TonnesPerYear: 10.1,
    billCoveragePct: 100,
  },
];

type CompareRow = {
  label: string;
  key: keyof (typeof COMPARE_ESTIMATES)[0];
  format?: (v: number | string) => string;
};

const ROWS: CompareRow[] = [
  { label: "System size", key: "sizeKwp", format: (v) => `${v} kWp` },
  { label: "System type", key: "systemType" },
  { label: "Tier", key: "tier" },
  { label: "Area", key: "area" },
  { label: "Panels", key: "panelCount", format: (v) => `${v} × 500W` },
  { label: "Inverter", key: "inverterKw", format: (v) => `${v} kW` },
  {
    label: "Battery",
    key: "batteryKwh",
    format: (v) => (Number(v) > 0 ? `${v} kWh` : "—"),
  },
  {
    label: "Price range",
    key: "priceLowPkr",
    format: (_v, est?: (typeof COMPARE_ESTIMATES)[0]) =>
      est
        ? `PKR ${(est.priceLowPkr / 1_000_000).toFixed(2)}M–${(est.priceHighPkr / 1_000_000).toFixed(2)}M`
        : "—",
  },
  {
    label: "Monthly saving",
    key: "monthlySavingPkr",
    format: (v) => `PKR ${Number(v).toLocaleString()}`,
  },
  { label: "Payback period", key: "paybackYears", format: (v) => `${v} yrs` },
  { label: "CO₂ offset", key: "co2TonnesPerYear", format: (v) => `${v} t/yr` },
  { label: "Bill coverage", key: "billCoveragePct", format: (v) => `${v}%` },
];

function formatValue(
  row: CompareRow,
  est: (typeof COMPARE_ESTIMATES)[0],
): string {
  const v = est[row.key];
  if (row.format) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (row.format as any)(v, est);
  }
  return String(v ?? "—");
}

/** A row's values differ if not all estimates share the same formatted value. */
function isDiffRow(row: CompareRow, estimates: typeof COMPARE_ESTIMATES) {
  const vals = estimates.map((e) => formatValue(row, e));
  return new Set(vals).size > 1;
}

export default function CompareEstimatesPage() {
  const estimates = COMPARE_ESTIMATES;

  return (
    <div className="flex flex-col gap-8">
      {/* Page header */}
      <div className="flex flex-wrap items-center gap-4">
        <Link
          href="/estimates"
          className="focus-ring flex items-center gap-1.5 text-[13px] text-slate-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to estimates
        </Link>
        <h1 className="font-display text-[28px] font-semibold text-white sm:text-[32px]">
          Compare estimates
        </h1>
      </div>

      {/* Comparison table — horizontal scroll on mobile */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-160 border-separate border-spacing-0">
          {/* Sticky header row */}
          <thead className="sticky top-0 z-10">
            <tr>
              {/* Label column */}
              <th className="glass-strong w-36 rounded-tl-2xl px-4 py-4 text-left text-[12px] font-medium uppercase tracking-wide text-slate-500 sm:w-44" />
              {estimates.map((est, i) => (
                <th
                  key={est.ref}
                  className={cn(
                    "glass-strong px-5 py-4 text-left",
                    i === estimates.length - 1 && "rounded-tr-2xl",
                  )}
                >
                  <div className="font-mono text-[12px] text-slate-400">
                    {est.ref}
                  </div>
                  <div className="font-display mt-1 text-[18px] font-semibold text-white">
                    {est.sizeKwp} kWp
                  </div>
                  <div className="text-[12px] text-slate-400">{est.tier}</div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {ROWS.map((row, ri) => {
              const diff = isDiffRow(row, estimates);
              const isLast = ri === ROWS.length - 1;
              return (
                <tr key={row.key} className={cn(diff && "bg-gold/2.5")}>
                  {/* Label */}
                  <td
                    className={cn(
                      "glass sticky left-0 z-5 border-t border-white/5 px-4 py-3.5 text-[13px] font-medium text-slate-400",
                      diff && "border-l-2 border-l-gold/50",
                      isLast && "rounded-bl-2xl",
                    )}
                  >
                    {row.label}
                  </td>

                  {estimates.map((est, i) => (
                    <td
                      key={est.ref}
                      className={cn(
                        "glass border-t border-white/5 px-5 py-3.5 text-[14px] text-white",
                        diff && "font-medium",
                        isLast &&
                          i === estimates.length - 1 &&
                          "rounded-br-2xl",
                      )}
                    >
                      {formatValue(row, est)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* CTA row */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {estimates.map((est) => (
          <div
            key={est.ref}
            className="glass flex flex-col gap-3 rounded-2xl p-4"
          >
            <div className="font-display text-[16px] font-semibold text-white">
              {est.sizeKwp} kWp · {est.tier}
            </div>
            <ul className="flex flex-col gap-1.5 text-[13px] text-slate-400">
              <li className="flex items-center gap-2">
                <CheckCircle2
                  className="h-3.5 w-3.5 shrink-0 text-emerald-400"
                  aria-hidden="true"
                />
                PKR {est.monthlySavingPkr.toLocaleString()}/mo saving
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2
                  className="h-3.5 w-3.5 shrink-0 text-emerald-400"
                  aria-hidden="true"
                />
                {est.paybackYears} yr payback
              </li>
              <li className="flex items-center gap-2">
                {est.batteryKwh > 0 ? (
                  <CheckCircle2
                    className="h-3.5 w-3.5 shrink-0 text-emerald-400"
                    aria-hidden="true"
                  />
                ) : (
                  <Minus
                    className="h-3.5 w-3.5 shrink-0 text-slate-600"
                    aria-hidden="true"
                  />
                )}
                {est.batteryKwh > 0
                  ? `${est.batteryKwh} kWh backup`
                  : "No battery backup"}
              </li>
            </ul>
            <Link
              href={`/estimate/${est.ref}`}
              className="focus-ring mt-1 inline-flex items-center justify-center rounded-xl bg-linear-to-r from-gold to-amber px-4 py-2.5 text-[13.5px] font-semibold text-navy-950 shadow-[0_8px_22px_-8px_rgba(255,140,0,0.6)] transition-all hover:brightness-105 active:scale-[0.97]"
            >
              View full estimate
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
