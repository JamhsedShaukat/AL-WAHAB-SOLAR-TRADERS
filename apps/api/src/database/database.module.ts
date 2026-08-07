import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

/**
 * Global so domain modules can inject PrismaService without importing this
 * module each time. There is exactly one client per process.
 */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
