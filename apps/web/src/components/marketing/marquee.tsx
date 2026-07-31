const pills = [
  "Live Lahore market prices",
  "Our own certified team",
  "Itemized breakdowns",
  "No hidden costs",
  "Net-metering handled",
  "Free for homeowners",
] as const;

export function Marquee() {
  return (
    <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      <div className="flex w-max items-center gap-3 animate-marquee hover:[animation-play-state:paused]">
        {/* Render pills twice for seamless loop */}
        {[...pills, ...pills].map((text, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-white/3 px-4 py-2 text-[14px] font-medium text-slate-300"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
