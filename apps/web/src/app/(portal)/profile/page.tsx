import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = {
  title: "Profile & settings",
};

export default function ProfilePage() {
  return (
    <PagePlaceholder
      title={"Profile & settings"}
      description={"Your contact details, password, language and notification preferences."}
      spec="docs/03-design-system.md §S-21"
    />
  );
}
