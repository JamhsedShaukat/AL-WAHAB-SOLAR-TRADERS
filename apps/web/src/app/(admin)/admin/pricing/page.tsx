import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = {
  title: "Pricing & rate cards",
};

export default function AdminPricingPage() {
  return (
    <PagePlaceholder
      title={"Pricing & rate cards"}
      description={"Panel, inverter and labour rates that drive every estimate."}
      spec="docs/05-admin-panel.md §A-19"
    />
  );
}
