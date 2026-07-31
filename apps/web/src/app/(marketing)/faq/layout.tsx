import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to the most common questions Lahore homeowners ask about solar systems, pricing, net metering, installation and warranties.",
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children;
}
