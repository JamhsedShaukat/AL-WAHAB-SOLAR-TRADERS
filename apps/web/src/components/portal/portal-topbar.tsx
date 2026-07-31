import Link from "next/link";
import { Bell, Menu } from "lucide-react";
import { Logo } from "@/components/brand/logo";

export function PortalTopbar() {
  return (
    <header className="glass sticky top-0 z-20 flex items-center justify-between gap-4 px-5 py-3.5">
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Open navigation"
          className="focus-ring rounded-lg p-1.5 text-slate-300 transition-colors hover:bg-white/6 hover:text-white lg:hidden"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
        <Logo href="/dashboard" className="lg:hidden" />
      </div>

      <Link
        href="/notifications"
        aria-label="Notifications"
        className="focus-ring rounded-lg p-1.5 text-slate-300 transition-colors hover:bg-white/6 hover:text-white"
      >
        <Bell className="h-5 w-5" aria-hidden="true" />
      </Link>
    </header>
  );
}
