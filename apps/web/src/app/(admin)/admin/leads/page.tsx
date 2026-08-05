import type { Metadata } from "next";
import { LeadsKanbanClient } from "@/components/admin/leads-kanban";

export const metadata: Metadata = { title: "Leads" };

export default function AdminLeadsPage() {
  return <LeadsKanbanClient />;
}
