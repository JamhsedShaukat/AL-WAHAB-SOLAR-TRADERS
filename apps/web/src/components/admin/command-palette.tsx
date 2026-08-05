"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  FileText,
  FolderKanban,
  LayoutDashboard,
  Search,
  Settings,
  Users,
} from "lucide-react";
import { cn } from "@wahab/utils";

interface SearchResult {
  id: string;
  label: string;
  sub: string;
  href: string;
  icon: React.ElementType;
}

const QUICK_LINKS: SearchResult[] = [
  {
    id: "dash",
    label: "Dashboard",
    sub: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    id: "users",
    label: "Users",
    sub: "Manage",
    href: "/admin/users",
    icon: Users,
  },
  {
    id: "est",
    label: "Estimations",
    sub: "Manage",
    href: "/admin/estimates",
    icon: FileText,
  },
  {
    id: "proj",
    label: "Projects",
    sub: "Manage",
    href: "/admin/projects",
    icon: FolderKanban,
  },
  {
    id: "rev",
    label: "Revenue",
    sub: "Insights",
    href: "/admin/revenue",
    icon: BarChart3,
  },
  {
    id: "set",
    label: "Settings",
    sub: "System",
    href: "/admin/settings",
    icon: Settings,
  },
];

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = query.trim()
    ? QUICK_LINKS.filter(
        (r) =>
          r.label.toLowerCase().includes(query.toLowerCase()) ||
          r.sub.toLowerCase().includes(query.toLowerCase()),
      )
    : QUICK_LINKS;

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  function navigate(href: string) {
    router.push(href);
    onClose();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      navigate(results[active].href);
    } else if (e.key === "Escape") {
      onClose();
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="glass-strong relative w-full max-w-lg overflow-hidden rounded-2xl shadow-[0_32px_80px_-20px_rgba(0,0,0,0.8)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-white/8 px-4 py-3">
          <Search
            className="h-4.5 w-4.5 shrink-0 text-slate-500"
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search pages, users, estimates, projects…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
            className="flex-1 bg-transparent text-[14px] text-white placeholder:text-slate-600 focus:outline-none"
          />
          <kbd className="rounded border border-white/10 bg-white/6 px-1.5 py-0.5 font-mono text-[11px] text-slate-500">
            Esc
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto py-2">
          {results.length === 0 ? (
            <p className="px-4 py-6 text-center text-[13px] text-slate-500">
              No results for &ldquo;{query}&rdquo;
            </p>
          ) : (
            results.map((r, i) => {
              const Icon = r.icon;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => navigate(r.href)}
                  className={cn(
                    "flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors",
                    i === active ? "bg-gold/10" : "hover:bg-white/5",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                      i === active ? "bg-gold/20" : "bg-white/6",
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4",
                        i === active ? "text-gold" : "text-slate-400",
                      )}
                      aria-hidden="true"
                    />
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span className="text-[13px] font-medium text-white">
                      {r.label}
                    </span>
                    <span className="text-[11px] text-slate-500">{r.sub}</span>
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer hint */}
        <div className="border-t border-white/8 px-4 py-2.5 text-[11px] text-slate-600">
          <span className="mr-3">↑↓ navigate</span>
          <span className="mr-3">↵ open</span>
          <span>Esc close</span>
        </div>
      </div>
    </div>
  );
}
