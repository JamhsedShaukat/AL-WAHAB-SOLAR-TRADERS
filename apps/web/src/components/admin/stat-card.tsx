"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { cn } from "@wahab/utils";

type SparklineType = "area" | "bar";

interface StatCardProps {
  label: string;
  value: string;
  delta?: string;
  deltaPositive?: boolean;
  sparkData?: { v: number }[];
  sparkType?: SparklineType;
  className?: string;
}

export function StatCard({
  label,
  value,
  delta,
  deltaPositive,
  sparkData,
  sparkType = "area",
  className,
}: StatCardProps) {
  return (
    <div className={cn("glass rounded-2xl p-5", className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          <p className="text-[12px] font-semibold uppercase tracking-wider text-slate-500">
            {label}
          </p>
          <p className="font-display text-2xl font-bold text-white">{value}</p>
          {delta && (
            <span
              className={cn(
                "inline-flex items-center gap-1 text-[12px] font-medium",
                deltaPositive ? "text-emerald-400" : "text-red-400",
              )}
            >
              {deltaPositive ? (
                <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              {delta} vs last period
            </span>
          )}
        </div>

        {sparkData && sparkData.length > 0 && (
          <div className="h-14 w-24 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              {sparkType === "bar" ? (
                <BarChart
                  data={sparkData}
                  margin={{ top: 2, right: 0, bottom: 0, left: 0 }}
                >
                  <Bar
                    dataKey="v"
                    fill="#FFB800"
                    radius={[2, 2, 0, 0]}
                    opacity={0.8}
                  />
                </BarChart>
              ) : (
                <AreaChart
                  data={sparkData}
                  margin={{ top: 2, right: 0, bottom: 0, left: 0 }}
                >
                  <defs>
                    <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FFB800" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#FFB800" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke="#FFB800"
                    strokeWidth={1.5}
                    fill="url(#sg)"
                    dot={false}
                  />
                  <Tooltip contentStyle={{ display: "none" }} cursor={false} />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
