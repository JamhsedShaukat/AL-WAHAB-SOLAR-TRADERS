import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = {
  title: "My estimates",
};

export default function EstimatesPage() {
  return (
    <PagePlaceholder
      title={"My estimates"}
      description={"Every estimate you have saved, newest first."}
      spec="docs/03-design-system.md §S-17"
    />
  );
}
