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
import { FeaturedProducts } from "@/components/marketing/featured-products";
import { ServicesSection } from "@/components/marketing/services-section";
import { JsonLd } from "@/lib/seo/json-ld";
import { graph, organizationSchema, websiteSchema } from "@/lib/seo/schema";
import { SITE } from "@/lib/seo/site";

export const metadata: Metadata = {
  // `absolute` — the root layout template would otherwise append the company
  // name a second time.
  title: {
    absolute: "Al-Wahab Solar Traders — Lahore's honest solar estimator",
  },
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
      {/* One @graph rather than several stray blocks, so every schema on the
          page references the same organisation entity by @id. */}
      <JsonLd
        data={graph(organizationSchema(), websiteSchema(), {
          "@type": "Service",
          name: "Solar System Estimation & Installation",
          serviceType: "Solar Panel Installation",
          provider: { "@id": `${SITE.url}/#organization` },
          areaServed: { "@type": "City", name: SITE.city },
          description:
            "Free, itemized solar estimates for Lahore homes. On-grid, hybrid and off-grid systems supplied and installed by our own certified team.",
        })}
      />
      <Hero />
      <ValueStrip />
      <HowItWorks />
      <FeaturedProducts />
      <ServicesSection />
      <WhyUs />
      <SampleEstimate />
      <Reviews />
      <AboutSection />
      <FAQAccordion />
      <CTASection />
    </>
  );
}
