import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { Badge } from "@wahab/ui";

export const metadata: Metadata = { title: "Estimate detail" };

const LINE_ITEMS = [
  {
    label: "Solar panels (8 × 545 W JA Solar)",
    qty: 8,
    unit: "₨ 28,500",
    total: "₨ 2,28,000",
    overridden: false,
  },
  {
    label: "Hybrid inverter (5 kW Solis)",
    qty: 1,
    unit: "₨ 1,95,000",
    total: "₨ 1,95,000",
    overridden: false,
  },
  {
    label: "Battery bank (10 kWh Dyness)",
    qty: 1,
    unit: "₨ 3,85,000",
    total: "₨ 3,85,000",
    overridden: true,
  },
  {
    label: "Mounting structure (GI, Tier A)",
    qty: 1,
    unit: "₨ 72,000",
    total: "₨ 72,000",
    overridden: false,
  },
  {
    label: "DC/AC cabling & switchgear",
    qty: 1,
    unit: "₨ 48,000",
    total: "₨ 48,000",
    overridden: false,
  },
  {
    label: "Installation (certified crew, 2 days)",
    qty: 1,
    unit: "₨ 55,000",
    total: "₨ 55,000",
    overridden: false,
  },
];

export default function EstimateDetailPage({
  params,
}: {
  params: Promise<{ ref: string }>;
}) {
  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/admin/estimates"
        className="focus-ring inline-flex items-center gap-2 text-[13px] text-slate-500 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" /> Estimations
      </Link>

      {/* Header */}
      <div className="glass rounded-2xl p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[13px] text-slate-500">
                EST-0441
              </span>
              <Badge variant="gold">Premium</Badge>
              <span className="text-[13px] text-slate-400">Hybrid · 8 kWp</span>
              <span className="text-[13px] text-emerald-400">● Saved</span>
            </div>
            <h1 className="font-display text-xl font-bold text-white">
              8 kWp Hybrid — DHA Phase 6
            </h1>
            <p className="text-[13px] text-slate-500">
              Customer:{" "}
              <Link
                href="/admin/users/U-001"
                className="text-gold hover:underline"
              >
                Ali Raza
              </Link>{" "}
              · Created 12 Jul 2026 · Valid until 26 Aug 2026
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="focus-ring flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[13px] text-slate-400 hover:text-white"
            >
              <Download className="h-4 w-4" /> Download PDF
            </button>
            <button
              type="button"
              className="focus-ring rounded-xl bg-linear-to-r from-amber to-gold px-4 py-2 text-[13px] font-semibold text-navy-950"
            >
              Issue quotation
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Line-item editor */}
        <div className="lg:col-span-2">
          <div className="glass rounded-2xl p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-[15px] font-semibold text-white">
                Line items
              </h2>
              <span className="text-[12px] text-slate-500">
                Rate card v3 · 1 Jul 2026
              </span>
            </div>
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-white/8">
                  {["Item", "Qty", "Unit price", "Total", ""].map((h) => (
                    <th
                      key={h}
                      className="pb-2 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {LINE_ITEMS.map((li) => (
                  <tr
                    key={li.label}
                    className="border-b border-white/5 last:border-0"
                  >
                    <td className="py-2.5 text-slate-300">
                      {li.label}
                      {li.overridden && (
                        <span className="ml-2 rounded-full bg-amber/10 px-2 py-0.5 text-[10px] text-amber">
                          Adjusted
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 text-slate-400">{li.qty}</td>
                    <td className="py-2.5 text-slate-400">{li.unit}</td>
                    <td className="py-2.5 font-medium text-white">
                      {li.total}
                    </td>
                    <td className="py-2.5">
                      <button
                        type="button"
                        className="text-[11px] text-slate-600 hover:text-gold"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-white/10">
                  <td
                    colSpan={3}
                    className="pt-3 text-right text-[13px] font-semibold text-slate-300"
                  >
                    Total
                  </td>
                  <td className="pt-3 font-display text-[16px] font-bold text-gold">
                    ₨ 9,83,000
                  </td>
                  <td />
                </tr>
                <tr>
                  <td
                    colSpan={3}
                    className="pb-1 text-right text-[12px] text-slate-500"
                  >
                    Range
                  </td>
                  <td className="pb-1 text-[12px] text-slate-400">
                    ₨ 22 L – ₨ 26 L
                  </td>
                  <td />
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Right: wizard answers + actions */}
        <div className="flex flex-col gap-4">
          <div className="glass rounded-2xl p-5">
            <h2 className="mb-4 font-display text-[14px] font-semibold text-white">
              Customer inputs
            </h2>
            <dl className="flex flex-col gap-2 text-[13px]">
              {[
                ["Monthly bill", "₨ 32,000 (590 units)"],
                ["Phase", "3-phase"],
                ["Goal", "Cover full bill"],
                ["System type", "Hybrid"],
                ["Backup loads", "Fans, lights, fridge"],
                ["Roof type", "RCC flat"],
                ["Structure", "GI, Tier A"],
                ["Priority", "Quality"],
                ["Net metering", "Yes"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3">
                  <dt className="text-slate-500">{k}</dt>
                  <dd className="text-right text-slate-300">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="glass rounded-2xl p-5">
            <h2 className="mb-3 font-display text-[14px] font-semibold text-white">
              Actions
            </h2>
            <div className="flex flex-col gap-2">
              {[
                "Convert to project",
                "Mark as lost",
                "Re-price on current card",
                "Email to customer",
                "Add internal note",
              ].map((a) => (
                <button
                  key={a}
                  type="button"
                  className="focus-ring w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-left text-[13px] text-slate-400 transition-colors hover:bg-white/8 hover:text-white"
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
