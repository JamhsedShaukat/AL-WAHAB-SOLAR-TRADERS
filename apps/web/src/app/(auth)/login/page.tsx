import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard } from "@/components/auth/auth-card";

export const metadata: Metadata = {
  title: "Log in",
};

export default function LoginPage() {
  return (
    <AuthCard
      title="Log in"
      description="Welcome back. Log in to see your saved estimates and project updates."
      footer={
        <>
          New here?{" "}
          <Link
            href="/signup"
            className="focus-ring rounded text-gold transition-colors hover:text-amber"
          >
            Create an account
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
