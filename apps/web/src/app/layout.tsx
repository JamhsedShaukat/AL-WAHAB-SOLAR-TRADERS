import type { Metadata } from "next";
import { Space_Grotesk, Manrope, Noto_Nastaliq_Urdu } from "next/font/google";
import { LocaleProvider } from "@/lib/i18n/context";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const notoNastaliqUrdu = Noto_Nastaliq_Urdu({
  variable: "--font-noto-nastaliq-urdu",
  subsets: ["arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Al-Wahab Solar Traders — Lahore's honest solar estimator",
    template: "%s — Al-Wahab Solar Traders",
  },
  description:
    "Get an accurate solar estimate in 2 minutes. Answer a few questions or upload your LESCO bill. Priced on live Lahore market rates, supplied and installed by our own certified team.",
  metadataBase: new URL("https://alwahabsolar.pk"),
  openGraph: {
    type: "website",
    locale: "en_PK",
    siteName: "Al-Wahab Solar Traders",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${manrope.variable} ${notoNastaliqUrdu.variable}`}
    >
      <body className="min-h-dvh font-sans antialiased">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
