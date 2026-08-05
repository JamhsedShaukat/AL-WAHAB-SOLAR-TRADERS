import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail, MessageSquare, Phone } from "lucide-react";
import { Badge } from "@wahab/ui";

export const metadata: Metadata = { title: "Project detail" };

const PHASES = [
  { name: "Survey", status: "completed", progress: 100, tasks: 4 },
  {
    name: "Quotation & agreement",
    status: "completed",
    progress: 100,
    tasks: 3,
  },
  { name: "Procurement", status: "completed", progress: 100, tasks: 5 },
  { name: "Installation", status: "active", progress: 60, tasks: 6 },
  { name: "Testing & commissioning", status: "pending", progress: 0, tasks: 5 },
  { name: "Net metering & handover", status: "pending", progress: 0, tasks: 4 },
];

const PAYMENTS = [
  {
    label: "Advance (30%)",
    amount: "₨ 8,52,000",
    due: "28 Jun 2026",
    paid: "28 Jun 2026",
    status: "Paid",
  },
  {
    label: "Mid-point (40%)",
    amount: "₨ 11,36,000",
    due: "15 Jul 2026",
    paid: "16 Jul 2026",
    status: "Paid",
  },
  {
    label: "Completion (30%)",
    amount: "₨ 8,52,000",
    due: "31 Aug 2026",
    paid: "—",
    status: "Pending",
  },
];

const UPDATES = [
  {
    text: "Panels mounted on roof, inverter wall-mounted. Cabling in progress.",
    time: "1 Aug 2026",
  },
  {
    text: "Materials delivered to site. All components verified.",
    time: "28 Jul 2026",
  },
  { text: "Agreement signed. Advance payment received.", time: "28 Jun 2026" },
];

export default function AdminProjectDetailPage({
  params,
}: {
  params: Promise<{ ref: string }>;
}) {
  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/admin/projects"
        className="focus-ring inline-flex items-center gap-2 text-[13px] text-slate-500 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" /> Projects
      </Link>

      {/* Header */}
      <div className="glass rounded-2xl p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[13px] text-slate-500">
                PRJ-2607-0088
              </span>
              <Badge variant="gold">Premium</Badge>
              <span className="text-amber text-[13px]">● Installation</span>
            </div>
            <h1 className="font-display text-xl font-bold text-white">
              12 kWp Hybrid System — DHA Phase 6
            </h1>
            <div className="flex flex-wrap gap-3 text-[13px] text-slate-400">
              <Link href="/admin/users/U-001" className="hover:text-gold">
                Ali Raza
              </Link>
              <span>·</span>
              <a
                href="tel:+923001234567"
                className="flex items-center gap-1 hover:text-white"
              >
                <Phone className="h-3.5 w-3.5" /> +92 300 1234567
              </a>
              <a
                href="mailto:ali@example.com"
                className="flex items-center gap-1 hover:text-white"
              >
                <Mail className="h-3.5 w-3.5" /> Email
              </a>
              <a
                href="https://wa.me/923001234567"
                className="flex items-center gap-1 hover:text-gold"
              >
                <MessageSquare className="h-3.5 w-3.5" /> WhatsApp
              </a>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <p className="text-[12px] text-slate-500">Contract value</p>
            <p className="font-display text-lg font-bold text-gold">
              ₨ 28,40,000
            </p>
            <p className="text-[12px] text-emerald-400">60% complete</p>
          </div>
        </div>

        {/* Overall progress bar */}
        <div className="mt-4">
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-linear-to-r from-gold to-amber"
              style={{ width: "60%" }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Phase tracker */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="glass rounded-2xl p-5">
            <h2 className="mb-4 font-display text-[15px] font-semibold text-white">
              Phases & tasks
            </h2>
            <div className="flex flex-col gap-3">
              {PHASES.map((ph) => (
                <div
                  key={ph.name}
                  className="flex flex-col gap-2 rounded-xl bg-white/3 p-4"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[13px] font-medium ${ph.status === "completed" ? "text-emerald-400" : ph.status === "active" ? "text-gold" : "text-slate-500"}`}
                    >
                      {ph.status === "completed"
                        ? "✓ "
                        : ph.status === "active"
                          ? "● "
                          : "○ "}
                      {ph.name}
                    </span>
                    <span className="text-[11px] text-slate-600">
                      {ph.tasks} tasks · {ph.progress}%
                    </span>
                  </div>
                  {ph.status !== "pending" && (
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div
                        className={`h-full rounded-full ${ph.status === "completed" ? "bg-emerald-400" : "bg-gold"}`}
                        style={{ width: `${ph.progress}%` }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Customer updates */}
          <div className="glass rounded-2xl p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-[15px] font-semibold text-white">
                Customer updates
              </h2>
              <button
                type="button"
                className="focus-ring rounded-xl bg-gold/10 px-3 py-1.5 text-[12px] font-medium text-gold hover:bg-gold/20"
              >
                + Post update
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {UPDATES.map((u, i) => (
                <div
                  key={i}
                  className="border-b border-white/5 pb-3 last:border-0 last:pb-0"
                >
                  <p className="text-[13px] text-slate-300">{u.text}</p>
                  <p className="mt-1 text-[11px] text-slate-600">{u.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: payments + team + docs */}
        <div className="flex flex-col gap-4">
          <div className="glass rounded-2xl p-5">
            <h2 className="mb-4 font-display text-[14px] font-semibold text-white">
              Payments
            </h2>
            <div className="mb-3 flex items-center justify-between text-[12px]">
              <span className="text-slate-500">Collected</span>
              <span className="font-medium text-white">
                ₨ 19,88,000 / ₨ 28,40,000
              </span>
            </div>
            <div className="mb-4 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-emerald-400"
                style={{ width: "70%" }}
              />
            </div>
            <div className="flex flex-col gap-2">
              {PAYMENTS.map((p) => (
                <div
                  key={p.label}
                  className="flex items-center justify-between gap-2 rounded-lg bg-white/3 px-3 py-2 text-[12px]"
                >
                  <div>
                    <p className="text-slate-300">{p.label}</p>
                    <p className="text-slate-600">Due: {p.due}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-white">{p.amount}</p>
                    <p
                      className={
                        p.status === "Paid" ? "text-emerald-400" : "text-amber"
                      }
                    >
                      {p.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="focus-ring mt-3 w-full rounded-xl border border-white/10 bg-white/5 py-2 text-[13px] text-slate-400 hover:bg-white/8 hover:text-white"
            >
              Record payment
            </button>
          </div>

          <div className="glass rounded-2xl p-5">
            <h2 className="mb-3 font-display text-[14px] font-semibold text-white">
              Team
            </h2>
            <div className="flex flex-col gap-2 text-[13px]">
              <div className="flex justify-between">
                <span className="text-slate-500">Sales owner</span>
                <span className="text-slate-300">Bilal Chaudhry</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Crew lead</span>
                <span className="text-slate-300">Usman Tariq</span>
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl p-5">
            <h2 className="mb-3 font-display text-[14px] font-semibold text-white">
              System specs
            </h2>
            <dl className="flex flex-col gap-2 text-[13px]">
              {[
                ["Size", "12 kWp"],
                ["Type", "Hybrid"],
                ["Panels", "22 × 545 W JA Solar"],
                ["Inverter", "8 kW Solis"],
                ["Battery", "15 kWh Dyness"],
                ["Structure", "GI, Tier A"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3">
                  <dt className="text-slate-500">{k}</dt>
                  <dd className="text-right text-slate-300">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
