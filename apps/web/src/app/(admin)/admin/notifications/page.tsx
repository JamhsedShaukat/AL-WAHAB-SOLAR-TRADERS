import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = {
  title: "Notifications",
};

export default function AdminNotificationsPage() {
  return (
    <PagePlaceholder
      title={"Notifications"}
      description={"Compose and send notifications to customer segments."}
      spec="docs/05-admin-panel.md §A-17"
    />
  );
}
