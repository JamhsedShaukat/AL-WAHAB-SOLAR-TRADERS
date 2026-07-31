import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  heading: string;
  lede?: string;
  align?: "left" | "center";
  accentColor?: "gold" | "cyan";
}

export function SectionHeading({
  eyebrow,
  heading,
  lede,
  align = "left",
  accentColor = "gold",
}: SectionHeadingProps) {
  const color = accentColor === "gold" ? "text-gold" : "text-cyan";
  const bar =
    accentColor === "gold" ? "bg-gold/60" : "bg-cyan/60";

  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center"
      )}
    >
      <span
        className={cn(
          "inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.22em]",
          color
        )}
      >
        <span className={cn("h-px w-7", bar)} />
        {eyebrow}
      </span>
      <h2 className="font-display mt-5 text-[34px] leading-[1.08] font-semibold tracking-tight text-white sm:text-[44px]">
        {heading}
      </h2>
      {lede && (
        <p className="mt-5 text-[17px] leading-relaxed text-slate-400">
          {lede}
        </p>
      )}
    </div>
  );
}
