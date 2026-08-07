/**
 * There is no checkout — every catalogue CTA converts to a WhatsApp enquiry, so
 * this link is the primary conversion on the trading side of the business.
 *
 * The number lives in the `business.whatsapp_number` setting. Until it is set,
 * `whatsappUrl()` returns null and callers must fall back to /contact rather
 * than render a broken link.
 */
const FALLBACK_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

const DEFAULT_TEMPLATE =
  "Assalam o Alaikum, I'm interested in {product}. Could you share the price and availability?";

export function whatsappUrl(options: {
  /** Product or service name substituted into the message. */
  subject: string;
  /** Overrides the default message body. */
  message?: string | null;
  number?: string;
}): string | null {
  const number = (options.number ?? FALLBACK_NUMBER).replace(/[^\d]/g, "");
  if (!number) return null;

  const template = options.message?.trim() || DEFAULT_TEMPLATE;
  const text = template.replace("{product}", options.subject);

  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
