import type { Metadata } from "next";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminTopbar } from "@/components/admin/admin-topbar";

export const metadata: Metadata = {
  title: "Admin",
  // Staff-only surface: keep it out of search indexes entirely.
  robots: { index: false, follow: false },
};

/**
 * Admin portal shell. Per docs/05-admin-panel.md, non-staff requests to
 * `/admin/**` must return 404 rather than 403 — that check belongs in
 * `src/proxy.ts` plus a server-side permission guard once auth exists.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative z-10 flex min-h-dvh">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar />
        <main className="flex-1 px-5 py-6 sm:px-8 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
