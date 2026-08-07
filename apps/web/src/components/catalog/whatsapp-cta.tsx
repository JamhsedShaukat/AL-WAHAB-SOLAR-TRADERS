import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { cn } from "@wahab/utils";
import { whatsappUrl } from "@/lib/whatsapp";
import { getContactSettings } from "@/services/settings";

interface WhatsappCtaProps {
  subject: string;
  /** Product-specific override for the message body. */
  message?: string | null;
  className?: string;
  size?: "sm" | "md" | "lg";
  label?: string;
}

const SIZES = {
  sm: "text-sm px-4 py-2 gap-1.5",
  md: "text-[15px] px-5 py-2.5 gap-2",
  lg: "text-base px-6 py-3 gap-2",
} as const;

/**
 * The primary conversion for the catalogue.
 *
 * An async Server Component: the number comes from the `business.whatsapp_number`
 * setting so it can be changed in admin without a redeploy. The fetch is cached,
 * so several CTAs on one page cost one request. Falls back to /contact when no
 * number is configured, so the CTA is never a dead link.
 */
export async function WhatsappCta({
  subject,
  message,
  className,
  size = "md",
  label = "Enquire on WhatsApp",
}: WhatsappCtaProps) {
  const contact = await getContactSettings();

  const href = whatsappUrl({
    subject,
    message: message ?? contact.whatsappDefaultMessage,
    number: contact.whatsappNumber ?? undefined,
  });

  const classes = cn(
    "focus-ring inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 active:scale-[0.96]",
    "bg-linear-to-r from-gold to-amber text-navy-950 shadow-cta hover:shadow-cta-hover hover:brightness-105",
    SIZES[size],
    className,
  );

  if (!href) {
    return (
      <Link href="/contact" className={classes}>
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        Contact us
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
      data-analytics="whatsapp-enquiry"
    >
      <MessageCircle className="h-4 w-4" aria-hidden="true" />
      {label}
    </a>
  );
}
