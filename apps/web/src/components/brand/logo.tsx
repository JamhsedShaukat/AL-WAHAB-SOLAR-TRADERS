import Link from "next/link";
import { LogoMark } from "@/components/brand/logo-mark";
import { cn } from "@wahab/utils";

interface LogoProps {
  className?: string;
  /** Where the lock-up links to. Defaults to the public homepage. */
  href?: string;
}

export function Logo({ className, href = "/" }: LogoProps) {
  return (
    <Link
      href={href}
      className={cn(
        "focus-ring flex items-center gap-2.5 rounded-lg group",
        className,
      )}
    >
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-linear-to-br from-gold to-amber shadow-mark">
        <LogoMark className="h-5 w-5 text-navy-950" />
      </span>
      <span className="font-display text-[18px] font-semibold leading-tight tracking-tight text-white">
        Al-Wahab <span className="text-gold">Solar Traders</span>
      </span>
    </Link>
  );
}
