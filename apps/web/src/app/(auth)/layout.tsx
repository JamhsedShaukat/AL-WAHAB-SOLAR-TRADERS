import { AmbientBlobs } from "@/components/marketing/ambient-blobs";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AmbientBlobs />
      <div className="relative z-10 min-h-dvh">{children}</div>
    </>
  );
}
