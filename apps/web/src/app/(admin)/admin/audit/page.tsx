import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = {
  title: "Audit logs",
};

export default function AdminAuditPage() {
  return (
    <PagePlaceholder
      title={"Audit logs"}
      description={"Immutable record of every privileged action."}
      spec="docs/05-admin-panel.md §A-18"
    />
  );
}
