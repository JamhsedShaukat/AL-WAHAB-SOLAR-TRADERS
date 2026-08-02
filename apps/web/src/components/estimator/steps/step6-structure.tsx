"use client";

import { useState } from "react";
import { ArrowRight, Building2, Wrench, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Roshni } from "@/components/estimator/roshni";
import { OptionCard } from "@/components/estimator/option-card";
import type {
  StructureQuality,
  StructureType,
  WizardAnswers,
} from "@/types/estimator";

interface StepProps {
  answers: WizardAnswers;
  onNext: (payload: Partial<WizardAnswers>) => void;
}

const TYPES: {
  value: StructureType;
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    value: "standard",
    icon: Building2,
    title: "Standard fixed-tilt",
    description: "Fixed angle — straightforward installation, lower cost",
  },
  {
    value: "customized",
    icon: Wrench,
    title: "Customised / Elevated",
    description: "Custom height or angle to suit your roof layout",
  },
];

const QUALITIES: {
  value: StructureQuality;
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: string;
}[] = [
  {
    value: "medium",
    icon: Building2,
    title: "Standard galvanised",
    description: "G250 galvanised steel — solid everyday choice",
  },
  {
    value: "good",
    icon: Star,
    title: "Heavy-duty aluminium",
    description: "Corrosion-free, lighter, longer lifespan",
    badge: "Recommended",
  },
];

export function Step6Structure({ answers, onNext }: StepProps) {
  const [type, setType] = useState<StructureType | undefined>(
    answers.structureType,
  );
  const [quality, setQuality] = useState<StructureQuality | undefined>(
    answers.structureQuality,
  );

  const isValid = !!type && !!quality;

  return (
    <div className="space-y-6">
      <Roshni>
        <p>Tell me about your mounting structure.</p>
      </Roshni>

      {/* Structure type */}
      <div className="space-y-2">
        <p className="text-[12px] font-medium text-slate-400">Structure type</p>
        <div
          className="space-y-3"
          role="radiogroup"
          aria-label="Structure type"
        >
          {TYPES.map(({ value, icon, title, description }) => (
            <OptionCard
              key={value}
              icon={icon}
              title={title}
              description={description}
              selected={type === value}
              onClick={() => setType(value)}
            />
          ))}
        </div>
      </div>

      {/* Structure quality */}
      <div className="space-y-2">
        <p className="text-[12px] font-medium text-slate-400">
          Material quality
        </p>
        <div
          className="space-y-3"
          role="radiogroup"
          aria-label="Material quality"
        >
          {QUALITIES.map(({ value, icon, title, description, badge }) => (
            <OptionCard
              key={value}
              icon={icon}
              title={title}
              description={description}
              badge={badge}
              selected={quality === value}
              onClick={() => setQuality(value)}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() =>
            isValid &&
            onNext({ structureType: type, structureQuality: quality })
          }
          disabled={!isValid}
          className="focus-ring group inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-gold to-amber px-6 py-3 text-[15px] font-semibold text-navy-950 shadow-cta transition-all duration-200 hover:shadow-cta-hover hover:brightness-105 active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
        >
          Continue
          <ArrowRight className="h-[18px] w-[18px] transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}
