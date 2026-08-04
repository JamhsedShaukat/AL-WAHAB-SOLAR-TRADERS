"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { LogoMark } from "@/components/brand/logo-mark";
import { ADMIN_NAV } from "@/lib/navigation";
import { cn } from "@wahab/utils";

export function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "glass-strong sticky top-0 hidden h-dvh shrink-0 flex-col gap-6 overflow-y-auto overflow-x-hidden transition-[width] duration-300 lg:flex",
        collapsed ? "w-18 p-3" : "w-68 p-5",
      )}
    >
      {/* Logo / mark */}
      <div className="flex items-center">
        {collapsed ? (
          <Link
            href="/admin"
            className="focus-ring mx-auto rounded-lg"
            aria-label="Admin home"
          >
            <LogoMark className="h-8 w-8" />
          </Link>
        ) : (
          <Logo href="/admin" />
        )}
      </div>

      {/* Nav */}
      <nav
        aria-label="Admin"
        className={cn("flex flex-col gap-5", collapsed && "gap-2")}
      >
        {ADMIN_NAV.map((section) => (
          <div
            key={section.label}
            className={cn("flex flex-col gap-1", collapsed && "gap-0.5")}
          >
            {!collapsed && (
              <p className="px-3 py-1.5 text-[12px] font-semibold uppercase tracking-wider text-slate-500">
                {section.label}
              </p>
            )}
            {collapsed && (
              <div className="my-1 border-t border-white/6" aria-hidden="true" />
            )}
            {section.items.map(({ label, href, icon: Icon }) => {
              const active =
                href === "/admin"
                  ? pathname === "/admin"
                  : pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  title={collapsed ? label : undefined}
                  className={cn(
                    "focus-ring flex items-center gap-3 rounded-xl text-[14px] font-medium transition-colors",
                    collapsed ? "justify-center p-2.5" : "px-3 py-2",
                    active
                      ? "border-l-2 border-gold bg-gold/10 text-gold"
                      : "border-l-2 border-transparent text-slate-400 hover:bg-white/6 hover:text-white",
                  )}
                >
                  <Icon
                    className={cn(
                      "shrink-0",
                      collapsed ? "h-5 w-5" : "h-4.5 w-4.5",
                    )}
                    aria-hidden="true"
                  />
                  {!collapsed && label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Collapse toggle */}
      <button
        type="button"
        onClick={() => setCollapsed((c) => !c)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className={cn(
          "focus-ring mt-auto flex items-center gap-2 rounded-xl border border-white/8 bg-white/4 text-[13px] font-medium text-slate-400 transition-colors hover:bg-white/8 hover:text-white",
          collapsed ? "justify-center p-2.5" : "px-3 py-2",
        )}
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        ) : (
          <>
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            Collapse
          </>
        )}
      </button>
    </aside>
  );
}
