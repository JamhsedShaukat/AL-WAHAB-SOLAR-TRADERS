import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = {
  title: "Visitor traffic",
};

export default function AdminTrafficPage() {
  return (
    <PagePlaceholder
      title={"Visitor traffic"}
      description={"Sessions, sources and geography."}
      spec="docs/05-admin-panel.md §A-08"
    />
  );
}
