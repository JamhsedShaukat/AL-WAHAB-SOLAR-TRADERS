"use client";

import { useEffect } from "react";
import { RefreshCw } from "lucide-react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log to an error reporting service in production.
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 py-20 text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber/5 blur-[120px]" />
      </div>

      <div className="relative z-10 flex max-w-md flex-col items-center gap-8">
        {/* Icon */}
        <div className="relative flex h-20 w-20 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-amber/10 blur-2xl" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-amber/20 bg-white/5">
            <svg
              viewBox="0 0 24 24"
              className="h-9 w-9 text-amber"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-display text-[72px] font-bold leading-none tracking-tight text-amber/80">
            500
          </p>
          <h1 className="text-2xl font-semibold text-white">
            Something went wrong
          </h1>
          <p className="text-[15px] leading-relaxed text-slate-400">
            An unexpected error occurred. Our team has been notified. Please try
            again or come back shortly.
          </p>
          {error.digest && (
            <p className="mt-1 font-mono text-xs text-slate-600">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={reset}
          className="focus-ring inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-amber to-gold px-5 py-2.5 text-[14px] font-semibold text-navy-950 shadow-cta transition-shadow hover:shadow-cta-hover"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Try again
        </button>
      </div>
    </div>
  );
}
