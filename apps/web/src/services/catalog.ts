import type {
  ProductCategoryDetail,
  ProductCategorySummary,
  ProductDetail,
  ProductSummary,
  ServiceDetail,
  ServiceSummary,
} from "@wahab/types";
import { ApiRequestError, api } from "@/lib/api";

/**
 * Catalogue pages are cached for five minutes rather than statically generated,
 * so a build never depends on the API being reachable while still giving search
 * engines fully server-rendered HTML.
 */
const CATALOGUE_REVALIDATE = 300;

export async function getCategories(): Promise<ProductCategorySummary[]> {
  return api.get<ProductCategorySummary[]>("/catalog/categories", {
    revalidate: CATALOGUE_REVALIDATE,
  });
}

export async function getCategory(
  slug: string,
): Promise<ProductCategoryDetail | null> {
  return notFoundToNull(
    api.get<ProductCategoryDetail>(`/catalog/categories/${slug}`, {
      revalidate: CATALOGUE_REVALIDATE,
    }),
  );
}

export async function getProducts(params: {
  category?: string;
  brand?: string;
  featured?: boolean;
  limit?: number;
  page?: number;
} = {}): Promise<ProductSummary[]> {
  const query = new URLSearchParams();
  if (params.category) query.set("category", params.category);
  if (params.brand) query.set("brand", params.brand);
  if (params.featured) query.set("featured", "true");
  query.set("limit", String(params.limit ?? 24));
  query.set("page", String(params.page ?? 1));

  const { items } = await api.getPaged<ProductSummary[]>(
    `/catalog/products?${query.toString()}`,
    { revalidate: CATALOGUE_REVALIDATE },
  );
  return items;
}

export async function getProduct(slug: string): Promise<ProductDetail | null> {
  return notFoundToNull(
    api.get<ProductDetail>(`/catalog/products/${slug}`, {
      revalidate: CATALOGUE_REVALIDATE,
    }),
  );
}

export async function getServices(): Promise<ServiceSummary[]> {
  return api.get<ServiceSummary[]>("/catalog/services", {
    revalidate: CATALOGUE_REVALIDATE,
  });
}

export async function getService(slug: string): Promise<ServiceDetail | null> {
  return notFoundToNull(
    api.get<ServiceDetail>(`/catalog/services/${slug}`, {
      revalidate: CATALOGUE_REVALIDATE,
    }),
  );
}

/**
 * A missing record is a 404 page, not an error page. Anything else — including
 * the API being unreachable — must keep throwing so we never render a
 * "not found" page for what is really an outage, which would invite Google to
 * deindex a real product.
 */
async function notFoundToNull<T>(promise: Promise<T>): Promise<T | null> {
  try {
    return await promise;
  } catch (error) {
    if (error instanceof ApiRequestError && error.statusCode === 404) {
      return null;
    }
    throw error;
  }
}

/**
 * Every published product, for the sitemap. Walks the pages rather than asking
 * for one huge page: the API caps `limit` at 100 and correctly rejects more.
 *
 * Uncached, because a stale or truncated sitemap is worse than a slow one.
 */
export async function getAllProductsForSitemap(): Promise<ProductSummary[]> {
  const PAGE_SIZE = 100;
  /** Backstop so a meta bug can never spin this forever. */
  const MAX_PAGES = 50;

  const all: ProductSummary[] = [];

  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const { items, meta } = await api.getPaged<ProductSummary[]>(
      `/catalog/products?limit=${PAGE_SIZE}&page=${page}`,
    );

    all.push(...items);

    const totalPages = meta?.totalPages ?? 1;
    if (page >= totalPages || items.length === 0) break;
  }

  return all;
}
