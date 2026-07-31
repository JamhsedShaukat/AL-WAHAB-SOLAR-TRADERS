import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = {
  title: "Leads",
};

export default function AdminLeadsPage() {
  return (
    <PagePlaceholder
      title={"Leads"}
      description={"Enquiries and unconverted estimates worth following up."}
      spec="docs/05-admin-panel.md §A-22"
    />
  );
}
