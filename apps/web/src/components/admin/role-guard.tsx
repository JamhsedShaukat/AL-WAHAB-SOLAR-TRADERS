import { notFound } from "next/navigation";
import type { PermissionKey, SessionUser } from "@wahab/types";
import { hasPermission } from "@/lib/permissions";

interface RoleGuardProps {
  /** The authenticated principal. Pass `null` when no session exists. */
  user: SessionUser | null | undefined;
  /** All listed permissions must be present. Defaults to staff-only check. */
  require?: PermissionKey[];
  children: React.ReactNode;
}

/**
 * Server-side guard for admin pages.
 * Per docs/05-admin-panel.md: non-staff gets 404, not 403.
 * Usage: wrap the page body with <RoleGuard user={session?.user} require={["users.read"]}>
 */
export function RoleGuard({ user, require = [], children }: RoleGuardProps) {
  const isStaff = user?.roles.some((r) =>
    ["viewer", "sales", "operations", "admin", "super_admin"].includes(r),
  );

  if (!isStaff) {
    notFound();
  }

  if (require.length > 0 && !hasPermission(user, ...require)) {
    notFound();
  }

  return <>{children}</>;
}
