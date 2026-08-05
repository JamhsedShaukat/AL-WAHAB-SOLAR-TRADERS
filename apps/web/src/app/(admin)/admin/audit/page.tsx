import type { Metadata } from "next";
import { AuditLogsClient } from "@/components/admin/audit-logs-client";

export const metadata: Metadata = { title: "Audit logs" };

export default function AdminAuditPage() {
  return <AuditLogsClient />;
}
