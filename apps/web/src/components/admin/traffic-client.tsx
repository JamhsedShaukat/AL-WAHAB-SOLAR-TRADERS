"use client";

import { StatCard } from "@/components/admin/stat-card";
import { ChartCard } from "@/components/admin/chart-card";
import { cn } from "@wahab/utils";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { MapPin, ExternalLink } from "lucide-react";

const sparkline = [
  { v: 12 },
  { v: 18 },
  { v: 15 },
  { v: 24 },
  { v: 20 },
  { v: 31 },
  { v: 27 },
  { v: 38 },
  { v: 34 },
  { v: 42 },
];

const hourlyData = Array.from({ length: 24 }, (_, h) => ({
  hour: `${h}:00`,
  v: Math.round(Math.random() * 60 + (h >= 10 && h <= 22 ? 30 : 5)),
}));

const areas = [
  { name: "Gulberg", sessions: 820, conversions: 38 },
  { name: "DHA", sessions: 740, conversions: 34 },
  { name: "Bahria Town", sessions: 680, conversions: 29 },
  { name: "Cantt", sessions: 520, conversions: 21 },
  { name: "Johar Town", sessions: 490, conversions: 18 },
  { name: "Model Town", sessions: 310, conversions: 12 },
  { name: "Wapda Town", sessions: 280, conversions: 11 },
  { name: "Garden Town", sessions: 240, conversions: 9 },
];

const utmLinks = [
  { name: "WhatsApp Jul Blast", sessions: 380, estimates: 54, projects: 8 },
  { name: "Flyer — June 2026", sessions: 210, estimates: 29, projects: 4 },
  { name: "Facebook Ramzan Ad", sessions: 150, estimates: 18, projects: 2 },
];

export function TrafficClient() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">
          Visitor traffic
        </h1>
        <p className="mt-1 text-[13px] text-slate-500">
          Where your visitors come from and when
        </p>
      </div>

      {/* Live counter */}
      <div className="glass-strong flex items-center gap-4 rounded-2xl px-5 py-4">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
        </span>
        <span className="text-slate-300">
          <span className="font-display text-2xl font-bold text-white">14</span>{" "}
          visitors on the site right now
        </span>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Sessions today"
          value="312"
          delta="+9%"
          deltaPositive
          sparkData={sparkline}
          sparkType="area"
        />
        <StatCard
          label="Avg session"
          value="2m 38s"
          delta="+0:14"
          deltaPositive
        />
        <StatCard
          label="Mobile share"
          value="71%"
          delta="+3%"
          deltaPositive={false}
        />
        <StatCard label="New vs returning" value="68% / 32%" />
      </div>

      {/* Rolling 30-min sparkline + heatmap */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartCard title="Sessions — last 24 hours" chartHeight={200}>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={hourlyData}>
              <defs>
                <linearGradient id="gT" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00E5FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="hour"
                tick={{ fill: "#475569", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                interval={3}
              />
              <YAxis
                tick={{ fill: "#475569", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "#0d1426",
                  border: "1px solid rgba(255,255,255,0.09)",
                  borderRadius: 12,
                  color: "#e2e8f0",
                }}
              />
              <Area
                type="monotone"
                dataKey="v"
                stroke="#00E5FF"
                fill="url(#gT)"
                strokeWidth={2}
                dot={false}
                name="Sessions"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Area breakdown */}
        <ChartCard title="Lahore areas" subtitle="Sessions & conversions">
          <div className="flex flex-col gap-2 py-2">
            {areas.map((a) => (
              <div key={a.name} className="flex items-center gap-3">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-gold" />
                <span className="w-28 shrink-0 text-[12px] text-slate-300">
                  {a.name}
                </span>
                <div className="h-4 flex-1 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-gold/60"
                    style={{ width: `${Math.round(a.sessions / 8.2)}%` }}
                  />
                </div>
                <span className="w-12 shrink-0 text-right text-[12px] text-slate-400">
                  {a.sessions}
                </span>
                <span className="w-8 shrink-0 text-right text-[11px] text-emerald-400">
                  {a.conversions}
                </span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* UTM campaign table */}
      <ChartCard title="UTM campaign performance">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-white/5 text-left text-[11px] uppercase tracking-wider text-slate-600">
                <th className="pb-2 pr-4">Campaign</th>
                <th className="pb-2 pr-4 text-right">Sessions</th>
                <th className="pb-2 pr-4 text-right">Estimates</th>
                <th className="pb-2 text-right">Projects</th>
              </tr>
            </thead>
            <tbody>
              {utmLinks.map((u) => (
                <tr
                  key={u.name}
                  className="border-b border-white/5 last:border-0"
                >
                  <td className="flex items-center gap-1.5 py-2.5 pr-4 text-slate-300">
                    {u.name} <ExternalLink className="h-3 w-3 text-slate-600" />
                  </td>
                  <td className="py-2.5 pr-4 text-right text-slate-300">
                    {u.sessions}
                  </td>
                  <td className="py-2.5 pr-4 text-right text-gold">
                    {u.estimates}
                  </td>
                  <td className="py-2.5 text-right text-emerald-400">
                    {u.projects}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );
}
