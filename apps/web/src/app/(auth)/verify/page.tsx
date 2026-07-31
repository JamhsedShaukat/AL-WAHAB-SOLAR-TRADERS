import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard } from "@/components/auth/auth-card";

export const metadata: Metadata = {
  title: "Verify your phone",
};

export default function VerifyPage() {
  return (
    <AuthCard
      title="Verify your phone"
      description="We sent a 6-digit code to your number. Enter it below to finish setting up your account."
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
        OTP entry not built yet — specified in{" "}
        <code className="text-slate-400">docs/03-design-system.md §S-13</code>.
      </p>
    </AuthCard>
  );
}
