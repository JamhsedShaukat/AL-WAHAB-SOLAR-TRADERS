import type { Metadata } from "next";
import { Hero } from "@/components/marketing/hero";
import { ValueStrip } from "@/components/marketing/value-strip";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { WhyUs } from "@/components/marketing/why-us";
import { SampleEstimate } from "@/components/marketing/sample-estimate";
import { Reviews } from "@/components/marketing/reviews";
import { AboutSection } from "@/components/marketing/about-section";
import { FAQAccordion } from "@/components/marketing/faq-accordion";
import { CTASection } from "@/components/marketing/cta-section";
import { JsonLd } from "@/lib/seo/json-ld";

export const metadata: Metadata = {
  title: "Al-Wahab Solar Traders — Lahore's honest solar estimator",
  description:
    "Get an accurate solar estimate in 2 minutes. Answer a few questions or upload your LESCO bill. Priced on live Lahore market rates, supplied and installed by our own certified team.",
  openGraph: {
    title: "Al-Wahab Solar Traders — Lahore's honest solar estimator",
    description:
      "Get an accurate solar estimate in 2 minutes. Priced on live Lahore market rates.",
    url: "https://alwahabsolar.pk",
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Al-Wahab Solar Traders",
          description:
            "Lahore's honest solar estimator. Price your system, book a free survey, and let our own certified team install it.",
          url: "https://alwahabsolar.pk",
          telephone: "+924211176576",
          email: "info@alwahabsolar.pk",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Lahore",
            addressCountry: "PK",
          },
          areaServed: { "@type": "City", name: "Lahore" },
          priceRange: "PKR",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Solar System Estimation & Installation",
          provider: {
            "@type": "LocalBusiness",
            name: "Al-Wahab Solar Traders",
          },
          serviceType: "Solar Panel Installation",
          areaServed: { "@type": "City", name: "Lahore" },
          description:
            "Free, itemized solar estimates for Lahore homes. On-grid, hybrid and off-grid systems supplied and installed by our own certified team.",
        }}
      />
      <Hero />
      <ValueStrip />
      <HowItWorks />
      <WhyUs />
      <SampleEstimate />
      <Reviews />
      <AboutSection />
      <FAQAccordion />
      <CTASection />
    </>
  );
}
