import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = {
  title: "Projects",
};

export default function AdminProjectsPage() {
  return (
    <PagePlaceholder
      title={"Projects"}
      description={"All installations and their current stage."}
      spec="docs/05-admin-panel.md §A-04"
    />
  );
}
