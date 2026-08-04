import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { EstimatesList } from "@/components/portal/estimates-list";

export const metadata: Metadata = {
  title: "My estimates",
};

export default function EstimatesPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-[28px] font-semibold text-white sm:text-[32px]">
            My estimates
          </h1>
          <p className="mt-1 text-[14px] text-slate-400">
            Every estimate you have saved, newest first.
          </p>
        </div>
        <Link
          href="/estimate"
          className="focus-ring inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-gold to-amber px-5 py-3 text-[14px] font-semibold text-navy-950 shadow-cta animate-glow transition-all hover:shadow-cta-hover hover:brightness-105 active:scale-[0.97]"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          New estimate
        </Link>
      </div>

      <EstimatesList />
    </div>
  );
}
