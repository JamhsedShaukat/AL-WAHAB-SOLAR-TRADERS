import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/database";

export interface PublicContactSettings {
  /** Digits only, international format — ready for a wa.me link. */
  whatsappNumber: string | null;
  /** Message template; `{product}` is substituted by the caller. */
  whatsappDefaultMessage: string | null;
}

/**
 * The settings table holds business config, estimator constants and, in future,
 * integration credentials. Only keys on this list may ever be served
 * unauthenticated — a blanket "return all settings" endpoint would leak
 * everything added later.
 */
const PUBLIC_KEYS = [
  "business.whatsapp_number",
  "business.whatsapp_default_message",
] as const;

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async getPublicContact(): Promise<PublicContactSettings> {
    const rows = await this.prisma.setting.findMany({
      where: { key: { in: [...PUBLIC_KEYS] } },
      select: { key: true, value: true },
    });

    const map = new Map(rows.map((row) => [row.key, row.value]));

    const number = asString(map.get("business.whatsapp_number"));

    return {
      // Strip anything that is not a digit so a number stored as "+92 329 …"
      // still produces a valid wa.me link.
      whatsappNumber: number ? number.replace(/\D/g, "") || null : null,
      whatsappDefaultMessage:
        asString(map.get("business.whatsapp_default_message")) ?? null,
    };
  }
}

/** Settings values are Json columns, so narrow to a non-empty string. */
function asString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
}
