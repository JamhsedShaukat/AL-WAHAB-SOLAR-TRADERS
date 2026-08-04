import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sun } from "lucide-react";
import { StatusChip, type CardStatus } from "@/components/portal/status-chip";

export const metadata: Metadata = {
  title: "My projects",
};

const PROJECTS = [
  {
    ref: "PRJ-2607-0088",
    title: "12 kWp Hybrid",
    area: "DHA Phase 6, Lahore",
    status: "in_progress" as CardStatus,
    progress: 60,
    contractValuePkr: 3100000,
    updatedRelative: "2 hours ago",
  },
  {
    ref: "PRJ-2606-0041",
    title: "6 kWp On-grid",
    area: "Gulberg, Lahore",
    status: "completed" as CardStatus,
    progress: 100,
    contractValuePkr: 1400000,
    updatedRelative: "3 months ago",
  },
];

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-[28px] font-semibold text-white sm:text-[32px]">
          My projects
        </h1>
        <p className="mt-1 text-[14px] text-slate-400">
          Track your installation from survey through commissioning.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {PROJECTS.map((p) => (
          <Link
            key={p.ref}
            href={`/projects/${p.ref}`}
            className="group glass flex flex-col gap-4 rounded-3xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-card focus-ring"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-gold/20 to-amber/10 text-gold">
                  <Sun className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <div className="font-display text-[18px] font-semibold text-white">
                    {p.title}
                  </div>
                  <div className="mt-0.5 text-[12px] text-slate-500">{p.area}</div>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-slate-600 transition-transform group-hover:translate-x-1 group-hover:text-gold" aria-hidden="true" />
            </div>

            <div className="flex items-center justify-between gap-2">
              <StatusChip status={p.status} />
              <span className="font-mono text-[13px] text-slate-400">
                PKR {(p.contractValuePkr / 1_000_000).toFixed(1)}M
              </span>
            </div>

            <div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-linear-to-r from-gold to-amber"
                  style={{ width: `${p.progress}%` }}
                  role="progressbar"
                  aria-valuenow={p.progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <div className="mt-1.5 flex justify-between text-[11px] text-slate-500">
                <span>Progress</span>
                <span>{p.progress}%</span>
              </div>
            </div>

            <div className="text-[12px] text-slate-500">
              Updated {p.updatedRelative}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
