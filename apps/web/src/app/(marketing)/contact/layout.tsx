import type { Metadata } from "next";
import { JsonLd } from "@/lib/seo/json-ld";
import {
  breadcrumbSchema,
  contactPageSchema,
  graph,
  organizationSchema,
} from "@/lib/seo/schema";
import { SITE } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: `Contact — Solar Shop in ${SITE.city}`,
  description:
    "Call, WhatsApp or visit Al-Wahab Solar Traders in J1 Block, Phase 2, Johar Town, Lahore. We reply within one working day.",
  alternates: { canonical: `${SITE.url}/contact` },
};

/**
 * The contact page carries the full NAP, so it is the most important page on the
 * site for local search. The schema lives in this layout rather than the page
 * because the page itself is a Client Component (it owns the form state).
 */
export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={graph(
          organizationSchema(),
          contactPageSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        )}
      />
      {children}
    </>
  );
}
