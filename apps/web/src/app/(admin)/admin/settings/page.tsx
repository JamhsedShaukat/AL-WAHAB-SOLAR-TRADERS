import type { Metadata } from "next";
import { SettingsClient } from "@/components/admin/settings-client";

export const metadata: Metadata = { title: "Settings" };

export default function AdminSettingsPage() {
  return <SettingsClient />;
}
