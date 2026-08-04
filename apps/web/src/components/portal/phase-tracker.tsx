"use client";

import { useState } from "react";
import {
  CheckCircle2,
  ChevronDown,
  Circle,
  Clock,
  Loader2,
  MinusCircle,
  XCircle,
} from "lucide-react";
import { cn } from "@wahab/utils";

export interface PhaseTask {
  id: string;
  label: string;
  status: "pending" | "in_progress" | "completed" | "skipped" | "blocked";
  owner?: string;
  date?: string;
}

export interface ProjectPhase {
  id: string;
  label: string;
  status: "pending" | "active" | "completed";
  tasks: PhaseTask[];
}

const TASK_ICON: Record<PhaseTask["status"], React.ReactNode> = {
  completed: <CheckCircle2 className="h-4 w-4 text-emerald-400" />,
  in_progress: <Loader2 className="h-4 w-4 animate-spin text-amber" />,
  pending: <Circle className="h-4 w-4 text-slate-600" />,
  skipped: <MinusCircle className="h-4 w-4 text-slate-500" />,
  blocked: <XCircle className="h-4 w-4 text-red-400" />,
};

interface PhaseTrackerProps {
  phases: ProjectPhase[];
}

export function PhaseTracker({ phases }: PhaseTrackerProps) {
  const activeIndex = phases.findIndex((p) => p.status === "active");
  const [openIndex, setOpenIndex] = useState<number>(
    activeIndex >= 0 ? activeIndex : 0,
  );

  return (
    <div className="glass rounded-2xl overflow-hidden">
      {phases.map((phase, i) => {
        const isOpen = openIndex === i;
        const completedTasks = phase.tasks.filter(
          (t) => t.status === "completed",
        ).length;
        const totalTasks = phase.tasks.filter(
          (t) => t.status !== "skipped",
        ).length;

        return (
          <div
            key={phase.id}
            className={cn("border-b border-white/6", i === phases.length - 1 && "border-b-0")}
          >
            {/* Phase header */}
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              className={cn(
                "focus-ring flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-white/4",
                isOpen && "bg-white/4",
              )}
            >
              {/* Status indicator */}
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-bold",
                  phase.status === "completed" &&
                    "bg-emerald-500/15 text-emerald-400",
                  phase.status === "active" && "bg-amber/15 text-amber",
                  phase.status === "pending" && "bg-white/5 text-slate-500",
                )}
              >
                {phase.status === "completed" ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  i + 1
                )}
              </span>

              <div className="min-w-0 flex-1">
                <div
                  className={cn(
                    "text-[14px] font-semibold",
                    phase.status === "completed" && "text-slate-300",
                    phase.status === "active" && "text-white",
                    phase.status === "pending" && "text-slate-500",
                  )}
                >
                  {phase.label}
                </div>
                {/* Progress text */}
                <div className="mt-0.5 text-[12px] text-slate-500">
                  {phase.status === "completed"
                    ? "Completed"
                    : phase.status === "active"
                      ? `${completedTasks} of ${totalTasks} tasks done`
                      : "Not started"}
                </div>
              </div>

              {/* Connector bar fill */}
              {phase.status !== "pending" && (
                <div className="hidden w-16 shrink-0 sm:block">
                  <div className="h-1 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-linear-to-r from-gold to-amber transition-all duration-600"
                      style={{
                        width:
                          phase.status === "completed"
                            ? "100%"
                            : `${Math.round((completedTasks / totalTasks) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200",
                  isOpen && "rotate-180",
                )}
              />
            </button>

            {/* Task list — expanded */}
            {isOpen && (
              <div className="border-t border-white/6 bg-white/1.5 px-5 py-3">
                <ul className="flex flex-col gap-3">
                  {phase.tasks.map((task) => (
                    <li key={task.id} className="flex items-start gap-3">
                      <span className="mt-0.5 shrink-0">
                        {TASK_ICON[task.status]}
                      </span>
                      <div className="min-w-0 flex-1">
                        <span
                          className={cn(
                            "text-[13px]",
                            task.status === "completed"
                              ? "text-slate-400 line-through"
                              : task.status === "pending" ||
                                  task.status === "skipped"
                                ? "text-slate-500"
                                : "text-white",
                          )}
                        >
                          {task.label}
                        </span>
                        {(task.owner || task.date) && (
                          <div className="mt-0.5 flex items-center gap-2 text-[11px] text-slate-600">
                            {task.owner && <span>{task.owner}</span>}
                            {task.date && (
                              <>
                                {task.owner && <span>·</span>}
                                <Clock className="h-3 w-3" aria-hidden="true" />
                                <span>{task.date}</span>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
