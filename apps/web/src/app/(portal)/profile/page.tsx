import type { Metadata } from "next";
import { ProfileTabs } from "@/components/portal/profile-tabs";

export const metadata: Metadata = {
  title: "Profile & settings",
};

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-[28px] font-semibold text-white sm:text-[32px]">
          Profile & settings
        </h1>
        <p className="mt-1 text-[14px] text-slate-400">
          Your contact details, password, language and notification preferences.
        </p>
      </div>
      <ProfileTabs />
    </div>
  );
}
