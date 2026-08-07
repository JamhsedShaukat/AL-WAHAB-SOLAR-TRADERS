import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  FileText,
  MessageCircle,
  Phone,
  Zap,
} from "lucide-react";
import { StatusChip, type CardStatus } from "@/components/portal/status-chip";
import {
  PhaseTracker,
  type ProjectPhase,
} from "@/components/portal/phase-tracker";

export const metadata: Metadata = {
  title: "Project detail",
};

// Mock data — wired to real API in Phase 5
const PROJECT = {
  ref: "PRJ-2607-0088",
  title: "12 kWp Hybrid — DHA Phase 6",
  status: "in_progress" as CardStatus,
  contractValuePkr: 3100000,
  progressPct: 60,
  systemSizeKwp: 12,
  systemType: "Hybrid",
  tier: "Premium",
  panelCount: 24,
  panelWatt: 500,
  inverterKw: 12,
  batteryKwh: 10,
  area: "DHA Phase 6, Lahore",
};

const PHASES: ProjectPhase[] = [
  {
    id: "p1",
    label: "Site Survey & Design",
    status: "completed",
    tasks: [
      {
        id: "t1",
        label: "Site visit",
        status: "completed",
        owner: "Usman Khalid",
        date: "15 Jul 2026",
      },
      {
        id: "t2",
        label: "Roof inspection",
        status: "completed",
        owner: "Usman Khalid",
        date: "15 Jul 2026",
      },
      {
        id: "t3",
        label: "Load assessment",
        status: "completed",
        owner: "Usman Khalid",
        date: "15 Jul 2026",
      },
      {
        id: "t4",
        label: "Final system design",
        status: "completed",
        owner: "Engineering",
        date: "17 Jul 2026",
      },
      {
        id: "t5",
        label: "Customer approval",
        status: "completed",
        owner: "Ali Raza",
        date: "18 Jul 2026",
      },
    ],
  },
  {
    id: "p2",
    label: "Agreement & Procurement",
    status: "completed",
    tasks: [
      {
        id: "t6",
        label: "Agreement signing",
        status: "completed",
        owner: "Ali Raza",
        date: "19 Jul 2026",
      },
      {
        id: "t7",
        label: "Advance payment",
        status: "completed",
        owner: "Finance",
        date: "20 Jul 2026",
      },
      {
        id: "t8",
        label: "Equipment ordering",
        status: "completed",
        owner: "Procurement",
        date: "21 Jul 2026",
      },
      {
        id: "t9",
        label: "Delivery to site",
        status: "completed",
        owner: "Logistics",
        date: "28 Jul 2026",
      },
    ],
  },
  {
    id: "p3",
    label: "Installation",
    status: "active",
    tasks: [
      {
        id: "t10",
        label: "Mounting structure",
        status: "completed",
        owner: "Bilal Ahmed",
        date: "30 Jul 2026",
      },
      {
        id: "t11",
        label: "Installing panels",
        status: "completed",
        owner: "Bilal Ahmed",
        date: "31 Jul 2026",
      },
      {
        id: "t12",
        label: "Installing inverter & battery",
        status: "in_progress",
        owner: "Bilal Ahmed",
      },
      { id: "t13", label: "DC/AC wiring", status: "pending" },
      { id: "t14", label: "Earthing & protections", status: "pending" },
    ],
  },
  {
    id: "p4",
    label: "Testing & Commissioning",
    status: "pending",
    tasks: [
      { id: "t15", label: "System testing", status: "pending" },
      { id: "t16", label: "Safety checks", status: "pending" },
      { id: "t17", label: "Monitoring setup", status: "pending" },
      { id: "t18", label: "Power-on", status: "pending" },
    ],
  },
  {
    id: "p5",
    label: "Net Metering",
    status: "pending",
    tasks: [
      { id: "t19", label: "LESCO application", status: "pending" },
      { id: "t20", label: "Documentation", status: "pending" },
      { id: "t21", label: "Technical inspection", status: "pending" },
      {
        id: "t22",
        label: "Bi-directional meter installation",
        status: "pending",
      },
      { id: "t23", label: "Approval", status: "pending" },
    ],
  },
  {
    id: "p6",
    label: "Handover",
    status: "pending",
    tasks: [
      { id: "t24", label: "Walkthrough", status: "pending" },
      { id: "t25", label: "Warranty documents", status: "pending" },
      { id: "t26", label: "Customer training", status: "pending" },
      { id: "t27", label: "Final payment", status: "pending" },
    ],
  },
];

