import { cn } from "@wahab/utils";

interface LogoMarkProps {
  className?: string;
}

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-5 w-5", className)}
      aria-hidden="true"
    >
      {/* Sun rays */}
      <g stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
        <line x1="12" y1="1.5" x2="12" y2="3.5" />
        <line x1="7.5" y1="3" x2="8.8" y2="4.8" />
        <line x1="16.5" y1="3" x2="15.2" y2="4.8" />
        <line x1="4" y1="7" x2="6" y2="7.5" />
        <line x1="20" y1="7" x2="18" y2="7.5" />
      </g>
      {/* Sun arc */}
      <path
        d="M8.5 8.5a3.5 3.5 0 0 1 7 0"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      {/* Diamond (solar panel array) */}
      <path
        d="M12 8L18 14 12 20 6 14z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      {/* Panel grid lines */}
      <line
        x1="12"
        y1="8"
        x2="12"
        y2="20"
        stroke="currentColor"
        strokeWidth={0.75}
        opacity={0.5}
      />
      <line
        x1="6"
        y1="14"
        x2="18"
        y2="14"
        stroke="currentColor"
        strokeWidth={0.75}
        opacity={0.5}
      />
    </svg>
  );
}
