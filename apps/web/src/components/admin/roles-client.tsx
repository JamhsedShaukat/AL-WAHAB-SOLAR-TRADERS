"use client";

import { useState } from "react";
import { Check, Minus, Info } from "lucide-react";
import { cn } from "@wahab/utils";

const ROLES = [
  "super_admin",
  "admin",
  "sales",
  "operations",
  "viewer",
] as const;
type Role = (typeof ROLES)[number];

const PERMISSION_GROUPS: {
  group: string;
  perms: {
    key: string;
    label: string;
    roles: Partial<Record<Role, boolean>>;
  }[];
}[] = [
  {
    group: "Dashboard",
    perms: [
      {
        key: "dashboard.view",
        label: "View dashboard",
        roles: {
          super_admin: true,
          admin: true,
          sales: true,
          operations: true,
          viewer: true,
        },
      },
    ],
  },
  {
    group: "Users",
    perms: [
      {
        key: "users.read",
        label: "View users",
        roles: {
          super_admin: true,
          admin: true,
          sales: true,
          operations: true,
          viewer: true,
        },
      },
      {
        key: "users.write",
        label: "Edit users",
        roles: { super_admin: true, admin: true },
      },
      {
        key: "users.suspend",
        label: "Suspend users",
        roles: { super_admin: true, admin: true },
      },
      {
        key: "users.impersonate",
        label: "Impersonate users",
        roles: { super_admin: true },
      },
      {
        key: "users.delete",
        label: "Delete users",
        roles: { super_admin: true },
      },
    ],
  },
  {
    group: "Estimates",
    perms: [
      {
        key: "estimates.read",
        label: "View estimates",
        roles: {
          super_admin: true,
          admin: true,
          sales: true,
          operations: true,
          viewer: true,
        },
      },
      {
        key: "estimates.write",
        label: "Edit estimates",
        roles: { super_admin: true, admin: true, sales: true },
      },
      {
        key: "estimates.override_price",
        label: "Override price",
        roles: { super_admin: true, admin: true, sales: true },
      },
      {
        key: "estimates.convert",
        label: "Convert to project",
        roles: { super_admin: true, admin: true, sales: true },
      },
      {
        key: "estimates.delete",
        label: "Delete estimates",
        roles: { super_admin: true, admin: true },
      },
    ],
  },
  {
    group: "Projects",
    perms: [
      {
        key: "projects.read",
        label: "View projects",
        roles: {
          super_admin: true,
          admin: true,
          sales: true,
          operations: true,
          viewer: true,
        },
      },
      {
        key: "projects.write",
        label: "Edit projects",
        roles: {
          super_admin: true,
          admin: true,
          sales: true,
          operations: true,
        },
      },
      {
        key: "projects.assign",
        label: "Assign projects",
        roles: {
          super_admin: true,
          admin: true,
          sales: true,
          operations: true,
        },
      },
      {
        key: "projects.delete",
        label: "Delete projects",
        roles: { super_admin: true, admin: true },
      },
    ],
  },
  {
    group: "Revenue & Payments",
    perms: [
      {
        key: "revenue.view",
        label: "View revenue",
        roles: { super_admin: true, admin: true, sales: true, viewer: true },
      },
      {
        key: "payments.write",
        label: "Record payments",
        roles: { super_admin: true, admin: true, operations: true },
      },
    ],
  },
  {
    group: "System",
    perms: [
      {
        key: "settings.read",
        label: "View settings",
        roles: { super_admin: true, admin: true, viewer: true },
      },
      {
        key: "settings.write",
        label: "Edit settings",
        roles: { super_admin: true },
      },
      {
        key: "pricing.write",
        label: "Edit pricing",
        roles: { super_admin: true },
      },
      {
        key: "roles.manage",
        label: "Manage roles",
        roles: { super_admin: true },
      },
      {
        key: "audit.view",
        label: "View audit logs",
        roles: { super_admin: true, admin: true },
      },
    ],
  },
];

const ROLE_LABELS: Record<Role, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  sales: "Sales",
  operations: "Operations",
  viewer: "Viewer",
};

const SYSTEM_ROLES: Role[] = ["super_admin"];

export function RolesClient() {
  const [matrix, setMatrix] = useState(PERMISSION_GROUPS);

  function toggle(groupIdx: number, permIdx: number, role: Role) {
    if (SYSTEM_ROLES.includes(role)) return; // locked
    setMatrix((prev) =>
      prev.map((g, gi) =>
        gi !== groupIdx
          ? g
          : {
              ...g,
              perms: g.perms.map((p, pi) =>
                pi !== permIdx
                  ? p
                  : { ...p, roles: { ...p.roles, [role]: !p.roles[role] } },
              ),
            },
      ),
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">
          Roles & permissions
        </h1>
        <p className="mt-1 text-[13px] text-slate-500">
          Super Admin column is locked and cannot be edited
        </p>
      </div>

      <div className="glass overflow-x-auto rounded-2xl">
        <table className="w-full min-w-[700px] text-[13px]">
          <thead>
            <tr className="border-b border-white/5">
              <th className="px-4 py-3 text-left text-[11px] uppercase tracking-wider text-slate-600 w-52">
                Permission
              </th>
              {ROLES.map((role) => (
                <th
                  key={role}
                  className="px-3 py-3 text-center text-[11px] uppercase tracking-wider text-slate-400"
                >
                  {ROLE_LABELS[role]}
                  {SYSTEM_ROLES.includes(role) && (
                    <span className="ml-1 text-[10px] text-gold">●</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.map((group, gi) => (
              <>
                <tr key={group.group} className="bg-white/3">
                  <td
                    colSpan={ROLES.length + 1}
                    className="px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500"
                  >
                    {group.group}
                  </td>
                </tr>
                {group.perms.map((perm, pi) => (
                  <tr
                    key={perm.key}
                    className="border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors"
                  >
                    <td className="px-4 py-2.5 text-slate-300">{perm.label}</td>
                    {ROLES.map((role) => {
                      const has = perm.roles[role] === true;
                      const locked = SYSTEM_ROLES.includes(role);
                      return (
                        <td key={role} className="px-3 py-2.5 text-center">
                          <button
                            type="button"
                            disabled={locked}
                            onClick={() => toggle(gi, pi, role)}
                            className={cn(
                              "mx-auto flex h-6 w-6 items-center justify-center rounded-md transition-colors",
                              has
                                ? "bg-gold/20 text-gold"
                                : "bg-white/5 text-slate-700",
                              locked && "cursor-not-allowed opacity-70",
                            )}
                          >
                            {has ? (
                              <Check className="h-3.5 w-3.5" />
                            ) : (
                              <Minus className="h-3.5 w-3.5" />
                            )}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-[12px] text-slate-600 flex items-center gap-1.5">
        <Info className="h-3.5 w-3.5" />
        Every change to the permission matrix is written to the audit log with
        the acting admin's name and timestamp.
      </p>
    </div>
  );
}
