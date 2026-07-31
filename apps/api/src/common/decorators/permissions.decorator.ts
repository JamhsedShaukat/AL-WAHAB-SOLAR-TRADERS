import { SetMetadata } from "@nestjs/common";
import type { PermissionKey } from "@wahab/types";

export const PERMISSIONS_KEY = "permissions";

/**
 * Declares the permissions a caller must hold. The permissions guard reads this
 * metadata; the keys are the same set the admin nav is built from.
 */
export const RequirePermissions = (...permissions: PermissionKey[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
