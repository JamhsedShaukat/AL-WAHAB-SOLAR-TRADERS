"use client";

import { MoveLeft } from "lucide-react";

export function BackButton() {
  return (
    <button
      type="button"
      onClick={() => window.history.back()}
      className="focus-ring inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-[14px] font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
    >
      <MoveLeft className="h-4 w-4" aria-hidden="true" />
      Go back
    </button>
  );
}
