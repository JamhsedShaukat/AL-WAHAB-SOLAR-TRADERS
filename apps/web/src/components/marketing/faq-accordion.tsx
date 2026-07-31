"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "@wahab/ui";
import { SectionHeading } from "@/components/marketing/section-heading";
import { cn } from "@wahab/utils";

const faqs = [
  {
    q: "How accurate are the prices?",
    a: "Estimates use live Lahore market rates that we update regularly, so they're a close, honest guide. Your final price is confirmed after a free site survey — quoted on the same itemized basis, with no new line items appearing.",
  },
  {
    q: "Do I need a battery?",
    a: "Not always. An on-grid system is the cheapest way to cut your bill. Add a battery (a hybrid system) if you also want backup during load-shedding. The estimator helps you decide based on what you actually need to keep running.",
  },
  {
    q: "What about net metering and LESCO?",
    a: "If you choose on-grid or hybrid, your estimate includes the net-metering application and bi-directional meter, and our team handles the LESCO paperwork and inspection for you.",
  },
  {
    q: "Who does the installation?",
    a: "Our own engineers and technicians. We do not subcontract. The team that surveys your roof is the team that installs and commissions the system.",
  },
  {
    q: "Is it free to use?",
    a: "Getting an estimate and a site survey is completely free, with no obligation. You only pay if you decide to go ahead with the system.",
  },
  {
    q: "What warranty do I get?",
    a: "Manufacturer warranties on every component — typically 12 years product and 25 years performance on panels, 5–10 years on the inverter, 8–10 years on the battery, 10 years on the structure — plus our own 1–2 year workmanship cover.",
  },
  {
    q: "How long does it take?",
    a: "The system is usually installed and running within about a week of order. Net metering takes longer, roughly 5–9 weeks, because LESCO approval is outside our control. We keep you updated at every step.",
  },
] as const;

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-24 sm:py-28 bg-white/[0.015]">
      <Container>
        <SectionHeading
          eyebrow="FAQ"
          heading="Questions, answered honestly"
          lede="The things Lahore homeowners ask us most."
          align="center"
          accentColor="gold"
        />

        <div className="mx-auto mt-14 max-w-3xl">
          <div className="glass rounded-2xl divide-y divide-white/[0.06]">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              const id = `faq-${i}`;

              return (
                <div key={i}>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="focus-ring flex w-full items-center justify-between gap-4 rounded-xl px-6 py-5 text-left transition-colors hover:bg-white/3"
                    aria-expanded={isOpen}
                    aria-controls={`${id}-panel`}
                    id={`${id}-trigger`}
                  >
                    <span className="text-[15px] font-medium text-white">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200",
                        isOpen && "rotate-180"
                      )}
                      aria-hidden="true"
                    />
                  </button>
                  <div
                    id={`${id}-panel`}
                    role="region"
                    aria-labelledby={`${id}-trigger`}
                    className={cn(
                      "overflow-hidden transition-all duration-300",
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <p className="px-6 pb-5 text-[14.5px] leading-relaxed text-slate-400">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
