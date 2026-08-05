import type { Metadata } from "next";
import { UsersListClient } from "@/components/admin/users-list";

export const metadata: Metadata = { title: "Users" };

export default function AdminUsersPage() {
  return <UsersListClient />;
}
