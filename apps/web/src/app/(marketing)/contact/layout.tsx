import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Al-Wahab Solar Traders. Call, WhatsApp or send us a message — we reply within one working day.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
