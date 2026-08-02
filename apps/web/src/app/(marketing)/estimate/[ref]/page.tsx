"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Sun,
  Battery,
  Zap,
  TrendingDown,
  Calendar,
  Leaf,
  ShieldCheck,
  MessageSquare,
  Share2,
} from "lucide-react";
import type { EstimateResult } from "@/types/estimator";

function fmt(n: number) {
  return n.toLocaleString("en-PK");
}

const SYSTEM_LABELS: Record<string, string> = {
  ongrid: "On-grid",
  hybrid: "Hybrid",
  offgrid: "Off-grid",
};

const PRIORITY_LABELS: Record<string, string> = {
  lowest_price: "Lowest price",
  best_value: "Best value",
  best_quality: "Best quality",
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="glass rounded-2xl p-5 sm:p-7">
      <h2 className="mb-5 font-display text-[16px] font-semibold text-white">
        {title}
      </h2>
      {children}
    </section>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-xl bg-white/4 p-4">
      <Icon className="mb-2 h-5 w-5 text-gold" />
      <div className="font-display text-[17px] font-semibold text-white">
        {value}
      </div>
      <div className="mt-0.5 text-[12px] font-medium text-slate-300">{label}</div>
      {sub && <div className="mt-0.5 text-[11px] text-slate-500">{sub}</div>}
    </div>
  );
}

const WARRANTIES = [
  { label: "Solar panels", detail: "25-year linear power output guarantee" },
  { label: "Inverter", detail: "5-year manufacturer warranty (extendable)" },
  { label: "Battery (LFP)", detail: "10-year / 4,000-cycle capacity warranty" },
  { label: "Mounting structure", detail: "10-year structural integrity guarantee" },
  { label: "Workmanship", detail: "2-year installation workmanship warranty" },
];

