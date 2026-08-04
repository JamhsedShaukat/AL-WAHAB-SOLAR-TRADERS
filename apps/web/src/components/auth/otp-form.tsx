"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { cn } from "@wahab/utils";
import { Button } from "@wahab/ui";

const DIGITS = 6;
const RESEND_SECONDS = 60;

export function OtpForm() {
  const router = useRouter();
  const [digits, setDigits] = useState<string[]>(Array(DIGITS).fill(""));
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(RESEND_SECONDS);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return;
    const id = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [countdown]);

  function focusAt(idx: number) {
    refs.current[idx]?.focus();
  }

  function handleChange(idx: number, raw: string) {
    const char = raw.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[idx] = char;
    setDigits(next);
    setError("");
    if (char && idx < DIGITS - 1) focusAt(idx + 1);
  }

  function handleKeyDown(idx: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace") {
      if (digits[idx]) {
        const next = [...digits];
        next[idx] = "";
        setDigits(next);
      } else if (idx > 0) {
        focusAt(idx - 1);
      }
    } else if (e.key === "ArrowLeft" && idx > 0) {
      focusAt(idx - 1);
    } else if (e.key === "ArrowRight" && idx < DIGITS - 1) {
      focusAt(idx + 1);
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, DIGITS);
    if (!pasted) return;
    const next = Array(DIGITS).fill("");
    pasted.split("").forEach((ch, i) => (next[i] = ch));
    setDigits(next);
    focusAt(Math.min(pasted.length, DIGITS - 1));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const code = digits.join("");
    if (code.length < DIGITS) {
      setError("Please enter all 6 digits.");
      triggerShake();
      return;
    }
    setError("");
    setLoading(true);
    // Simulate verification — real call wired in Phase 4
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    router.push("/dashboard");
  }

  function triggerShake() {
    setShake(true);
    setTimeout(() => setShake(false), 600);
  }

  function handleResend() {
    if (countdown > 0) return;
    setCountdown(RESEND_SECONDS);
    setDigits(Array(DIGITS).fill(""));
    setError("");
    focusAt(0);
  }

  const filled = digits.filter(Boolean).length;

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <p className="text-[14px] text-slate-400">
        Enter the code we sent to{" "}
        <span className="font-medium text-white">+92 3•• ••• ••42</span>
      </p>

      {/* 6-digit inputs */}
      <div
        className={cn(
          "flex justify-center gap-2 transition-transform",
          shake && "animate-[shake_0.5s_ease-in-out]",
        )}
        onPaste={handlePaste}
        role="group"
        aria-label="Verification code"
      >
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]"
            maxLength={1}
            value={d}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            disabled={loading}
            aria-label={`Digit ${i + 1}`}
            className={cn(
              "h-13 w-12 rounded-xl border border-white/10 bg-white/4 text-center text-xl font-semibold text-white outline-none transition-all duration-200",
              "focus:border-gold/50 focus:ring-2 focus:ring-gold/20",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-red-500/50",
              d && "border-gold/30 bg-gold/5",
            )}
          />
        ))}
      </div>

      {error && (
        <p className="text-center text-[13px] text-red-400" role="alert">
          {error}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={loading || filled < DIGITS}>
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify code"}
      </Button>

      <div className="flex items-center justify-between text-[13px]">
        <button
          type="button"
          onClick={handleResend}
          disabled={countdown > 0}
          className={cn(
            "focus-ring rounded transition-colors",
            countdown > 0
              ? "cursor-default text-slate-500"
              : "text-gold hover:text-amber",
          )}
        >
          {countdown > 0 ? `Resend code in 0:${String(countdown).padStart(2, "0")}` : "Resend code"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="focus-ring rounded text-slate-400 transition-colors hover:text-white"
        >
          Change number
        </button>
      </div>
    </form>
  );
}
