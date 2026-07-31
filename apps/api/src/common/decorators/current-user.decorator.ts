import { createParamDecorator, type ExecutionContext } from "@nestjs/common";
import type { Request } from "express";
import type { SessionUser } from "@wahab/types";

/** Request augmented by the auth guard with the resolved principal. */
export interface AuthenticatedRequest extends Request {
  user?: SessionUser;
}

/**
 * Injects the authenticated principal into a handler parameter. Returns
 * `undefined` on routes marked `@Public()`.
 */
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): SessionUser | undefined =>
    ctx.switchToHttp().getRequest<AuthenticatedRequest>().user,
);
