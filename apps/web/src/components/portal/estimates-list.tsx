"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpDown,
  Download,
  GitCompare,
  MoreVertical,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { cn } from "@wahab/utils";
import { StatusChip, type CardStatus } from "@/components/portal/status-chip";

interface EstimateRow {
  id: string;
  ref: string;
  sizeKwp: number;
  systemType: "On-grid" | "Hybrid" | "Off-grid";
  tier: "Economy" | "Standard" | "Premium";
  areaName: string;
  priceLow: number;
  priceHigh: number;
  createdAt: string;
  validUntil: string;
  status: CardStatus;
  /** days until expiry; negative = expired */
  daysLeft: number;
}

// Mock data — replaced with real API in Phase 5
const ESTIMATES: EstimateRow[] = [
  {
    id: "1",
    ref: "AWS-2607-0421",
    sizeKwp: 5,
    systemType: "On-grid",
    tier: "Economy",
    areaName: "Model Town, Lahore",
    priceLow: 1050000,
    priceHigh: 1200000,
    createdAt: "30 Jul 2026",
    validUntil: "29 Aug 2026",
    status: "estimate_saved",
    daysLeft: 25,
  },
  {
    id: "2",
    ref: "AWS-2607-0388",
    sizeKwp: 12,
    systemType: "Hybrid",
    tier: "Premium",
    areaName: "DHA Phase 6, Lahore",
    priceLow: 3100000,
    priceHigh: 3100000,
    createdAt: "22 Jul 2026",
    validUntil: "21 Aug 2026",
    status: "in_progress",
    daysLeft: 17,
  },
  {
    id: "3",
    ref: "AWS-2607-0355",
    sizeKwp: 8,
    systemType: "On-grid",
    tier: "Standard",
    areaName: "Bahria Town, Lahore",
    priceLow: 2100000,
    priceHigh: 2400000,
    createdAt: "18 Jul 2026",
    validUntil: "17 Aug 2026",
    status: "quotation_issued",
    daysLeft: 13,
  },
  {
    id: "4",
    ref: "AWS-2606-0214",
    sizeKwp: 6,
    systemType: "On-grid",
    tier: "Standard",
    areaName: "Gulberg, Lahore",
    priceLow: 1400000,
    priceHigh: 1400000,
    createdAt: "10 Jun 2026",
    validUntil: "9 Jul 2026",
    status: "completed",
    daysLeft: -26,
  },
  {
    id: "5",
    ref: "AWS-2605-0099",
    sizeKwp: 3,
    systemType: "On-grid",
    tier: "Economy",
    areaName: "Johar Town, Lahore",
    priceLow: 650000,
    priceHigh: 750000,
    createdAt: "5 May 2026",
    validUntil: "4 Jun 2026",
    status: "expired",
    daysLeft: -61,
  },
];

const STATUS_OPTIONS: { value: CardStatus | "all"; label: string }[] = [
  { value: "all", label: "All statuses" },
  { value: "estimate_saved", label: "Estimate saved" },
  { value: "survey_requested", label: "Survey requested" },
  { value: "quotation_issued", label: "Quotation issued" },
  { value: "in_progress", label: "In progress" },
  { value: "completed", label: "Completed" },
  { value: "expired", label: "Expired" },
];

