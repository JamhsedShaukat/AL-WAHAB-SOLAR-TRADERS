interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[13px] font-medium text-slate-400">
        Step {current} of {total}
      </span>
      <div className="h-1 flex-1 rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-linear-to-r from-gold to-amber transition-all duration-500"
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>
    </div>
  );
}
