import { Type } from "class-transformer";
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from "class-validator";

/** Default page size for list endpoints — CLAUDE.md §Performance Guidelines. */
export const DEFAULT_PAGE_SIZE = 20;

/** Hard ceiling on page size, enforced here so no endpoint can exceed it. */
export const MAX_PAGE_SIZE = 100;

/** Extend this in a module's own DTOs to add filters alongside pagination. */
export class PaginationQueryDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(MAX_PAGE_SIZE)
  @IsOptional()
  limit: number = DEFAULT_PAGE_SIZE;

  @IsString()
  @IsOptional()
  sortBy?: string;

  @IsIn(["asc", "desc"])
  @IsOptional()
  sortDir: "asc" | "desc" = "desc";

  get skip(): number {
    return (this.page - 1) * this.limit;
  }
}
