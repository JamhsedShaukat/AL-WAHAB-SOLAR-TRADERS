"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Download,
  Globe,
  Lock,
  Shield,
  Trash2,
  User,
} from "lucide-react";
import { cn } from "@wahab/utils";

type Tab = "profile" | "security" | "preferences" | "data";

const TABS: { id: Tab; label: string; Icon: React.ElementType }[] = [
  { id: "profile", label: "Profile", Icon: User },
  { id: "security", label: "Security", Icon: Lock },
  { id: "preferences", label: "Preferences", Icon: Globe },
  { id: "data", label: "Data", Icon: Shield },
];

const NOTIF_ROWS = [
  { label: "Survey scheduled", inApp: true, email: true, sms: true },
  { label: "Quotation issued", inApp: true, email: true, sms: false },
  { label: "Phase completed", inApp: true, email: true, sms: false },
  { label: "Payment due", inApp: true, email: true, sms: true },
  { label: "Project completed", inApp: true, email: true, sms: true },
  { label: "Review request", inApp: true, email: true, sms: false },
];

function Field({
  label,
  value,
  type = "text",
  placeholder,
}: {
  label: string;
  value?: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-medium text-slate-400">{label}</label>
      <input
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        className="focus-ring rounded-xl border border-white/9 bg-white/4 px-3.5 py-2.5 text-[14px] text-white placeholder:text-slate-600"
      />
    </div>
  );
}

function Toggle({ checked }: { checked?: boolean }) {
  const [on, setOn] = useState(!!checked);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => setOn(!on)}
      className={cn(
        "focus-ring relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors",
        on ? "bg-gold" : "bg-white/20",
      )}
    >
      <span
        className={cn(
          "pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform",
          on ? "translate-x-4" : "translate-x-0",
        )}
      />
    </button>
  );
}

function ProfileTab() {
  return (
    <div className="flex flex-col gap-6">
      {/* Avatar */}
      <div className="flex items-center gap-4">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-linear-to-br from-gold to-amber text-[22px] font-bold text-navy-950">
          AR
        </div>
        <button
          type="button"
          className="focus-ring rounded-xl border border-white/9 bg-white/4 px-3.5 py-2 text-[13px] text-slate-300 transition-colors hover:bg-white/7"
        >
          Change photo
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Full name" value="Ali Raza" />
        <Field label="Phone" value="+92 300 1234567" type="tel" />
        <Field label="Email" value="ali.raza@example.com" type="email" />
        <Field label="City" value="Lahore" />
        <div className="sm:col-span-2">
          <Field label="Area / Locality" value="DHA Phase 6" />
        </div>
        <div className="sm:col-span-2">
          <Field label="Address" placeholder="House #, Street, Area" />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          className="focus-ring rounded-xl bg-linear-to-r from-gold to-amber px-5 py-2.5 text-[14px] font-semibold text-navy-950 shadow-cta transition-all hover:brightness-105"
        >
          Save changes
        </button>
      </div>
    </div>
  );
}

