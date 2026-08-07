import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ImageOff, ShieldCheck } from "lucide-react";
import { Badge, Container } from "@wahab/ui";
import { Breadcrumbs } from "@/components/catalog/breadcrumbs";
import { PriceTag } from "@/components/catalog/price-tag";
import { ProductCard } from "@/components/catalog/product-card";
import { WhatsappCta } from "@/components/catalog/whatsapp-cta";
import { JsonLd } from "@/lib/seo/json-ld";
import { getProduct, getProducts } from "@/services/catalog";
import { productMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, graph, humanizeSpecKey, productSchema } from "@/lib/seo/schema";
import { formatWarranty } from "@/lib/format";

export const revalidate = 300;

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

const STOCK_BADGE: Record<
  string,
  { label: string; variant: "emerald" | "slate" | "cyan" | "red" } | null
> = {
  in_stock: { label: "In stock", variant: "emerald" },
  preorder: { label: "Pre-order", variant: "cyan" },
  out_of_stock: { label: "Out of stock", variant: "slate" },
  discontinued: { label: "Discontinued", variant: "red" },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product not found" };
  return productMetadata(product);
}

export default async function ProductPage({ params }: Props) {
  const { category: categorySlug, slug } = await params;

  const product = await getProduct(slug);
  if (!product) notFound();

  // The category is part of the canonical URL, so a mismatched category segment
  // is a duplicate of the real page. Redirect instead of serving both.
  if (product.category.slug !== categorySlug) {
    redirect(`/products/${product.category.slug}/${product.slug}`);
  }

  const path = `/products/${product.category.slug}/${product.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: product.category.nameEn, path: `/products/${product.category.slug}` },
    { name: product.nameEn, path },
  ];

  const related = (
    await getProducts({ category: product.category.slug, limit: 5 })
  ).filter((p) => p.id !== product.id);

  const warranty = formatWarranty(product.warrantyMonths);
  const stock = STOCK_BADGE[product.stockStatus];
  const specs = Object.entries(product.specs ?? {});
  const gallery = product.images;

  return (
    <>
      <JsonLd data={graph(productSchema(product, path), breadcrumbSchema(crumbs))} />

      <Container className="py-28 sm:py-32">
        <Breadcrumbs crumbs={crumbs} />

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Gallery. Without photos this collapses to a slim strip rather than
              a full 4:3 void, which would otherwise dominate the page. */}
          <div className="flex flex-col gap-3">
            {gallery[0] ? (
              <div className="glass relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-white/3">
                <Image
                  src={gallery[0].url}
                  alt={gallery[0].alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 92vw, 560px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="glass flex h-32 w-full flex-col items-center justify-center gap-1.5 rounded-2xl bg-white/3 text-slate-600">
                <ImageOff className="h-6 w-6" aria-hidden="true" />
                <span className="text-[12px]">No photo yet</span>
              </div>
            )}

            {gallery.length > 1 && (
              <ul className="grid grid-cols-4 gap-3">
                {gallery.slice(1, 5).map((image) => (
                  <li
                    key={image.id}
                    className="glass relative aspect-square overflow-hidden rounded-xl"
                  >
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      sizes="120px"
                      className="object-cover"
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Detail */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-2">
              {product.brand && (
                <Link
                  href={`/products/${product.category.slug}`}
                  className="focus-ring rounded text-[12px] font-semibold uppercase tracking-wider text-gold"
                >
                  {product.brand.name}
                </Link>
              )}
              {stock && <Badge variant={stock.variant}>{stock.label}</Badge>}
              {product.brand?.originCountry && (
                <span className="text-[12px] text-slate-500">
                  Made in {product.brand.originCountry}
                </span>
              )}
            </div>

            <h1 className="font-display text-[30px] leading-tight font-semibold tracking-tight text-white sm:text-[38px]">
              {product.nameEn}
            </h1>

            {product.summaryEn && (
              <p className="text-[16px] leading-relaxed text-slate-400">
                {product.summaryEn}
              </p>
            )}

            <div className="glass flex flex-col gap-4 rounded-2xl p-5">
              <PriceTag
                priceMode={product.priceMode}
                pricePkr={product.pricePkr}
                comparePricePkr={product.comparePricePkr}
                size="lg"
              />
              <p className="text-[13px] text-slate-500">
                {product.priceMode === "on_request"
                  ? "Hardware prices move with the market. Message us for today's rate and availability."
                  : "Price valid for current stock. Installation quoted separately."}
              </p>
              <WhatsappCta
                subject={product.nameEn}
                message={product.whatsappMessage}
                size="lg"
              />
            </div>

            {warranty && (
              <p className="flex items-center gap-2 text-[14px] text-slate-300">
                <ShieldCheck className="h-4 w-4 text-gold" aria-hidden="true" />
                {warranty} warranty
              </p>
            )}

            {specs.length > 0 && (
              <section aria-labelledby="specs" className="mt-2">
                <h2
                  id="specs"
                  className="font-display text-[16px] font-semibold text-white"
                >
                  Specifications
                </h2>
                <dl className="mt-3 divide-y divide-white/8 overflow-hidden rounded-xl border border-white/8">
                  {specs.map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-baseline justify-between gap-4 px-4 py-2.5"
                    >
                      <dt className="text-[13px] text-slate-500">
                        {humanizeSpecKey(key)}
                      </dt>
                      <dd className="text-[14px] font-medium text-slate-200">
                        {String(value)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}
          </div>
        </div>

        {product.bodyEn && (
          <section className="glass mt-16 rounded-2xl p-6 sm:p-8">
            <h2 className="font-display text-[18px] font-semibold text-white">
              About this product
            </h2>
            <div className="mt-4 max-w-3xl space-y-4 text-[15px] leading-relaxed text-slate-300">
              {product.bodyEn.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="mt-16" aria-labelledby="related">
            <h2
              id="related"
              className="font-display text-[20px] font-semibold text-white"
            >
              More {product.category.nameEn.toLowerCase()}
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.slice(0, 4).map((item) => (
                <li key={item.id}>
                  <ProductCard product={item} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </Container>
    </>
  );
}
