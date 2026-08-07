import type { PriceMode } from "@wahab/types";
import { cn } from "@wahab/utils";
import { formatPkr } from "@/lib/format";

interface PriceTagProps {
  priceMode: PriceMode;
  pricePkr?: string | null;
  comparePricePkr?: string | null;
  className?: string;
  size?: "sm" | "lg";
}

/**
 * Renders whatever the pricing model allows. Quote-only products show a clear
 * "Price on request" rather than a blank space or a zero.
 */
export function PriceTag({
  priceMode,
  pricePkr,
  comparePricePkr,
  className,
  size = "sm",
}: PriceTagProps) {
  const hasPrice = priceMode !== "on_request" && Boolean(pricePkr);

  if (!hasPrice) {
    return (
      <span
        className={cn(
          "font-display font-semibold text-slate-300",
          size === "lg" ? "text-xl" : "text-[15px]",
          className,
        )}
      >
        Price on request
      </span>
    );
  }

  return (
    <span className={cn("flex flex-wrap items-baseline gap-2", className)}>
      {priceMode === "from" && (
        <span className="text-[13px] font-medium text-slate-400">from</span>
      )}
      <span
        className={cn(
          "font-display font-semibold text-gradient-gold",
          size === "lg" ? "text-2xl" : "text-[17px]",
        )}
      >
        {formatPkr(pricePkr)}
      </span>
      {comparePricePkr && (
        <span className="text-[13px] text-slate-500 line-through">
          {formatPkr(comparePricePkr)}
        </span>
      )}
    </span>
  );
}
