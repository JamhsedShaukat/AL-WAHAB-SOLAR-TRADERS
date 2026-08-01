import { cn } from "@wahab/utils";
import { Sun } from "lucide-react";

interface RoshniProps {
  children: React.ReactNode;
  className?: string;
}

export function Roshni({ children, className }: RoshniProps) {
  return (
    <div className={cn("flex gap-3", className)}>
      {/* Avatar */}
      <div className="shrink-0">
        <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-gold/40 bg-gold/10">
          <Sun className="h-5 w-5 text-gold" aria-hidden="true" />
        </span>
      </div>
      {/* Speech bubble */}
      <div className="glass rounded-2xl rounded-tl-md px-5 py-4 text-[15px] leading-relaxed text-slate-300">
        {children}
      </div>
    </div>
  );
}
