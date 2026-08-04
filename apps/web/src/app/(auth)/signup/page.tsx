import type { Metadata } from "next";
import Link from "next/link";
import { AuthPanelLeft } from "@/components/auth/auth-panel-left";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = {
  title: "Create your account",
};

export default function SignupPage() {
  return (
    <div className="grid min-h-dvh lg:grid-cols-[1.05fr_1fr]">
      <AuthPanelLeft />
      <div className="flex min-h-dvh flex-col items-center justify-center gap-8 px-6 py-12">
        <main className="w-full max-w-110">
          <AuthForm initialTab="signup" />
        </main>
        <Link
          href="/"
          className="focus-ring rounded-lg text-[14px] text-slate-400 transition-colors hover:text-white"
        >
          Back to site
        </Link>
      </div>
    </div>
  );
}
