"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "@wahab/ui";
import { SectionHeading } from "@/components/marketing/section-heading";
import { cn } from "@wahab/utils";

import { categories } from "@/lib/content/faq";

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
