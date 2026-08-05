"use client";

import { useState } from "react";
import Link from "next/link";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { DataTable } from "@/components/admin/data-table";
import { FilterBar } from "@/components/admin/filter-bar";
import { ExportMenu } from "@/components/admin/export-menu";
import { Badge } from "@wahab/ui";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: "active" | "suspended";
  estimates: number;
  projects: number;
  lifetimeValue: string;
  verified: boolean;
  joined: string;
}

const MOCK_USERS: AdminUser[] = [
  { id: "U-001", name: "Ali Raza", email: "ali.raza@example.com", phone: "+92 300 1234567", role: "customer", status: "active", estimates: 3, projects: 1, lifetimeValue: "₨ 24,80,000", verified: true, joined: "12 Jun 2026" },
  { id: "U-002", name: "Fatima Malik", email: "fatima@example.com", phone: "+92 321 9876543", role: "customer", status: "active", estimates: 1, projects: 0, lifetimeValue: "—", verified: true, joined: "18 Jun 2026" },
  { id: "U-003", name: "Hassan Iqbal", email: "hassan@example.com", phone: "+92 333 4567890", role: "customer", status: "active", estimates: 5, projects: 2, lifetimeValue: "₨ 48,60,000", verified: true, joined: "2 Jul 2026" },
  { id: "U-004", name: "Sarah Ahmed", email: "sarah@example.com", phone: "+92 312 1122334", role: "customer", status: "suspended", estimates: 2, projects: 0, lifetimeValue: "—", verified: false, joined: "5 Jul 2026" },
  { id: "U-005", name: "Bilal Chaudhry", email: "bilal@example.com", phone: "+92 345 6677889", role: "sales", status: "active", estimates: 0, projects: 0, lifetimeValue: "—", verified: true, joined: "1 Jan 2026" },
  { id: "U-006", name: "Usman Tariq", email: "usman@example.com", phone: "+92 300 9988776", role: "operations", status: "active", estimates: 0, projects: 0, lifetimeValue: "—", verified: true, joined: "1 Jan 2026" },
  { id: "U-007", name: "Ayesha Khan", email: "ayesha@example.com", phone: "+92 321 5544332", role: "customer", status: "active", estimates: 2, projects: 1, lifetimeValue: "₨ 18,20,000", verified: true, joined: "14 Jul 2026" },
  { id: "U-008", name: "Imran Sheikh", email: "imran@example.com", phone: "+92 333 7766554", role: "customer", status: "active", estimates: 4, projects: 1, lifetimeValue: "₨ 31,50,000", verified: true, joined: "20 Jul 2026" },
];

const col = createColumnHelper<AdminUser>();

const COLUMNS: ColumnDef<AdminUser, any>[] = [
  col.accessor("name", {
    header: "Name",
    cell: (c) => (
      <Link
        href={`/admin/users/${c.row.original.id}`}
        className="font-medium text-white hover:text-gold"
      >
        {c.getValue() as string}
      </Link>
    ),
  }),
  col.accessor("email", { header: "Email" }),
  col.accessor("phone", { header: "Phone" }),
  col.accessor("role", {
    header: "Role",
    cell: (c) => (
      <Badge variant={c.getValue() === "customer" ? "default" : "gold"} className="capitalize">
        {c.getValue() as string}
      </Badge>
    ),
  }),
  col.accessor("status", {
    header: "Status",
    cell: (c) => (
      <span className={c.getValue() === "active" ? "text-emerald-400" : "text-red-400"}>
        {c.getValue() === "active" ? "Active" : "Suspended"}
      </span>
    ),
  }),
  col.accessor("estimates", { header: "Estimates" }),
  col.accessor("projects", { header: "Projects" }),
  col.accessor("lifetimeValue", { header: "Lifetime value" }),
  col.accessor("verified", {
    header: "Verified",
    cell: (c) => (
      <span className={c.getValue() ? "text-emerald-400" : "text-slate-500"}>
        {c.getValue() ? "Yes" : "No"}
      </span>
    ),
  }),
  col.accessor("joined", { header: "Joined" }),
  col.display({
    id: "actions",
    header: "",
    cell: (c) => (
      <Link
        href={`/admin/users/${c.row.original.id}`}
        className="focus-ring rounded-lg p-1 text-slate-500 transition-colors hover:text-white"
        aria-label="View user"
      >
        <MoreHorizontal className="h-4 w-4" />
      </Link>
    ),
  }),
];

export function UsersListClient() {
  const [search, setSearch] = useState("");
  const filtered = MOCK_USERS.filter(
    (u) =>
      !search ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Users</h1>
          <p className="mt-1 text-[13px] text-slate-500">
            Every registered customer and staff account
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[13px] text-slate-500">
            {MOCK_USERS.length} total
          </span>
        </div>
      </div>

      <FilterBar
        searchPlaceholder="Search by name, email or phone…"
        searchValue={search}
        onSearchChange={setSearch}
        filters={[
          { label: "Role", options: [{ label: "Customer", value: "customer" }, { label: "Sales", value: "sales" }, { label: "Operations", value: "operations" }] },
          { label: "Status", options: [{ label: "Active", value: "active" }, { label: "Suspended", value: "suspended" }] },
          { label: "Verified", options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }] },
        ]}
        actions={<ExportMenu />}
      />

      <DataTable columns={COLUMNS} data={filtered} />
    </div>
  );
}
