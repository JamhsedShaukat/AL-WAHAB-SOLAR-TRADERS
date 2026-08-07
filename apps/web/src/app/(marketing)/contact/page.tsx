"use client";

import { useState } from "react";
import { Check, ArrowRight, MapPin, Navigation, Phone, Mail, MessageCircle, Clock } from "lucide-react";
import { Container } from "@wahab/ui";
import { SectionHeading } from "@/components/marketing/section-heading";
import { SITE } from "@/lib/seo/site";

// Values come from SITE so the visible details and the LocalBusiness schema in
// this route's layout can never drift apart — mismatched NAP is a real ranking
// problem, not just untidiness.
const contactInfo = [
  {
    icon: MapPin,
    label: "Address",
    value: `${SITE.streetAddress}, ${SITE.city} ${SITE.postalCode}`,
    // Opens the actual Google Business Profile pin.
    href: SITE.googleMapsUrl,
  },
  {
    icon: Navigation,
    label: "Plus Code",
    value: SITE.plusCode,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.plusCode)}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+92 42 111 765 765",
    href: `tel:${SITE.telephone}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with us",
    href: `https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}`,
  },
  {
    icon: Clock,
    label: "Hours",
    value: `Mon–Sat, ${SITE.openingHours.opens} – ${SITE.openingHours.closes}`,
    href: undefined,
  },
] as const;

const billOptions = [
  { value: "", label: "Select…" },
  { value: "under-15k", label: "Under PKR 15,000" },
  { value: "15k-30k", label: "PKR 15,000 – 30,000" },
  { value: "30k-60k", label: "PKR 30,000 – 60,000" },
  { value: "over-60k", label: "Over PKR 60,000" },
] as const;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="pt-32 pb-24 sm:pt-40">
      <Container>
        <SectionHeading
          eyebrow="Contact"
          heading="Talk to our team"
          lede="Get in touch for a question, a quote, or just to say hello."
          accentColor="gold"
        />

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Left — contact info card */}
          <div className="glass rounded-2xl p-6 sm:p-8">
            <h3 className="font-display text-lg font-semibold text-white">
              Al-Wahab Solar Traders
            </h3>
            <ul className="mt-6 space-y-5">
              {contactInfo.map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gold/10 text-gold">
                    <item.icon className="h-4.5 w-4.5" aria-hidden="true" />
                  </span>
                  <div>
                    <div className="text-[12px] font-medium uppercase tracking-wider text-slate-500">
                      {item.label}
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="mt-0.5 text-[15px] text-slate-300 transition-colors hover:text-white"
                        {...(item.href.startsWith("http") && {
                          target: "_blank",
                          rel: "noopener noreferrer",
                        })}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <div className="mt-0.5 text-[15px] text-slate-300">
                        {item.value}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — contact form */}
          <div className="glass-strong rounded-2xl p-6 sm:p-8">
            {submitted ? (
              <div className="flex flex-col items-center py-10 text-center">
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
                <div>
                  <label htmlFor="c-name" className="mb-1.5 block text-[13px] font-medium text-slate-300">
                    Full name
                  </label>
                  <input
                    id="c-name"
                    type="text"
                    required
                    className="w-full rounded-xl bg-white/4 border border-white/10 px-4 py-3 text-[15px] text-white placeholder:text-slate-500 outline-none transition-all focus:border-gold/50 focus:ring-2 focus:ring-gold/20"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="c-email" className="mb-1.5 block text-[13px] font-medium text-slate-300">
                    Email
                  </label>
                  <input
                    id="c-email"
                    type="email"
                    required
                    className="w-full rounded-xl bg-white/4 border border-white/10 px-4 py-3 text-[15px] text-white placeholder:text-slate-500 outline-none transition-all focus:border-gold/50 focus:ring-2 focus:ring-gold/20"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="c-phone" className="mb-1.5 block text-[13px] font-medium text-slate-300">
                    Phone
                  </label>
                  <input
                    id="c-phone"
                    type="tel"
                    className="w-full rounded-xl bg-white/4 border border-white/10 px-4 py-3 text-[15px] text-white placeholder:text-slate-500 outline-none transition-all focus:border-gold/50 focus:ring-2 focus:ring-gold/20"
                    placeholder="+92 3XX XXX XXXX"
                  />
                </div>
                <div>
                  <label htmlFor="c-bill" className="mb-1.5 block text-[13px] font-medium text-slate-300">
                    Monthly electricity bill
                  </label>
                  <select
                    id="c-bill"
                    className="w-full rounded-xl bg-white/4 border border-white/10 px-4 py-3 text-[15px] text-white outline-none transition-all focus:border-gold/50 focus:ring-2 focus:ring-gold/20 appearance-none"
                  >
                    {billOptions.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-navy-900 text-white">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="c-message" className="mb-1.5 block text-[13px] font-medium text-slate-300">
                    Message <span className="text-slate-500">(optional)</span>
                  </label>
                  <textarea
                    id="c-message"
                    rows={4}
                    className="w-full rounded-xl bg-white/4 border border-white/10 px-4 py-3 text-[15px] text-white placeholder:text-slate-500 outline-none transition-all focus:border-gold/50 focus:ring-2 focus:ring-gold/20 resize-y min-h-24"
                    placeholder="How can we help?"
                  />
                </div>
                <button
                  type="submit"
                  className="focus-ring group flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-gold to-amber px-6 py-3.5 text-[15px] font-semibold text-navy-950 shadow-cta transition-all duration-200 hover:shadow-cta-hover hover:brightness-105 active:scale-[0.96]"
                >
                  Send message
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
                <p className="text-center text-[12px] text-slate-500">
                  No spam. We reply within one working day.
                </p>
              </form>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
