"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "@wahab/ui";
import { SectionHeading } from "@/components/marketing/section-heading";
import { cn } from "@wahab/utils";

const categories = [
  {
    id: "pricing",
    label: "Pricing",
    faqs: [
      {
        q: "How accurate are the prices?",
        a: "Estimates use live Lahore market rates that we update regularly, so they're a close, honest guide. Your final price is confirmed after a free site survey — quoted on the same itemized basis, with no new line items appearing.",
      },
      {
        q: "Are there any hidden costs?",
        a: "No. Every component is listed and priced in your estimate. The survey may adjust sizes or specs based on your actual roof, but no new categories appear. What you see is what you pay.",
      },
    ],
  },
  {
    id: "technical",
    label: "Technical",
    faqs: [
      {
        q: "Do I need a battery?",
        a: "Not always. An on-grid system is the cheapest way to cut your bill. Add a battery (a hybrid system) if you also want backup during load-shedding. The estimator helps you decide based on what you actually need to keep running.",
      },
      {
        q: "What size system do I need?",
        a: "It depends on your monthly electricity usage. Upload your LESCO bill or enter your average units, and the estimator sizes the system to your goal — whether that's covering your full bill, reducing it, or fitting a budget.",
      },
    ],
  },
  {
    id: "net-metering",
    label: "Net metering",
    faqs: [
      {
        q: "What about net metering and LESCO?",
        a: "If you choose on-grid or hybrid, your estimate includes the net-metering application and bi-directional meter, and our team handles the LESCO paperwork and inspection for you.",
      },
      {
        q: "How long does net metering approval take?",
        a: "Roughly 5–9 weeks from application to approved meter. LESCO's inspection and approval timeline is outside our control, but we keep you updated at every step and handle all the paperwork.",
      },
    ],
  },
  {
    id: "installation",
    label: "Installation",
    faqs: [
      {
        q: "Who does the installation?",
        a: "Our own engineers and technicians. We do not subcontract. The team that surveys your roof is the team that installs and commissions the system.",
      },
      {
        q: "How long does installation take?",
        a: "The system is usually installed and running within about a week of order. Net metering takes longer because of LESCO approval, but the system itself works from day one.",
      },
      {
        q: "Is it free to use the estimator?",
        a: "Getting an estimate and a site survey is completely free, with no obligation. You only pay if you decide to go ahead with the system.",
      },
    ],
  },
  {
    id: "warranty",
    label: "Warranty & service",
    faqs: [
      {
        q: "What warranty do I get?",
        a: "Manufacturer warranties on every component — typically 12 years product and 25 years performance on panels, 5–10 years on the inverter, 8–10 years on the battery, 10 years on the structure — plus our own 1–2 year workmanship cover.",
      },
      {
        q: "What happens after installation?",
        a: "We provide local after-sales support. If something needs attention in year three, we are still a short drive away in Lahore. Your warranty documents and system details are always accessible from your dashboard.",
      },
    ],
  },
] as const;

export default function FAQPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>(categories[0].id);

  function toggle(id: string) {
    setOpenId(openId === id ? null : id);
  }

  return (
    <div className="pt-32 pb-24 sm:pt-40">
      <Container>
        <SectionHeading
          eyebrow="FAQ"
          heading="Questions, answered honestly"
          lede="The things Lahore homeowners ask us most."
          accentColor="gold"
        />

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[200px_1fr]">
          {/* Sticky category nav — desktop */}
          <nav className="hidden lg:block">
            <div className="sticky top-28 space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "focus-ring block w-full rounded-lg px-3 py-2 text-left text-[14px] font-medium transition-colors",
                    activeCategory === cat.id
                      ? "bg-gold/10 text-gold"
                      : "text-slate-400 hover:text-white hover:bg-white/6"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </nav>

          {/* FAQ list */}
          <div className="space-y-8">
            {categories.map((cat) => (
              <div
                key={cat.id}
                id={cat.id}
                className={cn(
                  "lg:block",
                  activeCategory !== cat.id && "lg:hidden"
                )}
              >
                {/* Category label — mobile always visible */}
                <h3 className="mb-4 text-[13px] font-semibold uppercase tracking-wider text-slate-500 lg:hidden">
                  {cat.label}
                </h3>

                <div className="glass rounded-2xl divide-y divide-white/[0.06]">
                  {cat.faqs.map((faq, i) => {
                    const id = `${cat.id}-${i}`;
                    const isOpen = openId === id;

                    return (
                      <div key={id}>
                        <button
                          onClick={() => toggle(id)}
                          className="focus-ring flex w-full items-center justify-between gap-4 rounded-xl px-6 py-5 text-left transition-colors hover:bg-white/3"
                          aria-expanded={isOpen}
                          aria-controls={`${id}-panel`}
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
                          className={cn(
                            "overflow-hidden transition-all duration-300",
                            isOpen
                              ? "max-h-96 opacity-100"
                              : "max-h-0 opacity-0"
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
            ))}

            {/* Mobile: show all categories */}
            <div className="lg:hidden space-y-8">
              {categories.slice(1).map((cat) => (
                <div key={cat.id}>
                  <h3 className="mb-4 text-[13px] font-semibold uppercase tracking-wider text-slate-500">
                    {cat.label}
                  </h3>
                  <div className="glass rounded-2xl divide-y divide-white/[0.06]">
                    {cat.faqs.map((faq, i) => {
                      const id = `mob-${cat.id}-${i}`;
                      const isOpen = openId === id;
                      return (
                        <div key={id}>
                          <button
                            onClick={() => toggle(id)}
                            className="focus-ring flex w-full items-center justify-between gap-4 rounded-xl px-6 py-5 text-left transition-colors hover:bg-white/3"
                            aria-expanded={isOpen}
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
                            className={cn(
                              "overflow-hidden transition-all duration-300",
                              isOpen
                                ? "max-h-96 opacity-100"
                                : "max-h-0 opacity-0"
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
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
