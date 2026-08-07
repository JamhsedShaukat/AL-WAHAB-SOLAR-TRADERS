import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, PackageOpen } from "lucide-react";
import { Container } from "@wahab/ui";
import { Breadcrumbs } from "@/components/catalog/breadcrumbs";
import { ServiceIcon } from "@/components/catalog/service-icon";
import { ProductCard } from "@/components/catalog/product-card";
import { JsonLd } from "@/lib/seo/json-ld";
import { getCategories, getProducts } from "@/services/catalog";
import { breadcrumbSchema, graph } from "@/lib/seo/schema";
import { SITE } from "@/lib/seo/site";

/**
 * Rendered per request rather than prerendered. These listings reflect live
 * stock, and a build-time prerender would both freeze them and make the build
 * depend on the API being reachable — which it is not, locally or in CI.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  // Absolute so the layout template does not push this past ~60 characters.
  title: {
    absolute: `Inverters, Batteries & Panels in ${SITE.city} | ${SITE.shortName}`,
  },
  description:
    "Browse inverters, batteries, solar panels, net meters, EV chargers and protection gear available in Lahore. Genuine equipment, warranty backed.",
  alternates: { canonical: `${SITE.url}/products` },
};

export default async function ProductsPage() {
  const [categories, featured] = await Promise.all([
    getCategories(),
    getProducts({ featured: true, limit: 8 }),
  ]);

  const withProducts = categories.filter((c) => (c.productCount ?? 0) > 0);

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
          ]),
        )}
      />

      <Container className="py-28 sm:py-32">
        <Breadcrumbs
          crumbs={[
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
          ]}
        />

        <header className="mt-6 max-w-2xl">
          <h1 className="font-display text-[34px] leading-[1.08] font-semibold tracking-tight text-white sm:text-[44px]">
            What we <span className="text-gradient-gold">stock</span>
          </h1>
          <p className="mt-5 text-[17px] leading-relaxed text-slate-400">
            Equipment we supply, install and stand behind ourselves. Prices move
            with the market — message us on WhatsApp for today&apos;s rate.
          </p>
        </header>

        {/* Categories */}
        <section className="mt-14" aria-labelledby="categories">
          <h2
            id="categories"
            className="font-display text-[20px] font-semibold text-white"
          >
            Categories
          </h2>

          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/products/${category.slug}`}
                  className="focus-ring group glass flex h-full flex-col gap-3 rounded-2xl p-6 transition-all duration-200 hover:border-gold/30 hover:bg-white/6"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-linear-to-br from-gold/20 to-amber/10 text-gold">
                    <ServiceIcon name={category.icon} className="h-5 w-5" />
                  </span>

                  <h3 className="font-display text-[16px] font-semibold text-white">
                    {category.nameEn}
                  </h3>

                  {category.summaryEn && (
                    <p className="text-[14px] leading-relaxed text-slate-400">
                      {category.summaryEn}
                    </p>
                  )}

                  <span className="mt-auto flex items-center justify-between gap-2 pt-2 text-[13px]">
                    <span className="text-slate-500">
                      {category.productCount === 0
                        ? "Coming soon"
                        : `${category.productCount} product${category.productCount === 1 ? "" : "s"}`}
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
        </section>

        {/* Featured */}
        {featured.length > 0 && (
          <section className="mt-20" aria-labelledby="featured">
            <h2
              id="featured"
              className="font-display text-[20px] font-semibold text-white"
            >
              Popular right now
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((product) => (
                <li key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          </section>
        )}

        {withProducts.length === 0 && (
          <div className="glass mt-14 flex flex-col items-center gap-3 rounded-2xl p-12 text-center">
            <PackageOpen className="h-8 w-8 text-slate-500" aria-hidden="true" />
            <p className="text-[15px] font-medium text-slate-300">
              The catalogue is being loaded
            </p>
            <p className="text-[14px] text-slate-500">
              Message us on WhatsApp and we&apos;ll tell you exactly what&apos;s
              in stock today.
            </p>
          </div>
        )}
      </Container>
    </>
  );
}
