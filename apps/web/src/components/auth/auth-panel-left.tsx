import { CheckCircle2 } from "lucide-react";
import { Logo } from "@/components/brand/logo";

const BENEFITS = [
  "Installed by our own certified team",
  "Your itemised estimate, saved securely",
  "Track every phase of your installation",
];

const RAY_ANGLES = Array.from({ length: 16 }, (_, i) => i * 22.5);

export function AuthPanelLeft() {
  return (
    <div className="relative hidden flex-col justify-between overflow-hidden border-r border-white/7 p-12 lg:flex">
      {/* Decorative sun rays */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-28 top-1/2 -translate-y-1/2 opacity-50"
      >
        <div className="relative h-140 w-140">
          {RAY_ANGLES.map((deg, i) => (
            <span
              key={deg}
              className="absolute left-1/2 top-1/2 h-px w-70 origin-left bg-linear-to-r from-gold/70 to-transparent"
              style={{
                transform: `rotate(${deg}deg)`,
                animation: `rayPulse 4s ease-in-out ${(i * 0.1).toFixed(1)}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10">
        <Logo />
      </div>

      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h2 className="font-display text-[30px] font-semibold leading-tight text-white">
            Save your estimate.
            <br />
            Compare. Track.
          </h2>
          <p className="text-[15px] leading-relaxed text-slate-400">
            An honest, itemised price in 3 minutes. Your account is free and
            carries no obligation.
          </p>
        </div>

        <ul className="flex flex-col gap-3.5">
          {BENEFITS.map((benefit) => (
            <li
              key={benefit}
              className="flex items-center gap-3 text-[15px] text-slate-300"
            >
              <CheckCircle2 className="h-5 w-5 shrink-0 text-gold" />
              {benefit}
            </li>
          ))}
        </ul>
      </div>

      <p className="relative z-10 text-[13px] text-slate-500">
        © {new Date().getFullYear()} Al-Wahab Solar Traders
      </p>
    </div>
  );
}
