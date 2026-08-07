import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Under maintenance — Al-Wahab Solar Traders",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 py-20 text-center">
      {/* Ambient blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/6 blur-[140px]" />
        <div className="absolute right-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-cyan/4 blur-[100px]" />
      </div>

      <div className="relative z-10 flex max-w-lg flex-col items-center gap-8">
        {/* Animated sun */}
        <div className="relative flex h-28 w-28 items-center justify-center">
          <div className="absolute inset-0 animate-[glow_2.6s_ease-in-out_infinite] rounded-full bg-gold/15 blur-3xl" />
          <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-gold/25 bg-white/5 backdrop-blur-sm">
            <svg viewBox="0 0 48 48" className="h-14 w-14" aria-hidden="true">
              <circle cx="24" cy="24" r="9" fill="#FFB800" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <line
                  key={deg}
                  x1="24"
                  y1="24"
                  x2={24 + 20 * Math.cos((deg * Math.PI) / 180)}
                  y2={24 + 20 * Math.sin((deg * Math.PI) / 180)}
                  stroke="#FFB800"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.5"
                />
              ))}
            </svg>
          </div>
        </div>

        {/* Copy */}
        <div className="flex flex-col gap-3">
          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Back shortly
          </h1>
          <p className="text-lg font-medium text-gold">
            We&apos;re upgrading the system
          </p>
          <p className="text-[15px] leading-relaxed text-slate-400">
            Al-Wahab Solar Traders is undergoing scheduled maintenance. We
            should be back online within a few hours. Thank you for your
            patience.
          </p>
        </div>

        {/* Contact fallback */}
        <div className="glass rounded-2xl px-6 py-5 text-left">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Need urgent help?
          </p>
          <div className="flex flex-col gap-2 text-[14px]">
            <a
              href="tel:+924211176576"
              className="flex items-center gap-2 text-slate-300 transition-colors hover:text-gold"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.71 2 2 0 012-2.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.22 6.22l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              +92 42 3200 0000
            </a>
            <a
              href="https://wa.me/923294777785"
              className="flex items-center gap-2 text-slate-300 transition-colors hover:text-gold"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 shrink-0"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
