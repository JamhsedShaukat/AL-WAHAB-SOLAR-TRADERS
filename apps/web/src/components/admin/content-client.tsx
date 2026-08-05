"use client";

import { useState } from "react";
import { Save, Eye } from "lucide-react";
import { cn } from "@wahab/utils";

type ContentTab = "hero" | "how-it-works" | "why-us" | "faq" | "seo";

const TABS: { key: ContentTab; label: string }[] = [
  { key: "hero", label: "Hero section" },
  { key: "how-it-works", label: "How it works" },
  { key: "why-us", label: "Why us" },
  { key: "faq", label: "FAQ" },
  { key: "seo", label: "SEO" },
];

const FAQ_DEFAULT = [
  {
    q: "How much does a solar system cost in Lahore?",
    a: "A standard 6–8 kWp Hybrid system for a residential home typically ranges between ₨ 8 and ₨ 16 lakh depending on the equipment tier and site requirements.",
  },
  {
    q: "How long does installation take?",
    a: "Most installations are completed within 3–5 working days of the survey and agreement, subject to procurement lead times.",
  },
  {
    q: "Do you handle the net metering application?",
    a: "Yes. We handle the complete LESCO net metering process end-to-end as part of every grid-tied and hybrid installation.",
  },
];

const BilingualField = ({
  label,
  en,
  ur,
}: {
  label: string;
  en: string;
  ur: string;
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[12px] font-medium text-slate-400">{label}</label>
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      <input
        defaultValue={en}
        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[13px] text-white placeholder:text-slate-600 focus:border-gold/50 focus:outline-none"
        placeholder="English"
      />
      <input
        defaultValue={ur}
        dir="rtl"
        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[13px] text-white placeholder:text-slate-600 focus:border-gold/50 focus:outline-none font-urdu"
        placeholder="اردو"
      />
    </div>
  </div>
);

export function ContentClient() {
  const [tab, setTab] = useState<ContentTab>("hero");
  const [faqs, setFaqs] = useState(FAQ_DEFAULT);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">
            Content
          </h1>
          <p className="mt-1 text-[13px] text-slate-500">
            Edit website copy without a deployment
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-[13px] text-slate-300 hover:bg-white/5"
          >
            <Eye className="h-4 w-4" /> Preview
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl bg-gold px-4 py-2 text-[13px] font-semibold text-navy-950 hover:bg-amber-400 transition-colors"
          >
            <Save className="h-4 w-4" /> Publish
          </button>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-1 overflow-x-auto rounded-xl bg-white/5 p-1">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={cn(
              "shrink-0 rounded-lg px-4 py-2 text-[13px] font-medium transition-colors",
              tab === t.key
                ? "bg-gold text-navy-950"
                : "text-slate-400 hover:text-white",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Hero */}
      {tab === "hero" && (
        <div className="glass rounded-2xl p-5 flex flex-col gap-4 max-w-3xl">
          <BilingualField
            label="Eyebrow text"
            en="Pakistan's #1 Solar Estimator"
            ur="پاکستان کا نمبر 1 سولر اندازہ کار"
          />
          <BilingualField
            label="Headline"
            en="Cut your electricity bill by 90%"
            ur="اپنا بجلی کا بل 90٪ تک کم کریں"
          />
          <BilingualField
            label="Sub-headline"
            en="Get an instant, itemised solar quote for your Lahore home or business — no salesperson required."
            ur="لاہور کے گھر یا کاروبار کے لیے فوری سولر قوٹ حاصل کریں — کسی سیلز پرسن کی ضرورت نہیں۔"
          />
          <BilingualField
            label="Primary CTA"
            en="Get my free estimate"
            ur="میرا مفت اندازہ لیں"
          />
        </div>
      )}

      {/* How it works */}
      {tab === "how-it-works" && (
        <div className="glass rounded-2xl p-5 flex flex-col gap-5 max-w-3xl">
          {["Step 1", "Step 2", "Step 3", "Step 4"].map((step, i) => (
            <div key={step} className="flex flex-col gap-2">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-gold">
                {step}
              </p>
              <BilingualField
                label="Title"
                en={
                  [
                    "Tell us your bill",
                    "Get your estimate",
                    "We visit your site",
                    "Installation",
                  ][i]
                }
                ur={
                  [
                    "اپنا بل بتائیں",
                    "اندازہ حاصل کریں",
                    "ہم آپ کے مقام پر آئیں گے",
                    "تنصیب",
                  ][i]
                }
              />
            </div>
          ))}
        </div>
      )}

      {/* Why us */}
      {tab === "why-us" && (
        <div className="glass rounded-2xl p-5 flex flex-col gap-5 max-w-3xl">
          {[
            "Transparent pricing",
            "Expert team",
            "End-to-end service",
            "Net metering handled",
            "Warranty backed",
            "Local expertise",
          ].map((title, i) => (
            <div
              key={title}
              className="border-b border-white/5 pb-4 last:border-0 last:pb-0"
            >
              <BilingualField
                label={`Card ${i + 1} — title`}
                en={title}
                ur={
                  [
                    "شفاف قیمتیں",
                    "ماہر ٹیم",
                    "مکمل خدمت",
                    "نیٹ میٹرنگ",
                    "وارنٹی",
                    "مقامی مہارت",
                  ][i]
                }
              />
            </div>
          ))}
        </div>
      )}

      {/* FAQ */}
      {tab === "faq" && (
        <div className="flex flex-col gap-3 max-w-3xl">
          {faqs.map((faq, i) => (
            <div key={i} className="glass rounded-xl p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-semibold text-gold">
                  FAQ {i + 1}
                </p>
                <button
                  type="button"
                  onClick={() =>
                    setFaqs((prev) => prev.filter((_, j) => j !== i))
                  }
                  className="text-[11px] text-red-400 hover:text-red-300"
                >
                  Remove
                </button>
              </div>
              <textarea
                defaultValue={faq.q}
                rows={2}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[13px] text-white focus:outline-none resize-none"
                placeholder="Question"
              />
              <textarea
                defaultValue={faq.a}
                rows={3}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[13px] text-slate-300 focus:outline-none resize-none"
                placeholder="Answer"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => setFaqs((prev) => [...prev, { q: "", a: "" }])}
            className="rounded-xl border border-dashed border-white/10 py-3 text-[13px] text-slate-500 hover:border-gold/30 hover:text-gold transition-colors"
          >
            + Add FAQ
          </button>
        </div>
      )}

      {/* SEO */}
      {tab === "seo" && (
        <div className="glass rounded-2xl p-5 flex flex-col gap-4 max-w-3xl">
          <BilingualField
            label="Homepage — SEO title"
            en="Solar Energy Lahore | Al-Wahab Solar Traders"
            ur="سولر انرجی لاہور | الوہاب سولر ٹریڈرز"
          />
          <BilingualField
            label="Homepage — Meta description"
            en="Get an instant solar estimate for your Lahore home. Transparent pricing, expert installation, net metering handled."
            ur="لاہور کے گھر کے لیے فوری سولر اندازہ حاصل کریں۔ شفاف قیمتیں، ماہر تنصیب، نیٹ میٹرنگ۔"
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-medium text-slate-400">
              OG image
            </label>
            <div className="flex h-24 items-center justify-center rounded-xl border border-dashed border-white/10 text-[12px] text-slate-600 hover:border-gold/30 cursor-pointer transition-colors">
              Click to upload (1200×630 px)
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
