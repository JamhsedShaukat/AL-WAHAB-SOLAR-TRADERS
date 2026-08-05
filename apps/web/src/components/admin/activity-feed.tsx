"use client";

import { useState } from "react";
import { FilterBar } from "@/components/admin/filter-bar";

type ActivityEntry = {
  id: number;
  actor: string;
  actorType: "customer" | "staff" | "system";
  action: string;
  entityLink?: string;
  time: string;
  group: "Today" | "Yesterday" | "This week" | "Earlier";
};

const MOCK: ActivityEntry[] = [
  {
    id: 1,
    actor: "Ali Raza",
    actorType: "customer",
    action: "completed an 8 kWp Hybrid estimate",
    entityLink: "EST-0441",
    time: "2 min ago",
    group: "Today",
  },
  {
    id: 2,
    actor: "Fatima Malik",
    actorType: "customer",
    action: "requested a site survey",
    entityLink: "PRJ-2607-0101",
    time: "14 min ago",
    group: "Today",
  },
  {
    id: 3,
    actor: "Bilal Chaudhry",
    actorType: "staff",
    action: "advanced Installation to Testing & Commissioning on",
    entityLink: "PRJ-2607-0088",
    time: "1 hr ago",
    group: "Today",
  },
  {
    id: 4,
    actor: "Hassan Iqbal",
    actorType: "customer",
    action: "submitted a review for project",
    entityLink: "PRJ-2607-0071",
    time: "2 hr ago",
    group: "Today",
  },
  {
    id: 5,
    actor: "System",
    actorType: "system",
    action: "sent expiry reminder to 7 customers",
    time: "3 hr ago",
    group: "Today",
  },
  {
    id: 6,
    actor: "Ayesha Khan",
    actorType: "customer",
    action: "signed in via Google OAuth",
    time: "Yesterday, 9:30 AM",
    group: "Yesterday",
  },
  {
    id: 7,
    actor: "Usman Tariq",
    actorType: "staff",
    action: "recorded a payment of ₨ 11,36,000 on",
    entityLink: "PRJ-2607-0088",
    time: "Yesterday, 3:10 PM",
    group: "Yesterday",
  },
  {
    id: 8,
    actor: "Imran Sheikh",
    actorType: "customer",
    action: "saved estimate",
    entityLink: "EST-0436",
    time: "3 days ago",
    group: "This week",
  },
  {
    id: 9,
    actor: "Admin",
    actorType: "staff",
    action: "activated rate card v3",
    time: "5 days ago",
    group: "This week",
  },
  {
    id: 10,
    actor: "Sarah Ahmed",
    actorType: "customer",
    action: "created an account",
    time: "1 week ago",
    group: "Earlier",
  },
];

const ACTOR_COLORS: Record<string, string> = {
  customer: "bg-cyan/10 text-cyan",
  staff: "bg-gold/10 text-gold",
  system: "bg-slate-500/20 text-slate-400",
};

const GROUPS = ["Today", "Yesterday", "This week", "Earlier"] as const;

export function ActivityFeedClient() {
  const [search, setSearch] = useState("");
  const filtered = search
    ? MOCK.filter(
        (a) =>
          a.actor.toLowerCase().includes(search.toLowerCase()) ||
          a.action.toLowerCase().includes(search.toLowerCase()),
      )
    : MOCK;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">
          Activity logs
        </h1>
        <p className="mt-1 text-[13px] text-slate-500">
          Real-time feed of all actions across the platform
        </p>
      </div>

      <FilterBar
        searchPlaceholder="Search by actor or action…"
        searchValue={search}
        onSearchChange={setSearch}
        filters={[
          {
            label: "Actor type",
            options: [
              { label: "Customer", value: "customer" },
              { label: "Staff", value: "staff" },
              { label: "System", value: "system" },
            ],
          },
          {
            label: "Action",
            options: [
              { label: "Estimates", value: "estimate" },
              { label: "Projects", value: "project" },
              { label: "Payments", value: "payment" },
              { label: "Reviews", value: "review" },
            ],
          },
        ]}
      />

      <div className="flex flex-col gap-6">
        {GROUPS.map((group) => {
          const entries = filtered.filter((a) => a.group === group);
          if (entries.length === 0) return null;
          return (
            <div key={group}>
              <p className="mb-3 text-[12px] font-semibold uppercase tracking-wider text-slate-600">
                {group}
              </p>
              <div className="glass overflow-hidden rounded-2xl">
                {entries.map((a, i) => (
                  <div
                    key={a.id}
                    className="flex items-start gap-4 border-b border-white/5 px-4 py-3.5 last:border-0"
                  >
                    {/* Actor avatar */}
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${ACTOR_COLORS[a.actorType]}`}
                    >
                      {a.actor === "System"
                        ? "SY"
                        : a.actor
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                    </div>

                    {/* Action text */}
                    <div className="flex-1 text-[13px]">
                      <span className="font-medium text-slate-200">
                        {a.actor}
                      </span>
                      <span className="text-slate-400"> {a.action} </span>
                      {a.entityLink && (
                        <span className="font-mono text-[12px] text-gold">
                          {a.entityLink}
                        </span>
                      )}
                    </div>

                    {/* Time */}
                    <span className="shrink-0 text-[11px] text-slate-600">
                      {a.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
