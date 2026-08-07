import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  name: string;
  path: string;
}

/**
 * Visible breadcrumbs. Always paired with BreadcrumbList JSON-LD — Google shows
 * the trail in results instead of a bare URL, which lifts click-through.
 */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-[13px]">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight
                  className="h-3.5 w-3.5 text-slate-600"
                  aria-hidden="true"
                />
              )}
              {isLast ? (
                <span className="font-medium text-slate-300" aria-current="page">
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.path}
                  className="focus-ring rounded text-slate-500 transition-colors hover:text-gold"
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
