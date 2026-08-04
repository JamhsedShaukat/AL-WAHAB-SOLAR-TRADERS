import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CircleCheckBig, Folder, Hammer, Inbox, Plus } from "lucide-react";
import { KpiTile } from "@/components/portal/kpi-tile";
import { ProjectCard, type DashboardCard } from "@/components/portal/project-card";
import { DashboardEmptyState } from "@/components/portal/dashboard-empty-state";

export const metadata: Metadata = {
  title: "Dashboard",
};

// Mock data — replaced with real API calls in Phase 5
const CARDS: DashboardCard[] = [
  {
    id: "1",
    sizeKwp: 5,
    tier: "economy",
    areaName: "Model Town, Lahore",
    status: "estimate_saved",
    priceLabel: "PKR 1.05M–1.2M",
    contextLine: "Saved estimate · ready for survey",
    updatedRelative: "5 days ago",
  },
  {
    id: "2",
    sizeKwp: 12,
    tier: "premium",
    areaName: "DHA Phase 6, Lahore",
    status: "in_progress",
    priceLabel: "PKR 3.1M",
    contextLine: "Installation 60% done",
    progress: 60,
    updatedRelative: "2 hours ago",
  },
  {
    id: "3",
    sizeKwp: 8,
    tier: "standard",
    areaName: "Bahria Town, Lahore",
    status: "quotation_issued",
    priceLabel: "PKR 2.1M–2.4M",
    contextLine: "Quotation issued · awaiting acceptance",
    updatedRelative: "1 day ago",
  },
  {
    id: "4",
    sizeKwp: 6,
    tier: "standard",
    areaName: "Gulberg, Lahore",
    status: "completed",
    priceLabel: "PKR 1.4M",
    contextLine: "Commissioned · net metering live",
    updatedRelative: "3 months ago",
  },
];

const KPI = [
  { icon: Folder, value: 3, label: "Active projects" },
  { icon: Inbox, value: CARDS.length, label: "Saved estimates" },
  { icon: Hammer, value: 1, label: "In progress" },
  { icon: CircleCheckBig, value: 1, label: "Completed" },
];

interface DashboardPageProps {
  searchParams: Promise<{ empty?: string }>;
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const { empty } = await searchParams;
  const isEmpty = empty === "1";

  return (
    <div className="flex flex-col gap-8">
      {/* Page header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[13px] font-medium text-slate-400">
            Assalam-o-Alaikum, Ali
          </p>
          <h1 className="font-display mt-1 text-[30px] font-semibold leading-tight text-white sm:text-[36px]">
            Your projects
          </h1>
        </div>
        <Link
          href="/estimate"
          className="focus-ring group inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-gold to-amber px-5 py-3 text-[14px] font-semibold text-navy-950 shadow-cta animate-glow transition-all hover:shadow-cta-hover hover:brightness-105 active:scale-[0.97]"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          New estimate
        </Link>
      </div>

      {isEmpty ? (
        <DashboardEmptyState />
      ) : (
        <>
          {/* KPI row */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {KPI.map((tile) => (
              <KpiTile key={tile.label} {...tile} />
            ))}
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {CARDS.map((card) => (
              <ProjectCard key={card.id} card={card} />
            ))}

            {/* New estimate card */}
            <Link
              href="/estimate"
              className="focus-ring group flex h-full flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-white/10 p-8 text-center transition-all duration-300 hover:border-gold/40 hover:bg-white/4"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold/10 text-gold transition-colors group-hover:bg-gold/15">
                <Plus className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[15px] font-semibold text-white">
                  Start a new estimate
                </p>
                <p className="mt-1 text-[13px] text-slate-400">
                  Price another home or system in ~2 minutes
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-500 transition-all group-hover:translate-x-1 group-hover:text-gold" aria-hidden="true" />
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