const UPDATES = [
  {
    id: "u1",
    text: "Panels installed on roof — 24 × 500W mounted in 3×8 array. DC wiring starting tomorrow.",
    author: "Bilal Ahmed",
    time: "2 hours ago",
  },
  {
    id: "u2",
    text: "Mounting structure completed and roof anchors sealed. Site prep is clean.",
    author: "Bilal Ahmed",
    time: "1 day ago",
  },
  {
    id: "u3",
    text: "All equipment delivered and verified. Installation crew on-site from 30 Jul.",
    author: "Usman Khalid",
    time: "5 days ago",
  },
  {
    id: "u4",
    text: "Agreement signed and 30% advance received. Equipment ordered from supplier.",
    author: "Usman Khalid",
    time: "16 days ago",
  },
];

const DOCUMENTS = [
  { id: "d1", label: "Site Survey Report", date: "15 Jul 2026" },
  { id: "d2", label: "Installation Agreement", date: "19 Jul 2026" },
  { id: "d3", label: "Invoice #001 — Advance", date: "20 Jul 2026" },
];

const PAYMENTS = [
  {
    id: "pay1",
    label: "30% Advance",
    amount: 930000,
    status: "paid",
    date: "20 Jul 2026",
  },
  {
    id: "pay2",
    label: "60% at installation start",
    amount: 1860000,
    status: "due",
    date: "1 Aug 2026",
  },
  {
    id: "pay3",
    label: "10% on completion",
    amount: 310000,
    status: "pending",
    date: "TBD",
  },
];

const TEAM = [
  {
    id: "tm1",
    role: "Sales Manager",
    name: "Usman Khalid",
    phone: "+92 300 1111111",
  },
  {
    id: "tm2",
    role: "Installation Lead",
    name: "Bilal Ahmed",
    phone: "+92 300 2222222",
  },
];

interface Props {
  params: Promise<{ ref: string }>;
}

