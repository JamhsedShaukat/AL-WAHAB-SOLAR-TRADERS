"use client";

import { useReducer, useCallback, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { cn } from "@wahab/utils";
import { EntryScreen } from "@/components/estimator/entry-screen";
import { SummaryRail } from "@/components/estimator/summary-rail";
import { ProgressBar } from "@/components/estimator/progress-bar";
import { Step1BillConfirm } from "@/components/estimator/steps/step1-bill-confirm";
import { Step2Goal } from "@/components/estimator/steps/step2-goal";
import { Step3SystemType } from "@/components/estimator/steps/step3-system-type";
import { Step4Backup } from "@/components/estimator/steps/step4-backup";
import { Step5Roof } from "@/components/estimator/steps/step5-roof";
import { Step6Structure } from "@/components/estimator/steps/step6-structure";
import { Step7Priority } from "@/components/estimator/steps/step7-priority";
import { Step8NetMetering } from "@/components/estimator/steps/step8-net-metering";
import { BuildingAnimation } from "@/components/estimator/building-animation";
import { ResultCard } from "@/components/estimator/result-card";
import { computeEstimate } from "@/lib/pricing/engine";
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
  computing: false,
  result: null,
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
      // transition to computing when the last step advances
      if (state.currentStep >= state.totalSteps) {
        return { ...state, computing: true };
      }
      return { ...state, currentStep: state.currentStep + 1 };
    case "SET_RESULT":
      return { ...state, computing: false, result: action.result };
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

// ongrid:         1=bill 2=goal 3=type 4=roof 5=structure 6=priority 7=netMetering
// hybrid/offgrid: 1=bill 2=goal 3=type 4=backup 5=roof 6=structure 7=priority 8=netMetering
function renderStep(
  state: WizardState,
  onNext: (payload: Partial<WizardAnswers>) => void,
) {
  const { currentStep, answers } = state;
  const isOnGrid = answers.systemType === "ongrid";

  if (currentStep === 1)
    return <Step1BillConfirm answers={answers} onNext={onNext} />;
  if (currentStep === 2) return <Step2Goal answers={answers} onNext={onNext} />;
  if (currentStep === 3)
    return <Step3SystemType answers={answers} onNext={onNext} />;
  if (currentStep === 4) {
    return isOnGrid ? (
      <Step5Roof answers={answers} onNext={onNext} />
    ) : (
      <Step4Backup answers={answers} onNext={onNext} />
    );
  }
  if (currentStep === 5) {
    return isOnGrid ? (
      <Step6Structure answers={answers} onNext={onNext} />
    ) : (
      <Step5Roof answers={answers} onNext={onNext} />
    );
  }
  if (currentStep === 6) {
    return isOnGrid ? (
      <Step7Priority answers={answers} onNext={onNext} />
    ) : (
      <Step6Structure answers={answers} onNext={onNext} />
    );
  }
  if (currentStep === 7) {
    return isOnGrid ? (
      <Step8NetMetering answers={answers} onNext={onNext} />
    ) : (
      <Step7Priority answers={answers} onNext={onNext} />
    );
  }
  if (currentStep === 8)
    return <Step8NetMetering answers={answers} onNext={onNext} />;

  return null;
}

export function Wizard({ children }: WizardProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleEntry = useCallback(
    (method: EntryMethod) => dispatch({ type: "START", entryMethod: method }),
    [],
  );

  const handleNext = useCallback((payload: Partial<WizardAnswers>) => {
    if (Object.keys(payload).length > 0) {
      dispatch({ type: "SET_ANSWER", payload });
    }
    dispatch({ type: "NEXT_STEP" });
  }, []);

  const handleReset = useCallback(() => dispatch({ type: "RESET" }), []);

  // Run the pricing engine after the animation delay
  useEffect(() => {
    if (!state.computing) return;
    const timer = setTimeout(() => {
      const result = computeEstimate(state.answers);
      try {
        sessionStorage.setItem(`estimate-${result.ref}`, JSON.stringify(result));
      } catch {
        // sessionStorage unavailable — detail page will show fallback
      }
      dispatch({ type: "SET_RESULT", result });
    }, 2200);
    return () => clearTimeout(timer);
  }, [state.computing, state.answers]);

  const goBack = useCallback(() => {
    if (state.currentStep <= 1) dispatch({ type: "RESET" });
    else dispatch({ type: "GO_TO_STEP", step: state.currentStep - 1 });
  }, [state.currentStep]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
      {/* Main column */}
      <div className="min-w-0">
        {/* Progress + back — hidden during computing/result */}
        {state.started && !state.computing && !state.result && (
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
          {state.computing ? (
            <BuildingAnimation />
          ) : state.result ? (
            <ResultCard result={state.result} onReset={handleReset} />
          ) : !state.started ? (
            <EntryScreen onSelect={handleEntry} />
          ) : (
            renderStep(state, handleNext)
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
