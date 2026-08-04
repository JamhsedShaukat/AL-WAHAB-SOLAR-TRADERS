import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { AuthCard } from "@/components/auth/auth-card";
import { ResetForm } from "@/components/auth/reset-form";

export const metadata: Metadata = {
  title: "Reset your password",
};

export default function ResetPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-8 px-6 py-12">
      <Logo />
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
        <ResetForm />
      </AuthCard>
      <Link
        href="/"
        className="focus-ring rounded-lg text-[14px] text-slate-400 transition-colors hover:text-white"
      >
        Back to site
      </Link>
    </div>
  );
}
