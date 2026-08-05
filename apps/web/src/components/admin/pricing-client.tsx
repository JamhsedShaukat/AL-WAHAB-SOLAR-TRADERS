"use client";

import { useState } from "react";
import { Plus, ChevronRight, Zap } from "lucide-react";
import { cn } from "@wahab/utils";

const RATE_CARDS = [
  {
    id: "rc-003",
    label: "Rate Card v3",
    effective: "1 Aug 2026",
    status: "active",
    estimates: 124,
  },
  {
    id: "rc-002",
    label: "Rate Card v2",
    effective: "1 Apr 2026",
    status: "archived",
    estimates: 387,
  },
  {
    id: "rc-001",
    label: "Rate Card v1",
    effective: "1 Jan 2026",
    status: "archived",
    estimates: 210,
  },
];

const LINE_ITEMS = [
  {
    code: "PANEL",
    label: "Solar panels (per kWp)",
    basis: "per kWp",
    rate: 85000,
  },
  { code: "INV", label: "Inverter", basis: "per kW AC", rate: 22000 },
  { code: "BAT", label: "Battery (per kWh)", basis: "per kWh", rate: 38000 },
  { code: "MNT", label: "Mounting structure", basis: "per sq ft", rate: 420 },
  { code: "WIRE", label: "Wiring & conduit", basis: "flat", rate: 45000 },
  {
    code: "NET",
    label: "Net metering application",
    basis: "flat",
    rate: 18000,
  },
  { code: "INST", label: "Installation labour", basis: "per kWp", rate: 9000 },
];

const TIERS = [
  {
    name: "Economy",
    multiplier: "0.85×",
    tagline: "Trusted components at an honest price",
  },
  {
    name: "Standard",
    multiplier: "1.00×",
    tagline: "The most popular choice in Lahore",
  },
  {
    name: "Premium",
    multiplier: "1.35×",
    tagline: "Best-in-class hardware, 10-year workmanship guarantee",
  },
];

export function PricingClient() {
  const [rates, setRates] = useState(LINE_ITEMS);
  const previewSize = 8; // kWp reference system

  const previewTotal = rates.reduce((sum, item) => {
    let contrib = 0;
    if (item.basis === "per kWp") contrib = item.rate * previewSize;
    else if (item.basis === "per kW AC") contrib = item.rate * previewSize;
    else if (item.basis === "per kWh")
      contrib = item.rate * (previewSize * 1.5);
    else if (item.basis === "per sq ft")
      contrib = item.rate * (previewSize * 70);
    else contrib = item.rate;
    return sum + contrib;
  }, 0);

  function updateRate(code: string, val: string) {
    const n = parseInt(val.replace(/,/g, ""), 10);
    if (!isNaN(n))
      setRates((prev) =>
        prev.map((r) => (r.code === code ? { ...r, rate: n } : r)),
      );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">
            Pricing & rate cards
          </h1>
          <p className="mt-1 text-[13px] text-slate-500">
            Edit prices without a deployment
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl bg-gold px-4 py-2 text-[13px] font-semibold text-navy-950 hover:bg-amber-400 transition-colors"
        >
          <Plus className="h-4 w-4" /> Duplicate & create new
        </button>
      </div>

      {/* Rate card list */}
      <div className="flex flex-col gap-2">
        {RATE_CARDS.map((rc) => (
          <div
            key={rc.id}
            className={cn(
              "glass flex items-center justify-between gap-4 rounded-xl px-4 py-3",
              rc.status === "active" && "border border-gold/30",
            )}
          >
            <div className="flex items-center gap-3">
              {rc.status === "active" && <Zap className="h-4 w-4 text-gold" />}
              <div>
                <p className="text-[13px] font-medium text-white">{rc.label}</p>
                <p className="text-[11px] text-slate-500">
                  Effective {rc.effective} · {rc.estimates} estimates
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "rounded-full px-3 py-1 text-[11px] font-medium",
                  rc.status === "active"
                    ? "bg-gold/10 text-gold"
                    : "bg-white/5 text-slate-500",
                )}
              >
                {rc.status}
              </span>
              <ChevronRight className="h-4 w-4 text-slate-600" />
            </div>
          </div>
        ))}
      </div>

      {/* Line-item editor + live preview */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 glass rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-white/5">
            <p className="text-[13px] font-semibold text-white">
              Rate Card v3 — line items
            </p>
          </div>
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-white/5 text-left text-[11px] uppercase tracking-wider text-slate-600">
                <th className="px-4 py-2.5">Code</th>
                <th className="px-4 py-2.5">Description</th>
                <th className="px-4 py-2.5">Basis</th>
                <th className="px-4 py-2.5 text-right">Unit rate (₨)</th>
              </tr>
            </thead>
            <tbody>
              {rates.map((item) => (
                <tr
                  key={item.code}
                  className="border-b border-white/5 last:border-0"
                >
                  <td className="px-4 py-2.5 font-mono text-[11px] text-gold">
                    {item.code}
                  </td>
                  <td className="px-4 py-2.5 text-slate-300">{item.label}</td>
                  <td className="px-4 py-2.5 text-[12px] text-slate-500">
                    {item.basis}
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <input
                      type="text"
                      defaultValue={item.rate.toLocaleString()}
                      onBlur={(e) => updateRate(item.code, e.target.value)}
                      className="w-28 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-right text-[12px] text-white focus:border-gold/50 focus:outline-none"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Live preview panel */}
        <div className="glass rounded-2xl p-4 flex flex-col gap-3">
          <p className="text-[12px] font-semibold uppercase tracking-wider text-slate-500">
            Live preview
          </p>
          <p className="text-[12px] text-slate-400">
            Reference: 8 kWp Hybrid system
          </p>
          <div className="flex flex-col gap-1.5 mt-2">
            {TIERS.map((tier) => {
              const mult = parseFloat(tier.multiplier);
              const total = Math.round(previewTotal * mult);
              return (
                <div
                  key={tier.name}
                  className="flex items-center justify-between gap-2"
                >
                  <span className="text-[12px] text-slate-400">
                    {tier.name}
                  </span>
                  <span className="text-[13px] font-medium text-white">
                    ₨ {total.toLocaleString()}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-2 border-t border-white/5 pt-3">
            <p className="text-[11px] text-slate-600">
              Base total: ₨ {previewTotal.toLocaleString()}
            </p>
          </div>
          <button
            type="button"
            className="mt-2 w-full rounded-xl bg-gold/10 py-2 text-[12px] font-semibold text-gold hover:bg-gold/20 transition-colors border border-gold/20"
          >
            Activate this card
          </button>
        </div>
      </div>

      {/* Tiers */}
      <div className="glass rounded-2xl p-4">
        <p className="mb-3 text-[13px] font-semibold text-white">Tiers</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {TIERS.map((t) => (
            <div key={t.name} className="rounded-xl bg-white/5 px-4 py-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-white">{t.name}</span>
                <span className="text-[12px] text-gold font-mono">
                  {t.multiplier}
                </span>
              </div>
              <p className="mt-1 text-[12px] text-slate-500">{t.tagline}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
