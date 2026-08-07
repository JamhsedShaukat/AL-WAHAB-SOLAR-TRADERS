import { Transform } from "class-transformer";
import { IsBooleanString, IsOptional, IsString } from "class-validator";
import { PaginationQueryDto } from "@/common/dto";

export class ProductQueryDto extends PaginationQueryDto {
  /** Filter by category slug. */
  @IsString()
  @IsOptional()
  category?: string;

  /** Filter by brand slug. */
  @IsString()
  @IsOptional()
  brand?: string;

  /** Only products flagged for the marketing carousel. */
  @IsBooleanString()
  @IsOptional()
  @Transform(({ value }) => value)
  featured?: string;

  /** Free-text match on name and summary. */
  @IsString()
  @IsOptional()
  q?: string;
}
