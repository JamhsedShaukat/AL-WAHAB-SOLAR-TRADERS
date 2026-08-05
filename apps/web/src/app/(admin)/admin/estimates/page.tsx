import type { Metadata } from "next";
import { EstimatesListClient } from "@/components/admin/estimates-list";

export const metadata: Metadata = { title: "Estimations" };

export default function AdminEstimatesPage() {
  return <EstimatesListClient />;
}
