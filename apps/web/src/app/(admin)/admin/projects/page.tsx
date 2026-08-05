import type { Metadata } from "next";
import { ProjectsListClient } from "@/components/admin/projects-list";

export const metadata: Metadata = { title: "Projects" };

export default function AdminProjectsPage() {
  return <ProjectsListClient />;
}
