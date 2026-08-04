"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Bell,
  ChevronRight,
  FileText,
  LogOut,
  Menu,
  Search,
  Settings,
  UserRound,
} from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Badge } from "@wahab/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@wahab/ui";
import { cn } from "@wahab/utils";

/** Maps route segments to human-readable labels for breadcrumbs. */
const SEGMENT_LABELS: Record<string, string> = {
  admin: "Admin",
  users: "Users",
  estimates: "Estimations",
  projects: "Projects",
  leads: "Leads",
  reviews: "Reviews",
  analytics: "Analytics",
  traffic: "Visitor traffic",
  revenue: "Revenue",
  activity: "Activity logs",
  notifications: "Notifications",
  pricing: "Pricing",
  content: "Content",
  roles: "Roles & permissions",
  settings: "Settings",
  audit: "Audit logs",
};

function useBreadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  return segments.map((seg, i) => ({
    label: SEGMENT_LABELS[seg] ?? seg,
    href: "/" + segments.slice(0, i + 1).join("/"),
    isLast: i === segments.length - 1,
  }));
}

const MOCK_NOTIFICATIONS = [
  { id: 1, text: "New lead from Gulberg — 8 kWp", time: "2 min ago", unread: true },
  { id: 2, text: "Project PRJ-2607-0012 phase completed", time: "1 hr ago", unread: true },
  { id: 3, text: "Estimate EST-0441 awaiting approval", time: "3 hr ago", unread: false },
];

export function AdminTopbar() {
  const crumbs = useBreadcrumbs();

  return (
    <header className="glass sticky top-0 z-20 flex items-center justify-between gap-4 px-5 py-3.5">
      {/* Left: mobile menu + logo + breadcrumbs */}
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          aria-label="Open navigation"
          className="focus-ring rounded-lg p-1.5 text-slate-300 transition-colors hover:bg-white/6 hover:text-white lg:hidden"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
        <Logo href="/admin" className="lg:hidden" />

        {/* Breadcrumbs — desktop only */}
        <nav
          aria-label="Breadcrumb"
          className="hidden items-center gap-1.5 lg:flex"
        >
          {crumbs.map((crumb, i) => (
            <span key={crumb.href} className="flex items-center gap-1.5">
              {i > 0 && (
                <ChevronRight
                  className="h-3.5 w-3.5 text-slate-600"
                  aria-hidden="true"
                />
              )}
              {crumb.isLast ? (
                <span className="text-[13px] font-medium text-slate-300">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="focus-ring rounded text-[13px] text-slate-500 transition-colors hover:text-slate-300"
                >
                  {crumb.label}
                </Link>
              )}
            </span>
          ))}
        </nav>
      </div>

      {/* Right: search · bell · role · avatar */}
      <div className="flex shrink-0 items-center gap-2">
        {/* ⌘K search trigger */}
        <button
          type="button"
          aria-label="Search (Ctrl+K)"
          className="focus-ring hidden items-center gap-2 rounded-lg border border-white/8 bg-white/4 px-3 py-1.5 text-[13px] text-slate-400 transition-colors hover:bg-white/8 hover:text-white sm:flex"
        >
          <Search className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Search</span>
          <kbd className="ml-2 rounded border border-white/10 bg-white/6 px-1.5 py-0.5 font-mono text-[10px] text-slate-500">
            ⌘K
          </kbd>
        </button>

        {/* Notification bell */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              aria-label="Notifications"
              className="focus-ring relative rounded-lg p-1.5 text-slate-300 transition-colors hover:bg-white/6 hover:text-white"
            >
              <Bell className="h-5 w-5" aria-hidden="true" />
              {/* Unread dot */}
              <span
                className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-gold"
                aria-hidden="true"
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-0">
            <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
              <p className="text-[13px] font-semibold text-white">
                Notifications
              </p>
              <button
                type="button"
                className="text-[12px] text-gold transition-colors hover:text-amber"
              >
                Mark all read
              </button>
            </div>
            <div className="flex flex-col divide-y divide-white/6">
              {MOCK_NOTIFICATIONS.map((n) => (
                <div
                  key={n.id}
                  className={cn(
                    "flex items-start gap-3 px-4 py-3",
                    n.unread && "bg-gold/4",
                  )}
                >
                  {n.unread && (
                    <span
                      className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold"
                      aria-hidden="true"
                    />
                  )}
                  {!n.unread && <span className="mt-1.5 h-2 w-2 shrink-0" />}
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] text-slate-200">{n.text}</p>
                    <p className="mt-0.5 text-[11px] text-slate-500">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-white/8 px-4 py-3">
              <Link
                href="/admin/notifications"
                className="text-[12px] text-gold transition-colors hover:text-amber"
              >
                View all notifications →
              </Link>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Role badge */}
        <Badge variant="gold" className="hidden sm:inline-flex">
          Super Admin
        </Badge>

        {/* Avatar menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              aria-label="Account menu"
              className="focus-ring flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-gold to-amber text-[13px] font-bold text-navy-950"
            >
              SA
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <div className="border-b border-white/8 px-3 py-2.5">
              <p className="text-[13px] font-medium text-white">Super Admin</p>
              <p className="text-[12px] text-slate-500">admin@alwahab.pk</p>
            </div>
            <DropdownMenuItem asChild>
              <Link
                href="/admin/users"
                className="flex items-center gap-2 text-[13px]"
              >
                <UserRound className="h-4 w-4" aria-hidden="true" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/admin/settings"
                className="flex items-center gap-2 text-[13px]"
              >
                <Settings className="h-4 w-4" aria-hidden="true" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a
                href="https://docs.alwahab.pk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[13px]"
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                Documentation
              </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2 text-[13px] text-red-400 focus:text-red-400">
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
