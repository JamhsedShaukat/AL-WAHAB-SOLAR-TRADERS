"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@wahab/utils";

export interface PasswordInputProps {
  label?: string;
  id?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  showStrength?: boolean;
  placeholder?: string;
  autoComplete?: string;
  disabled?: boolean;
}

type Strength = "weak" | "fair" | "good" | "strong";

function calcStrength(pw: string): Strength {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return "weak";
  if (score === 2) return "fair";
  if (score === 3) return "good";
  return "strong";
}

const STRENGTH_COLORS: Record<Strength, string> = {
  weak: "bg-red-400",
  fair: "bg-amber",
  good: "bg-yellow-400",
  strong: "bg-emerald-400",
};

const STRENGTH_TEXT_COLORS: Record<Strength, string> = {
  weak: "text-red-400",
  fair: "text-amber",
  good: "text-yellow-400",
  strong: "text-emerald-400",
};

const STRENGTH_BARS: Record<Strength, number> = {
  weak: 1,
  fair: 2,
  good: 3,
  strong: 4,
};

export function PasswordInput({
  label,
  id,
  value,
  onChange,
  error,
  showStrength = false,
  placeholder = "••••••••",
  autoComplete = "current-password",
  disabled = false,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-") ?? "password";
  const strength = value.length > 0 ? calcStrength(value) : null;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-[13px] font-medium text-slate-300"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={inputId}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          className={cn(
            "w-full rounded-xl border border-white/10 bg-white/4 px-4 py-3 pr-11 text-[15px] text-white outline-none transition-all duration-200 placeholder:text-slate-500",
            "focus:border-gold/50 focus:ring-2 focus:ring-gold/20",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500/50 ring-2 ring-red-500/15",
          )}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          disabled={disabled}
          className="focus-ring absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 transition-colors hover:text-white"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>

      {showStrength && strength && (
        <div className="mt-2 flex flex-col gap-1.5">
          <div className="flex gap-1" role="presentation">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className={cn(
                  "h-1 flex-1 rounded-full transition-all duration-300",
                  n <= STRENGTH_BARS[strength]
                    ? STRENGTH_COLORS[strength]
                    : "bg-white/10",
                )}
              />
            ))}
          </div>
          <span
            className={cn(
              "text-[12px] capitalize",
              STRENGTH_TEXT_COLORS[strength],
            )}
          >
            {strength} password
          </span>
        </div>
      )}

      {error && (
        <p
          id={`${inputId}-error`}
          className="mt-1.5 text-[13px] text-red-400"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
