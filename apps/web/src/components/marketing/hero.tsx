import Link from "next/link";
import { ArrowRight, FileUp, LayoutGrid, Sun } from "lucide-react";
import { Container } from "@/components/ui/container";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-32 pb-20">
      {/* Decorative sun orb */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-8%] top-[2%] -z-0"
      >
        <div
          className="h-[46vh] w-[46vh] rounded-full blur-[2px]"
          style={{
            background:
              "radial-gradient(circle at 40% 40%, rgba(255,224,138,0.55), rgba(255,140,0,0.3) 38%, rgba(255,140,0,0.06) 62%, transparent 72%)",
          }}
        />
      </div>

      {/* Main grid */}
      <Container className="relative grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left column — text */}
        <div>
          {/* Eyebrow pill */}
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-3.5 py-1.5 text-[12.5px] font-medium text-slate-300 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
            </span>
            Lahore&apos;s solar estimator — by Al-Wahab Solar Traders
          </span>

          {/* Heading */}
          <h1 className="font-display mt-6 text-[44px] leading-[1.04] tracking-tight text-white sm:text-[58px] lg:text-[64px]">
            Get an accurate solar estimate{" "}
            <span className="text-gradient-gold">in 2 minutes</span>
          </h1>

          {/* Lede */}
          <p className="mt-6 max-w-xl text-[17.5px] leading-relaxed text-slate-400">
            Answer a few questions or upload your LESCO bill. We price your
            system on live Lahore market rates — then our own certified team
            supplies and installs it. Free, with no hidden costs.
          </p>

          {/* CTAs */}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/estimate"
              className="focus-ring group relative inline-flex items-center justify-center overflow-hidden rounded-xl transition-all duration-200 active:scale-[0.96] text-base px-8 py-4 gap-2.5 text-navy-950 font-semibold bg-linear-to-r from-gold to-amber shadow-cta hover:shadow-cta-hover hover:brightness-105 animate-glow"
            >
              <span className="relative z-10 whitespace-nowrap">
                Get your free solar estimate
              </span>
              <ArrowRight className="h-4.5 w-4.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>

            <Link
              href="/#how"
              className="focus-ring group inline-flex items-center justify-center rounded-xl transition-all duration-200 active:scale-[0.96] text-base px-8 py-4 gap-2.5 text-white font-medium border border-white/20 bg-white/4 backdrop-blur hover:bg-white/8 hover:border-white/35"
            >
              <span className="relative z-10 whitespace-nowrap">
                See how it works
              </span>
            </Link>
          </div>

          {/* Bill upload hint */}
          <Link
            href="/estimate?start=upload"
            className="group mt-5 inline-flex items-center gap-2 text-[14.5px] font-medium text-slate-300 transition-colors duration-200 hover:text-white"
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-cyan/12 text-cyan transition-transform duration-200 group-hover:scale-110">
              <FileUp className="h-4 w-4" />
            </span>
            Upload your electricity bill for the most accurate estimate
            <ArrowRight className="h-4 w-4 text-slate-500 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>

          {/* Live prices indicator */}
          <div className="mt-7 flex items-center gap-2.5 text-[13.5px] text-slate-400">
            <span className="flex h-2 w-2">
              <span className="h-2 w-2 rounded-full bg-[#5ad19a] shadow-[0_0_8px_2px_rgba(90,209,154,0.6)]" />
            </span>
            Powered by live Lahore market prices
          </div>
        </div>

        {/* Right column — floating estimate card */}
        <div className="relative hidden lg:block">
          <div className="relative" style={{ transform: "rotateY(-6deg) rotateX(4deg)", perspective: "800px" }}>
            {/* Gold glow */}
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gold/10 blur-3xl" />

            {/* Card body */}
            <div className="relative rounded-3xl border border-white/10 bg-linear-to-br from-[#0e1730] to-[#0a1020] p-3 shadow-card">
              {/* Solar panel grid */}
              <div className="grid grid-cols-6 gap-1.5 rounded-2xl bg-[#070d1c] p-2">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-[3px] bg-linear-to-br from-[#13335c] to-[#0a1c38] shadow-[inset_0_0_0_1px_rgba(120,180,255,0.12)]"
                  />
                ))}
              </div>
              {/* Glass shine */}
              <div
                className="pointer-events-none absolute inset-3 rounded-2xl"
                style={{ background: "linear-gradient(125deg, rgba(255,255,255,0.1), transparent 45%)" }}
              />
            </div>

            {/* Badge: system size */}
            <div className="glass-strong absolute -bottom-5 -left-5 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-card">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-cyan/15 text-cyan">
                <LayoutGrid className="h-5 w-5" />
              </span>
              <div>
                <div className="font-display text-lg font-semibold leading-none text-white">
                  6.5 kW
                </div>
                <div className="mt-1 text-[11px] font-medium uppercase tracking-wider text-slate-400">
                  Suggested size
                </div>
              </div>
            </div>

            {/* Badge: monthly savings */}
            <div className="glass-strong absolute -right-4 -top-4 flex items-center gap-2 rounded-2xl px-3.5 py-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gold/15 text-gold">
                <Sun className="h-5 w-5" />
              </span>
              <div className="text-[12px] font-semibold text-white">
                ~PKR 28k{" "}
                <span className="font-normal text-slate-400">/mo saved</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
