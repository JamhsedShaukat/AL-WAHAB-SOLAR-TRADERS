import type { Metadata } from "next";
import { PricingClient } from "@/components/admin/pricing-client";

export const metadata: Metadata = { title: "Pricing" };

export default function AdminPricingPage() {
  return <PricingClient />;
}
