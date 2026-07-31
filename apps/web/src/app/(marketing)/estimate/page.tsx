import type { Metadata } from "next";
import { Container } from "@wahab/ui";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = {
  title: "Get your estimate",
  description:
    "Answer a few questions or upload your LESCO bill to get an accurate solar estimate in about two minutes.",
};

export default function EstimatePage() {
  return (
    <Container className="py-24 sm:py-32">
      <PagePlaceholder
        title="Get your estimate"
        description="Answer a few questions or upload your LESCO bill for an accurate estimate in about two minutes."
        spec="docs/03-design-system.md §S-06 – §S-09"
      />
    </Container>
  );
}
