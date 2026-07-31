import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = {
  title: "Notifications",
};

export default function NotificationsPage() {
  return (
    <PagePlaceholder
      title={"Notifications"}
      description={"Updates on your estimates, project milestones and account."}
      spec="docs/03-design-system.md §S-20"
    />
  );
}
