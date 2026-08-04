"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { cn } from "@wahab/utils";
import { Button } from "@wahab/ui";
import { Input } from "@wahab/ui";
import { useLocale } from "@/lib/i18n/context";
import { PasswordInput } from "./password-input";
import { PendingEstimateChip } from "./pending-estimate-chip";

type Tab = "signup" | "login";

interface AuthFormProps {
  initialTab?: Tab;
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
      <path
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"
        fill="#34A853"
      />
      <path
        d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58Z"
        fill="#EA4335"
      />
    </svg>
  );
}

function validate(tab: Tab, fields: Record<string, string>) {
  const errors: Record<string, string> = {};
  if (tab === "signup") {
    if (!fields.name?.trim()) errors.name = "Please enter your full name.";
    if (!fields.contact?.trim()) errors.contact = "Please enter your phone or email.";
    if (!fields.password) errors.password = "Please create a password.";
    else if (fields.password.length < 8)
      errors.password = "Password must be at least 8 characters.";
  } else {
    if (!fields.contact?.trim())
      errors.contact = "Please enter your phone or email.";
    if (!fields.password) errors.password = "Please enter your password.";
  }
  return errors;
}

export function AuthForm({ initialTab = "signup" }: AuthFormProps) {
  const router = useRouter();
  const { locale, setLocale } = useLocale();

  const [tab, setTab] = useState<Tab>(initialTab);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  function clearError(field: string) {
    if (errors[field]) setErrors((prev) => { const next = { ...prev }; delete next[field]; return next; });
  }

  function switchTab(next: Tab) {
    setTab(next);
    setErrors({});
    setFormError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");

    const fieldErrors = validate(tab, { name, contact, password });
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    // Simulate network call — real auth wired in Phase 4
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);

    if (tab === "signup") {
      router.push("/verify");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="w-full max-w-110">
      {/* Header row */}
      <div className="mb-6 flex items-center justify-between">
        <span className="text-[13px] font-medium tracking-wide text-slate-400 uppercase">
          Homeowner account
        </span>
        <button
          onClick={() => setLocale(locale === "en" ? "ur" : "en")}
          className="focus-ring rounded-lg px-3 py-1 text-[13px] text-slate-400 transition-colors hover:text-white"
          aria-label="Switch language"
        >
          {locale === "en" ? "اردو" : "EN"}
        </button>
      </div>

      {/* Title */}
      <div className="mb-5 flex flex-col gap-1.5">
        <h1 className="font-display text-[26px] font-semibold text-white">
          {tab === "signup" ? "Create your account" : "Welcome back"}
        </h1>
        <p className="text-[14px] text-slate-400">
          {tab === "signup"
            ? "It takes less than a minute."
            : "Log in to see your saved estimates and project updates."}
        </p>
      </div>

      {/* Pending estimate chip */}
      <div className="mb-5">
        <PendingEstimateChip />
      </div>

      {/* Segmented tabs */}
      <div className="mb-6 flex rounded-xl bg-white/4 p-1">
        {(["signup", "login"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => switchTab(t)}
            className={cn(
              "flex-1 rounded-lg py-2 text-[14px] font-medium transition-all duration-200",
              tab === t
                ? "bg-white/10 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200",
            )}
          >
            {t === "signup" ? "Sign up" : "Log in"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col gap-4">
          {/* Google button */}
          <button
            type="button"
            className="focus-ring flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/4 py-3 text-[15px] font-medium text-white transition-all duration-200 hover:bg-white/8"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[13px] text-slate-500">or</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Full name (sign-up only) */}
          {tab === "signup" && (
            <Input
              label="Full name"
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); clearError("name"); }}
              placeholder="e.g. Tariq Ahmed"
              autoComplete="name"
              error={errors.name}
              disabled={loading}
            />
          )}

          {/* Phone or email */}
          <Input
            label="Phone or email"
            type="text"
            value={contact}
            onChange={(e) => { setContact(e.target.value); clearError("contact"); }}
            placeholder={tab === "signup" ? "+92 300 1234567 or email" : "Phone or email"}
            autoComplete={tab === "signup" ? "username" : "username"}
            error={errors.contact}
            disabled={loading}
          />

          {/* Password */}
          <PasswordInput
            label="Password"
            value={password}
            onChange={(v) => { setPassword(v); clearError("password"); }}
            showStrength={tab === "signup"}
            autoComplete={tab === "signup" ? "new-password" : "current-password"}
            error={errors.password}
            disabled={loading}
          />

          {/* Forgot password (login only) */}
          {tab === "login" && (
            <div className="flex justify-end">
              <Link
                href="/reset"
                className="focus-ring rounded text-[13px] text-slate-400 transition-colors hover:text-gold"
              >
                Forgot password?
              </Link>
            </div>
          )}

          {/* OTP shortcut (sign-up only) */}
          {tab === "signup" && (
            <Link
              href="/verify"
              className="focus-ring self-start rounded text-[13px] text-slate-400 transition-colors hover:text-gold"
            >
              Use a one-time code instead →
            </Link>
          )}

          {/* Generic form error */}
          {formError && (
            <p className="rounded-xl bg-red-500/10 px-4 py-3 text-[13px] text-red-400" role="alert">
              {formError}
            </p>
          )}

          {/* Submit */}
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : tab === "signup" ? (
              "Create account"
            ) : (
              "Log in"
            )}
          </Button>

          {/* Legal (sign-up only) */}
          {tab === "signup" && (
            <p className="text-center text-[12px] leading-relaxed text-slate-500">
              By creating an account you agree to our{" "}
              <Link href="/terms" className="text-slate-400 underline-offset-2 hover:underline">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-slate-400 underline-offset-2 hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          )}
        </div>
      </form>

      {/* Footer links */}
      <div className="mt-6 flex flex-col gap-2 border-t border-white/10 pt-5 text-[13px] text-slate-400">
        {tab === "signup" ? (
          <span>
            Already have an account?{" "}
            <button
              onClick={() => switchTab("login")}
              className="focus-ring rounded text-gold transition-colors hover:text-amber"
            >
              Log in
            </button>
          </span>
        ) : (
          <span>
            New here?{" "}
            <button
              onClick={() => switchTab("signup")}
              className="focus-ring rounded text-gold transition-colors hover:text-amber"
            >
              Create an account
            </button>
          </span>
        )}
        <Link
          href="/contact"
          className="focus-ring rounded text-slate-500 transition-colors hover:text-slate-300"
        >
          Questions? Talk to our team →
        </Link>
      </div>
    </div>
  );
}
