import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/marketing/section-heading";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const lineItems = [
  { label: "Solar panels", spec: "14 × 585 W Tier-1 mono", amount: "620,000" },
  { label: "Hybrid inverter", spec: "8 kW dual-MPPT", amount: "360,000" },
  { label: "Battery storage", spec: "5 kWh LFP", amount: "330,000" },
  { label: "Mounting structure", spec: "Elevated, galvanised", amount: "165,000" },
  { label: "Installation & wiring", spec: "Complete BOS + earthing", amount: "230,000" },
  { label: "Net metering", spec: "LESCO application + meter", amount: "60,000" },
] as const;

const stats = [
  { label: "Est. monthly saving", value: "~PKR 36,000" },
  { label: "Estimated payback", value: "~4.3 yrs" },
  { label: "System size", value: "8 kWp" },
] as const;

export function SampleEstimate() {
  return (
    <section className="relative py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Your estimate"
          heading="See exactly what you'll pay — line by line"
          lede="Every estimate breaks the full system down on live Lahore prices, so there are no surprises. Here's a sample."
          align="center"
          accentColor="gold"
        />

        {/* Receipt card */}
        <div className="mx-auto mt-14 max-w-xl">
          <div className="glass rounded-3xl p-6 sm:p-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                al-wahab · solar estimate
              </span>
              <span className="rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-[11px] font-semibold text-gold">
                Sample
              </span>
            </div>

            {/* Line items */}
            <div className="mt-6 space-y-0 divide-y divide-white/[0.06]">
              {lineItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start justify-between gap-4 py-3.5"
                >
                  <div>
                    <div className="text-[14.5px] font-medium text-white">
                      {item.label}
                    </div>
                    <div className="mt-0.5 text-[12.5px] text-slate-500">
                      {item.spec}
                    </div>
                  </div>
                  <div className="shrink-0 text-[14.5px] font-medium text-white">
                    PKR {item.amount}
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-4">
              <div>
                <div className="text-[13px] font-medium text-slate-400">
                  Estimated total
                </div>
                <div className="mt-0.5 text-[11px] text-slate-500">
                  Indicative — your tailored estimate may differ
                </div>
              </div>
              <div className="font-display text-xl font-semibold text-gradient-gold">
                PKR 1,765,000
              </div>
            </div>

            {/* Stats row */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl bg-white/4 p-3 text-center"
                >
                  <div className="font-display text-[15px] font-semibold text-white">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-[11px] text-slate-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/estimate"
              className="focus-ring mt-6 group flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-gold to-amber px-6 py-3.5 text-[15px] font-semibold text-navy-950 shadow-cta transition-all duration-200 hover:shadow-cta-hover hover:brightness-105 active:scale-[0.96]"
            >
              Get your estimate
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>

            {/* Footnote */}
            <p className="mt-4 text-center text-[12px] text-slate-500">
              Sample figures — illustrative only.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
