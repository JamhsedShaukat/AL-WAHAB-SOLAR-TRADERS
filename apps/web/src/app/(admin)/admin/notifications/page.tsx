import type { Metadata } from "next";
import { NotificationsClient } from "@/components/admin/notifications-client";

export const metadata: Metadata = { title: "Notifications" };

export default function AdminNotificationsPage() {
  return <NotificationsClient />;
}
