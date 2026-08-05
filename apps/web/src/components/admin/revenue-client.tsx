"use client";

import { StatCard } from "@/components/admin/stat-card";
import { ChartCard } from "@/components/admin/chart-card";
import { ExportMenu } from "@/components/admin/export-menu";
import {
  BarChart, Bar, AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Legend, ReferenceLine,
} from "recharts";

const monthly = [
  { m: "Sep", booked: 2400000, collected: 1800000, target: 3000000 },
  { m: "Oct", booked: 3100000, collected: 2600000, target: 3000000 },
  { m: "Nov", booked: 2800000, collected: 2200000, target: 3000000 },
  { m: "Dec", booked: 3400000, collected: 2900000, target: 3000000 },
  { m: "Jan", booked: 2200000, collected: 1700000, target: 3500000 },
  { m: "Feb", booked: 2900000, collected: 2400000, target: 3500000 },
  { m: "Mar", booked: 3800000, collected: 3100000, target: 3500000 },
  { m: "Apr", booked: 4200000, collected: 3500000, target: 4000000 },
  { m: "May", booked: 3600000, collected: 2800000, target: 4000000 },
  { m: "Jun", booked: 4800000, collected: 3900000, target: 4000000 },
  { m: "Jul", booked: 5100000, collected: 4100000, target: 4500000 },
  { m: "Aug", booked: 2200000, collected: 800000, target: 4500000 },
];

const topProjects = [
  { ref: "PRJ-2607-0088", customer: "Ali Raza", value: "₨ 18,50,000", status: "Installation" },
  { ref: "PRJ-2607-0071", customer: "Hassan Iqbal", value: "₨ 14,20,000", status: "Completed" },
  { ref: "PRJ-2607-0055", customer: "Ayesha Khan", value: "₨ 12,80,000", status: "Commissioning" },
  { ref: "PRJ-2607-0049", customer: "Imran Sheikh", value: "₨ 11,40,000", status: "Completed" },
  { ref: "PRJ-2607-0041", customer: "Sara Malik", value: "₨ 9,60,000", status: "Quotation" },
];

const fmt = (n: number) => `₨ ${(n / 1000000).toFixed(1)}M`;

export function RevenueClient() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Revenue</h1>
          <p className="mt-1 text-[13px] text-slate-500">Booked · Invoiced · Collected · Outstanding</p>
        </div>
        <ExportMenu onExportCsv={() => {}} onExportPdf={() => {}} />
      </div>

      {/* Definitions strip */}
      <div className="glass rounded-2xl px-4 py-3 text-[12px] text-slate-500">
        <span className="text-slate-400 font-medium">Definitions — </span>
        <span className="mr-4"><span className="text-gold">Pipeline</span> = open estimate mid-values · </span>
        <span className="mr-4"><span className="text-cyan">Booked</span> = contract signed · </span>
        <span className="mr-4"><span className="text-violet-400">Collected</span> = cash received · </span>
        <span><span className="text-red-400">Outstanding</span> = invoiced − collected</span>
      </div>

      {/* KPI tiles */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Pipeline" value="₨ 2.8Cr" delta="+11%" deltaPositive />
        <StatCard label="Booked (YTD)" value="₨ 3.46Cr" delta="+24%" deltaPositive sparkData={monthly.slice(-8).map(m => ({ v: m.booked / 100000 }))} sparkType="bar" />
        <StatCard label="Collected (YTD)" value="₨ 2.71Cr" delta="+19%" deltaPositive sparkData={monthly.slice(-8).map(m => ({ v: m.collected / 100000 }))} sparkType="bar" />
        <StatCard label="Outstanding" value="₨ 75L" delta="-5%" deltaPositive />
      </div>

      {/* Monthly chart */}
      <ChartCard title="Booked vs collected vs target (12 months)" chartHeight={260}>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={monthly} barCategoryGap="30%">
            <XAxis dataKey="m" tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={(v) => `${v / 1000000}M`} tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip formatter={(v) => fmt(v as number)} contentStyle={{ background: "#0d1426", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 12, color: "#e2e8f0" }} />
            <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} />
            <Bar dataKey="booked" name="Booked" fill="#FFB800" radius={[4, 4, 0, 0]} />
            <Bar dataKey="collected" name="Collected" fill="#7c3aed" radius={[4, 4, 0, 0]} />
            <ReferenceLine y={4000000} stroke="#00E5FF" strokeDasharray="4 4" label={{ value: "Target", fill: "#00E5FF", fontSize: 11 }} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Top projects table */}
      <ChartCard title="Top projects by value">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-white/5 text-left text-[11px] uppercase tracking-wider text-slate-600">
                <th className="pb-2 pr-4">Ref</th>
                <th className="pb-2 pr-4">Customer</th>
                <th className="pb-2 pr-4 text-right">Contract value</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {topProjects.map((p) => (
                <tr key={p.ref} className="border-b border-white/5 last:border-0">
                  <td className="py-2.5 pr-4 font-mono text-[12px] text-gold">{p.ref}</td>
                  <td className="py-2.5 pr-4 text-slate-300">{p.customer}</td>
                  <td className="py-2.5 pr-4 text-right font-medium text-white">{p.value}</td>
                  <td className="py-2.5 text-[12px] text-slate-400">{p.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );
}
