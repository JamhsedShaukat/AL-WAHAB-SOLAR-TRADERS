import type { PermissionKey, RoleKey, SessionUser } from "@wahab/types";

/** Returns true if `user` holds all of `required` permissions. */
export function hasPermission(
  user: SessionUser | null | undefined,
  ...required: PermissionKey[]
): boolean {
  if (!user) return false;
  return required.every((p) => user.permissions.includes(p));
}

/** Returns true if `user` holds at least one of `required` permissions. */
export function hasAnyPermission(
  user: SessionUser | null | undefined,
  ...required: PermissionKey[]
): boolean {
  if (!user) return false;
  return required.some((p) => user.permissions.includes(p));
}

/** Returns true if `user` has the given role (or a higher-privilege role). */
export function hasRole(
  user: SessionUser | null | undefined,
  role: RoleKey,
): boolean {
  if (!user) return false;
  return user.roles.includes(role);
}

/** Returns true for any staff role that may access /admin. */
export function isStaff(user: SessionUser | null | undefined): boolean {
  if (!user) return false;
  const STAFF: RoleKey[] = ["viewer", "sales", "operations", "admin", "super_admin"];
  return user.roles.some((r) => STAFF.includes(r));
}
