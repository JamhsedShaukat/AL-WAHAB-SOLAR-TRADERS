"use client";

import { useState } from "react";
import { ArrowRight, Zap, ZapOff } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Roshni } from "@/components/estimator/roshni";
import { OptionCard } from "@/components/estimator/option-card";
import type { WizardAnswers } from "@/types/estimator";

interface StepProps {
  answers: WizardAnswers;
  onNext: (payload: Partial<WizardAnswers>) => void;
}

const OPTIONS: {
  value: boolean;
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    value: true,
    icon: Zap,
    title: "Yes, I'm interested",
    description: "Sell surplus power back to LESCO — earn credits on your bill",
  },
  {
    value: false,
    icon: ZapOff,
    title: "Not right now",
    description: "You can apply for net metering later at any time",
  },
];

export function Step8NetMetering({ answers, onNext }: StepProps) {
  const [selected, setSelected] = useState<boolean | undefined>(
    answers.netMetering,
  );

  return (
    <div className="space-y-6">
      <Roshni>
        <p>
          Are you interested in net metering? It lets you feed excess solar
          power back to the grid for bill credits.
        </p>
      </Roshni>

      <div className="space-y-3" role="radiogroup" aria-label="Net metering">
        {OPTIONS.map(({ value, icon, title, description }) => (
          <OptionCard
            key={String(value)}
            icon={icon}
            title={title}
            description={description}
            selected={selected === value}
            onClick={() => setSelected(value)}
          />
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() =>
            selected !== undefined && onNext({ netMetering: selected })
          }
          disabled={selected === undefined}
          className="focus-ring group inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-gold to-amber px-6 py-3 text-[15px] font-semibold text-navy-950 shadow-cta transition-all duration-200 hover:shadow-cta-hover hover:brightness-105 active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
        >
          See my estimate
          <ArrowRight className="h-[18px] w-[18px] transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}
