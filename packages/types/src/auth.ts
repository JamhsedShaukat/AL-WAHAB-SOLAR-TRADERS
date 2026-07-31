/** Roles, lowest to highest privilege — docs/02-technical-design.md §5.1. */
export const ROLE_KEYS = [
  "customer",
  "viewer",
  "sales",
  "operations",
  "admin",
  "super_admin",
] as const;

export type RoleKey = (typeof ROLE_KEYS)[number];

/** Roles that may reach `/admin/**`. Everyone else gets a 404. */
export const STAFF_ROLES: readonly RoleKey[] = [
  "viewer",
  "sales",
  "operations",
  "admin",
  "super_admin",
];

/** Permission seed set — docs/02-technical-design.md §5.2. */
export const PERMISSION_KEYS = [
  "dashboard.view",
  "users.read",
  "users.write",
  "users.suspend",
  "users.impersonate",
  "users.delete",
  "estimates.read",
  "estimates.write",
  "estimates.override_price",
  "estimates.delete",
  "estimates.convert",
  "projects.read",
  "projects.write",
  "projects.assign",
  "projects.delete",
  "payments.read",
  "payments.write",
  "leads.read",
  "leads.write",
  "reviews.moderate",
  "analytics.view",
  "traffic.view",
  "revenue.view",
  "activity.view",
  "audit.view",
  "export.csv",
  "export.pdf",
  "settings.read",
  "settings.write",
  "pricing.read",
  "pricing.write",
  "content.write",
  "roles.manage",
  "notifications.send",
] as const;

export type PermissionKey = (typeof PERMISSION_KEYS)[number];

export interface Role {
  id: number;
  key: RoleKey;
  name: string;
  description?: string;
  isSystem: boolean;
}

/** The authenticated principal, as resolved from the access token. */
export interface SessionUser {
  id: string;
  fullName: string;
  email?: string;
  phone?: string;
  roles: RoleKey[];
  permissions: PermissionKey[];
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  /** Access-token lifetime in seconds. */
  expiresIn: number;
}

export function isStaff(roles: readonly RoleKey[]): boolean {
  return roles.some((role) => STAFF_ROLES.includes(role));
}
