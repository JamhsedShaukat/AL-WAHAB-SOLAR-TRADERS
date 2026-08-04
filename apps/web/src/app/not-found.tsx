import Link from "next/link";
import { Home, MoveLeft } from "lucide-react";
import { BackButton } from "@/components/shared/back-button";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 py-20 text-center">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-[120px]" />
        <div className="absolute left-1/3 top-2/3 h-[400px] w-[400px] rounded-full bg-cyan/4 blur-[100px]" />
      </div>

      <div className="relative z-10 flex max-w-md flex-col items-center gap-8">
        {/* Sun icon */}
        <div className="relative flex h-24 w-24 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gold/10 blur-2xl" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-gold/20 bg-white/5">
            <svg
              viewBox="0 0 48 48"
              className="h-12 w-12"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="24" cy="24" r="9" fill="#FFB800" opacity="0.9" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <line
                  key={deg}
                  x1="24"
                  y1="24"
                  x2={24 + 18 * Math.cos((deg * Math.PI) / 180)}
                  y2={24 + 18 * Math.sin((deg * Math.PI) / 180)}
                  stroke="#FFB800"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.45"
                />
              ))}
            </svg>
          </div>
        </div>

        {/* Error code */}
        <div className="flex flex-col gap-2">
          <p className="font-display text-[80px] font-bold leading-none tracking-tight text-gradient-gold">
            404
          </p>
          <h1 className="text-2xl font-semibold text-white">Page not found</h1>
          <p className="text-[15px] leading-relaxed text-slate-400">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Head back home and we&apos;ll get you on track.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="focus-ring inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-amber to-gold px-5 py-2.5 text-[14px] font-semibold text-navy-950 shadow-cta transition-shadow hover:shadow-cta-hover"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            Go home
          </Link>
          <BackButton />
        </div>
      </div>
    </div>
  );
}
