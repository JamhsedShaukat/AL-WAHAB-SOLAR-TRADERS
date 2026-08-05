import type { Metadata } from "next";
import { ActivityFeedClient } from "@/components/admin/activity-feed";

export const metadata: Metadata = { title: "Activity logs" };

export default function AdminActivityPage() {
  return <ActivityFeedClient />;
}