function SecurityTab() {
  return (
    <div className="flex flex-col gap-6">
      {/* Change password */}
      <section className="glass rounded-2xl p-5">
        <h3 className="mb-4 text-[15px] font-semibold text-white">
          Change password
        </h3>
        <div className="flex flex-col gap-4">
          <Field
            label="Current password"
            type="password"
            placeholder="••••••••"
          />
          <Field label="New password" type="password" placeholder="••••••••" />
          <Field
            label="Confirm new password"
            type="password"
            placeholder="••••••••"
          />
          <div className="flex justify-end">
            <button
              type="button"
              className="focus-ring rounded-xl bg-linear-to-r from-gold to-amber px-5 py-2.5 text-[14px] font-semibold text-navy-950 shadow-cta transition-all hover:brightness-105"
            >
              Update password
            </button>
          </div>
        </div>
      </section>

      {/* 2FA */}
      <section className="glass flex items-center justify-between gap-4 rounded-2xl p-5">
        <div>
          <div className="text-[15px] font-semibold text-white">
            Two-factor authentication
          </div>
          <p className="mt-0.5 text-[13px] text-slate-400">
            Add an extra layer of security via SMS code on login.
          </p>
        </div>
        <Toggle />
      </section>

      {/* Active sessions */}
      <section className="glass rounded-2xl p-5">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h3 className="text-[15px] font-semibold text-white">
            Active sessions
          </h3>
          <button
            type="button"
            className="focus-ring text-[13px] text-red-400 transition-colors hover:text-red-300"
          >
            Sign out everywhere
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {[
            {
              device: "Chrome on Windows",
              location: "Lahore, PK",
              current: true,
              time: "Now",
            },
            {
              device: "Safari on iPhone",
              location: "Lahore, PK",
              current: false,
              time: "2 days ago",
            },
          ].map((s) => (
            <div
              key={s.device}
              className="flex items-center justify-between gap-3 text-[13px]"
            >
              <div>
                <span className="text-white">{s.device}</span>
                <span className="ml-2 text-slate-500">· {s.location}</span>
                {s.current && (
                  <span className="ml-2 rounded-full bg-emerald-500/12 px-2 py-0.5 text-[11px] font-medium text-emerald-400">
                    Current
                  </span>
                )}
              </div>
              <span className="shrink-0 text-slate-500">{s.time}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function PreferencesTab() {
  return (
    <div className="flex flex-col gap-6">
      {/* Language */}
      <section className="glass rounded-2xl p-5">
        <h3 className="mb-4 text-[15px] font-semibold text-white">Language</h3>
        <div className="flex gap-3">
          {["English", "اردو"].map((lang) => (
            <button
              key={lang}
              type="button"
              className={cn(
                "focus-ring flex-1 rounded-xl border py-2.5 text-[14px] font-medium transition-colors",
                lang === "English"
                  ? "border-gold/50 bg-gold/10 text-gold"
                  : "border-white/9 bg-white/4 text-slate-400 hover:bg-white/7",
              )}
            >
              {lang}
            </button>
          ))}
        </div>
      </section>

      {/* Notification matrix */}
      <section className="glass rounded-2xl p-5">
        <h3 className="mb-4 text-[15px] font-semibold text-white">
          Notification preferences
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-100 text-[13px]">
            <thead>
              <tr className="border-b border-white/[0.07]">
                <th className="pb-3 text-left font-medium text-slate-500">
                  Event
                </th>
                <th className="pb-3 text-center font-medium text-slate-500">
                  In-app
                </th>
                <th className="pb-3 text-center font-medium text-slate-500">
                  Email
                </th>
                <th className="pb-3 text-center font-medium text-slate-500">
                  SMS
                </th>
              </tr>
            </thead>
            <tbody>
              {NOTIF_ROWS.map((row) => (
                <tr key={row.label} className="border-b border-white/4">
                  <td className="py-3 text-slate-300">{row.label}</td>
                  <td className="py-3 text-center">
                    <Toggle checked={row.inApp} />
                  </td>
                  <td className="py-3 text-center">
                    <Toggle checked={row.email} />
                  </td>
                  <td className="py-3 text-center">
                    <Toggle checked={row.sms} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function DataTab() {
  const [deleteInput, setDeleteInput] = useState("");
  const CONFIRM_PHRASE = "DELETE MY ACCOUNT";

  return (
    <div className="flex flex-col gap-6">
      {/* Download data */}
      <section className="glass flex items-center justify-between gap-4 rounded-2xl p-5">
        <div>
          <div className="text-[15px] font-semibold text-white">
            Download my data
          </div>
          <p className="mt-0.5 text-[13px] text-slate-400">
            Export all your estimates, projects and account data as JSON.
          </p>
        </div>
        <button
          type="button"
          className="focus-ring flex shrink-0 items-center gap-2 rounded-xl border border-white/9 bg-white/4 px-4 py-2.5 text-[13px] text-slate-300 transition-colors hover:bg-white/7"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Download
        </button>
      </section>

      {/* Delete account */}
      <section className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
        <div className="mb-4 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-red-400" aria-hidden="true" />
          <h3 className="text-[15px] font-semibold text-red-300">
            Delete account
          </h3>
        </div>
        <p className="mb-4 text-[13px] leading-relaxed text-slate-400">
          Permanently delete your account and all associated data. This cannot
          be undone. Active projects will remain visible to our team until
          closed.
        </p>
        <div className="flex flex-col gap-3">
          <label className="text-[13px] text-slate-400">
            Type{" "}
            <span className="font-mono font-semibold text-red-400">
              {CONFIRM_PHRASE}
            </span>{" "}
            to confirm
          </label>
          <input
            type="text"
            value={deleteInput}
            onChange={(e) => setDeleteInput(e.target.value)}
            placeholder={CONFIRM_PHRASE}
            className="focus-ring rounded-xl border border-red-500/20 bg-white/4 px-3.5 py-2.5 text-[14px] text-white placeholder:text-slate-600"
          />
          <button
            type="button"
            disabled={deleteInput !== CONFIRM_PHRASE}
            className="focus-ring flex items-center gap-2 self-start rounded-xl bg-red-500/15 px-4 py-2.5 text-[13.5px] font-semibold text-red-400 transition-colors hover:bg-red-500/25 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Delete my account
          </button>
        </div>
      </section>
    </div>
  );
}

export function ProfileTabs() {
  const [tab, setTab] = useState<Tab>("profile");

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
      {/* Tab rail — vertical on lg, horizontal on mobile */}
      <nav
        aria-label="Profile sections"
        className="flex shrink-0 flex-row gap-1 overflow-x-auto rounded-2xl p-1 glass lg:w-44 lg:flex-col"
      >
        {TABS.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={cn(
              "focus-ring flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-colors lg:justify-start",
              tab === id
                ? "bg-white/10 text-white"
                : "text-slate-400 hover:bg-white/6 hover:text-white",
            )}
            aria-current={tab === id ? "page" : undefined}
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="hidden sm:inline lg:inline">{label}</span>
          </button>
        ))}
      </nav>

      {/* Tab content */}
      <div className="min-w-0 flex-1">
        {tab === "profile" && <ProfileTab />}
        {tab === "security" && <SecurityTab />}
        {tab === "preferences" && <PreferencesTab />}
        {tab === "data" && <DataTab />}
      </div>
    </div>
  );
}
