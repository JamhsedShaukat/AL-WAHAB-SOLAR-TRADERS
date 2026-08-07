import { Controller, Get, Param, Query } from "@nestjs/common";
import { Public } from "@/common/decorators";
import { CatalogService } from "./catalog.service";
import { ProductQueryDto } from "./dto/product-query.dto";

/**
 * Public, read-only catalogue. Everything here is unauthenticated on purpose —
 * it is what the marketing site renders and what search engines index. Writes
 * live in the admin catalogue module behind @RequirePermissions.
 */
@Controller("catalog")
export class CatalogController {
  constructor(private readonly catalog: CatalogService) {}

  @Public()
  @Get("categories")
  listCategories() {
    return this.catalog.listCategories();
  }

  @Public()
  @Get("categories/:slug")
  getCategory(@Param("slug") slug: string) {
    return this.catalog.getCategory(slug);
  }

  @Public()
  @Get("products")
  listProducts(@Query() query: ProductQueryDto) {
    return this.catalog.listProducts(query);
  }

  @Public()
  @Get("products/:slug")
  getProduct(@Param("slug") slug: string) {
    return this.catalog.getProduct(slug);
  }

  @Public()
  @Get("services")
  listServices() {
    return this.catalog.listServices();
  }

  @Public()
  @Get("services/:slug")
  getService(@Param("slug") slug: string) {
    return this.catalog.getService(slug);
  }
}
