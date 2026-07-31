import {
  ClipboardList,
  FileText,
  CalendarCheck,
  Wrench,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/marketing/section-heading";

const steps = [
  {
    icon: ClipboardList,
    label: "Step 01",
    title: "Answer a few questions — or upload your bill",
    body: "Tell us your usage, or upload your LESCO bill for the most accurate read on what you need.",
  },
  {
    icon: FileText,
    label: "Step 02",
    title: "Get an itemized estimate",
    body: "See a clear breakdown — panels, inverter, battery, structure, installation and net metering — priced on live Lahore rates.",
  },
  {
    icon: CalendarCheck,
    label: "Step 03",
    title: "Book a free site survey",
    body: "Save your estimate and our engineer visits your roof to confirm the design and finalise your quotation.",
  },
  {
    icon: Wrench,
    label: "Step 04",
    title: "We install, you track it",
    body: "Our team installs and commissions your system while you follow every phase and task from your dashboard.",
  },
] as const;

export function HowItWorks() {
  return (
    <section id="how" className="relative py-24 sm:py-28 bg-white/[0.015]">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          heading="From a high bill to a working system, in four steps"
          lede="No sales calls to get started — just your answers and clear, itemized numbers."
          accentColor="cyan"
        />

        {/* Timeline */}
        <div className="relative mt-16 pl-2">
          {/* Vertical track line */}
          <div className="absolute left-[26px] top-3 bottom-3 w-0.5 bg-white/10" />

          <div className="space-y-9">
            {steps.map((step) => (
              <div key={step.label} className="relative flex gap-6 pl-1">
                {/* Icon circle */}
                <div className="relative z-10 shrink-0">
                  <span className="grid h-[54px] w-[54px] place-items-center rounded-2xl border border-white/10 bg-white/3 text-slate-500">
                    <step.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                </div>

                {/* Content card */}
                <div className="glass flex-1 rounded-2xl p-6">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-[13px] font-semibold text-gold">
                      {step.label}
                    </span>
                    <span className="h-px flex-1 bg-white/10" />
                  </div>
                  <h3 className="font-display mt-2 text-[21px] font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-400">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
