import Link from "next/link";
import { ArrowRight, Building2, Receipt, MapPin } from "lucide-react";
import { Container } from "@wahab/ui";
import { SectionHeading } from "@/components/marketing/section-heading";

const cards = [
  {
    icon: Building2,
    title: "One company, start to finish",
    body: "Design, supply, installation, net metering and service — all in-house. No subcontractors to chase.",
  },
  {
    icon: Receipt,
    title: "Priced before you call",
    body: "Our rates are published in every estimate. What you see itemized online is the basis of your quotation.",
  },
  {
    icon: MapPin,
    title: "Local, and here afterwards",
    body: "We are a Lahore business. When you need service in year three, we are still a short drive away.",
  },
] as const;

export function AboutSection() {
  return (
    <section className="relative py-24 sm:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left column — text */}
          <div>
            <SectionHeading
              eyebrow="About Al-Wahab"
              heading="A Lahore solar company that shows its numbers"
              accentColor="gold"
            />
            <p className="mt-5 text-[16px] leading-relaxed text-slate-400">
              Al-Wahab Solar Traders supplies and installs solar systems across
              Lahore. We built this estimator because homeowners kept telling us
              the same thing: every dealer quotes a different number and nobody
              explains it. So we put our pricing online, itemized, before you
              ever speak to us.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="focus-ring group inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-gold to-amber px-6 py-3 text-[15px] font-semibold text-navy-950 shadow-cta transition-all duration-200 hover:shadow-cta-hover hover:brightness-105 active:scale-[0.96]"
              >
                Learn about us
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/contact"
                className="focus-ring inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/4 px-6 py-3 text-[15px] font-medium text-white transition-all duration-200 hover:bg-white/8 hover:border-white/35 active:scale-[0.96]"
              >
                Talk to our team
              </Link>
            </div>
          </div>

          {/* Right column — 3 cards */}
          <div className="space-y-4">
            {cards.map((card) => (
              <div
                key={card.title}
                className="glass rounded-2xl p-5 transition-all duration-300 hover:border-white/20"
              >
                <div className="flex items-start gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold/10 text-gold">
                    <card.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-[17px] font-semibold text-white">
                      {card.title}
                    </h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-slate-400">
                      {card.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
