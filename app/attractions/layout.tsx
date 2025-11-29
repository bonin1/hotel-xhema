import { Metadata } from 'next';
import { generateMetadataFromConfig } from '../../lib/seo-metadata';

export const metadata: Metadata = generateMetadataFromConfig("/attractions/");

export default function AttractionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
