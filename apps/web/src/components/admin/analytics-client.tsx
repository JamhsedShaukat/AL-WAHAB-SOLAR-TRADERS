"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  FunnelChart,
  Funnel,
  LabelList,
} from "recharts";
import { StatCard } from "@/components/admin/stat-card";
import { ChartCard } from "@/components/admin/chart-card";
import { cn } from "@wahab/utils";

const PERIODS = ["Today", "7d", "30d", "90d", "12m"] as const;

const sessions = [
  { d: "Jul 7", v: 210 }, { d: "Jul 10", v: 280 }, { d: "Jul 13", v: 240 },
  { d: "Jul 16", v: 310 }, { d: "Jul 19", v: 360 }, { d: "Jul 22", v: 290 },
  { d: "Jul 25", v: 420 }, { d: "Jul 28", v: 390 }, { d: "Aug 1", v: 460 },
  { d: "Aug 4", v: 510 },
];

const sources = [
  { name: "Organic", value: 42 },
  { name: "Direct", value: 24 },
  { name: "WhatsApp", value: 18 },
  { name: "Referral", value: 10 },
  { name: "Paid", value: 6 },
];

const topPages = [
  { path: "/", views: 1820, avgTime: "1m 42s", bounce: "48%", starts: 312 },
  { path: "/estimate", views: 940, avgTime: "3m 10s", bounce: "22%", starts: 867 },
  { path: "/about", views: 540, avgTime: "2m 05s", bounce: "54%", starts: 14 },
  { path: "/faq", views: 310, avgTime: "1m 55s", bounce: "60%", starts: 8 },
  { path: "/contact", views: 270, avgTime: "1m 20s", bounce: "66%", starts: 0 },
];

const funnel = [
  { name: "Visitors", value: 4820 },
  { name: "Estimator started", value: 1180 },
  { name: "Estimator completed", value: 730 },
  { name: "Account created", value: 480 },
  { name: "Estimate saved", value: 290 },
  { name: "Survey requested", value: 88 },
  { name: "Project signed", value: 41 },
];

const COLORS = ["#FFB800", "#00E5FF", "#a78bfa", "#34d399", "#f87171", "#fb923c"];

export function AnalyticsClient() {
  const [period, setPeriod] = useState<string>("30d");

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Website analytics</h1>
          <p className="mt-1 text-[13px] text-slate-500">First-party session data</p>
        </div>
        <div className="flex gap-1 rounded-xl bg-white/5 p-1">
          {PERIODS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPeriod(p)}
              className={cn("rounded-lg px-3 py-1.5 text-[12px] font-medium transition-colors", period === p ? "bg-gold text-navy-950" : "text-slate-400 hover:text-white")}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* KPI tiles */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Sessions" value="4,820" delta="+18%" deltaPositive sparkData={sessions.map(s => ({ v: s.v }))} sparkType="area" />
        <StatCard label="Unique visitors" value="3,190" delta="+12%" deltaPositive sparkData={sessions.map(s => ({ v: s.v * 0.66 }))} sparkType="area" />
        <StatCard label="Bounce rate" value="44%" delta="-3%" deltaPositive />
        <StatCard label="Estimator start rate" value="24.5%" delta="+2.1%" deltaPositive />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChartCard title="Sessions over time" chartHeight={220}>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={sessions}>
                <defs>
                  <linearGradient id="gS" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFB800" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#FFB800" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="d" tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#0d1426", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 12, color: "#e2e8f0" }} />
                <Area type="monotone" dataKey="v" stroke="#FFB800" fill="url(#gS)" strokeWidth={2} dot={false} name="Sessions" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <ChartCard title="Traffic sources" chartHeight={220}>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={sources} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" paddingAngle={3}>
                {sources.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "#0d1426", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 12, color: "#e2e8f0" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-x-4 gap-y-1 px-2 pb-1">
            {sources.map((s, i) => (
              <span key={s.name} className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <span className="h-2 w-2 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                {s.name} {s.value}%
              </span>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Estimator funnel */}
      <ChartCard title="Estimator funnel" subtitle="Drop-off at each step" chartHeight={200}>
        <div className="flex flex-col gap-1.5 px-2 py-3">
          {funnel.map((step, i) => {
            const pct = Math.round((step.value / funnel[0].value) * 100);
            return (
              <div key={step.name} className="flex items-center gap-3">
                <span className="w-38 shrink-0 text-[12px] text-slate-400">{step.name}</span>
                <div className="h-5 flex-1 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${pct}%`, background: i === 0 ? "#FFB800" : `rgba(255,184,0,${0.8 - i * 0.1})` }}
                  />
                </div>
                <span className="w-18 shrink-0 text-right text-[12px] text-slate-300">
                  {step.value.toLocaleString()} <span className="text-slate-600">({pct}%)</span>
                </span>
              </div>
            );
          })}
        </div>
      </ChartCard>

      {/* Top pages */}
      <ChartCard title="Top pages">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-white/5 text-left text-[11px] uppercase tracking-wider text-slate-600">
                <th className="pb-2 pr-4">Page</th>
                <th className="pb-2 pr-4 text-right">Views</th>
                <th className="pb-2 pr-4 text-right">Avg time</th>
                <th className="pb-2 pr-4 text-right">Bounce</th>
                <th className="pb-2 text-right">Est. starts</th>
              </tr>
            </thead>
            <tbody>
              {topPages.map((p) => (
                <tr key={p.path} className="border-b border-white/5 last:border-0">
                  <td className="py-2.5 pr-4 font-mono text-[12px] text-slate-300">{p.path}</td>
                  <td className="py-2.5 pr-4 text-right text-slate-300">{p.views.toLocaleString()}</td>
                  <td className="py-2.5 pr-4 text-right text-slate-400">{p.avgTime}</td>
                  <td className="py-2.5 pr-4 text-right text-slate-400">{p.bounce}</td>
                  <td className="py-2.5 text-right text-gold">{p.starts > 0 ? p.starts : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );
}
