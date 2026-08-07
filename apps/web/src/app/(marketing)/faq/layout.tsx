import type { Metadata } from "next";
import { ALL_FAQS } from "@/lib/content/faq";
import { JsonLd } from "@/lib/seo/json-ld";
import { breadcrumbSchema, faqSchema, graph } from "@/lib/seo/schema";
import { SITE } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: `Solar FAQ — ${SITE.city} Homeowners`,
  description:
    "Answers to the most common questions Lahore homeowners ask about solar systems, pricing, net metering, installation and warranties.",
  alternates: { canonical: `${SITE.url}/faq` },
};

/**
 * FAQPage markup is emitted here because the page itself is a Client Component
 * (it owns the accordion state). Both read the same content module, so the
 * structured data can never disagree with what is on screen — a mismatch is a
 * structured-data violation.
 */
export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={graph(
          faqSchema(ALL_FAQS),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "FAQ", path: "/faq" },
          ]),
        )}
      />
      {children}
    </>
  );
}
