import Image from "next/image";
import Link from "next/link";
import { ImageOff } from "lucide-react";
import type { ProductSummary } from "@wahab/types";
import { Badge } from "@wahab/ui";
import { cn } from "@wahab/utils";
import { PriceTag } from "@/components/catalog/price-tag";
import { formatWarranty } from "@/lib/format";

const STOCK_LABEL: Record<ProductSummary["stockStatus"], string | null> = {
  in_stock: null,
  out_of_stock: "Out of stock",
  preorder: "Pre-order",
  discontinued: "Discontinued",
};

export function productPath(product: ProductSummary): string {
  return `/products/${product.category.slug}/${product.slug}`;
}

/**
 * The card is a real `<a href>` so the catalogue is crawlable. The carousel
 * decorates these; it must never be the only way to reach a product.
 */
export function ProductCard({
  product,
  className,
}: {
  product: ProductSummary;
  className?: string;
}) {
  const warranty = formatWarranty(product.warrantyMonths);
  const stockLabel = STOCK_LABEL[product.stockStatus];

  return (
    <Link
      href={productPath(product)}
      className={cn(
        "focus-ring group glass flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-200",
        "hover:border-gold/30 hover:bg-white/6",
        className,
      )}
    >
      <div className="relative aspect-4/3 w-full overflow-hidden bg-white/3">
        {product.primaryImage ? (
          <Image
            src={product.primaryImage.url}
            alt={product.primaryImage.alt}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 300px"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-600">
            <ImageOff className="h-8 w-8" aria-hidden="true" />
          </div>
        )}

        {stockLabel && (
          <Badge
            variant={product.stockStatus === "preorder" ? "cyan" : "slate"}
            className="absolute left-3 top-3"
          >
            {stockLabel}
          </Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-2">
          {product.brand && (
            <span className="text-[12px] font-medium uppercase tracking-wider text-gold">
              {product.brand.name}
            </span>
          )}
          <span className="text-[12px] text-slate-500">
            {product.category.nameEn}
          </span>
        </div>

        <h3 className="font-display text-[15px] font-semibold leading-snug text-white">
          {product.nameEn}
        </h3>

        {product.summaryEn && (
          <p className="line-clamp-2 text-[13px] leading-relaxed text-slate-400">
            {product.summaryEn}
          </p>
        )}

        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <PriceTag
            priceMode={product.priceMode}
            pricePkr={product.pricePkr}
            comparePricePkr={product.comparePricePkr}
          />
          {warranty && (
            <span className="text-[12px] text-slate-500">{warranty}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
