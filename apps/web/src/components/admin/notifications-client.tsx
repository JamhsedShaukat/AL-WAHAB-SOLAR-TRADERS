"use client";

import { useState } from "react";
import { Bell, Send, Settings2, CheckCheck, Circle, Megaphone } from "lucide-react";
import { cn } from "@wahab/utils";
import { FilterBar } from "@/components/admin/filter-bar";

type Tab = "inbox" | "rules" | "broadcast";

const INBOX = [
  { id: 1, type: "estimate", title: "New estimate saved", body: "Ali Raza saved an 8 kWp Hybrid estimate.", time: "4 min ago", read: false },
  { id: 2, type: "survey", title: "Survey requested", body: "Fatima Malik requested a site survey for PRJ-2607-0101.", time: "18 min ago", read: false },
  { id: 3, type: "review", title: "Review awaiting approval", body: "Hassan Iqbal submitted a 5-star review for PRJ-2607-0071.", time: "2 hr ago", read: false },
  { id: 4, type: "payment", title: "Overdue payment", body: "Payment on PRJ-2607-0041 is 12 days overdue.", time: "Yesterday", read: true },
  { id: 5, type: "system", title: "Export ready", body: "Your user list CSV export is ready to download.", time: "Yesterday", read: true },
];

const RULES = [
  { event: "estimate.saved", channels: ["in-app", "email"], audience: "Assigned staff", enabled: true },
  { event: "survey.requested", channels: ["in-app", "email", "sms"], audience: "Sales owner", enabled: true },
  { event: "quotation.issued", channels: ["email"], audience: "Customer", enabled: true },
  { event: "project.status_changed", channels: ["in-app", "email"], audience: "Customer + staff", enabled: true },
  { event: "payment.due", channels: ["email", "sms"], audience: "Customer", enabled: true },
  { event: "estimate.expiring", channels: ["email"], audience: "Customer", enabled: false },
  { event: "review.submitted", channels: ["in-app"], audience: "Admin", enabled: true },
  { event: "user.signed_up", channels: ["in-app"], audience: "Admin", enabled: false },
];

const CHANNEL_COLORS: Record<string, string> = {
  "in-app": "bg-cyan/10 text-cyan",
  email: "bg-gold/10 text-gold",
  sms: "bg-violet-500/10 text-violet-300",
};

export function NotificationsClient() {
  const [tab, setTab] = useState<Tab>("inbox");
  const [inbox, setInbox] = useState(INBOX);
  const [rules, setRules] = useState(RULES);
  const [broadcastBody, setBroadcastBody] = useState("");

  function markAllRead() {
    setInbox((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  const unread = inbox.filter((n) => !n.read).length;

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "inbox", label: "Inbox", icon: <Bell className="h-4 w-4" /> },
    { key: "rules", label: "Rules", icon: <Settings2 className="h-4 w-4" /> },
    { key: "broadcast", label: "Broadcast", icon: <Megaphone className="h-4 w-4" /> },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl font-bold text-white">Notifications</h1>

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl bg-white/5 p-1 w-fit">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={cn("flex items-center gap-2 rounded-lg px-4 py-2 text-[13px] font-medium transition-colors", tab === t.key ? "bg-gold text-navy-950" : "text-slate-400 hover:text-white")}
          >
            {t.icon} {t.label}
            {t.key === "inbox" && unread > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">{unread}</span>
            )}
          </button>
        ))}
      </div>

      {/* INBOX */}
      {tab === "inbox" && (
        <div className="flex flex-col gap-2">
          <div className="flex justify-end">
            <button type="button" onClick={markAllRead} className="flex items-center gap-1.5 text-[12px] text-slate-500 hover:text-slate-300">
              <CheckCheck className="h-4 w-4" /> Mark all read
            </button>
          </div>
          {inbox.map((n) => (
            <div key={n.id} onClick={() => setInbox((prev) => prev.map((x) => x.id === n.id ? { ...x, read: true } : x))}
              className={cn("glass cursor-pointer rounded-xl px-4 py-3 transition-opacity", n.read && "opacity-50")}>
              <div className="flex items-start gap-3">
                {!n.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold" />}
                {n.read && <span className="mt-1.5 h-2 w-2 shrink-0" />}
                <div className="flex-1">
                  <p className="text-[13px] font-medium text-white">{n.title}</p>
                  <p className="text-[12px] text-slate-400">{n.body}</p>
                </div>
                <span className="shrink-0 text-[11px] text-slate-600">{n.time}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* RULES */}
      {tab === "rules" && (
        <div className="glass overflow-hidden rounded-2xl">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-white/5 text-left text-[11px] uppercase tracking-wider text-slate-600">
                <th className="px-4 py-3">Event</th>
                <th className="px-4 py-3">Channels</th>
                <th className="px-4 py-3">Audience</th>
                <th className="px-4 py-3 text-center">Enabled</th>
              </tr>
            </thead>
            <tbody>
              {rules.map((r, i) => (
                <tr key={r.event} className="border-b border-white/5 last:border-0">
                  <td className="px-4 py-3 font-mono text-[12px] text-slate-300">{r.event}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {r.channels.map((c) => (
                        <span key={c} className={cn("rounded-full px-2 py-0.5 text-[11px] font-medium", CHANNEL_COLORS[c] ?? "bg-white/5 text-slate-400")}>{c}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-400">{r.audience}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      type="button"
                      onClick={() => setRules((prev) => prev.map((x, j) => j === i ? { ...x, enabled: !x.enabled } : x))}
                      className={cn("h-5 w-9 rounded-full transition-colors", r.enabled ? "bg-gold" : "bg-white/10")}
                    >
                      <span className={cn("block h-3.5 w-3.5 translate-x-0.5 rounded-full bg-white shadow transition-transform", r.enabled && "translate-x-4.5")} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* BROADCAST */}
      {tab === "broadcast" && (
        <div className="glass rounded-2xl p-6 flex flex-col gap-5 max-w-2xl">
          <p className="text-[13px] text-slate-400">Send a message to a filtered group of users. All broadcasts are audited.</p>
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-medium text-slate-400">Audience</label>
            <select className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[13px] text-white focus:outline-none">
              <option>All users</option>
              <option>Users with saved estimates</option>
              <option>Estimates expiring this week</option>
              <option>Project customers</option>
            </select>
            <p className="text-[11px] text-slate-600">124 recipients match this filter</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-medium text-slate-400">Channels</label>
            <div className="flex gap-3">
              {["in-app", "email", "sms"].map((c) => (
                <label key={c} className="flex items-center gap-2 text-[13px] text-slate-300 cursor-pointer">
                  <input type="checkbox" defaultChecked={c === "in-app"} className="accent-gold" /> {c}
                </label>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-medium text-slate-400">Message (English)</label>
            <textarea
              rows={4}
              value={broadcastBody}
              onChange={(e) => setBroadcastBody(e.target.value)}
              placeholder="Your solar estimate is expiring in 3 days. Click here to review it…"
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[13px] text-white placeholder:text-slate-600 focus:outline-none resize-none"
            />
          </div>
          <div className="flex gap-3">
            <button type="button" className="rounded-xl border border-white/10 px-4 py-2 text-[13px] text-slate-300 hover:bg-white/5">Test send to self</button>
            <button type="button" className="flex items-center gap-2 rounded-xl bg-gold px-5 py-2 text-[13px] font-semibold text-navy-950 hover:bg-amber-400 transition-colors">
              <Send className="h-4 w-4" /> Send broadcast
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
