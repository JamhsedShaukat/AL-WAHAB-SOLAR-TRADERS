"use client";

import { useState } from "react";
import { ArrowRight, Tag, Scale, Gem } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Roshni } from "@/components/estimator/roshni";
import { OptionCard } from "@/components/estimator/option-card";
import type { Priority, WizardAnswers } from "@/types/estimator";

interface StepProps {
  answers: WizardAnswers;
  onNext: (payload: Partial<WizardAnswers>) => void;
}

const PRIORITIES: {
  value: Priority;
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: string;
}[] = [
  {
    value: "lowest_price",
    icon: Tag,
    title: "Lowest price",
    description: "Most affordable components",
  },
  {
    value: "best_value",
    icon: Scale,
    title: "Best value",
    description: "Smart balance of price & quality",
    badge: "Recommended",
  },
  {
    value: "best_quality",
    icon: Gem,
    title: "Best quality",
    description: "Premium Tier-1 throughout",
  },
];

export function Step7Priority({ answers, onNext }: StepProps) {
  const [selected, setSelected] = useState<Priority | undefined>(
    answers.priority,
  );
  const [budget, setBudget] = useState<string>(
    answers.budgetPkr !== undefined ? String(answers.budgetPkr) : "",
  );

  const needsBudget = answers.goal === "fit_budget";
  const isValid = !!selected && (!needsBudget || Number(budget) > 0);

  const handleContinue = () => {
    if (!isValid || !selected) return;
    onNext({
      priority: selected,
      ...(needsBudget && budget ? { budgetPkr: Number(budget) } : {}),
    });
  };

  return (
    <div className="space-y-6">
      <Roshni>
        <p>What matters most to you?</p>
      </Roshni>

      <div className="space-y-3" role="radiogroup" aria-label="Priority">
        {PRIORITIES.map(({ value, icon, title, description, badge }) => (
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

      {/* Budget input — shown only when goal is fit_budget */}
      {needsBudget && (
        <div className="glass rounded-2xl p-5">
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-medium text-slate-400">
              Your budget (PKR)
            </span>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] font-medium text-slate-500">
                Rs.
              </span>
              <input
                type="number"
                min={0}
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="e.g. 500000"
                className="focus-ring w-full rounded-xl border border-white/10 bg-white/[0.04] py-2.5 pl-10 pr-3 text-[15px] text-white outline-none placeholder:text-slate-600 focus:border-gold/50"
              />
            </div>
          </label>
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleContinue}
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
