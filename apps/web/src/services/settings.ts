import { api } from "@/lib/api";

export interface ContactSettings {
  whatsappNumber: string | null;
  whatsappDefaultMessage: string | null;
}

/**
 * Contact details for the public CTAs. Cached for five minutes: changing the
 * WhatsApp number in the admin settings should take effect without a redeploy,
 * but every product card need not hit the API.
 */
export async function getContactSettings(): Promise<ContactSettings> {
  try {
    return await api.get<ContactSettings>("/settings/contact", {
      revalidate: 300,
    });
  } catch {
    // A CTA must never crash a page — callers fall back to /contact.
    return { whatsappNumber: null, whatsappDefaultMessage: null };
  }
}
