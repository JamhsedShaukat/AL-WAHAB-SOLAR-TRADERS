import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = {
  title: "Settings",
};

export default function AdminSettingsPage() {
  return (
    <PagePlaceholder
      title={"Settings"}
      description={"Business, security, notification and integration settings."}
      spec="docs/05-admin-panel.md §A-15"
    />
  );
}
