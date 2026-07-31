import type { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  description: string;
  children?: ReactNode;
  footer?: ReactNode;
}

export function AuthCard({
  title,
  description,
  children,
  footer,
}: AuthCardProps) {
  return (
    <div className="glass-strong w-full max-w-110 rounded-2xl p-6 shadow-card sm:p-8">
      <div className="flex flex-col gap-1.5">
        <h1 className="font-display text-xl font-semibold text-white">
          {title}
        </h1>
        <p className="text-[14px] text-slate-400">{description}</p>
      </div>

      {children && <div className="mt-6 flex flex-col gap-4">{children}</div>}

      {footer && (
        <div className="mt-6 border-t border-white/10 pt-5 text-[14px] text-slate-400">
          {footer}
        </div>
      )}
    </div>
  );
}
