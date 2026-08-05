"use client";

import type { ReactNode } from "react";
import { cn } from "@wahab/utils";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  /** Height of the chart area in px (default 240) */
  chartHeight?: number;
}

export function ChartCard({
  title,
  subtitle,
  action,
  children,
  className,
  chartHeight = 240,
}: ChartCardProps) {
  return (
    <div className={cn("glass rounded-2xl p-5", className)}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-[15px] font-semibold text-white">
            {title}
          </p>
          {subtitle && (
            <p className="mt-0.5 text-[12px] text-slate-500">{subtitle}</p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      <div style={{ height: chartHeight }}>{children}</div>
    </div>
  );
}
