"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Star, Upload } from "lucide-react";

const STAR_LABELS = ["", "Poor", "Fair", "Good", "Great", "Excellent"];

interface Props {
  params: Promise<{ ref: string }>;
}

// Client component shell — server wrapper in page.tsx passes ref down
export default function ReviewFormPage() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [body, setBody] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const MIN_CHARS = 20;
  const canSubmit = rating > 0 && body.length >= MIN_CHARS && consent;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-emerald-500/15">
            <CheckCircle2 className="h-10 w-10 text-emerald-400" />
          </div>
          <h1 className="font-display text-[26px] font-semibold text-white">
            Thank you!
          </h1>
          <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-slate-400">
            Your review is with our team for approval. It will appear on our
            site once verified — usually within 24 hours.
          </p>
          <Link
            href="/projects"
            className="focus-ring mt-8 inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-gold to-amber px-6 py-3 text-[14px] font-semibold text-navy-950 shadow-cta transition-all hover:brightness-105"
          >
            Back to my projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4">
        <Link
          href="/projects"
          className="focus-ring flex w-fit items-center gap-1.5 text-[13px] text-slate-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          My projects
        </Link>
        <div>
          <h1 className="font-display text-[28px] font-semibold text-white">
            Leave a review
          </h1>
          <p className="mt-1 text-[14px] text-slate-400">
            Share your experience with Al-Wahab Solar Traders
          </p>
        </div>
      </div>

      {/* Project summary strip */}
      <div className="glass mb-6 flex items-center gap-3 rounded-2xl px-4 py-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
          <span className="font-display text-[13px] font-semibold">12</span>
        </div>
        <div>
          <div className="text-[14px] font-semibold text-white">
            12 kWp Hybrid — DHA Phase 6
          </div>
          <div className="text-[12px] text-slate-500">
            PRJ-2607-0088 · Completed
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Star rating */}
        <div>
          <label className="mb-3 block text-[14px] font-medium text-slate-300">
            Overall rating <span className="text-red-400">*</span>
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                aria-label={`${star} star${star > 1 ? "s" : ""}`}
                className="focus-ring transition-transform hover:scale-110 active:scale-95"
              >
                <Star
                  className={
                    star <= (hover || rating)
                      ? "h-9 w-9 fill-gold text-gold"
                      : "h-9 w-9 fill-transparent text-slate-600"
                  }
                />
              </button>
            ))}
            {(hover || rating) > 0 && (
              <span className="ml-2 text-[14px] font-semibold text-gold">
                {STAR_LABELS[hover || rating]}
              </span>
            )}
          </div>
        </div>

        {/* Review body */}
        <div>
          <label
            htmlFor="review-body"
            className="mb-2 block text-[14px] font-medium text-slate-300"
          >
            Your review <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <textarea
              id="review-body"
              rows={5}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Tell us about your experience — the installation process, our team, quality of work…"
              className="focus-ring w-full resize-none rounded-xl border border-white/9 bg-white/4 px-4 py-3 text-[14px] text-white placeholder:text-slate-500"
            />
            <div
              className={
                body.length < MIN_CHARS && body.length > 0
                  ? "absolute bottom-3 right-3 text-[11px] text-amber"
                  : "absolute bottom-3 right-3 text-[11px] text-slate-600"
              }
            >
              {body.length} / {MIN_CHARS} min
            </div>
          </div>
        </div>

        {/* Photo upload */}
        <div>
          <label className="mb-2 block text-[14px] font-medium text-slate-300">
            Add a photo{" "}
            <span className="text-[12px] font-normal text-slate-500">
              (optional)
            </span>
          </label>
          <label className="focus-ring flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed border-white/10 p-6 text-center transition-colors hover:border-white/20 hover:bg-white/4">
            <Upload className="h-6 w-6 text-slate-500" aria-hidden="true" />
            <span className="text-[13px] text-slate-400">
              Click to upload or drag & drop
            </span>
            <span className="text-[11px] text-slate-600">
              PNG, JPG up to 5 MB
            </span>
            <input type="file" accept="image/*" className="sr-only" />
          </label>
        </div>

        {/* Consent */}
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded accent-gold"
          />
          <span className="text-[13px] leading-relaxed text-slate-400">
            You may publish this review with my first name and area on the
            Al-Wahab Solar website.
          </span>
        </label>

        {/* Submit */}
        <button
          type="submit"
          disabled={!canSubmit || loading}
          className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-gold to-amber px-6 py-3.5 text-[15px] font-semibold text-navy-950 shadow-cta transition-all hover:brightness-105 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? "Submitting…" : "Submit review"}
        </button>
      </form>
    </div>
  );
}
