import type { Metadata } from "next";
import { generateMetadataFromConfig } from "@/lib/seo-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataFromConfig("/things-to-do/");
}

export default function ThingsToDoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
