"use client";

import { useState } from "react";
import { ArrowRight, Home, Layers, MapPin, Car } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Roshni } from "@/components/estimator/roshni";
import { OptionCard } from "@/components/estimator/option-card";
import type { RoofType, WizardAnswers } from "@/types/estimator";

interface StepProps {
  answers: WizardAnswers;
  onNext: (payload: Partial<WizardAnswers>) => void;
}

const ROOFS: {
  value: RoofType;
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    value: "rcc",
    icon: Home,
    title: "RCC / Concrete roof",
    description: "Standard reinforced concrete — most common in Pakistan",
  },
  {
    value: "metal_sheet",
    icon: Layers,
    title: "Metal sheet / Tin roof",
    description: "Corrugated steel or tin sheeting",
  },
  {
    value: "ground_mount",
    icon: MapPin,
    title: "Ground mount",
    description: "Open land or courtyard — panels on a frame",
  },
  {
    value: "carport",
    icon: Car,
    title: "Carport / Shade structure",
    description: "Panels mounted over a parking or patio area",
  },
];

export function Step5Roof({ answers, onNext }: StepProps) {
  const [selected, setSelected] = useState<RoofType | undefined>(
    answers.roofType,
  );

  return (
    <div className="space-y-6">
      <Roshni>
        <p>What&apos;s your roof or mounting surface like?</p>
      </Roshni>

      <div className="space-y-3" role="radiogroup" aria-label="Roof type">
        {ROOFS.map(({ value, icon, title, description }) => (
          <OptionCard
            key={value}
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
          onClick={() => selected && onNext({ roofType: selected })}
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
