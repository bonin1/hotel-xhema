import type { Metadata } from "next";
import { generateMetadataFromConfig } from "../../lib/seo-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataFromConfig("/amenities/");
}

export default function AmenitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
