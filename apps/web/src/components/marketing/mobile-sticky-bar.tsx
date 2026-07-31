"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Zap } from "lucide-react";

export function MobileStickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      const scrollPct =
        window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight);
      setVisible(scrollPct > 0.4);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 p-3 transition-all duration-300 sm:hidden ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="glass-strong flex items-center justify-between gap-3 rounded-2xl px-4 py-3">
        <div className="min-w-0">
          <p className="truncate text-[14px] font-medium text-white">
            Free solar estimate
          </p>
          <p className="text-[12px] text-slate-400">Takes about 2 minutes</p>
        </div>
        <Link
          href="/estimate"
          className="focus-ring inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-linear-to-r from-gold to-amber px-4 py-2 text-sm font-semibold text-navy-950 shadow-cta transition-all duration-200 active:scale-[0.96]"
        >
          <Zap className="h-4 w-4" aria-hidden="true" />
          Start
        </Link>
      </div>
    </div>
  );
}
