import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@wahab/ui";
import { SectionHeading } from "@/components/marketing/section-heading";
import { ServiceIcon } from "@/components/catalog/service-icon";
import { getServices } from "@/services/catalog";
import { formatPkr } from "@/lib/format";

/** Installation and configuration services, beside the hardware we trade. */
export async function ServicesSection() {
  let services;
  try {
    services = await getServices();
  } catch {
    return null;
  }

  if (services.length === 0) return null;

  return (
    <section className="py-20 sm:py-28" aria-labelledby="services">
      <Container>
        <SectionHeading
          eyebrow="What we do"
          heading="Supply, installation and configuration"
          lede="Our own certified crew — from a single inverter setup to a full net-metered system."
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li key={service.id}>
              <Link
                href={`/services/${service.slug}`}
                className="focus-ring group glass flex h-full flex-col gap-3 rounded-2xl p-6 transition-all duration-200 hover:border-gold/30 hover:bg-white/6"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-linear-to-br from-gold/20 to-amber/10 text-gold">
                  <ServiceIcon name={service.icon} className="h-5 w-5" />
                </span>

                <h3 className="font-display text-[16px] font-semibold text-white">
                  {service.nameEn}
                </h3>

                {service.summaryEn && (
                  <p className="text-[14px] leading-relaxed text-slate-400">
                    {service.summaryEn}
                  </p>
                )}

                <span className="mt-auto flex items-center justify-between gap-2 pt-2">
                  <span className="text-[13px] font-medium text-slate-300">
                    {service.priceMode !== "on_request" && service.priceFromPkr
                      ? `from ${formatPkr(service.priceFromPkr)}${
                          service.priceUnit ? ` ${service.priceUnit}` : ""
                        }`
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
    </section>
  );
}
