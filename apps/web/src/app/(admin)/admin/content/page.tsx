import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = {
  title: "Content",
};

export default function AdminContentPage() {
  return (
    <PagePlaceholder
      title={"Content"}
      description={"Marketing copy, FAQs and legal pages."}
      spec="docs/05-admin-panel.md §A-20"
    />
  );
}
