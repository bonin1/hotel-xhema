import type { Metadata } from "next";
import { generateMetadataFromConfig } from "../../lib/seo-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataFromConfig("/terms/");
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
