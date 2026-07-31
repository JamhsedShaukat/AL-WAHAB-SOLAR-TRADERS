import { type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@wahab/utils";

export const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-1 text-[12px] font-medium border",
  {
    variants: {
      variant: {
        default: "border-white/10 bg-white/5 text-slate-300",
        gold: "border-gold/30 bg-gold/15 text-gold",
        cyan: "border-cyan/30 bg-cyan/15 text-cyan",
        amber: "border-amber/30 bg-amber/15 text-amber",
        emerald: "border-emerald-400/30 bg-emerald-400/15 text-emerald-400",
        red: "border-red-400/30 bg-red-400/15 text-red-400",
        violet: "border-violet-400/30 bg-violet-400/15 text-violet-400",
        slate: "border-slate-400/30 bg-slate-400/15 text-slate-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, className }))} {...props} />
  );
}
