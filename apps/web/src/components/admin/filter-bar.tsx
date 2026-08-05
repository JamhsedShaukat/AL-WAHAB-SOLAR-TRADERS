"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@wahab/utils";

interface FilterOption {
  label: string;
  value: string;
}

interface ActiveFilter {
  label: string;
  onRemove: () => void;
}

interface FilterBarProps {
  /** Placeholder for the search input */
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (v: string) => void;
  /** Status / type filter options */
  filters?: { label: string; options: FilterOption[] }[];
  activeFilters?: ActiveFilter[];
  onClearAll?: () => void;
  /** Right-side action slot (e.g. ExportMenu) */
  actions?: React.ReactNode;
  className?: string;
}

export function FilterBar({
  searchPlaceholder = "Search…",
  searchValue = "",
  onSearchChange,
  filters = [],
  activeFilters = [],
  onClearAll,
  actions,
  className,
}: FilterBarProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {/* Top row */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Search */}
        <label className="relative flex flex-1 items-center gap-2 min-w-52">
          <span className="sr-only">{searchPlaceholder}</span>
          <Search
            className="pointer-events-none absolute left-3 h-4 w-4 text-slate-500"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="focus-ring w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-[13px] text-slate-200 placeholder:text-slate-600 focus:border-gold/30"
          />
        </label>

        {/* Dropdown filters */}
        {filters.map((f) => (
          <select
            key={f.label}
            aria-label={f.label}
            className="focus-ring rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[13px] text-slate-400 focus:border-gold/30"
          >
            <option value="" className="bg-navy-950">
              {f.label}
            </option>
            {f.options.map((o) => (
              <option key={o.value} value={o.value} className="bg-navy-950">
                {o.label}
              </option>
            ))}
          </select>
        ))}

        {/* More filters button */}
        {filters.length > 0 && (
          <button
            type="button"
            className="focus-ring flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[13px] text-slate-400 transition-colors hover:bg-white/8 hover:text-white"
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            Filters
          </button>
        )}

        {/* Right-side actions */}
        {actions && <div className="ml-auto">{actions}</div>}
      </div>

      {/* Active filter chips */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {activeFilters.map((af) => (
            <span
              key={af.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-gold/20 bg-gold/10 px-2.5 py-1 text-[12px] font-medium text-gold"
            >
              {af.label}
              <button
                type="button"
                onClick={af.onRemove}
                aria-label={`Remove filter: ${af.label}`}
                className="rounded-full hover:text-amber"
              >
                <X className="h-3 w-3" aria-hidden="true" />
              </button>
            </span>
          ))}
          <button
            type="button"
            onClick={onClearAll}
            className="text-[12px] text-slate-500 transition-colors hover:text-slate-300"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
