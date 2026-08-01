"use client";

import { useReducer, useCallback } from "react";
import { ArrowLeft } from "lucide-react";
import { cn } from "@wahab/utils";
import { EntryScreen } from "@/components/estimator/entry-screen";
import { SummaryRail } from "@/components/estimator/summary-rail";
import { ProgressBar } from "@/components/estimator/progress-bar";
import type {
  WizardState,
  WizardAction,
  WizardAnswers,
  EntryMethod,
} from "@/types/estimator";

function getStepCount(answers: WizardAnswers): number {
  return answers.systemType === "ongrid" ? 7 : 8;
}

const initialState: WizardState = {
  currentStep: 0,
  totalSteps: 8,
  answers: {},
  started: false,
};

function reducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case "START": {
      const answers: WizardAnswers = { entryMethod: action.entryMethod };
      if (action.entryMethod === "sample") {
        answers.monthlyUnits = 980;
        answers.connectionPhase = "three";
        answers.installAddress = "Johar Town, Lahore";
      }
      return { ...state, started: true, currentStep: 1, answers };
    }
    case "SET_ANSWER": {
      const answers = { ...state.answers, ...action.payload };
      return {
        ...state,
        answers,
        totalSteps: getStepCount(answers),
      };
    }
    case "NEXT_STEP":
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, state.totalSteps),
      };
    case "GO_TO_STEP":
      return {
        ...state,
        currentStep: Math.max(0, Math.min(action.step, state.totalSteps)),
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

interface WizardProps {
  children?: React.ReactNode;
}

export function Wizard({ children }: WizardProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleEntry = useCallback(
    (method: EntryMethod) => dispatch({ type: "START", entryMethod: method }),
    [],
  );

  const goBack = useCallback(() => {
    if (state.currentStep <= 1) dispatch({ type: "RESET" });
    else dispatch({ type: "GO_TO_STEP", step: state.currentStep - 1 });
  }, [state.currentStep]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
      {/* Main column */}
      <div className="min-w-0">
        {/* Progress + back */}
        {state.started && (
          <div className="mb-6 space-y-4">
            <button
              onClick={goBack}
              className="focus-ring inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-[13px] font-medium text-slate-400 transition-colors hover:bg-white/6 hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back
            </button>
            <ProgressBar current={state.currentStep} total={state.totalSteps} />
          </div>
        )}

        {/* Step content */}
        <div
          className={cn(
            "transition-all duration-200",
            state.started ? "animate-in fade-in slide-in-from-bottom-2" : "",
          )}
        >
          {!state.started ? (
            <EntryScreen onSelect={handleEntry} />
          ) : (
            <div className="glass rounded-2xl p-6 sm:p-8">
              <p className="text-center text-[15px] text-slate-400">
                Step {state.currentStep} content will be built in Phase 11.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Summary rail — sticky on desktop, bottom sheet on mobile */}
      <div className="hidden lg:block">
        <div className="sticky top-28">
          <SummaryRail answers={state.answers} started={state.started} />
        </div>
      </div>

      {/* Mobile summary bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 p-3 lg:hidden">
        {state.started && (
          <div className="glass-strong flex items-center justify-between rounded-2xl px-4 py-3">
            <div>
              <div className="text-[13px] font-medium text-white">
                Your estimate so far
              </div>
              <div className="text-[12px] text-slate-400">
                Step {state.currentStep} of {state.totalSteps}
              </div>
            </div>
            <span className="font-display text-lg font-semibold text-gold">
              {state.answers.monthlyUnits
                ? `${Math.ceil((state.answers.monthlyUnits / 100) * 2) / 2} kW`
                : "—"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
