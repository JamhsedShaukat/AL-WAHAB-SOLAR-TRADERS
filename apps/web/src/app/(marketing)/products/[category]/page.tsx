import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PackageOpen } from "lucide-react";
import { Container } from "@wahab/ui";
import { Breadcrumbs } from "@/components/catalog/breadcrumbs";
import { ProductCard } from "@/components/catalog/product-card";
import { WhatsappCta } from "@/components/catalog/whatsapp-cta";
import { JsonLd } from "@/lib/seo/json-ld";
import { getCategory, getProducts } from "@/services/catalog";
import { categoryMetadata } from "@/lib/seo/metadata";
import {
  breadcrumbSchema,
  collectionPageSchema,
  graph,
  itemListSchema,
} from "@/lib/seo/schema";
import { productPath } from "@/components/catalog/product-card";

export const revalidate = 300;

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const category = await getCategory(slug);
  if (!category) return { title: "Category not found" };
  return categoryMetadata(category);
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;

  const category = await getCategory(slug);
  if (!category) notFound();

  const products = await getProducts({ category: slug, limit: 48 });

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: category.nameEn, path: `/products/${category.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={graph(
          collectionPageSchema(category),
          breadcrumbSchema(crumbs),
          itemListSchema(products, productPath),
        )}
      />

      <Container className="py-28 sm:py-32">
        <Breadcrumbs crumbs={crumbs} />

        <header className="mt-6 max-w-2xl">
          <h1 className="font-display text-[34px] leading-[1.08] font-semibold tracking-tight text-white sm:text-[44px]">
            {category.nameEn}
          </h1>
          {category.summaryEn && (
            <p className="mt-5 text-[17px] leading-relaxed text-slate-400">
              {category.summaryEn}
            </p>
          )}
        </header>

        {products.length > 0 ? (
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="glass mt-12 flex flex-col items-center gap-3 rounded-2xl p-12 text-center">
            <PackageOpen className="h-8 w-8 text-slate-500" aria-hidden="true" />
            <p className="text-[15px] font-medium text-slate-300">
              Nothing listed here yet
            </p>
            <p className="max-w-md text-[14px] text-slate-500">
              We still supply {category.nameEn.toLowerCase()} — message us and
              we&apos;ll quote from current stock.
            </p>
            <WhatsappCta
              subject={category.nameEn}
              size="sm"
              className="mt-2"
              label="Ask what's in stock"
            />
          </div>
        )}

        {/* Long-form category copy carries the ranking content — see
            docs/08-seo-strategy.md §5.2. */}
        {category.bodyEn && (
          <section className="glass mt-16 rounded-2xl p-6 sm:p-8">
            <div className="prose-invert max-w-3xl space-y-4 text-[15px] leading-relaxed text-slate-300">
              {category.bodyEn.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>
        )}
      </Container>
    </>
  );
}
