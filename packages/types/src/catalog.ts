export type PriceMode = "fixed" | "from" | "on_request";

export type StockStatus =
  | "in_stock"
  | "out_of_stock"
  | "preorder"
  | "discontinued";

export type PublishStatus = "draft" | "published" | "archived";

export interface ProductCategorySummary {
  id: string;
  slug: string;
  nameEn: string;
  nameUr?: string | null;
  summaryEn?: string | null;
  icon?: string | null;
  imageUrl?: string | null;
  sortOrder: number;
  /** Count of published products, for category cards. */
  productCount?: number;
}

export interface ProductCategoryDetail extends ProductCategorySummary {
  bodyEn?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
}

export interface BrandSummary {
  id: string;
  slug: string;
  name: string;
  logoUrl?: string | null;
  originCountry?: string | null;
}

export interface ProductImageDto {
  id: string;
  url: string;
  alt: string;
  width?: number | null;
  height?: number | null;
  isPrimary: boolean;
  sortOrder: number;
}

export interface ProductSummary {
  id: string;
  slug: string;
  nameEn: string;
  nameUr?: string | null;
  summaryEn?: string | null;
  priceMode: PriceMode;
  /** Serialised as a string so Decimal precision survives JSON. */
  pricePkr?: string | null;
  comparePricePkr?: string | null;
  currency: string;
  stockStatus: StockStatus;
  isFeatured: boolean;
  warrantyMonths?: number | null;
  category: Pick<ProductCategorySummary, "slug" | "nameEn">;
  brand?: BrandSummary | null;
  primaryImage?: ProductImageDto | null;
}

export interface ProductDetail extends ProductSummary {
  sku?: string | null;
  bodyEn?: string | null;
  specs: Record<string, unknown>;
  images: ProductImageDto[];
  whatsappMessage?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  canonicalUrl?: string | null;
  publishedAt?: string | null;
  updatedAt: string;
}

export interface ServiceSummary {
  id: string;
  slug: string;
  nameEn: string;
  nameUr?: string | null;
  summaryEn?: string | null;
  icon?: string | null;
  priceMode: PriceMode;
  priceFromPkr?: string | null;
  priceUnit?: string | null;
  isFeatured: boolean;
}

export interface ServiceDetail extends ServiceSummary {
  bodyEn?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  updatedAt: string;
}
