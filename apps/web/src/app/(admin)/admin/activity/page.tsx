import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = {
  title: "Activity logs",
};

export default function AdminActivityPage() {
  return (
    <PagePlaceholder
      title={"Activity logs"}
      description={"What customers and staff did, in order."}
      spec="docs/05-admin-panel.md §A-12"
    />
  );
}
