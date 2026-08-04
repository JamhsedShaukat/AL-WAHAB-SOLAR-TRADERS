import Link from "next/link";
import { ArrowRight, MapPin, MoreVertical, Sun } from "lucide-react";
import { cn } from "@wahab/utils";
import { StatusChip, type CardStatus } from "./status-chip";

export interface DashboardCard {
  id: string;
  sizeKwp: number;
  tier: "economy" | "standard" | "premium";
  areaName: string;
  status: CardStatus;
  /** Formatted price string, e.g. "PKR 1.05M–1.2M" */
  priceLabel?: string;
  contextLine: string;
  /** 0–100 — only shown when status is in_progress */
  progress?: number;
  updatedRelative: string;
}

const TIER_LABEL: Record<DashboardCard["tier"], string> = {
  economy: "Economy",
  standard: "Standard",
  premium: "Premium",
};

const CTA: Record<CardStatus, { label: string; href: string }> = {
  estimate_saved: { label: "Book a free site survey", href: "/estimates" },
  survey_requested: { label: "View survey details", href: "/projects" },
  survey_scheduled: { label: "View survey details", href: "/projects" },
  quotation_issued: { label: "Review quotation", href: "/projects" },
  in_progress: { label: "Track installation", href: "/projects" },
  completed: { label: "Leave a review", href: "/projects" },
  expired: { label: "Re-price this estimate", href: "/estimate" },
};

interface ProjectCardProps {
  card: DashboardCard;
}

export function ProjectCard({ card }: ProjectCardProps) {
  const cta = CTA[card.status];

  return (
    <article className="group flex h-full flex-col rounded-3xl glass p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_24px_50px_-24px_rgba(0,0,0,0.8)]">
      {/* Top row: icon + title + more button */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-gold/20 to-amber/10 text-gold">
            <Sun className="h-6 w-6" aria-hidden="true" />
          </span>
          <div>
            <div className="font-display text-[20px] font-semibold leading-none text-white">
              {card.sizeKwp} kWp{" "}
              <span className="text-[14px] font-normal text-slate-400">
                · {TIER_LABEL[card.tier]}
              </span>
            </div>
            {card.areaName && (
              <div className="mt-1.5 flex items-center gap-1 text-[13px] text-slate-400">
                <MapPin
                  className="h-3.5 w-3.5 shrink-0 text-slate-500"
                  aria-hidden="true"
                />
                {card.areaName}
              </div>
            )}
          </div>
        </div>
        <button
          type="button"
          aria-label="More options"
          className="focus-ring grid h-8 w-8 shrink-0 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-white/6 hover:text-white"
        >
          <MoreVertical className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {/* Status + price row */}
      <div className="mt-4 flex items-center justify-between gap-2">
        <StatusChip status={card.status} />
        {card.priceLabel && (
          <span className="font-mono text-[13px] text-slate-300">
            {card.priceLabel}
          </span>
        )}
      </div>

      {/* Context line */}
      {card.contextLine && (
        <p className="mt-3 text-[13px] text-slate-400">{card.contextLine}</p>
      )}

      {/* Progress bar — in_progress cards only */}
      {card.status === "in_progress" && card.progress !== undefined && (
        <div className="mt-4">
          <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-linear-to-r from-gold to-amber"
              style={{ width: `${card.progress}%` }}
              role="progressbar"
              aria-valuenow={card.progress}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      )}

      {/* Footer: timestamp + CTA */}
      <div className="mt-auto flex items-center justify-between gap-3 pt-5">
        <span className="text-[12px] text-slate-500">
          Updated {card.updatedRelative}
        </span>
        <Link
          href={cta.href}
          className={cn(
            "focus-ring inline-flex shrink-0 items-center gap-1.5 rounded-xl px-4 py-2.5 text-[13.5px] font-semibold text-navy-950",
            "bg-linear-to-r from-gold to-amber shadow-[0_8px_22px_-8px_rgba(255,140,0,0.6)]",
            "transition-all hover:brightness-105 active:scale-[0.97]",
          )}
        >
          {cta.label}
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
