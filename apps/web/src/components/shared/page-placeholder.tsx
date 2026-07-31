import type { ReactNode } from "react";

interface PagePlaceholderProps {
  title: string;
  description: string;
  /** Spec section that defines this screen, e.g. "docs/05-admin-panel.md §A-04". */
  spec?: string;
  children?: ReactNode;
}

/**
 * Stand-in body for a scaffolded screen. Replace with the real implementation
 * as each module is built out — the heading and spacing match the shell so
 * swapping it in does not shift the layout.
 */
export function PagePlaceholder({
  title,
  description,
  spec,
  children,
}: PagePlaceholderProps) {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1.5">
        <h1 className="font-display text-2xl font-semibold text-white">
          {title}
        </h1>
        <p className="text-[15px] text-slate-400">{description}</p>
      </header>

      {children ?? (
        <div className="glass flex min-h-60 flex-col items-center justify-center gap-2 rounded-2xl p-10 text-center">
          <p className="text-[15px] font-medium text-slate-300">
            Not built yet
          </p>
          {spec && (
            <p className="text-[13px] text-slate-500">
              Specified in <code className="text-slate-400">{spec}</code>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
