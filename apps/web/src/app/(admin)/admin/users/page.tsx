import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = {
  title: "Users",
};

export default function AdminUsersPage() {
  return (
    <PagePlaceholder
      title={"Users"}
      description={"Every registered customer and staff account."}
      spec="docs/05-admin-panel.md §A-09"
    />
  );
}
