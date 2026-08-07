import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@wahab/ui";
import { Breadcrumbs } from "@/components/catalog/breadcrumbs";
import { ServiceIcon } from "@/components/catalog/service-icon";
import { JsonLd } from "@/lib/seo/json-ld";
import { getServices } from "@/services/catalog";
import { breadcrumbSchema, graph } from "@/lib/seo/schema";
import { SITE } from "@/lib/seo/site";
import { formatPkr } from "@/lib/format";

/**
 * Rendered per request rather than prerendered. These listings reflect live
 * stock, and a build-time prerender would both freeze them and make the build
 * depend on the API being reachable — which it is not, locally or in CI.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  // Absolute so the layout template does not push this past ~60 characters.
  title: {
    absolute: `Solar Installation & Setup in ${SITE.city} | ${SITE.shortName}`,
  },
  description:
    "Solar installation, inverter configuration, battery bank setup, net metering and maintenance in Lahore — by our own certified crew.",
  alternates: { canonical: `${SITE.url}/services` },
};

export default async function ServicesPage() {
  const services = await getServices();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
  ];

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs))} />

      <Container className="py-28 sm:py-32">
        <Breadcrumbs crumbs={crumbs} />

        <header className="mt-6 max-w-2xl">
          <h1 className="font-display text-[34px] leading-[1.08] font-semibold tracking-tight text-white sm:text-[44px]">
            What we <span className="text-gradient-gold">do</span>
          </h1>
          <p className="mt-5 text-[17px] leading-relaxed text-slate-400">
            We do not subcontract. Every installation and configuration is done
            by our own certified crew, and we are the ones you call afterwards.
          </p>
        </header>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li key={service.id}>
              <Link
                href={`/services/${service.slug}`}
                className="focus-ring group glass flex h-full flex-col gap-3 rounded-2xl p-6 transition-all duration-200 hover:border-gold/30 hover:bg-white/6"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-linear-to-br from-gold/20 to-amber/10 text-gold">
                  <ServiceIcon name={service.icon} className="h-5 w-5" />
                </span>

                <h2 className="font-display text-[16px] font-semibold text-white">
                  {service.nameEn}
                </h2>

                {service.summaryEn && (
                  <p className="text-[14px] leading-relaxed text-slate-400">
                    {service.summaryEn}
                  </p>
                )}

                <span className="mt-auto flex items-center justify-between gap-2 pt-2">
                  <span className="text-[13px] font-medium text-slate-300">
                    {service.priceMode !== "on_request" && service.priceFromPkr
                      ? `from ${formatPkr(service.priceFromPkr)}${service.priceUnit ? ` ${service.priceUnit}` : ""}`
                      : "Quoted per site"}
                  </span>
                  <ArrowRight
                    className="h-4 w-4 text-gold transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
