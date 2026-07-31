"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps extends React.ComponentPropsWithoutRef<
  typeof SwitchPrimitive.Root
> {
  label?: string;
}

export const Switch = forwardRef<
  React.ComponentRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, label, id, ...props }, ref) => {
  const switchId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex items-center gap-3">
      <SwitchPrimitive.Root
        id={switchId}
        ref={ref}
        className={cn(
          "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-white/10 transition-colors duration-200",
          "focus-ring",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "data-[state=unchecked]:bg-white/10",
          "data-[state=checked]:bg-linear-to-r data-[state=checked]:from-gold data-[state=checked]:to-amber data-[state=checked]:border-gold/30",
          className,
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            "pointer-events-none block h-4.5 w-4.5 rounded-full shadow-sm transition-transform duration-200",
            "data-[state=unchecked]:translate-x-0.5 data-[state=unchecked]:bg-slate-300",
            "data-[state=checked]:translate-x-5.5 data-[state=checked]:bg-navy-950",
          )}
        />
      </SwitchPrimitive.Root>
      {label && (
        <label
          htmlFor={switchId}
          className="text-[14px] text-slate-300 cursor-pointer select-none"
        >
          {label}
        </label>
      )}
    </div>
  );
});
Switch.displayName = "Switch";
