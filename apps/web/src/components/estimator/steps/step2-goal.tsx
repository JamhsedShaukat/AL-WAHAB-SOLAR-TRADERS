"use client";

import { useState } from "react";
import { ArrowRight, CircleCheckBig, TrendingDown, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Roshni } from "@/components/estimator/roshni";
import { OptionCard } from "@/components/estimator/option-card";
import type { EstimateGoal, WizardAnswers } from "@/types/estimator";

interface StepProps {
  answers: WizardAnswers;
  onNext: (payload: Partial<WizardAnswers>) => void;
}

const GOALS: {
  value: EstimateGoal;
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    value: "cover_all",
    icon: CircleCheckBig,
    title: "Cover my whole bill",
    description: "Offset close to 100% of your usage",
  },
  {
    value: "reduce_bill",
    icon: TrendingDown,
    title: "Reduce my bill",
    description: "Trim the most expensive LESCO slabs",
  },
  {
    value: "fit_budget",
    icon: Wallet,
    title: "Fit a budget",
    description: "Best system for a set amount",
  },
];

export function Step2Goal({ answers, onNext }: StepProps) {
  const [selected, setSelected] = useState<EstimateGoal | undefined>(
    answers.goal,
  );

  return (
    <div className="space-y-6">
      <Roshni>
        <p>What&apos;s your solar goal?</p>
      </Roshni>

      <div className="space-y-3" role="radiogroup" aria-label="Solar goal">
        {GOALS.map(({ value, icon, title, description }) => (
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
          onClick={() => selected && onNext({ goal: selected })}
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
