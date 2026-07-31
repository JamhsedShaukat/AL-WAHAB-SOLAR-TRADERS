import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { AmbientBlobs } from "@/components/marketing/ambient-blobs";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AmbientBlobs />
      <div className="relative z-10 flex min-h-dvh flex-col items-center justify-center gap-8 px-6 py-12">
        <Logo />
        <main className="flex w-full justify-center">{children}</main>
        <Link
          href="/"
          className="focus-ring rounded-lg text-[14px] text-slate-400 transition-colors hover:text-white"
        >
          Back to site
        </Link>
      </div>
    </>
  );
}
