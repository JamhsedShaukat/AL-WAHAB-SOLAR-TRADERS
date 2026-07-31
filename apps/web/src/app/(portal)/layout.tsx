import { PortalSidebar } from "@/components/portal/portal-sidebar";
import { PortalTopbar } from "@/components/portal/portal-topbar";

/**
 * Client portal shell. Routes under this group are authenticated and scoped to
 * the signed-in user's own records — gating lands in `src/proxy.ts` plus a
 * server-side session check once the auth module exists.
 */
export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative z-10 flex min-h-dvh">
      <PortalSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <PortalTopbar />
        <main className="flex-1 px-5 py-6 sm:px-8 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
