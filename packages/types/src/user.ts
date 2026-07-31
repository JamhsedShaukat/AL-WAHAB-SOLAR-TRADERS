import type { RoleKey } from "./auth";

export type UserStatus = "active" | "suspended" | "deleted";

/** Customer or staff profile — `profiles` table. */
export interface UserProfile {
  id: string;
  fullName: string;
  email?: string;
  phone?: string;
  city: string;
  area?: string;
  address?: string;
  language: "en" | "ur";
  avatarUrl?: string;
  status: UserStatus;
  emailVerified: boolean;
  phoneVerified: boolean;
  marketingOptin: boolean;
  roles: RoleKey[];
  lastSeenAt?: string;
  createdAt: string;
  updatedAt: string;
}
