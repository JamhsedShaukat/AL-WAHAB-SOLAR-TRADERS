import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = {
  title: "Website analytics",
};

export default function AdminAnalyticsPage() {
  return (
    <PagePlaceholder
      title={"Website analytics"}
      description={"Funnel, conversion and drop-off across the estimator."}
      spec="docs/05-admin-panel.md §A-07"
    />
  );
}
