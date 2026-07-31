import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Receipt,
  MapPin,
  Users,
  Shield,
  Wrench,
} from "lucide-react";
import { Container } from "@wahab/ui";
import { SectionHeading } from "@/components/marketing/section-heading";

export const metadata: Metadata = {
  title: "About",
  description:
    "Al-Wahab Solar Traders supplies and installs solar systems across Lahore. One company — design, supply, installation, net metering and service.",
};

const promises = [
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
  {
    icon: Users,
    title: "Our own engineers",
    body: "The people who survey your roof are the people who install the system. Fully accountable, fully trained.",
  },
  {
    icon: Shield,
    title: "Backed by real warranties",
    body: "Manufacturer warranties on every component, plus our own workmanship cover and local after-sales support.",
  },
  {
    icon: Wrench,
    title: "Net metering handled",
    body: "We prepare the LESCO application, coordinate the inspection and see your bi-directional meter through to approval.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      {/* Hero band */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <Container>
          <div className="max-w-2xl">
            <SectionHeading
              eyebrow="About Al-Wahab"
              heading="A Lahore solar company that shows its numbers"
              lede="We built this estimator because homeowners kept telling us the same thing: every dealer quotes a different number and nobody explains it."
              accentColor="gold"
            />
          </div>
        </Container>
      </section>

      {/* Our story */}
      <section className="py-16 bg-white/[0.015]">
        <Container>
          <div className="mx-auto max-w-3xl space-y-5 text-[16px] leading-relaxed text-slate-400">
            <p>
              Al-Wahab Solar Traders supplies and installs solar systems across
              Lahore. We started because the solar market in Pakistan has a
              transparency problem — customers get three different prices from
              three dealers, with no explanation of why they differ.
            </p>
            <p>
              So we put our pricing online, itemized, before you ever speak to
              us. Every estimate shows the exact components, their specifications
              and the rate per unit. The price you see is the price we quote
              after the survey — on the same basis, with no new line items
              appearing.
            </p>
            <p>
              Our team handles everything: design, procurement, installation,
              testing, net metering and after-sales service. One company, one
              point of accountability, from the first click to the day your
              system pays for itself.
            </p>
          </div>
        </Container>
      </section>

      {/* Our promise — 6 cards */}
      <section className="py-24 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Our promise"
            heading="What you get when you choose Al-Wahab"
            align="center"
            accentColor="gold"
          />

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {promises.map((card) => (
              <div
                key={card.title}
                className="glass rounded-2xl p-6 transition-all duration-300 hover:border-white/20"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold/10 text-gold">
                  <card.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="font-display mt-4 text-[17px] font-semibold text-white">
                  {card.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-slate-400">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA band */}
      <section className="py-16 bg-white/[0.015]">
        <Container>
          <div className="flex flex-col items-center text-center">
            <h2 className="font-display text-[28px] font-semibold text-white sm:text-[34px]">
              Ready to see your number?
            </h2>
            <p className="mt-3 max-w-md text-[16px] text-slate-400">
              Get a free, itemized solar estimate in about 2 minutes — no
              obligation.
            </p>
            <Link
              href="/estimate"
              className="focus-ring group mt-8 inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-gold to-amber px-8 py-4 text-base font-semibold text-navy-950 shadow-cta transition-all duration-200 hover:shadow-cta-hover hover:brightness-105 active:scale-[0.96]"
            >
              Get your free estimate
              <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
