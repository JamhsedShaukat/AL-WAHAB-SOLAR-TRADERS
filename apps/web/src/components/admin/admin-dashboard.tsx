"use client";

import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  Clock,
  FileText,
  FolderKanban,
  Globe,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { StatCard } from "@/components/admin/stat-card";
import { ChartCard } from "@/components/admin/chart-card";

// ─── Mock sparklines ───────────────────────────────────────────────
const mk = (base: number, len = 30) =>
  Array.from({ length: len }, (_, i) => ({
    v: Math.round(base + Math.sin(i / 3) * base * 0.15 + Math.random() * base * 0.1),
  }));

const SIGNUPS_DATA = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}`,
  estimates: Math.round(8 + Math.random() * 6),
  signups: Math.round(3 + Math.random() * 4),
}));

const REVENUE_DATA = [
  { month: "Jan", booked: 2800000, collected: 2200000, target: 3000000 },
  { month: "Feb", booked: 3100000, collected: 2600000, target: 3000000 },
  { month: "Mar", booked: 2700000, collected: 2400000, target: 3200000 },
  { month: "Apr", booked: 3500000, collected: 3000000, target: 3200000 },
  { month: "May", booked: 4200000, collected: 3500000, target: 3500000 },
  { month: "Jun", booked: 3900000, collected: 3200000, target: 3500000 },
  { month: "Jul", booked: 4600000, collected: 3800000, target: 4000000 },
];

const SYSTEM_MIX = [
  { name: "On-grid", value: 44 },
  { name: "Hybrid", value: 41 },
  { name: "Off-grid", value: 15 },
];
const MIX_COLORS = ["#FFB800", "#00E5FF", "#FF8C00"];

const TOP_AREAS = [
  { area: "DHA Phase 6", count: 48 },
  { area: "Gulberg III", count: 35 },
  { area: "Bahria Town", count: 31 },
  { area: "Model Town", count: 24 },
  { area: "Johar Town", count: 21 },
  { area: "Cantt", count: 18 },
  { area: "Garden Town", count: 15 },
  { area: "Shadman", count: 12 },
];

const FUNNEL_DATA = [
  { step: "Visitors", n: 9200, pct: 100 },
  { step: "Estimator started", n: 3280, pct: 35.7 },
  { step: "Estimator completed", n: 1640, pct: 17.8 },
  { step: "Account created", n: 820, pct: 8.9 },
  { step: "Estimate saved", n: 640, pct: 7.0 },
  { step: "Survey requested", n: 240, pct: 2.6 },
  { step: "Project signed", n: 128, pct: 1.4 },
];

const NEEDS_ATTENTION = [
  { id: 1, color: "gold", text: "3 survey requests unassigned for > 24 h", href: "/admin/projects?filter=unassigned" },
  { id: 2, color: "gold", text: "7 estimates expiring within 3 days", href: "/admin/estimates?filter=expiring" },
  { id: 3, color: "amber", text: "2 projects with no update in 14 days", href: "/admin/projects?filter=stale" },
  { id: 4, color: "red", text: "4 overdue payments", href: "/admin/projects?filter=overdue_payment" },
  { id: 5, color: "cyan", text: "5 reviews awaiting moderation", href: "/admin/reviews" },
];

const COLOR_MAP: Record<string, string> = {
  gold: "border-gold/30 bg-gold/8 text-gold",
  amber: "border-amber/30 bg-amber/8 text-amber",
  red: "border-red-500/30 bg-red-500/8 text-red-400",
  cyan: "border-cyan/30 bg-cyan/8 text-cyan",
};

const RECENT_ACTIVITY = [
  { id: 1, actor: "Ali Raza", action: "completed an 8 kWp Hybrid estimate", time: "2 min ago" },
  { id: 2, actor: "Fatima Malik", action: "requested a site survey", time: "14 min ago" },
  { id: 3, actor: "Admin", action: "advanced Installation to Testing & Commissioning", time: "1 hr ago" },
  { id: 4, actor: "Hassan Iqbal", action: "submitted a 5-star review", time: "2 hr ago" },
  { id: 5, actor: "System", action: "sent expiry reminder to 7 customers", time: "3 hr ago" },
];

export function AdminDashboardClient() {
  return (
    <div className="flex flex-col gap-8">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Dashboard</h1>
          <p className="mt-1 text-[13px] text-slate-500">
            Business health at a glance — 30-day window
          </p>
        </div>
        <select className="focus-ring rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[13px] text-slate-400">
          {["Today", "7 days", "30 days", "90 days", "12 months"].map((l) => (
            <option key={l} value={l} className="bg-navy-950">
              {l}
            </option>
          ))}
        </select>
      </div>

      {/* 8 KPI tiles */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Total users"
          value="1,284"
          delta="+12.4%"
          deltaPositive
          sparkData={mk(40)}
          sparkType="area"
        />
        <StatCard
          label="Active users"
          value="384"
          delta="+8.1%"
          deltaPositive
          sparkData={mk(12)}
        />
        <StatCard
          label="Saved estimates"
          value="640"
          delta="+22.3%"
          deltaPositive
          sparkData={mk(20)}
        />
        <StatCard
          label="Estimate pipeline"
          value="₨ 12.4 cr"
          delta="+5.7%"
          deltaPositive
          sparkData={mk(400000)}
        />
        <StatCard
          label="Live projects"
          value="38"
          delta="+3 this month"
          deltaPositive
          sparkData={mk(38, 12)}
          sparkType="bar"
        />
        <StatCard
          label="Revenue booked"
          value="₨ 28.6 cr"
          delta="+18.9%"
          deltaPositive
          sparkData={mk(2800000, 12)}
          sparkType="bar"
        />
        <StatCard
          label="Revenue collected"
          value="₨ 22.7 cr"
          delta="₨ 5.9 cr outstanding"
          deltaPositive={false}
        />
        <StatCard
          label="Website visitors"
          value="9,200"
          delta="+34.2%"
          deltaPositive
          sparkData={mk(300)}
        />
      </div>

      {/* Charts — 2 columns on lg */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Estimates & signups over time */}
        <ChartCard
          title="Estimates & signups over time"
          subtitle="Last 30 days — daily"
          chartHeight={220}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={SIGNUPS_DATA} margin={{ top: 4, right: 0, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="gEst" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFB800" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#FFB800" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gSig" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#00E5FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#64748b" }} interval={4} />
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
              <Tooltip
                contentStyle={{ background: "#0A0F1E", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 12 }}
                labelStyle={{ color: "#e7ecf5" }}
              />
              <Area type="monotone" dataKey="estimates" stroke="#FFB800" strokeWidth={2} fill="url(#gEst)" name="Estimates" />
              <Area type="monotone" dataKey="signups" stroke="#00E5FF" strokeWidth={2} fill="url(#gSig)" name="Signups" />
              <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Revenue by month */}
        <ChartCard
          title="Revenue by month"
          subtitle="Booked vs collected vs target"
          chartHeight={220}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={REVENUE_DATA} margin={{ top: 4, right: 0, bottom: 0, left: -20 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} />
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
              <Tooltip
                contentStyle={{ background: "#0A0F1E", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 12 }}
                formatter={(v) => `₨ ${((v as number) / 1000000).toFixed(2)} cr`}
              />
              <Bar dataKey="booked" name="Booked" fill="#FFB800" opacity={0.85} radius={[3, 3, 0, 0]} />
              <Bar dataKey="collected" name="Collected" fill="#00E5FF" opacity={0.75} radius={[3, 3, 0, 0]} />
              <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* System mix donut */}
        <ChartCard title="System mix" subtitle="By type" chartHeight={220}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={SYSTEM_MIX}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
              >
                {SYSTEM_MIX.map((_, i) => (
                  <Cell key={i} fill={MIX_COLORS[i]} opacity={0.9} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: "#0A0F1E", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 12 }}
                formatter={(v) => `${v}%`}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Top areas */}
        <ChartCard title="Top areas" subtitle="By estimate count" chartHeight={220}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={TOP_AREAS} layout="vertical" margin={{ top: 0, right: 0, bottom: 0, left: 70 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: "#64748b" }} />
              <YAxis type="category" dataKey="area" tick={{ fontSize: 11, fill: "#94a3b8" }} width={70} />
              <Tooltip
                contentStyle={{ background: "#0A0F1E", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 12 }}
              />
              <Bar dataKey="count" fill="#FFB800" opacity={0.85} radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Conversion funnel */}
        <ChartCard title="Conversion funnel" subtitle="Visitors → completed project" chartHeight={220}>
          <div className="flex h-full flex-col justify-between gap-1.5 py-1">
            {FUNNEL_DATA.map((s, i) => (
              <div key={s.step} className="flex items-center gap-3">
                <span className="w-36 shrink-0 text-right text-[11px] text-slate-500">{s.step}</span>
                <div className="relative flex-1 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-5 rounded-full bg-linear-to-r from-gold/80 to-gold/50 transition-all"
                    style={{ width: `${s.pct}%` }}
                  />
                </div>
                <span className="w-12 shrink-0 text-[11px] text-slate-400">{s.pct}%</span>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Avg size & value (dual-axis line placeholder) */}
        <ChartCard title="Average system size & value" subtitle="30-day rolling" chartHeight={220}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={SIGNUPS_DATA.map((d, i) => ({ ...d, size: 7 + i * 0.05, value: 1800000 + i * 15000 }))} margin={{ top: 4, right: 20, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="gSz" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF8C00" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#FF8C00" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#64748b" }} interval={4} />
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
              <Tooltip
                contentStyle={{ background: "#0A0F1E", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 12 }}
              />
              <Area type="monotone" dataKey="size" stroke="#FF8C00" strokeWidth={2} fill="url(#gSz)" name="Avg size (kWp)" />
              <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Lower row: recent activity + needs attention + live now */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent activity */}
        <div className="glass rounded-2xl p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <p className="font-display text-[15px] font-semibold text-white">
              Recent activity
            </p>
            <Link
              href="/admin/activity"
              className="text-[12px] text-gold transition-colors hover:text-amber"
            >
              View all →
            </Link>
          </div>
          <div className="flex flex-col gap-0">
            {RECENT_ACTIVITY.map((a, i) => (
              <div
                key={a.id}
                className="flex items-start gap-3 border-b border-white/5 py-3 last:border-0"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/8 text-[11px] font-bold text-slate-400">
                  {a.actor.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 text-[13px]">
                  <span className="font-medium text-slate-200">{a.actor}</span>
                  <span className="text-slate-400"> {a.action}</span>
                </div>
                <span className="shrink-0 text-[11px] text-slate-600">{a.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Needs attention */}
        <div className="glass rounded-2xl p-5">
          <div className="mb-4 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-gold" aria-hidden="true" />
            <p className="font-display text-[15px] font-semibold text-white">
              Needs attention
            </p>
          </div>
          <div className="flex flex-col gap-2.5">
            {NEEDS_ATTENTION.map((n) => (
              <Link
                key={n.id}
                href={n.href}
                className={`focus-ring flex items-start gap-2.5 rounded-xl border p-3 transition-opacity hover:opacity-80 ${COLOR_MAP[n.color]}`}
              >
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="text-[12px] font-medium leading-snug">{n.text}</span>
              </Link>
            ))}
          </div>

          {/* Live now */}
          <div className="mt-5 border-t border-white/8 pt-4">
            <div className="mb-2 flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <p className="text-[13px] font-semibold text-white">Live now</p>
            </div>
            <p className="text-[24px] font-bold text-emerald-400">14</p>
            <p className="text-[12px] text-slate-500">visitors on site right now</p>
            <div className="mt-2 flex flex-col gap-1 text-[11px] text-slate-500">
              <span>8 on homepage</span>
              <span>4 in estimator</span>
              <span>2 on /about</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
