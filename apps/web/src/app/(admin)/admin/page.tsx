import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function AdminDashboardPage() {
  return (
    <PagePlaceholder
      title={"Dashboard"}
      description={"Business health at a glance — leads, estimates, projects and revenue."}
      spec="docs/05-admin-panel.md §A-01"
    />
  );
}
