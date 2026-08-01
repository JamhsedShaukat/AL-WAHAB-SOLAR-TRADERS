"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@wahab/utils";
import { Roshni } from "@/components/estimator/roshni";
import type { WizardAnswers } from "@/types/estimator";

interface StepProps {
  answers: WizardAnswers;
  onNext: (payload: Partial<WizardAnswers>) => void;
}

export function Step1BillConfirm({ answers, onNext }: StepProps) {
  const [units, setUnits] = useState<string>(
    answers.monthlyUnits !== undefined ? String(answers.monthlyUnits) : "",
  );
  const [phase, setPhase] = useState<"single" | "three">(
    answers.connectionPhase ?? "single",
  );
  const [address, setAddress] = useState(answers.installAddress ?? "");

  const isValid = Number(units) > 0;

  const handleConfirm = () => {
    if (!isValid) return;
    onNext({
      monthlyUnits: Number(units),
      connectionPhase: phase,
      installAddress: address.trim() || undefined,
    });
  };

  return (
    <div className="space-y-6">
      <Roshni>
        {answers.entryMethod === "sample" ? (
          <p>
            I&apos;ve loaded a sample bill for a typical Lahore home. You can
            edit any field below.
          </p>
        ) : answers.entryMethod === "upload" ? (
          <p>
            Here&apos;s what I read from your bill. Double-check the numbers —
            you can edit anything that looks off.
          </p>
        ) : (
          <p>
            Let&apos;s start with your electricity usage. You&apos;ll find the
            monthly units on your LESCO bill.
          </p>
        )}
      </Roshni>

      <div className="glass rounded-2xl p-5 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Monthly units */}
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-medium text-slate-400">
              Monthly units (kWh)
            </span>
            <input
              type="number"
              min={0}
              max={9999}
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              placeholder="e.g. 800"
              className="focus-ring w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-[15px] text-white outline-none placeholder:text-slate-600 focus:border-gold/50"
            />
          </label>

          {/* Connection phase */}
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-medium text-slate-400">
              Connection phase
            </span>
            <div className="flex overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]">
              {(["single", "three"] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPhase(p)}
                  className={cn(
                    "min-h-[44px] flex-1 py-2.5 text-[14px] font-medium transition-all duration-200",
                    phase === p
                      ? "bg-linear-to-r from-gold to-amber text-navy-950"
                      : "text-slate-300 hover:bg-white/6 hover:text-white",
                  )}
                >
                  {p === "single" ? "Single-phase" : "Three-phase"}
                </button>
              ))}
            </div>
          </label>

          {/* Address */}
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-[12px] font-medium text-slate-400">
              Installation address{" "}
              <span className="text-slate-600">(optional)</span>
            </span>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. Block C, Johar Town, Lahore"
              className="focus-ring w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-[15px] text-white outline-none placeholder:text-slate-600 focus:border-gold/50"
            />
          </label>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!isValid}
            className="focus-ring group inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-gold to-amber px-6 py-3 text-[15px] font-semibold text-navy-950 shadow-cta transition-all duration-200 hover:shadow-cta-hover hover:brightness-105 active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
          >
            Confirm details
            <ArrowRight className="h-[18px] w-[18px] transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
          <span className="text-[12.5px] text-slate-500">
            You can edit any field
          </span>
        </div>
      </div>
    </div>
  );
}
