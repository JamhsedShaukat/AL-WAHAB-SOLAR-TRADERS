import type { Metadata } from "next";
import Link from "next/link";
import {
  Bell,
  CheckCheck,
  CircleCheckBig,
  CreditCard,
  FileText,
  Hammer,
  Sun,
} from "lucide-react";
import { cn } from "@wahab/utils";

export const metadata: Metadata = {
  title: "Notifications",
};

type NotifType = "project_update" | "payment_due" | "phase_completed" | "survey_scheduled" | "review_request";

interface Notification {
  id: string;
  type: NotifType;
  title: string;
  body: string;
  time: string;
  href: string;
  unread: boolean;
}

const ICON_CONFIG: Record<NotifType, { Icon: React.ElementType; className: string }> = {
  project_update: { Icon: Hammer, className: "bg-amber/10 text-amber" },
  payment_due: { Icon: CreditCard, className: "bg-red-500/10 text-red-400" },
  phase_completed: { Icon: CircleCheckBig, className: "bg-emerald-500/10 text-emerald-400" },
  survey_scheduled: { Icon: Sun, className: "bg-gold/10 text-gold" },
  review_request: { Icon: FileText, className: "bg-cyan/10 text-cyan" },
};

const NOTIFICATIONS: { group: string; items: Notification[] }[] = [
  {
    group: "Today",
    items: [
      {
        id: "n1",
        type: "project_update",
        title: "Installation update",
        body: "Bilal Ahmed posted a new update: panels installed on roof.",
        time: "2 hours ago",
        href: "/projects/PRJ-2607-0088",
        unread: true,
      },
      {
        id: "n2",
        type: "payment_due",
        title: "Payment due",
        body: "Your 60% instalment of PKR 1.86M is due for project PRJ-2607-0088.",
        time: "5 hours ago",
        href: "/projects/PRJ-2607-0088",
        unread: true,
      },
    ],
  },
  {
    group: "This week",
    items: [
      {
        id: "n3",
        type: "phase_completed",
        title: "Phase 2 completed",
        body: "Agreement & Procurement is done — installation crew arrives 30 Jul.",
        time: "3 days ago",
        href: "/projects/PRJ-2607-0088",
        unread: false,
      },
      {
        id: "n4",
        type: "survey_scheduled",
        title: "Survey scheduled",
        body: "Your site survey is confirmed for 15 Jul 2026 at 10:00 AM.",
        time: "5 days ago",
        href: "/projects/PRJ-2607-0088",
        unread: false,
      },
    ],
  },
  {
    group: "Earlier",
    items: [
      {
        id: "n5",
        type: "review_request",
        title: "Leave a review",
        body: "Project PRJ-2606-0041 is complete. Share your experience.",
        time: "3 months ago",
        href: "/projects/PRJ-2606-0041/review",
        unread: false,
      },
    ],
  },
];

export default function NotificationsPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-[28px] font-semibold text-white sm:text-[32px]">
            Notifications
          </h1>
          <p className="mt-1 text-[14px] text-slate-400">
            Updates on your estimates, project milestones and account.
          </p>
        </div>
        <button
          type="button"
          className="focus-ring flex items-center gap-1.5 rounded-xl border border-white/9 bg-white/4 px-3 py-2 text-[13px] text-slate-400 transition-colors hover:bg-white/7 hover:text-white"
        >
          <CheckCheck className="h-4 w-4" aria-hidden="true" />
          Mark all read
        </button>
      </div>

      {/* Grouped list */}
      <div className="flex flex-col gap-8">
        {NOTIFICATIONS.map(({ group, items }) => (
          <section key={group} aria-label={group}>
            <h2 className="mb-3 text-[12px] font-semibold uppercase tracking-wide text-slate-500">
              {group}
            </h2>
            <div className="glass flex flex-col divide-y divide-white/[0.06] overflow-hidden rounded-2xl">
              {items.map((n) => {
                const { Icon, className } = ICON_CONFIG[n.type];
                return (
                  <Link
                    key={n.id}
                    href={n.href}
                    className={cn(
                      "focus-ring flex items-start gap-4 px-5 py-4 transition-colors hover:bg-white/4",
                      n.unread && "bg-gold/[0.025]",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl",
                        className,
                      )}
                    >
                      <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[14px] font-semibold text-white">
                          {n.title}
                        </span>
                        {n.unread && (
                          <span className="h-2 w-2 shrink-0 rounded-full bg-gold" aria-label="Unread" />
                        )}
                      </div>
                      <p className="mt-0.5 text-[13px] leading-relaxed text-slate-400">
                        {n.body}
                      </p>
                      <span className="mt-1 block text-[11px] text-slate-600">
                        {n.time}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Empty state if all read */}
      {NOTIFICATIONS.every((g) => g.items.length === 0) && (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white/5">
            <Bell className="h-8 w-8 text-slate-500" aria-hidden="true" />
          </span>
          <p className="text-[16px] font-semibold text-slate-400">
            You&apos;re all caught up
          </p>
          <p className="text-[14px] text-slate-500">
            No new notifications right now.
          </p>
        </div>
      )}
    </div>
  );
}
