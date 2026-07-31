"use client";

import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { Container } from "@wahab/ui";
import { SectionHeading } from "@/components/marketing/section-heading";

const assurances = [
  "Free, itemized estimate in about 2 minutes",
  "Installed by our own certified team",
  "No hidden costs, no obligation",
] as const;

const billOptions = [
  { value: "", label: "Select…" },
  { value: "under-15k", label: "Under PKR 15,000" },
  { value: "15k-30k", label: "PKR 15,000 – 30,000" },
  { value: "30k-60k", label: "PKR 30,000 – 60,000" },
  { value: "over-60k", label: "Over PKR 60,000" },
] as const;

export function CTASection() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // In production, this submits to a server action that creates a Lead.
    setSubmitted(true);
  }

  return (
    <section className="relative py-24 sm:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left column — heading + assurances */}
          <div>
            <SectionHeading
              eyebrow="Get started"
              heading="Ready to see your solar number?"
              lede="Start your free estimate now, or leave your details and we'll walk you through it — no obligation."
              accentColor="gold"
            />

            <ul className="mt-8 space-y-3">
              {assurances.map((text) => (
                <li key={text} className="flex items-center gap-3">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <span className="text-[15px] text-slate-300">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right column — lead form */}
          <div className="glass-strong rounded-2xl p-6 sm:p-8">
            {submitted ? (
              <div className="flex flex-col items-center py-8 text-center">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gold/15 text-gold">
                  <Check className="h-7 w-7" />
                </span>
                <p className="mt-4 font-display text-lg font-semibold text-white">
                  Thank you
                </p>
                <p className="mt-2 text-[14.5px] text-slate-400">
                  We&apos;ll call you within one working day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label
                    htmlFor="lead-name"
                    className="mb-1.5 block text-[13px] font-medium text-slate-300"
                  >
                    Full name
                  </label>
                  <input
                    id="lead-name"
                    type="text"
                    required
                    className="w-full rounded-xl bg-white/4 border border-white/10 px-4 py-3 text-[15px] text-white placeholder:text-slate-500 outline-none transition-all focus:border-gold/50 focus:ring-2 focus:ring-gold/20"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="lead-email"
                    className="mb-1.5 block text-[13px] font-medium text-slate-300"
                  >
                    Email
                  </label>
                  <input
                    id="lead-email"
                    type="email"
                    required
                    className="w-full rounded-xl bg-white/4 border border-white/10 px-4 py-3 text-[15px] text-white placeholder:text-slate-500 outline-none transition-all focus:border-gold/50 focus:ring-2 focus:ring-gold/20"
                    placeholder="you@example.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="lead-phone"
                    className="mb-1.5 block text-[13px] font-medium text-slate-300"
                  >
                    Phone
                  </label>
                  <input
                    id="lead-phone"
                    type="tel"
                    className="w-full rounded-xl bg-white/4 border border-white/10 px-4 py-3 text-[15px] text-white placeholder:text-slate-500 outline-none transition-all focus:border-gold/50 focus:ring-2 focus:ring-gold/20"
                    placeholder="+92 3XX XXX XXXX"
                  />
                </div>

                {/* Bill range */}
                <div>
                  <label
                    htmlFor="lead-bill"
                    className="mb-1.5 block text-[13px] font-medium text-slate-300"
                  >
                    Monthly electricity bill
                  </label>
                  <select
                    id="lead-bill"
                    required
                    className="w-full rounded-xl bg-white/4 border border-white/10 px-4 py-3 text-[15px] text-white outline-none transition-all focus:border-gold/50 focus:ring-2 focus:ring-gold/20 appearance-none"
                  >
                    {billOptions.map((opt) => (
                      <option
                        key={opt.value}
                        value={opt.value}
                        className="bg-navy-900 text-white"
                      >
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Area */}
                <div>
                  <label
                    htmlFor="lead-area"
                    className="mb-1.5 block text-[13px] font-medium text-slate-300"
                  >
                    Area / town{" "}
                    <span className="text-slate-500">(optional)</span>
                  </label>
                  <input
                    id="lead-area"
                    type="text"
                    className="w-full rounded-xl bg-white/4 border border-white/10 px-4 py-3 text-[15px] text-white placeholder:text-slate-500 outline-none transition-all focus:border-gold/50 focus:ring-2 focus:ring-gold/20"
                    placeholder="e.g. Johar Town"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="focus-ring group flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-gold to-amber px-6 py-3.5 text-[15px] font-semibold text-navy-950 shadow-cta transition-all duration-200 hover:shadow-cta-hover hover:brightness-105 active:scale-[0.96]"
                >
                  Start my free estimate
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>

                {/* Privacy note */}
                <p className="text-center text-[12px] text-slate-500">
                  No spam. Your details are only used to prepare your estimate.
                </p>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
