import {
  CircleDollarSign,
  ListChecks,
  Users,
  FileText,
  Route,
  Shield,
} from "lucide-react";
import { Container } from "@wahab/ui";
import { SectionHeading } from "@/components/marketing/section-heading";

const cards = [
  {
    icon: CircleDollarSign,
    iconColor: "gold" as const,
    category: "Live market pricing",
    title: "Accurate Lahore prices",
    body: "Your estimate is built on real, regularly-updated Lahore market rates — not generic guesses.",
  },
  {
    icon: ListChecks,
    iconColor: "cyan" as const,
    category: "Full breakdown",
    title: "Transparent, itemized scope",
    body: "See every component — panels, inverter, battery, structure, installation and net metering — with no hidden costs.",
  },
  {
    icon: Users,
    iconColor: "gold" as const,
    category: "In-house team",
    title: "Installed by our own engineers",
    body: "The people who quote you are the people who install. One company, start to finish, fully accountable.",
  },
  {
    icon: FileText,
    iconColor: "cyan" as const,
    category: "Net metering",
    title: "LESCO paperwork handled",
    body: "We prepare the application, coordinate the inspection and see your bi-directional meter through to approval.",
  },
  {
    icon: Route,
    iconColor: "gold" as const,
    category: "Stay in control",
    title: "Track your installation",
    body: "Follow your project through every phase and task, from site survey to grid connection.",
  },
  {
    icon: Shield,
    iconColor: "cyan" as const,
    category: "After the install",
    title: "Warranty and service",
    body: "Manufacturer warranties on every component, plus our own workmanship cover and local after-sales support.",
  },
] as const;

export function WhyUs() {
  return (
    <section id="why" className="relative py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Why Al-Wahab"
          heading="Solar decisions, minus the guesswork"
          lede="Everything you need to price, plan and trust a solar purchase in Lahore — from one company."
          align="center"
          accentColor="gold"
        />

        {/* 6 cards */}
        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.title}
              className="group relative h-full overflow-hidden rounded-3xl glass p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:shadow-[0_30px_60px_-25px_rgba(0,0,0,0.8)]"
            >
              {/* Hover glow */}
              <div
                className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 ${
                  card.iconColor === "gold" ? "bg-gold/25" : "bg-cyan/20"
                }`}
              />

              {/* Icon */}
              <span
                className={`relative grid h-[52px] w-[52px] place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 ${
                  card.iconColor === "gold"
                    ? "bg-gold/12 text-gold"
                    : "bg-cyan/12 text-cyan"
                }`}
              >
                <card.icon className="h-6 w-6" aria-hidden="true" />
              </span>

              {/* Text */}
              <div className="mt-5 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                {card.category}
              </div>
              <h3 className="font-display mt-1.5 text-[22px] font-semibold text-white">
                {card.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-400">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
