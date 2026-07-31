"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/logo";
import { PORTAL_NAV } from "@/lib/navigation";
import { cn } from "@wahab/utils";

export function PortalSidebar() {
  const pathname = usePathname();

  return (
    <aside className="glass-strong sticky top-0 hidden h-dvh w-64 shrink-0 flex-col gap-6 p-5 lg:flex">
      <Logo href="/dashboard" />

      <nav aria-label="Portal" className="flex flex-col gap-1">
        {PORTAL_NAV.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "focus-ring flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-medium transition-colors",
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
      </nav>
    </aside>
  );
}
