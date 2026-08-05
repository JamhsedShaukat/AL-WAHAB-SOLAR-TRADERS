import type { Metadata } from "next";
import { RolesClient } from "@/components/admin/roles-client";

export const metadata: Metadata = { title: "Roles & permissions" };

export default function AdminRolesPage() {
  return <RolesClient />;
}
