import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard } from "@/components/auth/auth-card";

export const metadata: Metadata = {
  title: "Reset your password",
};

export default function ResetPage() {
  return (
    <AuthCard
      title="Reset your password"
      description="Enter the phone number or email on your account and we'll send you a reset link."
      footer={
        <Link
          href="/login"
          className="focus-ring rounded text-gold transition-colors hover:text-amber"
        >
          Back to log in
        </Link>
      }
    >
      <p className="text-[14px] text-slate-500">
        Form not built yet — specified in{" "}
        <code className="text-slate-400">docs/03-design-system.md §S-14</code>.
      </p>
    </AuthCard>
  );
}
