import type { Metadata } from "next";
import { Wizard } from "@/components/estimator/wizard";

export const metadata: Metadata = {
  title: "Free solar estimate",
  description:
    "Get an itemized solar estimate for your Lahore home in about 2 minutes. Upload your LESCO bill or answer a few questions.",
};

export default function EstimatePage() {
  return (
    <div className="pt-32 pb-24 sm:pt-36">
      <div className="mx-auto w-full max-w-[1200px] px-6 sm:px-10">
        <Wizard />
      </div>
    </div>
  );
}
