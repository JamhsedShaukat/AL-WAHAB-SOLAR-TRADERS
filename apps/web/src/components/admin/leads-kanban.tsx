"use client";

import { useState } from "react";
import { MessageSquare, Phone } from "lucide-react";
import { FilterBar } from "@/components/admin/filter-bar";
import { cn } from "@wahab/utils";

interface Lead {
  id: string;
  name: string;
  phone: string;
  area: string;
  size: string;
  source: string;
  time: string;
  owner: string;
}

const COLS = ["New", "Contacted", "Survey requested", "Quoted", "Won", "Lost"];

const MOCK_LEADS: (Lead & { stage: string })[] = [
  {
    id: "L-001",
    name: "Tariq Mahmood",
    phone: "+92 300 5555111",
    area: "DHA Phase 5",
    size: "10 kWp est.",
    source: "Organic",
    time: "10 min ago",
    owner: "Bilal C.",
    stage: "New",
  },
  {
    id: "L-002",
    name: "Sana Mirza",
    phone: "+92 321 7777888",
    area: "Gulberg II",
    size: "6 kWp est.",
    source: "WhatsApp",
    time: "1 hr ago",
    owner: "—",
    stage: "New",
  },
  {
    id: "L-003",
    name: "Kamran Ali",
    phone: "+92 333 4444222",
    area: "Model Town",
    size: "8 kWp est.",
    source: "Referral",
    time: "3 hr ago",
    owner: "Bilal C.",
    stage: "Contacted",
  },
  {
    id: "L-004",
    name: "Nadia Hassan",
    phone: "+92 312 6666999",
    area: "Bahria Town",
    size: "12 kWp est.",
    source: "Organic",
    time: "1 day ago",
    owner: "Bilal C.",
    stage: "Survey requested",
  },
  {
    id: "L-005",
    name: "Zubair Shah",
    phone: "+92 345 3333000",
    area: "Johar Town",
    size: "5 kWp est.",
    source: "Social",
    time: "2 days ago",
    owner: "Bilal C.",
    stage: "Quoted",
  },
  {
    id: "L-006",
    name: "Rukhsana Patel",
    phone: "+92 300 2222777",
    area: "Cantt",
    size: "7 kWp est.",
    source: "Walk-in",
    time: "3 days ago",
    owner: "Bilal C.",
    stage: "Won",
  },
];

export function LeadsKanbanClient() {
  const [search, setSearch] = useState("");
  const filtered = search
    ? MOCK_LEADS.filter(
        (l) =>
          l.name.toLowerCase().includes(search.toLowerCase()) ||
          l.area.toLowerCase().includes(search.toLowerCase()),
      )
    : MOCK_LEADS;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Leads</h1>
        <p className="mt-1 text-[13px] text-slate-500">
          Inbound enquiries and sales pipeline
        </p>
      </div>

      <FilterBar
        searchPlaceholder="Search leads…"
        searchValue={search}
        onSearchChange={setSearch}
        filters={[
          {
            label: "Source",
            options: [
              { label: "Organic", value: "organic" },
              { label: "WhatsApp", value: "whatsapp" },
              { label: "Referral", value: "referral" },
            ],
          },
          {
            label: "Owner",
            options: [
              { label: "Bilal C.", value: "bilal" },
              { label: "Unassigned", value: "unassigned" },
            ],
          },
        ]}
      />

      <div className="overflow-x-auto pb-4">
        <div
          className="flex gap-4"
          style={{ minWidth: COLS.length * 260 + "px" }}
        >
          {COLS.map((stage) => {
            const cards = filtered.filter((l) => l.stage === stage);
            return (
              <div key={stage} className="flex w-56 shrink-0 flex-col gap-2">
                <div className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
                  <span className="text-[12px] font-semibold text-slate-300">
                    {stage}
                  </span>
                  <span className="rounded-full bg-white/8 px-2 py-0.5 text-[11px] text-slate-500">
                    {cards.length}
                  </span>
                </div>

                {cards.length === 0 && (
                  <div className="rounded-xl border border-dashed border-white/10 py-6 text-center text-[12px] text-slate-600">
                    Empty
                  </div>
                )}

                {cards.map((l) => (
                  <div
                    key={l.id}
                    className="glass flex flex-col gap-2 rounded-xl p-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-[13px] font-medium text-white">
                        {l.name}
                      </p>
                      <span className="shrink-0 text-[10px] text-slate-600">
                        {l.time}
                      </span>
                    </div>
                    <p className="text-[12px] text-slate-400">
                      {l.area} · {l.size}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>via {l.source}</span>
                      <span>👤 {l.owner}</span>
                    </div>
                    <div className="flex gap-2 pt-1">
                      <a
                        href={`tel:${l.phone}`}
                        className="focus-ring flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 py-1.5 text-[11px] text-slate-400 hover:text-white"
                      >
                        <Phone className="h-3 w-3" /> Call
                      </a>
                      <a
                        href={`https://wa.me/${l.phone.replace(/\s+/g, "")}`}
                        className="focus-ring flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 py-1.5 text-[11px] text-slate-400 hover:text-gold"
                      >
                        <MessageSquare className="h-3 w-3" /> WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
