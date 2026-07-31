import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AmbientBlobs } from "@/components/marketing/ambient-blobs";
import { MobileStickyBar } from "@/components/marketing/mobile-sticky-bar";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AmbientBlobs />
      <Header />
      <main className="relative z-10 flex-1">{children}</main>
      <Footer />
      <MobileStickyBar />
    </>
  );
}
