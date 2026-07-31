import { Menu } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Badge } from "@wahab/ui";

export function AdminTopbar() {
  return (
    <header className="glass sticky top-0 z-20 flex items-center justify-between gap-4 px-5 py-3.5">
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Open navigation"
          className="focus-ring rounded-lg p-1.5 text-slate-300 transition-colors hover:bg-white/6 hover:text-white lg:hidden"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
        <Logo href="/admin" className="lg:hidden" />
      </div>

      <Badge variant="gold">Staff</Badge>
    </header>
  );
}
