import type { Metadata } from "next";
import { generateMetadataFromConfig } from "@/lib/seo-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataFromConfig("/booking-policies/");
}

export default function BookingPoliciesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
