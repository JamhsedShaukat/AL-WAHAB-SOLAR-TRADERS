/**
 * Standard response envelope. Every API route returns this shape — see
 * CLAUDE.md §Backend Standards.
 */
export interface ApiResponse<T = unknown> {
  success: true;
  data: T;
  message?: string;
  meta?: PaginationMeta;
}

/** Error codes the API is allowed to return — docs/02-technical-design.md §8.3. */
export type ApiErrorCode =
  | "UNAUTHENTICATED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "VALIDATION_FAILED"
  | "RATE_LIMITED"
  | "ESTIMATE_EXPIRED"
  | "OCR_FAILED"
  | "CONFLICT"
  | "INTERNAL";

export interface ApiError {
  success: false;
  code: ApiErrorCode;
  message: string;
  statusCode: number;
  /** Field-level validation messages, keyed by field path. */
  errors?: Record<string, string[]>;
}

export type ApiResult<T> = ApiResponse<T> | ApiError;

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
}

export interface Paginated<T> {
  items: T[];
  meta: PaginationMeta;
}

export type SortDirection = "asc" | "desc";
