import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = {
  title: "Estimations",
};

export default function AdminEstimatesPage() {
  return (
    <PagePlaceholder
      title={"Estimations"}
      description={"Every estimate generated across the site."}
      spec="docs/05-admin-panel.md §A-05"
    />
  );
}
