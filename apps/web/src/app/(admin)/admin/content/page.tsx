import type { Metadata } from "next";
import { ContentClient } from "@/components/admin/content-client";

export const metadata: Metadata = { title: "Content" };

export default function AdminContentPage() {
  return <ContentClient />;
}
