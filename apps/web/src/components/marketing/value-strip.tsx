import {
  CircleDollarSign,
  ListChecks,
  Users,
  Heart,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Marquee } from "@/components/marketing/marquee";

const cards = [
  {
    icon: CircleDollarSign,
    title: "Live Lahore prices",
    body: "Estimates use current local market rates, updated regularly.",
  },
  {
    icon: Users,
    title: "Our own certified team",
    body: "We supply and install ourselves — no subcontractors, no hand-offs.",
  },
  {
    icon: ListChecks,
    title: "Itemized & transparent",
    body: "See every line item — panels, inverter, battery, labour. No hidden costs.",
  },
  {
    icon: Heart,
    title: "Free for homeowners",
    body: "Estimate, plan and decide at no cost to you.",
  },
] as const;

export function ValueStrip() {
  return (
    <section className="relative border-y border-white/[0.06] bg-white/[0.015] py-16">
      <Container>
        {/* Marquee subtitle */}
        <p className="text-center text-[12px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          Prices based on live Lahore market · updated regularly · installed by
          our own team
        </p>

        {/* Trust marquee */}
        <Marquee />

        {/* Value cards */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.title}
              className="glass rounded-2xl p-6 text-center transition-all duration-300 hover:border-white/20 hover:bg-white/5"
            >
              <span className="mx-auto mb-4 grid h-11 w-11 place-items-center rounded-xl bg-gold/10 text-gold">
                <card.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="font-display text-[18px] font-semibold leading-tight text-white">
                {card.title}
              </div>
              <div className="mt-2 text-[13.5px] leading-relaxed text-slate-400">
                {card.body}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
