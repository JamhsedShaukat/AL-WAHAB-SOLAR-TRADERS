"use client";

import { cn } from "@wahab/utils";
import { Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface OptionCardProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  badge?: string;
  selected?: boolean;
  onClick?: () => void;
}

export function OptionCard({
  icon: Icon,
  title,
  description,
  badge,
  selected = false,
  onClick,
}: OptionCardProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={cn(
        "focus-ring relative w-full rounded-2xl p-5 text-left transition-all duration-200 glass",
        selected
          ? "border-gold/60 bg-gold/[0.07]"
          : "hover:border-white/20 hover:bg-white/5"
      )}
    >
      {/* Selected check */}
      {selected && (
        <span className="absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full bg-gold text-navy-950">
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
        </span>
      )}

      {/* Badge */}
      {badge && (
        <span className="mb-3 inline-block rounded-full bg-gold/15 px-2.5 py-0.5 text-[11px] font-semibold text-gold">
          {badge}
        </span>
      )}

      <div className="flex items-start gap-3.5">
        {Icon && (
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/5 text-slate-400">
            <Icon className="h-5 w-5" />
          </span>
        )}
        <div>
          <div className="font-display text-[16px] font-semibold text-white">
            {title}
          </div>
          {description && (
            <div className="mt-1 text-[13.5px] leading-relaxed text-slate-400">
              {description}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
