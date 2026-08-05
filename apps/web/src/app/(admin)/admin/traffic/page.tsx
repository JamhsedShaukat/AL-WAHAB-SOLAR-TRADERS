import type { Metadata } from "next";
import { TrafficClient } from "@/components/admin/traffic-client";

export const metadata: Metadata = { title: "Visitor traffic" };

export default function AdminTrafficPage() {
  return <TrafficClient />;
}