function formatPkr(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

function ValidityChip({
  daysLeft,
  validUntil,
}: {
  daysLeft: number;
  validUntil: string;
}) {
  if (daysLeft < 0)
    return (
      <span className="inline-flex items-center rounded-full bg-red-500/12 px-2 py-0.5 text-[11px] font-medium text-red-400">
        Expired
      </span>
    );
  if (daysLeft <= 3)
    return (
      <span className="inline-flex items-center rounded-full bg-amber/10 px-2 py-0.5 text-[11px] font-medium text-amber">
        {daysLeft}d left
      </span>
    );
  return <span className="text-[13px] text-slate-400">{validUntil}</span>;
}

export function EstimatesList() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<CardStatus | "all">("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = ESTIMATES.filter((e) => {
    const matchSearch =
      !search ||
      e.ref.toLowerCase().includes(search.toLowerCase()) ||
      e.areaName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || e.status === statusFilter;
    return matchSearch && matchStatus;
  });

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const canCompare = selected.size >= 2 && selected.size <= 3;

  return (
    <div className="flex flex-col gap-6">
      {/* FilterBar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-55 flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Search by ref or area…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="focus-ring w-full rounded-xl border border-white/9 bg-white/4 py-2.5 pl-9 pr-3 text-[13px] text-white placeholder:text-slate-500"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as CardStatus | "all")
          }
          className="focus-ring rounded-xl border border-white/9 bg-white/4 px-3 py-2.5 text-[13px] text-slate-300"
        >
          {STATUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value} className="bg-navy-950">
              {o.label}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="focus-ring flex items-center gap-2 rounded-xl border border-white/9 bg-white/4 px-3 py-2.5 text-[13px] text-slate-300 transition-colors hover:bg-white/7"
        >
          <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
          Filters
        </button>

        {canCompare && (
          <Link
            href={`/estimates/compare?ids=${[...selected].join(",")}`}
            className="focus-ring ml-auto flex items-center gap-2 rounded-xl bg-linear-to-r from-gold to-amber px-4 py-2.5 text-[13px] font-semibold text-navy-950 shadow-[0_6px_18px_-6px_rgba(255,140,0,0.5)] hover:brightness-105 active:scale-[0.97]"
          >
            <GitCompare className="h-4 w-4" aria-hidden="true" />
            Compare {selected.size}
          </Link>
        )}
      </div>

      {/* Desktop table — lg+ */}
      <div className="hidden lg:block">
        <div className="glass overflow-hidden rounded-2xl">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/[0.07]">
                {[
                  "",
                  "Ref",
                  "Size & type",
                  "Tier",
                  "Area",
                  "Price range",
                  "Created",
                  "Valid until",
                  "Status",
                  "",
                ].map((col, i) => (
                  <th
                    key={i}
                    className="px-4 py-3 text-[12px] font-medium uppercase tracking-wide text-slate-500"
                  >
                    {col && col !== "" ? (
                      <span className="flex items-center gap-1">
                        {col}
                        {["Size & type", "Created", "Valid until"].includes(
                          col,
                        ) && <ArrowUpDown className="h-3 w-3 opacity-50" />}
                      </span>
                    ) : null}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((est, i) => (
                <tr
                  key={est.id}
                  className={cn(
                    "border-b border-white/4 transition-colors hover:bg-white/3",
                    selected.has(est.id) && "bg-gold/4",
                    i === filtered.length - 1 && "border-b-0",
                  )}
                >
                  {/* Checkbox */}
                  <td className="w-10 px-4 py-3.5">
                    <input
                      type="checkbox"
                      checked={selected.has(est.id)}
                      onChange={() => toggleSelect(est.id)}
                      disabled={!selected.has(est.id) && selected.size >= 3}
                      aria-label={`Select ${est.ref}`}
                      className="h-4 w-4 rounded border-white/20 accent-gold"
                    />
                  </td>
                  <td className="px-4 py-3.5">
                    <Link
                      href={`/estimate/${est.ref}`}
                      className="font-mono text-[13px] font-medium text-gold hover:underline"
                    >
                      {est.ref}
                    </Link>
                  </td>
                  <td className="px-4 py-3.5 text-[13px] text-white">
                    {est.sizeKwp} kWp · {est.systemType}
                  </td>
                  <td className="px-4 py-3.5 text-[13px] text-slate-300">
                    {est.tier}
                  </td>
                  <td className="px-4 py-3.5 text-[13px] text-slate-300">
                    {est.areaName}
                  </td>
                  <td className="px-4 py-3.5 font-mono text-[13px] text-slate-300">
                    PKR {formatPkr(est.priceLow)}
                    {est.priceHigh !== est.priceLow &&
                      `–${formatPkr(est.priceHigh)}`}
                  </td>
                  <td className="px-4 py-3.5 text-[13px] text-slate-400">
                    {est.createdAt}
                  </td>
                  <td className="px-4 py-3.5">
                    <ValidityChip
                      daysLeft={est.daysLeft}
                      validUntil={est.validUntil}
                    />
                  </td>
                  <td className="px-4 py-3.5">
                    <StatusChip status={est.status} />
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        aria-label="Download PDF"
                        className="focus-ring grid h-7 w-7 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-white/6 hover:text-white"
                      >
                        <Download className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        aria-label="More actions"
                        className="focus-ring grid h-7 w-7 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-white/6 hover:text-white"
                      >
                        <MoreVertical className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="py-12 text-center text-[14px] text-slate-500">
              No estimates match your filters.
            </div>
          )}
        </div>
      </div>

      {/* Mobile card list — below lg */}
      <div className="flex flex-col gap-3 lg:hidden">
        {filtered.map((est) => (
          <div
            key={est.id}
            className={cn(
              "glass flex flex-col gap-3 rounded-2xl p-4",
              selected.has(est.id) && "border-gold/30",
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selected.has(est.id)}
                  onChange={() => toggleSelect(est.id)}
                  disabled={!selected.has(est.id) && selected.size >= 3}
                  aria-label={`Select ${est.ref}`}
                  className="h-4 w-4 rounded border-white/20 accent-gold"
                />
                <Link
                  href={`/estimate/${est.ref}`}
                  className="font-mono text-[13px] font-semibold text-gold hover:underline"
                >
                  {est.ref}
                </Link>
              </div>
              <StatusChip status={est.status} />
            </div>

            <div className="text-[14px] font-semibold text-white">
              {est.sizeKwp} kWp · {est.systemType}
              <span className="ml-2 text-[13px] font-normal text-slate-400">
                {est.tier}
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-[13px] text-slate-400">
              <span>{est.areaName}</span>
              <span className="font-mono text-slate-300">
                PKR {formatPkr(est.priceLow)}
                {est.priceHigh !== est.priceLow &&
                  `–${formatPkr(est.priceHigh)}`}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2 text-[12px] text-slate-500">
              <span>Created {est.createdAt}</span>
              <ValidityChip
                daysLeft={est.daysLeft}
                validUntil={est.validUntil}
              />
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="py-10 text-center text-[14px] text-slate-500">
            No estimates match your filters.
          </div>
        )}
      </div>
    </div>
  );
}
