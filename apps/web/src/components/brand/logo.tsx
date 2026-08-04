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
      <LogoMark className="h-10 w-10 shrink-0" />
      <span className="font-display text-[18px] font-semibold leading-tight tracking-tight text-white">
        Al-Wahab{" "}
        <span className="text-gold">Solar Traders</span>
      </span>
    </Link>
  );
}

