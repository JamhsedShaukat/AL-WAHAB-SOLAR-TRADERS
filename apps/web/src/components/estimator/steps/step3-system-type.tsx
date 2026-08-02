"use client";

import { useState } from "react";
import { ArrowRight, Zap, BatteryCharging, Battery } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Roshni } from "@/components/estimator/roshni";
import { OptionCard } from "@/components/estimator/option-card";
import type { SystemType, WizardAnswers } from "@/types/estimator";

interface StepProps {
  answers: WizardAnswers;
  onNext: (payload: Partial<WizardAnswers>) => void;
}

const SYSTEMS: {
  value: SystemType;
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: string;
}[] = [
  {
    value: "ongrid",
    icon: Zap,
    title: "On-grid",
    description:
      "Cuts your LESCO bill — stays connected to the grid. No battery backup.",
  },
  {
    value: "hybrid",
    icon: BatteryCharging,
    title: "Hybrid",
    description: "Grid + battery backup — best of both worlds",
    badge: "Most popular",
  },
  {
    value: "offgrid",
    icon: Battery,
    title: "Off-grid",
    description: "Fully independent from the grid — batteries only",
  },
];

export function Step3SystemType({ answers, onNext }: StepProps) {
  const [selected, setSelected] = useState<SystemType | undefined>(
    answers.systemType,
  );

  return (
    <div className="space-y-6">
      <Roshni>
        <p>Which type of system suits your needs?</p>
      </Roshni>

      <div className="space-y-3" role="radiogroup" aria-label="System type">
        {SYSTEMS.map(({ value, icon, title, description, badge }) => (
          <OptionCard
            key={value}
            icon={icon}
            title={title}
            description={description}
            badge={badge}
            selected={selected === value}
            onClick={() => setSelected(value)}
          />
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => selected && onNext({ systemType: selected })}
          disabled={!selected}
          className="focus-ring group inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-gold to-amber px-6 py-3 text-[15px] font-semibold text-navy-950 shadow-cta transition-all duration-200 hover:shadow-cta-hover hover:brightness-105 active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
        >
          Continue
          <ArrowRight className="h-[18px] w-[18px] transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}
