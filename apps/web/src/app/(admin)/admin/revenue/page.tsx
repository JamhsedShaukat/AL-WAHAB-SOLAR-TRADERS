import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = {
  title: "Revenue",
};

export default function AdminRevenuePage() {
  return (
    <PagePlaceholder
      title={"Revenue"}
      description={"Booked, invoiced and collected revenue over time."}
      spec="docs/05-admin-panel.md §A-06"
    />
  );
}
