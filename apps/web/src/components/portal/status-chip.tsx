import {
  AlertCircle,
  Bookmark,
  CalendarCheck,
  CalendarClock,
  CircleCheckBig,
  FileText,
  Hammer,
} from "lucide-react";
import { cn } from "@wahab/utils";

export type CardStatus =
  | "estimate_saved"
  | "survey_requested"
  | "survey_scheduled"
  | "quotation_issued"
  | "in_progress"
  | "completed"
  | "expired";

const CONFIG: Record<
  CardStatus,
  { label: string; Icon: React.ElementType; className: string }
> = {
  estimate_saved: {
    label: "Estimate saved",
    Icon: Bookmark,
    className: "bg-white/[0.06] text-slate-300",
  },
  survey_requested: {
    label: "Survey requested",
    Icon: CalendarClock,
    className: "bg-blue-500/10 text-blue-300",
  },
  survey_scheduled: {
    label: "Survey scheduled",
    Icon: CalendarCheck,
    className: "bg-blue-500/15 text-blue-200",
  },
  quotation_issued: {
    label: "Quotation issued",
    Icon: FileText,
    className: "bg-amber/10 text-amber",
  },
  in_progress: {
    label: "In progress",
    Icon: Hammer,
    className: "bg-amber/10 text-amber",
  },
  completed: {
    label: "Completed",
    Icon: CircleCheckBig,
    className: "bg-emerald-500/12 text-emerald-400",
  },
  expired: {
    label: "Expired",
    Icon: AlertCircle,
    className: "bg-red-500/10 text-red-400",
  },
};

interface StatusChipProps {
  status: CardStatus;
  className?: string;
}

export function StatusChip({ status, className }: StatusChipProps) {
  const { label, Icon, className: chipClass } = CONFIG[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold",
        chipClass,
        className,
      )}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {label}
    </span>
  );
}
