import type { ApiError, ApiResponse, PaginationMeta } from "@wahab/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

export class ApiRequestError extends Error {
  constructor(
    message: string,
    readonly statusCode: number,
    readonly code?: string,
  ) {
    super(message);
    this.name = "ApiRequestError";
  }
}

interface RequestOptions {
  /** Seconds to cache the response. Omit for no caching. */
  revalidate?: number;
  signal?: AbortSignal;
}

/**
 * Unwraps the API's success envelope so callers get plain data. Throws
 * ApiRequestError on any non-2xx so pages can distinguish "not found" from
 * "backend is down".
 */
async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const url = `${API_URL}${path.startsWith("/") ? path : `/${path}`}`;

  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    signal: options.signal,
    ...(options.revalidate === undefined
      ? { cache: "no-store" as const }
      : { next: { revalidate: options.revalidate } }),
  });

  let body: unknown;
  try {
    body = await response.json();
  } catch {
    throw new ApiRequestError(
      `Malformed response from ${url}`,
      response.status,
    );
  }

  if (!response.ok) {
    const error = body as Partial<ApiError>;
    throw new ApiRequestError(
      error.message ?? `Request failed with ${response.status}`,
      response.status,
      error.code,
    );
  }

  return (body as ApiResponse<T>).data;
}

/** Same as request(), but also returns pagination meta from the envelope. */
async function requestPaged<T>(
  path: string,
  options: RequestOptions = {},
): Promise<{ items: T; meta?: PaginationMeta }> {
  const url = `${API_URL}${path.startsWith("/") ? path : `/${path}`}`;

  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    signal: options.signal,
    ...(options.revalidate === undefined
      ? { cache: "no-store" as const }
      : { next: { revalidate: options.revalidate } }),
  });

  // ApiResponse and ApiError have conflicting `success` literals, so an
  // intersection of the two collapses to `never`. Use a union and narrow.
  const body = (await response.json()) as ApiResponse<T> | ApiError;

  if (!response.ok || body.success === false) {
    const error = body as ApiError;
    throw new ApiRequestError(
      error.message ?? `Request failed with ${response.status}`,
      response.status,
      error.code,
    );
  }

  return { items: body.data, meta: body.meta };
}

export const api = {
  get: request,
  getPaged: requestPaged,
};