export default async function ProjectDetailPage({ params }: Props) {
  const { ref } = await params;
  void ref; // will be used for data fetching in Phase 5

  const paid = PAYMENTS.filter((p) => p.status === "paid").reduce(
    (s, p) => s + p.amount,
    0,
  );
  const total = PAYMENTS.reduce((s, p) => s + p.amount, 0);

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Link
          href="/projects"
          className="focus-ring flex w-fit items-center gap-1.5 text-[13px] text-slate-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          My projects
        </Link>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-[26px] font-semibold text-white sm:text-[30px]">
              {PROJECT.title}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <StatusChip status={PROJECT.status} />
              <span className="font-mono text-[13px] text-slate-400">
                {PROJECT.ref}
              </span>
              <span className="text-[13px] text-slate-400">
                PKR {(PROJECT.contractValuePkr / 1_000_000).toFixed(1)}M
                contract
              </span>
            </div>
          </div>

          {/* Overall progress ring */}
          <div className="flex flex-col items-center gap-1">
            <svg width="64" height="64" className="-rotate-90">
              <circle
                cx="32"
                cy="32"
                r="26"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="6"
              />
              <circle
                cx="32"
                cy="32"
                r="26"
                fill="none"
                stroke="url(#prog-grad)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 26}`}
                strokeDashoffset={`${2 * Math.PI * 26 * (1 - PROJECT.progressPct / 100)}`}
              />
              <defs>
                <linearGradient id="prog-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FFB800" />
                  <stop offset="100%" stopColor="#FF8C00" />
                </linearGradient>
              </defs>
            </svg>
            <span className="font-display -mt-12 text-[18px] font-semibold text-white rotate-0 translate-y-4">
              {PROJECT.progressPct}%
            </span>
            <span className="mt-4 text-[11px] text-slate-500">overall</span>
          </div>
        </div>
      </div>

      {/* Phase tracker */}
      <section aria-label="Project phases">
        <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-wide text-slate-500">
          Phases
        </h2>
        <PhaseTracker phases={PHASES} />
      </section>

      {/* Two-column body */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        {/* Left — project updates timeline */}
        <section aria-label="Project updates">
          <h2 className="mb-4 text-[13px] font-semibold uppercase tracking-wide text-slate-500">
            Updates
          </h2>
          <div className="flex flex-col gap-4">
            {UPDATES.map((u) => (
              <div
                key={u.id}
                className="glass flex flex-col gap-2 rounded-2xl p-4"
              >
                <p className="text-[14px] leading-relaxed text-slate-200">
                  {u.text}
                </p>
                <div className="flex items-center gap-2 text-[12px] text-slate-500">
                  <span className="font-medium text-slate-400">{u.author}</span>
                  <span>·</span>
                  <span>{u.time}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right — info cards stack */}
        <div className="flex flex-col gap-4">
          {/* Your system */}
          <section className="glass rounded-2xl p-4" aria-label="System specs">
            <h3 className="mb-3 flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wide text-slate-500">
              <Zap className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
              Your system
            </h3>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-[13px]">
              {[
                ["Size", `${PROJECT.systemSizeKwp} kWp`],
                ["Type", PROJECT.systemType],
                ["Tier", PROJECT.tier],
                ["Panels", `${PROJECT.panelCount} × ${PROJECT.panelWatt}W`],
                ["Inverter", `${PROJECT.inverterKw} kW`],
                ["Battery", `${PROJECT.batteryKwh} kWh`],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-slate-500">{k}</dt>
                  <dd className="font-medium text-white">{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Team */}
          <section className="glass rounded-2xl p-4" aria-label="Your team">
            <h3 className="mb-3 text-[13px] font-semibold uppercase tracking-wide text-slate-500">
              Your team
            </h3>
            <div className="flex flex-col gap-3">
              {TEAM.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="text-[13px] font-medium text-white">
                      {m.name}
                    </div>
                    <div className="text-[12px] text-slate-500">{m.role}</div>
                  </div>
                  <div className="flex gap-1.5">
                    <a
                      href={`tel:${m.phone}`}
                      aria-label={`Call ${m.name}`}
                      className="focus-ring grid h-8 w-8 place-items-center rounded-lg bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      <Phone className="h-3.5 w-3.5" />
                    </a>
                    <a
                      href={`https://wa.me/${m.phone.replace(/\D/g, "")}`}
                      aria-label={`WhatsApp ${m.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring grid h-8 w-8 place-items-center rounded-lg bg-emerald-500/10 text-emerald-400 transition-colors hover:bg-emerald-500/20"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Documents */}
          <section className="glass rounded-2xl p-4" aria-label="Documents">
            <h3 className="mb-3 flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wide text-slate-500">
              <FileText className="h-3.5 w-3.5" aria-hidden="true" />
              Documents
            </h3>
            <div className="flex flex-col gap-2">
              {DOCUMENTS.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between gap-2"
                >
                  <div>
                    <div className="text-[13px] text-white">{doc.label}</div>
                    <div className="text-[11px] text-slate-500">{doc.date}</div>
                  </div>
                  <button
                    type="button"
                    aria-label={`Download ${doc.label}`}
                    className="focus-ring grid h-7 w-7 place-items-center rounded-lg bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <Download className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Payments */}
          <section className="glass rounded-2xl p-4" aria-label="Payments">
            <h3 className="mb-3 text-[13px] font-semibold uppercase tracking-wide text-slate-500">
              Payments
            </h3>
            <div className="flex flex-col gap-2.5">
              {PAYMENTS.map((pay) => (
                <div
                  key={pay.id}
                  className="flex items-center justify-between gap-2"
                >
                  <div>
                    <div className="text-[13px] text-white">{pay.label}</div>
                    <div className="text-[11px] text-slate-500">{pay.date}</div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="font-mono text-[13px] text-slate-200">
                      PKR {(pay.amount / 1_000_000).toFixed(2)}M
                    </span>
                    <span
                      className={
                        pay.status === "paid"
                          ? "inline-flex rounded-full bg-emerald-500/12 px-2 py-0.5 text-[10px] font-semibold text-emerald-400"
                          : pay.status === "due"
                            ? "inline-flex rounded-full bg-amber/10 px-2 py-0.5 text-[10px] font-semibold text-amber"
                            : "inline-flex rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-slate-400"
                      }
                    >
                      {pay.status.charAt(0).toUpperCase() + pay.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}

              <div className="mt-1 border-t border-white/[0.07] pt-2.5">
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-emerald-500 to-emerald-400"
                    style={{ width: `${Math.round((paid / total) * 100)}%` }}
                  />
                </div>
                <div className="mt-1.5 flex justify-between text-[11px] text-slate-500">
                  <span>PKR {(paid / 1_000_000).toFixed(2)}M paid</span>
                  <span>PKR {(total / 1_000_000).toFixed(2)}M total</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Sticky footer action */}
      <div className="glass sticky bottom-0 z-10 flex items-center justify-between gap-4 rounded-2xl px-5 py-4">
        <p className="text-[13px] text-slate-400">
          Installation in progress — check back for updates
        </p>
        <a
          href="https://wa.me/923294777785"
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring inline-flex shrink-0 items-center gap-2 rounded-xl bg-emerald-500/15 px-4 py-2.5 text-[13.5px] font-semibold text-emerald-400 transition-colors hover:bg-emerald-500/25"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Message our team
        </a>
      </div>
    </div>
  );
}
