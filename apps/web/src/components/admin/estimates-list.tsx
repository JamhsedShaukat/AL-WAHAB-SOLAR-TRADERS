"use client";

import { useState } from "react";
import Link from "next/link";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { DataTable } from "@/components/admin/data-table";
import { FilterBar } from "@/components/admin/filter-bar";
import { ExportMenu } from "@/components/admin/export-menu";
import { StatCard } from "@/components/admin/stat-card";

interface AdminEstimate {
  ref: string;
  customer: string;
  size: string;
  type: string;
  tier: string;
  area: string;
  priceRange: string;
  saving: string;
  payback: string;
  status: string;
  validUntil: string;
  created: string;
}

const MOCK: AdminEstimate[] = [
  { ref: "EST-0441", customer: "Ali Raza", size: "8 kWp", type: "Hybrid", tier: "Premium", area: "DHA Phase 6", priceRange: "₨ 22–26 L", saving: "₨ 28,000/mo", payback: "4.8 yr", status: "Saved", validUntil: "26 Aug 2026", created: "12 Jul 2026" },
  { ref: "EST-0440", customer: "Fatima Malik", size: "6 kWp", type: "On-grid", tier: "Standard", area: "Gulberg III", priceRange: "₨ 14–17 L", saving: "₨ 19,000/mo", payback: "5.2 yr", status: "Expiring", validUntil: "7 Aug 2026", created: "5 Jul 2026" },
  { ref: "EST-0439", customer: "Guest", size: "10 kWp", type: "Hybrid", tier: "Premium", area: "Bahria Town", priceRange: "₨ 28–33 L", saving: "₨ 38,000/mo", payback: "4.5 yr", status: "Expired", validUntil: "2 Aug 2026", created: "19 Jun 2026" },
  { ref: "EST-0438", customer: "Hassan Iqbal", size: "12 kWp", type: "Hybrid", tier: "Premium", area: "DHA Phase 6", priceRange: "₨ 32–38 L", saving: "₨ 46,000/mo", payback: "4.7 yr", status: "Converted", validUntil: "—", created: "2 Jul 2026" },
  { ref: "EST-0437", customer: "Ayesha Khan", size: "5 kWp", type: "On-grid", tier: "Economy", area: "Johar Town", priceRange: "₨ 9–12 L", saving: "₨ 12,000/mo", payback: "6.0 yr", status: "Saved", validUntil: "19 Aug 2026", created: "5 Jul 2026" },
  { ref: "EST-0436", customer: "Imran Sheikh", size: "8 kWp", type: "Off-grid", tier: "Standard", area: "Cantt", priceRange: "₨ 20–24 L", saving: "₨ 25,000/mo", payback: "5.4 yr", status: "Survey requested", validUntil: "22 Aug 2026", created: "8 Jul 2026" },
];

const col = createColumnHelper<AdminEstimate>();

const COLUMNS: ColumnDef<AdminEstimate, any>[] = [
  col.accessor("ref", {
    header: "Ref",
    cell: (c) => (
      <Link href={`/admin/estimates/${c.getValue()}`} className="font-mono text-[12px] text-gold hover:underline">
        {c.getValue() as string}
      </Link>
    ),
  }),
  col.accessor("customer", { header: "Customer" }),
  col.accessor("size", { header: "Size" }),
  col.accessor("type", { header: "Type" }),
  col.accessor("tier", { header: "Tier" }),
  col.accessor("area", { header: "Area" }),
  col.accessor("priceRange", { header: "Price range" }),
  col.accessor("saving", { header: "Monthly saving" }),
  col.accessor("payback", { header: "Payback" }),
  col.accessor("status", {
    header: "Status",
    cell: (c) => {
      const v = c.getValue() as string;
      const color = v === "Expired" ? "text-red-400" : v === "Expiring" ? "text-amber" : v === "Converted" ? "text-emerald-400" : v === "Survey requested" ? "text-cyan" : "text-slate-300";
      return <span className={color}>{v}</span>;
    },
  }),
  col.accessor("validUntil", { header: "Valid until" }),
  col.accessor("created", { header: "Created" }),
  col.display({
    id: "actions",
    header: "",
    cell: (c) => (
      <Link href={`/admin/estimates/${c.row.original.ref}`} aria-label="View" className="focus-ring rounded-lg p-1 text-slate-500 hover:text-white">
        <MoreHorizontal className="h-4 w-4" />
      </Link>
    ),
  }),
];

const mk = (base: number, len = 30) => Array.from({ length: len }, (_, i) => ({ v: Math.round(base + Math.sin(i / 3) * base * 0.15 + Math.random() * base * 0.1) }));

export function EstimatesListClient() {
  const [search, setSearch] = useState("");
  const filtered = MOCK.filter(
    (e) => !search || e.ref.toLowerCase().includes(search.toLowerCase()) || e.customer.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Estimations</h1>
          <p className="mt-1 text-[13px] text-slate-500">All saved estimates across the platform</p>
        </div>
      </div>

      {/* Analytics strip */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total estimates" value="640" delta="+22.3%" deltaPositive sparkData={mk(20)} />
        <StatCard label="Avg system size" value="7.4 kWp" sparkData={mk(7)} />
        <StatCard label="Avg estimate value" value="₨ 19.2 L" sparkData={mk(1920000)} />
        <StatCard label="Conversion rate" value="20%" delta="+2.1%" deltaPositive sparkData={mk(20)} />
      </div>

      <FilterBar
        searchPlaceholder="Search by ref, customer or area…"
        searchValue={search}
        onSearchChange={setSearch}
        filters={[
          { label: "Status", options: [{ label: "Saved", value: "saved" }, { label: "Expiring", value: "expiring" }, { label: "Expired", value: "expired" }, { label: "Converted", value: "converted" }] },
          { label: "Type", options: [{ label: "On-grid", value: "on_grid" }, { label: "Hybrid", value: "hybrid" }, { label: "Off-grid", value: "off_grid" }] },
          { label: "Tier", options: [{ label: "Economy", value: "economy" }, { label: "Standard", value: "standard" }, { label: "Premium", value: "premium" }] },
        ]}
        actions={<ExportMenu />}
      />

      <DataTable columns={COLUMNS} data={filtered} />
    </div>
  );
}
