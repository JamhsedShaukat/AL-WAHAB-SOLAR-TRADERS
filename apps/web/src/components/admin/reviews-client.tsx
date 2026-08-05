"use client";

import { useState } from "react";
import { CheckCircle2, Star, XCircle } from "lucide-react";
import { FilterBar } from "@/components/admin/filter-bar";
import { cn } from "@wahab/utils";

interface Review {
  id: string;
  customer: string;
  area: string;
  rating: number;
  text: string;
  projectRef: string;
  submitted: string;
  status: "pending" | "approved" | "rejected";
}

const MOCK: Review[] = [
  {
    id: "R-001",
    customer: "Hassan Iqbal",
    area: "Gulberg III",
    rating: 5,
    text: "Excellent work by the Al-Wahab team. Installation was clean and professional. The system is performing above expectations.",
    projectRef: "PRJ-2607-0071",
    submitted: "2 Aug 2026",
    status: "pending",
  },
  {
    id: "R-002",
    customer: "Ayesha Khan",
    area: "Bahria Town",
    rating: 4,
    text: "Very happy with the overall experience. Minor delay in procurement but the quality of work was great.",
    projectRef: "PRJ-2607-0055",
    submitted: "29 Jul 2026",
    status: "pending",
  },
  {
    id: "R-003",
    customer: "Imran Sheikh",
    area: "Cantt",
    rating: 5,
    text: "Bilal and his team were amazing. Highly recommend Al-Wahab Solar for anyone in Lahore.",
    projectRef: "PRJ-2607-0049",
    submitted: "1 Aug 2026",
    status: "approved",
  },
  {
    id: "R-004",
    customer: "Sarah Ahmed",
    area: "Johar Town",
    rating: 2,
    text: "Multiple delays and poor communication. Very disappointed.",
    projectRef: "PRJ-2607-0041",
    submitted: "28 Jul 2026",
    status: "rejected",
  },
];

export function ReviewsClient() {
  const [data, setData] = useState(MOCK);
  const [search, setSearch] = useState("");
  const filtered = search
    ? data.filter((r) =>
        r.customer.toLowerCase().includes(search.toLowerCase()),
      )
    : data;

  function approve(id: string) {
    setData((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "approved" } : r)),
    );
  }
  function reject(id: string) {
    setData((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "rejected" } : r)),
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Reviews</h1>
        <p className="mt-1 text-[13px] text-slate-500">
          {data.filter((r) => r.status === "pending").length} awaiting
          moderation
        </p>
      </div>

      <FilterBar
        searchPlaceholder="Search by customer…"
        searchValue={search}
        onSearchChange={setSearch}
        filters={[
          {
            label: "Status",
            options: [
              { label: "Pending", value: "pending" },
              { label: "Approved", value: "approved" },
              { label: "Rejected", value: "rejected" },
            ],
          },
        ]}
      />

      <div className="flex flex-col gap-4">
        {filtered.map((r) => (
          <div
            key={r.id}
            className={cn(
              "glass rounded-2xl p-5",
              r.status === "pending" && "border-l-4 border-gold/50",
            )}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-white">{r.customer}</span>
                  <span className="text-[12px] text-slate-500">{r.area}</span>
                  <span className="font-mono text-[11px] text-slate-600">
                    {r.projectRef}
                  </span>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < r.rating ? "fill-gold text-gold" : "text-slate-700",
                      )}
                    />
                  ))}
                </div>
                <p className="max-w-xl text-[13px] leading-relaxed text-slate-300">
                  {r.text}
                </p>
                <p className="text-[11px] text-slate-600">
                  Submitted {r.submitted}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {r.status === "pending" ? (
                  <>
                    <button
                      type="button"
                      onClick={() => approve(r.id)}
                      className="focus-ring flex items-center gap-1.5 rounded-xl bg-emerald-500/10 px-3 py-2 text-[12px] font-medium text-emerald-400 transition-colors hover:bg-emerald-500/20"
                    >
                      <CheckCircle2 className="h-4 w-4" /> Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => reject(r.id)}
                      className="focus-ring flex items-center gap-1.5 rounded-xl bg-red-500/10 px-3 py-2 text-[12px] font-medium text-red-400 transition-colors hover:bg-red-500/20"
                    >
                      <XCircle className="h-4 w-4" /> Reject
                    </button>
                  </>
                ) : (
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 text-[12px] font-medium",
                      r.status === "approved"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-red-500/10 text-red-400",
                    )}
                  >
                    {r.status === "approved" ? "Approved" : "Rejected"}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
