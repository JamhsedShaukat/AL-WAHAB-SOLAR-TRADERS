"use client";

import { useState } from "react";
import {
  ArrowRight,
  Wind,
  Lightbulb,
  Thermometer,
  Tv,
  Droplets,
  Monitor,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@wahab/utils";
import { Roshni } from "@/components/estimator/roshni";
import { RangeSlider } from "@/components/estimator/range-slider";
import type { WizardAnswers } from "@/types/estimator";

interface StepProps {
  answers: WizardAnswers;
  onNext: (payload: Partial<WizardAnswers>) => void;
}

const APPLIANCES: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "fans", label: "Fans", icon: Wind },
  { id: "lights", label: "Lights / LEDs", icon: Lightbulb },
  { id: "fridge", label: "Refrigerator", icon: Thermometer },
  { id: "ac", label: "Air conditioner", icon: Thermometer },
  { id: "tv", label: "TV & entertainment", icon: Tv },
  { id: "water_pump", label: "Water pump", icon: Droplets },
  { id: "computer", label: "Computer / Laptop", icon: Monitor },
];

export function Step4Backup({ answers, onNext }: StepProps) {
  const [loads, setLoads] = useState<string[]>(answers.backupLoads ?? []);
  const [hours, setHours] = useState(answers.backupHours ?? 4);

  const toggle = (id: string) =>
    setLoads((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const isValid = loads.length > 0;

  return (
    <div className="space-y-6">
      <Roshni>
        <p>Which appliances need to keep running during a power cut?</p>
      </Roshni>

      <div className="glass rounded-2xl p-5 sm:p-6 space-y-6">
        {/* Appliance grid */}
        <div>
          <p className="mb-3 text-[12px] font-medium text-slate-400">
            Select all that apply
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
            {APPLIANCES.map(({ id, label, icon: Icon }) => {
              const active = loads.includes(id);
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggle(id)}
                  className={cn(
                    "focus-ring flex items-center gap-2.5 rounded-xl border p-3 text-left text-[13.5px] font-medium transition-all duration-200",
                    active
                      ? "border-gold/60 bg-gold/[0.07] text-white"
                      : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20 hover:bg-white/5",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 shrink-0",
                      active ? "text-gold" : "text-slate-400",
                    )}
                  />
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Backup hours slider */}
        <RangeSlider
          label="Hours of backup needed"
          value={hours}
          min={1}
          max={12}
          unit=" h"
          onChange={setHours}
        />

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() =>
              isValid && onNext({ backupLoads: loads, backupHours: hours })
            }
            disabled={!isValid}
            className="focus-ring group inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-gold to-amber px-6 py-3 text-[15px] font-semibold text-navy-950 shadow-cta transition-all duration-200 hover:shadow-cta-hover hover:brightness-105 active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
          >
            Continue
            <ArrowRight className="h-[18px] w-[18px] transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
