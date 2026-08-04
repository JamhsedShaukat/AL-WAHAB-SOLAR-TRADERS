import Link from "next/link";
import { ArrowRight, Home, Sun } from "lucide-react";

export function DashboardEmptyState() {
  return (
    <div className="mx-auto max-w-md py-10 text-center">
      {/* Icon cluster */}
      <div className="relative mx-auto mb-7 h-32 w-32">
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-gold/15 blur-2xl"
        />
        <div className="relative grid h-32 w-32 place-items-center rounded-full border border-white/10 bg-white/3">
          <Sun className="h-12 w-12 text-gold" aria-hidden="true" />
        </div>
        {/* Corner badge */}
        <span className="absolute -right-1 bottom-2 grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-navy-900 text-cyan">
          <Home className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>

      <h2 className="font-display text-[26px] font-semibold text-white">
        No projects yet
      </h2>
      <p className="mx-auto mt-2.5 max-w-sm text-[15px] leading-relaxed text-slate-400">
        Get a free, itemized solar estimate for your home in about two minutes —
        then save it here to collect quotes.
      </p>

      <div className="mt-7">
        <Link
          href="/estimate"
          className="focus-ring group inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-gold to-amber px-8 py-4 text-base font-semibold text-navy-950 shadow-cta transition-all animate-glow hover:shadow-cta-hover hover:brightness-105 active:scale-[0.97]"
        >
          Get your first estimate
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </div>
  );
}
