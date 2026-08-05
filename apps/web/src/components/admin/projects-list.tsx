"use client";

import { useState } from "react";
import Link from "next/link";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { KanbanSquare, LayoutList, MoreHorizontal } from "lucide-react";
import { DataTable } from "@/components/admin/data-table";
import { FilterBar } from "@/components/admin/filter-bar";
import { ExportMenu } from "@/components/admin/export-menu";
import { cn } from "@wahab/utils";

interface AdminProject {
  ref: string;
  customer: string;
  title: string;
  area: string;
  status: string;
  value: string;
  progress: number;
  owner: string;
  updated: string;
}

const MOCK: AdminProject[] = [
  { ref: "PRJ-2607-0088", customer: "Ali Raza", title: "12 kWp Hybrid", area: "DHA Phase 6", status: "Installation", value: "₨ 28,40,000", progress: 60, owner: "Bilal C.", updated: "1 hr ago" },
  { ref: "PRJ-2607-0071", customer: "Hassan Iqbal", title: "8 kWp Hybrid", area: "Gulberg III", status: "Commissioning", value: "₨ 19,20,000", progress: 85, owner: "Bilal C.", updated: "4 hr ago" },
  { ref: "PRJ-2607-0055", customer: "Ayesha Khan", title: "6 kWp On-grid", area: "Bahria Town", status: "Completed", value: "₨ 13,80,000", progress: 100, owner: "Usman T.", updated: "2 days ago" },
  { ref: "PRJ-2607-0049", customer: "Imran Sheikh", title: "10 kWp Hybrid", area: "Cantt", status: "Survey scheduled", value: "₨ 24,60,000", progress: 10, owner: "Bilal C.", updated: "6 hr ago" },
  { ref: "PRJ-2607-0041", customer: "Sarah Ahmed", title: "5 kWp On-grid", area: "Johar Town", status: "Quotation issued", value: "₨ 11,50,000", progress: 20, owner: "Usman T.", updated: "1 day ago" },
];

const KANBAN_COLS = [
  "Survey requested",
  "Survey scheduled",
  "Quotation issued",
  "Installation",
  "Commissioning",
  "Completed",
];

const col = createColumnHelper<AdminProject>();
const COLUMNS: ColumnDef<AdminProject, any>[] = [
  col.accessor("ref", {
    header: "Ref",
    cell: (c) => (
      <Link href={`/admin/projects/${c.getValue()}`} className="font-mono text-[12px] text-gold hover:underline">
        {c.getValue() as string}
      </Link>
    ),
  }),
  col.accessor("customer", { header: "Customer" }),
  col.accessor("title", { header: "Title" }),
  col.accessor("area", { header: "Area" }),
  col.accessor("status", {
    header: "Status",
    cell: (c) => {
      const v = c.getValue() as string;
      return <span className={v === "Completed" ? "text-emerald-400" : "text-slate-300"}>{v}</span>;
    },
  }),
  col.accessor("progress", {
    header: "Progress",
    cell: (c) => (
      <div className="flex items-center gap-2">
        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-gold" style={{ width: `${c.getValue()}%` }} />
        </div>
        <span className="text-[11px] text-slate-500">{c.getValue() as number}%</span>
      </div>
    ),
  }),
  col.accessor("value", { header: "Contract value" }),
  col.accessor("owner", { header: "Owner" }),
  col.accessor("updated", { header: "Updated" }),
  col.display({
    id: "actions",
    header: "",
    cell: (c) => (
      <Link href={`/admin/projects/${c.row.original.ref}`} aria-label="View" className="focus-ring rounded-lg p-1 text-slate-500 hover:text-white">
        <MoreHorizontal className="h-4 w-4" />
      </Link>
    ),
  }),
];

export function ProjectsListClient() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"list" | "board">("list");

  const filtered = MOCK.filter(
    (p) => !search || p.ref.toLowerCase().includes(search.toLowerCase()) || p.customer.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Projects</h1>
          <p className="mt-1 text-[13px] text-slate-500">{MOCK.length} projects</p>
        </div>
        {/* View toggle */}
        <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1">
          <button
            type="button"
            onClick={() => setView("list")}
            className={cn("focus-ring flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-medium transition-colors", view === "list" ? "bg-white/10 text-white" : "text-slate-500 hover:text-white")}
          >
            <LayoutList className="h-3.5 w-3.5" /> List
          </button>
          <button
            type="button"
            onClick={() => setView("board")}
            className={cn("focus-ring flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-medium transition-colors", view === "board" ? "bg-white/10 text-white" : "text-slate-500 hover:text-white")}
          >
            <KanbanSquare className="h-3.5 w-3.5" /> Board
          </button>
        </div>
      </div>

      <FilterBar
        searchPlaceholder="Search by ref or customer…"
        searchValue={search}
        onSearchChange={setSearch}
        filters={[
          { label: "Status", options: KANBAN_COLS.map((s) => ({ label: s, value: s })) },
          { label: "Owner", options: [{ label: "Bilal C.", value: "bilal" }, { label: "Usman T.", value: "usman" }] },
        ]}
        actions={<ExportMenu />}
      />

      {view === "list" ? (
        <DataTable columns={COLUMNS} data={filtered} />
      ) : (
        /* Kanban board */
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4" style={{ minWidth: KANBAN_COLS.length * 280 + "px" }}>
            {KANBAN_COLS.map((col) => {
              const cards = MOCK.filter((p) => p.status === col);
              return (
                <div key={col} className="flex w-64 shrink-0 flex-col gap-2">
                  <div className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
                    <span className="text-[12px] font-semibold text-slate-300">{col}</span>
                    <span className="rounded-full bg-white/8 px-2 py-0.5 text-[11px] text-slate-500">{cards.length}</span>
                  </div>
                  {cards.length === 0 && (
                    <div className="rounded-xl border border-dashed border-white/10 py-6 text-center text-[12px] text-slate-600">
                      No projects
                    </div>
                  )}
                  {cards.map((p) => (
                    <Link
                      key={p.ref}
                      href={`/admin/projects/${p.ref}`}
                      className="glass focus-ring flex flex-col gap-2 rounded-xl p-3 transition-colors hover:bg-white/8"
                    >
                      <p className="font-mono text-[11px] text-slate-500">{p.ref}</p>
                      <p className="text-[13px] font-medium text-white">{p.title}</p>
                      <p className="text-[12px] text-slate-400">{p.customer} · {p.area}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[12px] font-semibold text-gold">{p.value}</span>
                        <span className="text-[11px] text-slate-500">{p.progress}%</span>
                      </div>
                      <div className="h-1 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-gold" style={{ width: `${p.progress}%` }} />
                      </div>
                    </Link>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
