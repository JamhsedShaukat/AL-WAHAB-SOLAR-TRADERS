"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/logo";
import { ADMIN_NAV } from "@/lib/navigation";
import { cn } from "@wahab/utils";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="glass-strong sticky top-0 hidden h-dvh w-68 shrink-0 flex-col gap-6 overflow-y-auto p-5 lg:flex">
      <Logo href="/admin" />

      <nav aria-label="Admin" className="flex flex-col gap-5">
        {ADMIN_NAV.map((section) => (
          <div key={section.label} className="flex flex-col gap-1">
            <p className="px-3 py-1.5 text-[12px] font-semibold uppercase tracking-wider text-slate-500">
              {section.label}
            </p>
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
                  className={cn(
                    "focus-ring flex items-center gap-3 rounded-xl px-3 py-2 text-[14px] font-medium transition-colors",
                    active
                      ? "bg-white/10 text-white"
                      : "text-slate-400 hover:bg-white/6 hover:text-white",
                  )}
                >
                  <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                  {label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}
