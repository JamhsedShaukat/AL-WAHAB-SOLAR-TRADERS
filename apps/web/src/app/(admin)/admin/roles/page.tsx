import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = {
  title: "Roles & permissions",
};

export default function AdminRolesPage() {
  return (
    <PagePlaceholder
      title={"Roles & permissions"}
      description={"Staff roles and the permissions attached to each."}
      spec="docs/05-admin-panel.md §A-16"
    />
  );
}
