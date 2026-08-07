"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { cn } from "@wahab/utils";

type SettingsTab =
  | "company"
  | "branding"
  | "estimator"
  | "pricing"
  | "tariffs"
  | "phases"
  | "notifications"
  | "integrations"
  | "localisation"
  | "security"
  | "data"
  | "features";

const TABS: { key: SettingsTab; label: string }[] = [
  { key: "company", label: "Company" },
  { key: "branding", label: "Branding" },
  { key: "estimator", label: "Estimator" },
  { key: "pricing", label: "Pricing" },
  { key: "tariffs", label: "Tariffs" },
  { key: "phases", label: "Phases & tasks" },
  { key: "notifications", label: "Notifications" },
  { key: "integrations", label: "Integrations" },
  { key: "localisation", label: "Localisation" },
  { key: "security", label: "Security" },
  { key: "data", label: "Data & retention" },
  { key: "features", label: "Feature flags" },
];

const Field = ({
  label,
  defaultValue,
  type = "text",
  hint,
}: {
  label: string;
  defaultValue?: string;
  type?: string;
  hint?: string;
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-[12px] font-medium text-slate-400">{label}</label>
    <input
      type={type}
      defaultValue={defaultValue}
      className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[13px] text-white focus:border-gold/50 focus:outline-none"
    />
    {hint && <p className="text-[11px] text-slate-600">{hint}</p>}
  </div>
);

const Toggle = ({
  label,
  description,
  defaultChecked = false,
}: {
  label: string;
  description?: string;
  defaultChecked?: boolean;
}) => {
  const [on, setOn] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-white/5 last:border-0">
      <div>
        <p className="text-[13px] text-white">{label}</p>
        {description && (
          <p className="text-[12px] text-slate-500">{description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={() => setOn(!on)}
        className={cn(
          "h-5 w-9 shrink-0 rounded-full transition-colors",
          on ? "bg-gold" : "bg-white/10",
        )}
      >
        <span
          className={cn(
            "block h-3.5 w-3.5 translate-x-0.5 rounded-full bg-white shadow transition-transform",
            on && "translate-x-4.5",
          )}
        />
      </button>
    </div>
  );
};

const NumberField = ({
  label,
  defaultValue,
  unit,
  hint,
}: {
  label: string;
  defaultValue: string | number;
  unit?: string;
  hint?: string;
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-[12px] font-medium text-slate-400">{label}</label>
    <div className="flex items-center gap-2">
      <input
        type="number"
        defaultValue={String(defaultValue)}
        className="w-28 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[13px] text-white focus:border-gold/50 focus:outline-none"
      />
      {unit && <span className="text-[12px] text-slate-500">{unit}</span>}
    </div>
    {hint && <p className="text-[11px] text-slate-600">{hint}</p>}
  </div>
);

const TARIFFS = [
  { from: 1, to: 100, rate: 22.5 },
  { from: 101, to: 200, rate: 27.8 },
  { from: 201, to: 300, rate: 34.6 },
  { from: 301, to: 700, rate: 42.1 },
  { from: 701, to: 0, rate: 53.2 },
];

const PHASES = [
  { name: "Survey & Design", tasks: 4 },
  { name: "Procurement", tasks: 3 },
  { name: "Installation", tasks: 6 },
  { name: "Testing & Commissioning", tasks: 5 },
  { name: "Net Metering", tasks: 4 },
  { name: "Handover", tasks: 5 },
];

const INTEGRATIONS = [
  {
    name: "Email provider",
    status: "Connected",
    hint: "Resend — hello@alwahabsolar.com.pk",
  },
  {
    name: "SMS provider",
    status: "Connected",
    hint: "Twilio — +92 300 xxxxxxx",
  },
  { name: "Google OAuth", status: "Connected", hint: "client ID configured" },
  {
    name: "OCR provider",
    status: "Not connected",
    hint: "Bill scan not active",
  },
  {
    name: "Analytics domain",
    status: "Connected",
    hint: "alwahabsolar.com.pk",
  },
  { name: "WhatsApp Business", status: "Connected", hint: "+92 300 0000000" },
];

export function SettingsClient() {
  const [tab, setTab] = useState<SettingsTab>("company");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-bold text-white">Settings</h1>
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl bg-gold px-4 py-2 text-[13px] font-semibold text-navy-950 hover:bg-amber-400 transition-colors"
        >
          <Save className="h-4 w-4" /> Save changes
        </button>
      </div>

      {/* Tab strip */}
      <div className="flex flex-wrap gap-1 rounded-xl bg-white/5 p-1">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-[12px] font-medium transition-colors",
              tab === t.key
                ? "bg-gold text-navy-950"
                : "text-slate-400 hover:text-white",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Company */}
      {tab === "company" && (
        <div className="glass rounded-2xl p-5 grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-3xl">
          <Field label="Trading name" defaultValue="Al-Wahab Solar Traders" />
          <Field
            label="Legal name"
            defaultValue="Al-Wahab Solar Traders (SMC-Pvt) Ltd"
          />
          <Field label="Phone" defaultValue="+92 300 0000000" />
          <Field label="WhatsApp" defaultValue="+92 300 0000000" />
          <Field label="Email" defaultValue="hello@alwahabsolar.com.pk" />
          <Field
            label="Address"
            defaultValue="Plot 62, J1 Block, Phase 2, Johar Town, Lahore"
          />
          <Field label="NTN" defaultValue="1234567-8" />
          <Field label="STRN" defaultValue="12-34-5678-001-23" />
        </div>
      )}

      {/* Estimator */}
      {tab === "estimator" && (
        <div className="glass rounded-2xl p-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-3xl">
          <NumberField
            label="Estimate validity"
            defaultValue={14}
            unit="days"
          />
          <NumberField label="Market buffer" defaultValue={6} unit="%" />
          <NumberField
            label="Yield per kWp/month"
            defaultValue={100}
            unit="units"
          />
          <NumberField
            label="Reduce-bill factor"
            defaultValue={0.65}
            hint="Fraction of bill covered"
          />
          <NumberField label="Sq ft per kWp" defaultValue={70} />
          <NumberField label="CO₂ per kWp/year" defaultValue={1015} unit="kg" />
          <NumberField label="Size step" defaultValue={0.5} unit="kWp" />
          <NumberField
            label="Battery DoD"
            defaultValue={0.9}
            hint="Depth of discharge"
          />
          <NumberField label="Battery module" defaultValue={2.5} unit="kWh" />
        </div>
      )}

      {/* Tariffs */}
      {tab === "tariffs" && (
        <div className="glass rounded-2xl overflow-hidden max-w-xl">
          <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
            <p className="text-[13px] font-semibold text-white">
              LESCO residential slabs
            </p>
            <span className="text-[11px] text-slate-500">
              Effective 1 Jul 2026
            </span>
          </div>
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-white/5 text-left text-[11px] uppercase tracking-wider text-slate-600">
                <th className="px-4 py-2.5">Units from</th>
                <th className="px-4 py-2.5">Units to</th>
                <th className="px-4 py-2.5 text-right">₨ / unit</th>
              </tr>
            </thead>
            <tbody>
              {TARIFFS.map((t, i) => (
                <tr key={i} className="border-b border-white/5 last:border-0">
                  <td className="px-4 py-2.5 text-slate-300">{t.from}</td>
                  <td className="px-4 py-2.5 text-slate-300">
                    {t.to === 0 ? "Above" : t.to}
                  </td>
                  <td className="px-4 py-2.5 text-right font-medium text-white">
                    {t.rate.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Phases */}
      {tab === "phases" && (
        <div className="flex flex-col gap-3 max-w-xl">
          {PHASES.map((ph, i) => (
            <div
              key={ph.name}
              className="glass flex items-center justify-between gap-4 rounded-xl px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/10 text-[11px] font-bold text-gold">
                  {i + 1}
                </span>
                <p className="text-[13px] text-white">{ph.name}</p>
              </div>
              <span className="text-[12px] text-slate-500">
                {ph.tasks} tasks
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Integrations */}
      {tab === "integrations" && (
        <div className="flex flex-col gap-2 max-w-xl">
          {INTEGRATIONS.map((intg) => (
            <div
              key={intg.name}
              className="glass flex items-center justify-between gap-4 rounded-xl px-4 py-3"
            >
              <div>
                <p className="text-[13px] font-medium text-white">
                  {intg.name}
                </p>
                <p className="text-[11px] text-slate-500">{intg.hint}</p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "text-[12px]",
                    intg.status === "Connected"
                      ? "text-emerald-400"
                      : "text-slate-500",
                  )}
                >
                  {intg.status}
                </span>
                <button
                  type="button"
                  className="rounded-lg border border-white/10 px-3 py-1 text-[11px] text-slate-400 hover:bg-white/5"
                >
                  Test
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Security */}
      {tab === "security" && (
        <div className="glass rounded-2xl p-5 flex flex-col max-w-xl">
          <NumberField
            label="Session lifetime"
            defaultValue={24}
            unit="hours"
          />
          <div className="mt-4">
            <Toggle
              label="Require 2FA for staff roles"
              description="Admin and above must use TOTP or SMS OTP"
              defaultChecked={true}
            />
            <Toggle
              label="IP allowlist for /admin"
              description="Only allow listed IPs to access the admin panel"
            />
            <Toggle
              label="Failed-login lockout"
              description="Lock account after 5 failed attempts for 30 minutes"
              defaultChecked={true}
            />
          </div>
        </div>
      )}

      {/* Feature flags */}
      {tab === "features" && (
        <div className="glass rounded-2xl p-5 flex flex-col max-w-xl">
          <Toggle
            label="Bill upload"
            description="Allow customers to upload their LESCO bill for OCR"
            defaultChecked={true}
          />
          <Toggle
            label="Budget mode"
            description="Show the monthly-budget estimator route"
            defaultChecked={true}
          />
          <Toggle
            label="Reviews"
            description="Show the reviews carousel on the homepage"
            defaultChecked={true}
          />
          <Toggle
            label="Compare estimates"
            description="Let customers compare two saved estimates side by side"
          />
          <Toggle
            label="PWA install prompt"
            description="Show the 'Add to home screen' banner on mobile"
            defaultChecked={true}
          />
          <Toggle
            label="Maintenance mode"
            description="Show a maintenance page to all visitors"
          />
        </div>
      )}

      {/* Branding, Pricing, Notifications, Localisation, Data — simple placeholders for tabs not needing full interactivity */}
      {(tab === "branding" ||
        tab === "pricing" ||
        tab === "notifications" ||
        tab === "localisation" ||
        tab === "data") && (
        <div className="glass rounded-2xl p-8 flex flex-col items-center justify-center gap-3 text-center max-w-xl">
          <p className="font-medium text-white capitalize">{tab} settings</p>
          <p className="text-[13px] text-slate-500">
            Fields for this tab are populated from the database in the live
            build.
          </p>
        </div>
      )}
    </div>
  );
}
