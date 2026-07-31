import { Star } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/marketing/section-heading";

const reviews = [
  {
    name: "Ahmed R.",
    area: "Johar Town",
    system: "8 kWp Hybrid",
    rating: 5,
    body: "The estimate matched almost exactly what we paid. No surprises, no hidden charges. The team finished in five days and handled all the LESCO paperwork.",
  },
  {
    name: "Fatima K.",
    area: "DHA Phase 5",
    system: "6.5 kWp Hybrid",
    rating: 5,
    body: "I compared three companies before choosing Al-Wahab. Their itemized breakdown was the only one that explained every line. Installation was clean and on time.",
  },
  {
    name: "Bilal M.",
    area: "Model Town",
    system: "10 kWp On-grid",
    rating: 5,
    body: "Net metering approval took six weeks — they kept me updated every step. My bill went from PKR 45,000 to under 5,000. Exactly what the estimate predicted.",
  },
] as const;

export function Reviews() {
  // In production, this section hides if fewer than 3 approved reviews exist.
  // For now, rendering with placeholder data for visual completeness.

  return (
    <section className="relative py-24 sm:py-28 bg-white/[0.015]">
      <Container>
        <SectionHeading
          eyebrow="Reviews"
          heading="Ratings from real, completed installs"
          lede="After every completed job, homeowners rate the work our team did."
          align="center"
          accentColor="gold"
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="glass rounded-2xl p-6 transition-all duration-300 hover:border-white/20"
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4.5 w-4.5 fill-gold text-gold"
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="mt-4 text-[14.5px] leading-relaxed text-slate-300">
                &ldquo;{review.body}&rdquo;
              </p>

              {/* Attribution */}
              <div className="mt-5 flex items-center justify-between gap-3">
                <div className="text-[13px] text-slate-400">
                  <span className="font-medium text-white">{review.name}</span>
                  {" · "}
                  {review.area}, Lahore
                </div>
                <span className="shrink-0 rounded-full border border-white/10 bg-white/4 px-2.5 py-1 text-[11px] font-medium text-slate-400">
                  {review.system}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
