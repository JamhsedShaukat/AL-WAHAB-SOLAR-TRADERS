import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <PagePlaceholder
      title={"Dashboard"}
      description={"Your estimates, active project and next steps at a glance."}
      spec="docs/03-design-system.md §S-15"
    />
  );
}
