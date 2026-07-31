import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import type { Request, Response } from "express";
import type { ApiError, ApiErrorCode } from "@wahab/types";

const STATUS_TO_CODE: Record<number, ApiErrorCode> = {
  [HttpStatus.BAD_REQUEST]: "VALIDATION_FAILED",
  [HttpStatus.UNAUTHORIZED]: "UNAUTHENTICATED",
  [HttpStatus.FORBIDDEN]: "FORBIDDEN",
  [HttpStatus.NOT_FOUND]: "NOT_FOUND",
  [HttpStatus.CONFLICT]: "CONFLICT",
  [HttpStatus.TOO_MANY_REQUESTS]: "RATE_LIMITED",
};

interface ValidationErrorBody {
  message?: string | string[];
  error?: string;
}

/**
 * Converts anything thrown by the app into the standard error envelope. Nothing
 * else in the codebase should format an error response.
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const code = STATUS_TO_CODE[status] ?? "INTERNAL";

    const body: ApiError = {
      success: false,
      code,
      statusCode: status,
      message: this.resolveMessage(exception, status),
    };

    const fieldErrors = this.resolveFieldErrors(exception);
    if (fieldErrors) body.errors = fieldErrors;

    // Log server faults with the stack; client errors are noise at this level.
    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        `${request.method} ${request.url} → ${status}`,
        exception instanceof Error ? exception.stack : String(exception),
      );
    }

    response.status(status).json(body);
  }

  private resolveMessage(exception: unknown, status: number): string {
    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      // Never leak internal failure details to the client.
      return "Something went wrong on our end. Please try again.";
    }

    if (exception instanceof HttpException) {
      const res = exception.getResponse();
      if (typeof res === "string") return res;

      const { message } = res as ValidationErrorBody;
      if (Array.isArray(message)) return message[0] ?? exception.message;
      if (typeof message === "string") return message;
      return exception.message;
    }

    return "Request failed.";
  }

  /** ValidationPipe reports failures as a string[]; expose them per field. */
  private resolveFieldErrors(
    exception: unknown,
  ): Record<string, string[]> | undefined {
    if (!(exception instanceof HttpException)) return undefined;

    const res = exception.getResponse();
    if (typeof res !== "object" || res === null) return undefined;

    const { message } = res as ValidationErrorBody;
    if (!Array.isArray(message) || message.length === 0) return undefined;

    const grouped: Record<string, string[]> = {};
    for (const entry of message) {
      // ValidationPipe messages start with the property name.
      const field = entry.split(" ")[0] ?? "_";
      (grouped[field] ??= []).push(entry);
    }
    return grouped;
  }
}
