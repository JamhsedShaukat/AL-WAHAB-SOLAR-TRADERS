import type { Metadata } from "next";
import { RevenueClient } from "@/components/admin/revenue-client";

export const metadata: Metadata = { title: "Revenue" };

export default function AdminRevenuePage() {
  return <RevenueClient />;
}
