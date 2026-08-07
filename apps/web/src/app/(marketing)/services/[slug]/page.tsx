import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@wahab/ui";
import { Breadcrumbs } from "@/components/catalog/breadcrumbs";
import { ServiceIcon } from "@/components/catalog/service-icon";
import { WhatsappCta } from "@/components/catalog/whatsapp-cta";
import { JsonLd } from "@/lib/seo/json-ld";
import { getService } from "@/services/catalog";
import { serviceMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, graph, serviceSchema } from "@/lib/seo/schema";
import { formatPkr } from "@/lib/format";

export const revalidate = 300;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return { title: "Service not found" };
  return serviceMetadata(service);
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;

  const service = await getService(slug);
  if (!service) notFound();

  const path = `/services/${service.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.nameEn, path },
  ];

  const hasPrice = service.priceMode !== "on_request" && service.priceFromPkr;

  return (
    <>
      <JsonLd data={graph(serviceSchema(service, path), breadcrumbSchema(crumbs))} />

      <Container className="py-28 sm:py-32">
        <Breadcrumbs crumbs={crumbs} />

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          <div>
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-linear-to-br from-gold/20 to-amber/10 text-gold">
              <ServiceIcon name={service.icon} className="h-6 w-6" />
            </span>

            <h1 className="font-display mt-6 text-[30px] leading-tight font-semibold tracking-tight text-white sm:text-[38px]">
              {service.nameEn}
            </h1>

            {service.summaryEn && (
              <p className="mt-5 text-[17px] leading-relaxed text-slate-400">
                {service.summaryEn}
              </p>
            )}

            {service.bodyEn && (
              <div className="mt-8 max-w-3xl space-y-4 text-[15px] leading-relaxed text-slate-300">
                {service.bodyEn.split("\n\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            )}
          </div>

          <aside className="glass h-fit rounded-2xl p-6 lg:sticky lg:top-28">
            <p className="font-display text-xl font-semibold text-white">
              {hasPrice
                ? `from ${formatPkr(service.priceFromPkr)}`
                : "Quoted per site"}
            </p>
            {service.priceUnit && hasPrice && (
              <p className="mt-1 text-[13px] text-slate-500">
                {service.priceUnit}
              </p>
            )}
            <p className="mt-4 text-[14px] leading-relaxed text-slate-400">
              Tell us your setup on WhatsApp and we&apos;ll give you a firm price
              before any work starts.
            </p>
            <WhatsappCta
              subject={service.nameEn}
              size="lg"
              className="mt-5 w-full"
              label="Get a quote"
            />
          </aside>
        </div>
      </Container>
    </>
  );
}
