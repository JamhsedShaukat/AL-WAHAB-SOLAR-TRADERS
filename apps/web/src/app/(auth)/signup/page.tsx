import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard } from "@/components/auth/auth-card";

export const metadata: Metadata = {
  title: "Create your account",
};

export default function SignupPage() {
  return (
    <AuthCard
      title="Create your account"
      description="Save your estimates, track your installation, and get updates as work progresses."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/login"
            className="focus-ring rounded text-gold transition-colors hover:text-amber"
          >
            Log in
          </Link>
        </>
      }
    >
      <p className="text-[14px] text-slate-500">
        Form not built yet — specified in{" "}
        <code className="text-slate-400">docs/03-design-system.md §S-12</code>.
      </p>
    </AuthCard>
  );
}
