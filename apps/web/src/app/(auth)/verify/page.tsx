import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { AuthCard } from "@/components/auth/auth-card";
import { OtpForm } from "@/components/auth/otp-form";

export const metadata: Metadata = {
  title: "Verify your phone",
};

export default function VerifyPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-8 px-6 py-12">
      <Logo />
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
        <OtpForm />
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
