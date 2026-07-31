import type { PaginationMeta } from "@wahab/types";
import type { WithMeta } from "./interceptors/response.interceptor";

/** Build the pagination envelope a list handler returns. */
export function paginate<T>(
  items: T[],
  total: number,
  page: number,
  limit: number,
): WithMeta<T[]> {
  const meta: PaginationMeta = {
    page,
    limit,
    total,
    totalPages: limit > 0 ? Math.ceil(total / limit) : 0,
  };

  return { data: items, meta };
}
