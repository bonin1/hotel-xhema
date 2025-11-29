import type { Metadata } from "next";
import { generateMetadataFromConfig } from "../../lib/seo-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataFromConfig("/privacy/");
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
