import { Module } from "@nestjs/common";
import { CatalogController } from "./catalog.controller";
import { CatalogService } from "./catalog.service";

/**
 * Product catalogue and services — the trading side of the business.
 * Read-only and public; see docs/08-seo-strategy.md for why each product needs
 * its own indexable page.
 */
@Module({
  controllers: [CatalogController],
  providers: [CatalogService],
  exports: [CatalogService],
})
export class CatalogModule {}
