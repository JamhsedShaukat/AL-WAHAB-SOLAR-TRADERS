import type { Metadata } from "next";
import { ReviewsClient } from "@/components/admin/reviews-client";

export const metadata: Metadata = { title: "Reviews" };

export default function AdminReviewsPage() {
  return <ReviewsClient />;
}
