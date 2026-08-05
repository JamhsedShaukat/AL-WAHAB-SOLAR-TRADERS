import type { Metadata } from "next";
import { AnalyticsClient } from "@/components/admin/analytics-client";

export const metadata: Metadata = { title: "Analytics" };

export default function AdminAnalyticsPage() {
  return <AnalyticsClient />;
}
