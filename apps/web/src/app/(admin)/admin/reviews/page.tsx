import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = {
  title: "Reviews",
};

export default function AdminReviewsPage() {
  return (
    <PagePlaceholder
      title={"Reviews"}
      description={"Moderate customer reviews before they appear on the site."}
      spec="docs/05-admin-panel.md §A-21"
    />
  );
}
