import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <PagePlaceholder
      title={"Projects"}
      description={"Track your installation from survey through commissioning."}
      spec="docs/03-design-system.md §S-19"
    />
  );
}