export default function EstimateDetailPage() {
  const { ref } = useParams<{ ref: string }>();
  const [result, setResult] = useState<EstimateResult | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(`estimate-${ref}`);
      if (raw) {
        setResult(JSON.parse(raw) as EstimateResult);
      } else {
        setNotFound(true);
      }
    } catch {
      setNotFound(true);
    }
  }, [ref]);

  // Loading state
  if (!result && !notFound) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
      </div>
    );
  }

  // Estimate not found in sessionStorage (e.g. new tab / expired)
  if (notFound || !result) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 text-center">
        <Sun className="h-12 w-12 text-gold/40" />
        <p className="font-display text-[18px] font-semibold text-white">
          Estimate not found
        </p>
        <p className="max-w-sm text-[14px] text-slate-400">
          This estimate is only stored in your browser session. To generate a
          new one, head back to the estimator.
        </p>
        <Link
          href="/estimate"
          className="focus-ring inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-gold to-amber px-6 py-3 text-[14px] font-semibold text-navy-950 shadow-cta"
        >
          Back to estimator
        </Link>
      </div>
    );
  }

  const systemLabel = SYSTEM_LABELS[result.answers.systemType ?? "hybrid"];
  const priorityLabel = PRIORITY_LABELS[result.answers.priority ?? "best_value"];
  const createdDate = new Date(result.createdAt).toLocaleDateString("en-PK", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <div className="mx-auto max-w-[860px] space-y-6 px-4 py-10 pb-32 sm:px-6">
        {/* Back link */}
        <Link
          href="/estimate"
          className="focus-ring inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-[13px] font-medium text-slate-400 transition-colors hover:bg-white/6 hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to estimator
        </Link>

        {/* Hero */}
        <div className="glass rounded-2xl p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-0.5 text-[12px] font-semibold text-gold">
                  {result.systemKw} kWp {systemLabel}
                </span>
                <span className="rounded-full bg-white/5 px-3 py-0.5 text-[12px] text-slate-400">
                  {priorityLabel}
                </span>
              </div>
              <h1 className="mt-3 font-display text-[26px] font-bold text-white sm:text-[30px]">
                Your solar estimate
              </h1>
              <p className="mt-2 text-[14px] text-slate-400">
                A transparent, itemised estimate for a{" "}
                <span className="text-white">
                  {result.systemKw} kWp {systemLabel}
                </span>{" "}
                system — built on live Lahore market prices.
              </p>
            </div>
            <div className="text-right text-[12px] text-slate-500">
              <div className="text-[13px] font-medium text-slate-300">Ref: {result.ref}</div>
              {result.answers.installAddress && (
                <div className="mt-0.5">{result.answers.installAddress}</div>
              )}
              <div className="mt-0.5">{createdDate}</div>
            </div>
          </div>
        </div>

        {/* Cost breakdown */}
        <Section title="Cost breakdown">
          <div className="divide-y divide-white/[0.06]">
            {result.lineItems.map((item) => (
              <div
                key={item.label}
                className="flex items-start justify-between gap-4 py-3.5"
              >
                <div>
                  <div className="text-[14.5px] font-medium text-white">
                    {item.label}
                  </div>
                  <div className="mt-0.5 text-[12.5px] text-slate-500">
                    {item.qty > 1 ? `${item.qty} × ` : ""}
                    {item.unitLabel}
                  </div>
                </div>
                <div className="shrink-0 text-[14.5px] font-medium text-white">
                  PKR {fmt(item.totalPkr)}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-5">
            <div>
              <div className="text-[14px] font-semibold text-white">
                Estimated total
              </div>
              <div className="mt-0.5 text-[11.5px] text-slate-500">
                Inclusive of all components & installation · excludes 17% GST
              </div>
            </div>
            <div className="font-display text-[24px] font-bold text-gradient-gold">
              PKR {fmt(result.totalPkr)}
            </div>
          </div>
        </Section>

        {/* Savings & ROI */}
        <Section title="Savings & return on investment">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard
              icon={TrendingDown}
              label="Monthly saving"
              value={`PKR ${fmt(result.monthlySavingsPkr)}`}
              sub={`Bill: PKR ${fmt(result.monthlyBillAfter)}/mo`}
            />
            <StatCard
              icon={Calendar}
              label="Payback period"
              value={`${result.paybackYears} yrs`}
              sub={`PKR ${fmt(result.annualSavingsPkr)}/yr`}
            />
            <StatCard
              icon={Zap}
              label="Annual generation"
              value={`${fmt(result.generationKwhAnnual)} kWh`}
              sub="Est. Lahore sun hours"
            />
            <StatCard
              icon={Leaf}
              label="CO₂ offset"
              value={`${fmt(result.co2KgAnnual)} kg`}
              sub="Per year"
            />
          </div>

          {/* Before / after bill */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
                Monthly bill now
              </div>
              <div className="mt-1 font-display text-[20px] font-semibold text-white">
                PKR {fmt(result.monthlyBillBefore)}
              </div>
            </div>
            <div className="rounded-xl border border-gold/25 bg-gold/[0.05] p-4">
              <div className="text-[11px] font-medium uppercase tracking-wider text-gold/70">
                Monthly bill after solar
              </div>
              <div className="mt-1 font-display text-[20px] font-semibold text-gold">
                PKR {fmt(result.monthlyBillAfter)}
              </div>
            </div>
          </div>
        </Section>

        {/* System specs */}
        <Section title="System specifications">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <StatCard
              icon={Sun}
              label="Solar panels"
              value={`${result.panelCount} × ${result.panelWatts} W`}
              sub={`${result.systemKw} kWp total`}
            />
            <StatCard
              icon={Zap}
              label="Inverter"
              value={`${result.inverterKw} kW`}
              sub={systemLabel}
            />
            {result.batteryKwh > 0 && (
              <StatCard
                icon={Battery}
                label="Battery storage"
                value={`${result.batteryKwh} kWh`}
                sub="LFP chemistry"
              />
            )}
          </div>

          {/* Installation timeline */}
          <div className="mt-5 space-y-0 divide-y divide-white/[0.06]">
            {[
              { step: "1", title: "Site survey & confirmation", duration: "1–2 days" },
              { step: "2", title: "Equipment procurement", duration: "3–5 days" },
              { step: "3", title: "Installation & wiring", duration: "1–2 days" },
              { step: "4", title: "Inspection & commissioning", duration: "1 day" },
              ...(result.answers.netMetering
                ? [{ step: "5", title: "Net metering application & meter change", duration: "2–4 weeks" }]
                : []),
            ].map(({ step, title, duration }) => (
              <div key={step} className="flex items-center gap-4 py-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold/10 text-[12px] font-semibold text-gold">
                  {step}
                </span>
                <span className="flex-1 text-[13.5px] text-white">{title}</span>
                <span className="text-[12px] text-slate-500">{duration}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Warranties */}
        <Section title="Warranties included">
          <div className="space-y-0 divide-y divide-white/[0.06]">
            {WARRANTIES.map(({ label, detail }) =>
              result.batteryKwh === 0 && label === "Battery (LFP)" ? null : (
                <div key={label} className="flex items-start gap-3 py-3.5">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <div>
                    <div className="text-[14px] font-medium text-white">{label}</div>
                    <div className="mt-0.5 text-[12.5px] text-slate-500">{detail}</div>
                  </div>
                </div>
              ),
            )}
          </div>
        </Section>

        <p className="text-center text-[12px] text-slate-600">
          This is an indicative estimate only. Prices are based on current
          market rates and are subject to change after a site survey.
        </p>
      </div>

      {/* Sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.07] bg-navy-950/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[860px] items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="hidden sm:block">
            <p className="text-[12px] text-slate-400">Ref: {result.ref}</p>
            <p className="font-display text-[15px] font-semibold text-white">
              PKR {fmt(result.totalPkr)}
            </p>
          </div>
          <div className="flex w-full gap-2 sm:w-auto">
            <button
              type="button"
              onClick={() => {
                try {
                  navigator.share?.({ title: `Solar estimate ${result.ref}`, url: window.location.href });
                } catch {/* share API unavailable */}
              }}
              className="focus-ring flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-[13px] text-slate-300 transition-all hover:bg-white/10"
            >
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
            <Link
              href="/contact"
              className="focus-ring group flex flex-1 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-gold to-amber px-5 py-2.5 text-[14px] font-semibold text-navy-950 shadow-cta transition-all hover:shadow-cta-hover hover:brightness-105 active:scale-[0.96] sm:flex-none"
            >
              <MessageSquare className="h-4 w-4" />
              Get a formal quote
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
