import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { map, type Observable } from "rxjs";
import type { ApiResponse, PaginationMeta } from "@wahab/types";

/** A handler may return this shape to attach pagination meta to the envelope. */
export interface WithMeta<T> {
  data: T;
  meta: PaginationMeta;
  message?: string;
}

function hasMeta<T>(value: unknown): value is WithMeta<T> {
  return (
    typeof value === "object" &&
    value !== null &&
    "data" in value &&
    "meta" in value
  );
}

/**
 * Wraps every successful handler return value in the standard envelope, so
 * controllers return plain data and never construct the envelope themselves.
 */
@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    _context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((payload): ApiResponse<T> => {
        if (hasMeta<T>(payload)) {
          return {
            success: true,
            data: payload.data,
            ...(payload.message ? { message: payload.message } : {}),
            meta: payload.meta,
          };
        }

        return { success: true, data: payload };
      }),
    );
  }
}
