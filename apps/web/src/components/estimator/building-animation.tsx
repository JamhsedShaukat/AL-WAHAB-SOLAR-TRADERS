import { Sun } from "lucide-react";

export function BuildingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-24">
      {/* Pulsing sun icon */}
      <div className="relative">
        <span className="absolute inset-0 animate-ping rounded-full bg-gold/20" />
        <span className="absolute inset-[-14px] animate-pulse rounded-full bg-gold/8" />
        <div className="relative grid h-24 w-24 place-items-center rounded-full border border-gold/30 bg-gold/10">
          <Sun
            className="h-12 w-12 text-gold"
            style={{ animation: "spin 3s linear infinite" }}
          />
        </div>
      </div>

      <div className="text-center">
        <p className="font-display text-[20px] font-semibold text-white">
          Building your estimate…
        </p>
        <p className="mt-2 text-[14px] text-slate-400">
          Running the numbers on live Lahore prices
        </p>
      </div>

      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-2 w-2 animate-bounce rounded-full bg-gold"
            style={{ animationDelay: `${i * 0.18}s` }}
          />
        ))}
      </div>
    </div>
  );
}
