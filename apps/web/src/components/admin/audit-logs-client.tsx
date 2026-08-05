"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Shield } from "lucide-react";
import { FilterBar } from "@/components/admin/filter-bar";
import { cn } from "@wahab/utils";

type AuditEntry = {
  id: number;
  ts: string;
  actor: string;
  role: string;
  action: string;
  table: string;
  recordId: string;
  ip: string;
  changes?: { field: string; before: string; after: string }[];
};

const MOCK: AuditEntry[] = [
  {
    id: 1,
    ts: "2026-08-05 09:14:22",
    actor: "Bilal Chaudhry",
    role: "admin",
    action: "UPDATE",
    table: "projects",
    recordId: "PRJ-2607-0088",
    ip: "203.0.113.42",
    changes: [
      { field: "status", before: "installation", after: "commissioning" },
    ],
  },
  {
    id: 2,
    ts: "2026-08-05 09:01:08",
    actor: "Usman Tariq",
    role: "admin",
    action: "INSERT",
    table: "payments",
    recordId: "PAY-0044",
    ip: "203.0.113.42",
    changes: [
      { field: "amount_pkr", before: "—", after: "1136000" },
      { field: "method", before: "—", after: "bank_transfer" },
    ],
  },
  {
    id: 3,
    ts: "2026-08-04 18:33:50",
    actor: "Super Admin",
    role: "super_admin",
    action: "PERMISSION_CHANGE",
    table: "roles",
    recordId: "role:sales",
    ip: "192.168.100.10",
    changes: [{ field: "revenue.view", before: "false", after: "true" }],
  },
  {
    id: 4,
    ts: "2026-08-04 15:10:00",
    actor: "Super Admin",
    role: "super_admin",
    action: "SETTING_CHANGE",
    table: "settings",
    recordId: "estimator.validity_days",
    ip: "192.168.100.10",
    changes: [{ field: "value", before: "10", after: "14" }],
  },
  {
    id: 5,
    ts: "2026-08-04 11:22:05",
    actor: "Ali Raza",
    role: "customer",
    action: "LOGIN",
    table: "sessions",
    recordId: "U-001",
    ip: "182.180.1.55",
  },
  {
    id: 6,
    ts: "2026-08-03 09:05:18",
    actor: "Super Admin",
    role: "super_admin",
    action: "EXPORT",
    table: "users",
    recordId: "export:users-csv",
    ip: "192.168.100.10",
    changes: [{ field: "row_count", before: "—", after: "148" }],
  },
];

const ACTION_COLORS: Record<string, string> = {
  INSERT: "bg-emerald-500/10 text-emerald-400",
  UPDATE: "bg-gold/10 text-gold",
  DELETE: "bg-red-500/10 text-red-400",
  LOGIN: "bg-cyan/10 text-cyan",
  LOGIN_FAILED: "bg-red-500/10 text-red-400",
  PERMISSION_CHANGE: "bg-violet-500/10 text-violet-300",
  SETTING_CHANGE: "bg-amber-500/10 text-amber-300",
  EXPORT: "bg-slate-500/10 text-slate-400",
  IMPERSONATE: "bg-red-500/10 text-red-400",
};

export function AuditLogsClient() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const filtered = search
    ? MOCK.filter(
        (e) =>
          e.actor.toLowerCase().includes(search.toLowerCase()) ||
          e.table.includes(search) ||
          e.recordId.includes(search),
      )
    : MOCK;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">
            Audit logs
          </h1>
          <p className="mt-1 text-[13px] text-slate-500">
            Immutable forensic record · 7-year retention · append-only
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-3 py-2">
          <Shield className="h-4 w-4 text-emerald-400" />
          <span className="text-[12px] text-emerald-400">
            Integrity verified
          </span>
        </div>
      </div>

      <FilterBar
        searchPlaceholder="Search by actor, table, record…"
        searchValue={search}
        onSearchChange={setSearch}
        filters={[
          {
            label: "Action",
            options: [
              { label: "INSERT", value: "INSERT" },
              { label: "UPDATE", value: "UPDATE" },
              { label: "DELETE", value: "DELETE" },
              { label: "LOGIN", value: "LOGIN" },
              { label: "PERMISSION_CHANGE", value: "PERMISSION_CHANGE" },
            ],
          },
          {
            label: "Role",
            options: [
              { label: "Super Admin", value: "super_admin" },
              { label: "Admin", value: "admin" },
              { label: "Customer", value: "customer" },
            ],
          },
        ]}
      />

      <div className="glass overflow-hidden rounded-2xl">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-white/5 text-left text-[11px] uppercase tracking-wider text-slate-600">
              <th className="w-6 px-4 py-3" />
              <th className="px-4 py-3">Timestamp</th>
              <th className="px-4 py-3">Actor</th>
              <th className="px-4 py-3">Action</th>
              <th className="px-4 py-3">Table</th>
              <th className="px-4 py-3">Record</th>
              <th className="px-4 py-3">IP</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((entry) => (
              <>
                <tr
                  key={entry.id}
                  className="cursor-pointer border-b border-white/5 hover:bg-white/3 transition-colors"
                  onClick={() =>
                    setExpanded((prev) => (prev === entry.id ? null : entry.id))
                  }
                >
                  <td className="px-4 py-3 text-slate-600">
                    {entry.changes ? (
                      expanded === entry.id ? (
                        <ChevronDown className="h-3.5 w-3.5" />
                      ) : (
                        <ChevronRight className="h-3.5 w-3.5" />
                      )
                    ) : null}
                  </td>
                  <td className="px-4 py-3 font-mono text-[11px] text-slate-400">
                    {entry.ts}
                  </td>
                  <td className="px-4 py-3 text-slate-200">{entry.actor}</td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[11px] font-medium",
                        ACTION_COLORS[entry.action] ??
                          "bg-white/5 text-slate-400",
                      )}
                    >
                      {entry.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-[12px] text-slate-400">
                    {entry.table}
                  </td>
                  <td className="px-4 py-3 font-mono text-[11px] text-gold">
                    {entry.recordId}
                  </td>
                  <td className="px-4 py-3 font-mono text-[11px] text-slate-600">
                    {entry.ip}
                  </td>
                </tr>
                {expanded === entry.id && entry.changes && (
                  <tr
                    key={`${entry.id}-diff`}
                    className="border-b border-white/5 bg-white/3"
                  >
                    <td />
                    <td colSpan={6} className="px-4 py-3">
                      <div className="flex flex-col gap-1.5">
                        {entry.changes.map((c) => (
                          <div
                            key={c.field}
                            className="flex items-center gap-4 text-[12px]"
                          >
                            <span className="w-36 shrink-0 font-mono text-slate-500">
                              {c.field}
                            </span>
                            <span className="text-red-400 line-through">
                              {c.before}
                            </span>
                            <span className="text-slate-500">→</span>
                            <span className="text-emerald-400">{c.after}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
