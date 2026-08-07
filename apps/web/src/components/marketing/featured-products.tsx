import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@wahab/ui";
import { SectionHeading } from "@/components/marketing/section-heading";
import { ProductCarousel } from "@/components/marketing/product-carousel";
import { getProducts } from "@/services/catalog";

/**
 * Homepage shop-window. Fetches on the server so the products are in the HTML;
 * the carousel only handles scrolling.
 */
export async function FeaturedProducts() {
  let products;
  try {
    products = await getProducts({ featured: true, limit: 12 });
  } catch {
    // The homepage must render even if the API is down — this is a shop-window,
    // not the point of the page.
    return null;
  }

  if (products.length === 0) return null;

  return (
    <section className="py-20 sm:py-28" aria-labelledby="featured-products">
      <Container>
        <SectionHeading
          eyebrow="What we stock"
          heading="Inverters, batteries, panels and more"
          lede="Genuine equipment we supply, install and support ourselves — not drop-shipped."
        />

        <div className="mt-10">
          <ProductCarousel products={products} />
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/products"
            className="focus-ring group inline-flex items-center gap-2 rounded-xl text-[15px] font-medium text-gold transition-colors hover:text-amber"
          >
            Browse the full catalogue
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </Container>
    </section>
  );
}
