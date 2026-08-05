import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail, MessageSquare, Phone } from "lucide-react";
import { Badge } from "@wahab/ui";

export const metadata: Metadata = { title: "User detail" };

const MOCK_ESTIMATES = [
  {
    ref: "EST-0021",
    size: "8 kWp",
    type: "Hybrid",
    status: "Saved",
    date: "12 Jul 2026",
  },
  {
    ref: "EST-0018",
    size: "6 kWp",
    type: "On-grid",
    status: "Converted",
    date: "2 Jul 2026",
  },
  {
    ref: "EST-0009",
    size: "10 kWp",
    type: "Hybrid",
    status: "Expired",
    date: "14 Jun 2026",
  },
];

const MOCK_PROJECTS = [
  {
    ref: "PRJ-2607-0088",
    title: "12 kWp Hybrid — DHA Phase 6",
    status: "In progress",
    value: "₨ 28,40,000",
  },
];

const ACTIVITY = [
  { text: "Completed an 8 kWp Hybrid estimate", time: "12 Jul 2026, 11:42 AM" },
  { text: "Requested a site survey", time: "5 Jul 2026, 3:10 PM" },
  {
    text: "Signed project agreement PRJ-2607-0088",
    time: "28 Jun 2026, 10:00 AM",
  },
  { text: "Created account via Google OAuth", time: "12 Jun 2026, 9:15 AM" },
];

export default function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="flex flex-col gap-6">
      {/* Back */}
      <Link
        href="/admin/users"
        className="focus-ring inline-flex items-center gap-2 text-[13px] text-slate-500 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Users
      </Link>

      {/* Header strip */}
      <div className="glass rounded-2xl p-5">
        <div className="flex flex-wrap items-start gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-gold to-amber text-xl font-bold text-navy-950">
            AR
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-display text-xl font-bold text-white">
                Ali Raza
              </h1>
              <Badge variant="default">Customer</Badge>
              <span className="text-[12px] text-emerald-400">● Active</span>
            </div>
            <div className="flex flex-wrap gap-3 text-[13px] text-slate-400">
              <a
                href="tel:+923001234567"
                className="flex items-center gap-1.5 hover:text-white"
              >
                <Phone className="h-3.5 w-3.5" /> +92 300 1234567
              </a>
              <a
                href="mailto:ali.raza@example.com"
                className="flex items-center gap-1.5 hover:text-white"
              >
                <Mail className="h-3.5 w-3.5" /> ali.raza@example.com
              </a>
              <a
                href="https://wa.me/923001234567"
                className="flex items-center gap-1.5 hover:text-gold"
              >
                <MessageSquare className="h-3.5 w-3.5" /> WhatsApp
              </a>
            </div>
            <p className="text-[12px] text-slate-600">
              Joined 12 Jun 2026 · Last seen 3 hours ago · Lahore, DHA Phase 6
            </p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <p className="text-[12px] text-slate-500">Lifetime value</p>
            <p className="font-display text-lg font-bold text-gold">
              ₨ 24,80,000
            </p>
          </div>
        </div>
      </div>

      {/* Two-column body */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main: estimates + projects */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* Estimates */}
          <div className="glass rounded-2xl p-5">
            <h2 className="mb-4 font-display text-[15px] font-semibold text-white">
              Estimates (3)
            </h2>
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-white/8">
                  {["Ref", "Size", "Type", "Status", "Date"].map((h) => (
                    <th
                      key={h}
                      className="pb-2 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MOCK_ESTIMATES.map((e) => (
                  <tr
                    key={e.ref}
                    className="border-b border-white/5 last:border-0"
                  >
                    <td className="py-2.5">
                      <Link
                        href={`/admin/estimates/${e.ref}`}
                        className="font-mono text-gold hover:underline"
                      >
                        {e.ref}
                      </Link>
                    </td>
                    <td className="py-2.5 text-slate-300">{e.size}</td>
                    <td className="py-2.5 text-slate-300">{e.type}</td>
                    <td className="py-2.5">
                      <span
                        className={
                          e.status === "Expired"
                            ? "text-red-400"
                            : e.status === "Converted"
                              ? "text-emerald-400"
                              : "text-slate-300"
                        }
                      >
                        {e.status}
                      </span>
                    </td>
                    <td className="py-2.5 text-slate-500">{e.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Projects */}
          <div className="glass rounded-2xl p-5">
            <h2 className="mb-4 font-display text-[15px] font-semibold text-white">
              Projects (1)
            </h2>
            {MOCK_PROJECTS.map((p) => (
              <div
                key={p.ref}
                className="flex items-center justify-between gap-3 rounded-xl bg-white/3 px-4 py-3"
              >
                <div>
                  <Link
                    href={`/admin/projects/${p.ref}`}
                    className="font-medium text-white hover:text-gold"
                  >
                    {p.title}
                  </Link>
                  <p className="mt-0.5 font-mono text-[11px] text-slate-500">
                    {p.ref}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[13px] font-semibold text-gold">
                    {p.value}
                  </p>
                  <p className="text-[11px] text-amber">{p.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: profile meta + activity */}
        <div className="flex flex-col gap-6">
          <div className="glass rounded-2xl p-5">
            <h2 className="mb-4 font-display text-[14px] font-semibold text-white">
              Profile
            </h2>
            <dl className="flex flex-col gap-2 text-[13px]">
              {[
                ["City", "Lahore"],
                ["Area", "DHA Phase 6"],
                ["Source", "Organic search"],
                ["Signup method", "Google OAuth"],
                ["Language", "English"],
                ["Marketing consent", "Yes"],
                ["User ID", "U-001"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3">
                  <dt className="text-slate-500">{k}</dt>
                  <dd className="text-right text-slate-300">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="glass rounded-2xl p-5">
            <h2 className="mb-4 font-display text-[14px] font-semibold text-white">
              Activity
            </h2>
            <div className="flex flex-col gap-3">
              {ACTIVITY.map((a, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-0.5 border-b border-white/5 pb-3 last:border-0 last:pb-0"
                >
                  <p className="text-[12px] text-slate-300">{a.text}</p>
                  <p className="text-[11px] text-slate-600">{a.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
