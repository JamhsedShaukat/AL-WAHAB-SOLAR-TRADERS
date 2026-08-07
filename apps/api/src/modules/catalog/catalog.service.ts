import { Injectable, NotFoundException } from "@nestjs/common";
import type {
  ProductCategoryDetail,
  ProductCategorySummary,
  ProductDetail,
  ProductSummary,
  ServiceDetail,
  ServiceSummary,
} from "@wahab/types";
import { PrismaService } from "@/database";
import { paginate } from "@/common/pagination";
import type { ProductQueryDto } from "./dto/product-query.dto";

/** Only published rows are ever exposed through the public catalogue. */
const PUBLISHED = { status: "published" } as const;

/** Decimal → string so precision survives JSON serialisation. */
function money(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  return String(value);
}

@Injectable()
export class CatalogService {
  constructor(private readonly prisma: PrismaService) {}

  async listCategories(): Promise<ProductCategorySummary[]> {
    const categories = await this.prisma.productCategory.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      include: {
        _count: { select: { products: { where: PUBLISHED } } },
      },
    });

    return categories.map((c) => ({
      id: c.id,
      slug: c.slug,
      nameEn: c.nameEn,
      nameUr: c.nameUr,
      summaryEn: c.summaryEn,
      icon: c.icon,
      imageUrl: c.imageUrl,
      sortOrder: c.sortOrder,
      productCount: c._count.products,
    }));
  }

  async getCategory(slug: string): Promise<ProductCategoryDetail> {
    const category = await this.prisma.productCategory.findFirst({
      where: { slug, isActive: true },
      include: {
        _count: { select: { products: { where: PUBLISHED } } },
      },
    });

    if (!category) throw new NotFoundException("Category not found");

    return {
      id: category.id,
      slug: category.slug,
      nameEn: category.nameEn,
      nameUr: category.nameUr,
      summaryEn: category.summaryEn,
      bodyEn: category.bodyEn,
      icon: category.icon,
      imageUrl: category.imageUrl,
      sortOrder: category.sortOrder,
      productCount: category._count.products,
      metaTitle: category.metaTitle,
      metaDescription: category.metaDescription,
    };
  }

  async listProducts(query: ProductQueryDto) {
    const where = {
      ...PUBLISHED,
      ...(query.category ? { category: { slug: query.category } } : {}),
      ...(query.brand ? { brand: { slug: query.brand } } : {}),
      ...(query.featured === "true" ? { isFeatured: true } : {}),
      ...(query.q
        ? {
            OR: [
              { nameEn: { contains: query.q, mode: "insensitive" as const } },
              { summaryEn: { contains: query.q, mode: "insensitive" as const } },
            ],
          }
        : {}),
    };

    const [rows, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
        skip: query.skip,
        take: query.limit,
        include: {
          category: { select: { slug: true, nameEn: true } },
          brand: true,
          images: {
            where: { isPrimary: true },
            take: 1,
            orderBy: { sortOrder: "asc" },
          },
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    return paginate(
      rows.map((p) => this.toProductSummary(p)),
      total,
      query.page,
      query.limit,
    );
  }

  async getProduct(slug: string): Promise<ProductDetail> {
    const product = await this.prisma.product.findFirst({
      where: { slug, ...PUBLISHED },
      include: {
        category: { select: { slug: true, nameEn: true } },
        brand: true,
        images: { orderBy: [{ isPrimary: "desc" }, { sortOrder: "asc" }] },
      },
    });

    if (!product) throw new NotFoundException("Product not found");

    return {
      ...this.toProductSummary(product),
      sku: product.sku,
      bodyEn: product.bodyEn,
      specs: (product.specs ?? {}) as Record<string, unknown>,
      images: product.images.map((i) => ({
        id: i.id,
        url: i.url,
        alt: i.alt,
        width: i.width,
        height: i.height,
        isPrimary: i.isPrimary,
        sortOrder: i.sortOrder,
      })),
      whatsappMessage: product.whatsappMessage,
      metaTitle: product.metaTitle,
      metaDescription: product.metaDescription,
      canonicalUrl: product.canonicalUrl,
      publishedAt: product.publishedAt?.toISOString() ?? null,
      updatedAt: product.updatedAt.toISOString(),
    };
  }

  async listServices(): Promise<ServiceSummary[]> {
    const services = await this.prisma.service.findMany({
      where: PUBLISHED,
      orderBy: { sortOrder: "asc" },
    });

    return services.map((s) => this.toServiceSummary(s));
  }

  async getService(slug: string): Promise<ServiceDetail> {
    const service = await this.prisma.service.findFirst({
      where: { slug, ...PUBLISHED },
    });

    if (!service) throw new NotFoundException("Service not found");

    return {
      ...this.toServiceSummary(service),
      bodyEn: service.bodyEn,
      metaTitle: service.metaTitle,
      metaDescription: service.metaDescription,
      updatedAt: service.updatedAt.toISOString(),
    };
  }

  // ─── mappers ───────────────────────────────────────────────

  private toProductSummary(product: {
    id: string;
    slug: string;
    nameEn: string;
    nameUr: string | null;
    summaryEn: string | null;
    priceMode: string;
    pricePkr: unknown;
    comparePricePkr: unknown;
    currency: string;
    stockStatus: string;
    isFeatured: boolean;
    warrantyMonths: number | null;
    category: { slug: string; nameEn: string };
    brand: {
      id: string;
      slug: string;
      name: string;
      logoUrl: string | null;
      originCountry: string | null;
    } | null;
    images: Array<{
      id: string;
      url: string;
      alt: string;
      width: number | null;
      height: number | null;
      isPrimary: boolean;
      sortOrder: number;
    }>;
  }): ProductSummary {
    const primary = product.images[0];

    return {
      id: product.id,
      slug: product.slug,
      nameEn: product.nameEn,
      nameUr: product.nameUr,
      summaryEn: product.summaryEn,
      priceMode: product.priceMode as ProductSummary["priceMode"],
      pricePkr: money(product.pricePkr),
      comparePricePkr: money(product.comparePricePkr),
      currency: product.currency,
      stockStatus: product.stockStatus as ProductSummary["stockStatus"],
      isFeatured: product.isFeatured,
      warrantyMonths: product.warrantyMonths,
      category: product.category,
      brand: product.brand
        ? {
            id: product.brand.id,
            slug: product.brand.slug,
            name: product.brand.name,
            logoUrl: product.brand.logoUrl,
            originCountry: product.brand.originCountry,
          }
        : null,
      primaryImage: primary
        ? {
            id: primary.id,
            url: primary.url,
            alt: primary.alt,
            width: primary.width,
            height: primary.height,
            isPrimary: primary.isPrimary,
            sortOrder: primary.sortOrder,
          }
        : null,
    };
  }

  private toServiceSummary(service: {
    id: string;
    slug: string;
    nameEn: string;
    nameUr: string | null;
    summaryEn: string | null;
    icon: string | null;
    priceMode: string;
    priceFromPkr: unknown;
    priceUnit: string | null;
    isFeatured: boolean;
  }): ServiceSummary {
    return {
      id: service.id,
      slug: service.slug,
      nameEn: service.nameEn,
      nameUr: service.nameUr,
      summaryEn: service.summaryEn,
      icon: service.icon,
      priceMode: service.priceMode as ServiceSummary["priceMode"],
      priceFromPkr: money(service.priceFromPkr),
      priceUnit: service.priceUnit,
      isFeatured: service.isFeatured,
    };
  }
}
