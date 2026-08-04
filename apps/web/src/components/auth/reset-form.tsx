"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@wahab/ui";
import { Input } from "@wahab/ui";
import { PasswordInput } from "./password-input";

type Step = "request" | "sent" | "new-password" | "done";

export function ResetForm() {
  const [step, setStep] = useState<Step>("request");
  const [contact, setContact] = useState("");
  const [contactError, setContactError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwError, setPwError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRequest(e: React.FormEvent) {
    e.preventDefault();
    if (!contact.trim()) {
      setContactError("Please enter your phone number or email.");
      return;
    }
    setContactError("");
    setLoading(true);
    // Simulate sending reset link — real call wired in Phase 4
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setStep("sent");
  }

  async function handleNewPassword(e: React.FormEvent) {
    e.preventDefault();
    let hasError = false;
    if (!newPassword || newPassword.length < 8) {
      setPwError("Password must be at least 8 characters.");
      hasError = true;
    } else {
      setPwError("");
    }
    if (newPassword !== confirmPassword) {
      setConfirmError("Passwords do not match.");
      hasError = true;
    } else {
      setConfirmError("");
    }
    if (hasError) return;

    setLoading(true);
    // Simulate saving new password
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setStep("done");
  }

  if (step === "sent") {
    return (
      <div className="flex flex-col items-center gap-5 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/15">
          <CheckCircle2 className="h-7 w-7 text-gold" />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-display text-xl font-semibold text-white">
            Check your inbox
          </h2>
          <p className="text-[14px] leading-relaxed text-slate-400">
            If <span className="font-medium text-white">{contact}</span> is
            registered, a reset link is on its way. Check spam if you don&apos;t
            see it within a minute.
          </p>
        </div>
        <button
          onClick={() => setStep("request")}
          className="focus-ring rounded text-[13px] text-slate-400 transition-colors hover:text-white"
        >
          Try a different address
        </button>
        {/* Demo: show the "new password" step */}
        <button
          onClick={() => setStep("new-password")}
          className="focus-ring rounded text-[12px] text-slate-600 underline-offset-2 hover:text-slate-400 hover:underline"
        >
          Preview: set new password →
        </button>
      </div>
    );
  }

  if (step === "new-password") {
    return (
      <form
        onSubmit={handleNewPassword}
        noValidate
        className="flex flex-col gap-4"
      >
        <p className="text-[14px] text-slate-400">
          Choose a new password for your account.
        </p>
        <PasswordInput
          label="New password"
          id="new-password"
          value={newPassword}
          onChange={setNewPassword}
          showStrength
          autoComplete="new-password"
          error={pwError}
          disabled={loading}
        />
        <PasswordInput
          label="Confirm new password"
          id="confirm-password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          autoComplete="new-password"
          error={confirmError}
          disabled={loading}
        />
        <Button
          type="submit"
          size="lg"
          className="w-full mt-1"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Set new password"
          )}
        </Button>
      </form>
    );
  }

  if (step === "done") {
    return (
      <div className="flex flex-col items-center gap-5 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15">
          <CheckCircle2 className="h-7 w-7 text-emerald-400" />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-display text-xl font-semibold text-white">
            Password updated
          </h2>
          <p className="text-[14px] text-slate-400">
            Your password has been changed. You can now log in with your new
            password.
          </p>
        </div>
        <Button asChild size="lg" className="w-full">
          <a href="/login">Go to log in</a>
        </Button>
      </div>
    );
  }

  // Default: step === "request"
  return (
    <form onSubmit={handleRequest} noValidate className="flex flex-col gap-4">
      <Input
        label="Phone or email"
        type="text"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        placeholder="+92 300 1234567 or email"
        autoComplete="username"
        error={contactError}
        disabled={loading}
      />
      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          "Send reset link"
        )}
      </Button>
    </form>
  );
}
