import type { LucideIcon } from "lucide-react";

interface KpiTileProps {
  icon: LucideIcon;
  value: number;
  label: string;
}

export function KpiTile({ icon: Icon, value, label }: KpiTileProps) {
  return (
    <div className="glass rounded-2xl p-4">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 text-gold">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <div className="font-display mt-2.5 text-[24px] font-semibold leading-none text-white">
        {value}
      </div>
      <div className="mt-1 text-[12.5px] text-slate-400">{label}</div>
    </div>
  );
}
