import { cn } from "@wahab/utils";
import type { WizardAnswers } from "@/types/estimator";

interface SummaryRailProps {
  answers: WizardAnswers;
  started: boolean;
}

const labels: { key: keyof WizardAnswers; label: string; format?: (v: unknown) => string }[] = [
  { key: "monthlyUnits", label: "Usage", format: (v) => `${v} units/mo` },
  { key: "goal", label: "Goal", format: (v) => goalLabel(v as string) },
  { key: "systemType", label: "System", format: (v) => typeLabel(v as string) },
  { key: "backupHours", label: "Backup", format: (v) => `${v} hours` },
  { key: "roofType", label: "Roof", format: (v) => roofLabel(v as string) },
  { key: "structureQuality", label: "Structure", format: (v) => structureLabel(v as string) },
  { key: "priority", label: "Priority", format: (v) => priorityLabel(v as string) },
  { key: "netMetering", label: "Net metering", format: (v) => (v ? "Yes" : "Not now") },
];

function goalLabel(v: string) {
  const map: Record<string, string> = { cover_all: "Cover whole bill", reduce_bill: "Reduce bill", fit_budget: "Fit a budget" };
  return map[v] ?? v;
}
function typeLabel(v: string) {
  const map: Record<string, string> = { ongrid: "On-grid", hybrid: "Hybrid", offgrid: "Off-grid" };
  return map[v] ?? v;
}
function roofLabel(v: string) {
  const map: Record<string, string> = { rcc: "RCC roof", metal_sheet: "Metal sheet", ground_mount: "Ground mount", carport: "Carport" };
  return map[v] ?? v;
}
function structureLabel(v: string) {
  const map: Record<string, string> = { medium: "Medium (GI)", good: "Good (hot-dip)" };
  return map[v] ?? v;
}
function priorityLabel(v: string) {
  const map: Record<string, string> = { lowest_price: "Lowest price", best_value: "Best value", best_quality: "Best quality" };
  return map[v] ?? v;
}

function estimateSize(answers: WizardAnswers): string | null {
  if (!answers.monthlyUnits || !answers.goal) return null;
  let kwp: number;
  if (answers.goal === "cover_all") kwp = Math.ceil((answers.monthlyUnits / 100) * 2) / 2;
  else if (answers.goal === "reduce_bill") kwp = Math.ceil(((answers.monthlyUnits * 0.65) / 100) * 2) / 2;
  else return null;
  return `${kwp} kW`;
}

function estimateSaving(answers: WizardAnswers): string | null {
  if (!answers.monthlyUnits || !answers.goal) return null;
  const units = answers.goal === "cover_all" ? answers.monthlyUnits : Math.round(answers.monthlyUnits * 0.65);
  const saving = Math.round(48.02 * (units - 50));
  if (saving <= 0) return null;
  return `~PKR ${(saving / 1000).toFixed(0)}k`;
}

export function SummaryRail({ answers, started }: SummaryRailProps) {
  const size = estimateSize(answers);
  const saving = estimateSaving(answers);

  return (
    <aside className="glass-strong rounded-2xl p-5">
      <h3 className="font-display text-[15px] font-semibold text-white">
        Your estimate so far
      </h3>
      <p className="mt-1 text-[12px] text-slate-500">
        Updates as you answer
      </p>

      {!started ? (
        <p className="mt-6 text-[13.5px] leading-relaxed text-slate-400">
          Answer the questions and your tailored solar specs will appear here.
        </p>
      ) : (
        <div className="mt-5 space-y-4">
          {/* Indicative system size */}
          {size && (
            <div>
              <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
                Indicative system
              </div>
              <div className="font-display mt-1 text-[32px] font-semibold leading-none text-gold">
                {size}
              </div>
              {saving && (
                <div className="mt-1 text-[13px] text-slate-400">
                  {saving}/mo saved
                </div>
              )}
            </div>
          )}

          {/* Answered facts */}
          <dl className="space-y-2.5">
            {labels.map((item) => {
              const val = answers[item.key];
              if (val === undefined || val === null) return null;
              return (
                <div key={item.key} className={cn("flex justify-between gap-2 text-[13px]")}>
                  <dt className="text-slate-500">{item.label}</dt>
                  <dd className="text-right font-medium text-slate-300">
                    {item.format ? item.format(val) : String(val)}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      )}

      {/* Footer badge */}
      <div className="mt-6 rounded-xl bg-white/4 px-3 py-2 text-center text-[11px] font-medium text-slate-500">
        Free, no-obligation estimate
      </div>
    </aside>
  );
}
