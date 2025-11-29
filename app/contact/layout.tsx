import { Metadata } from 'next';
import { generateMetadataFromConfig } from '../../lib/seo-metadata';

export const metadata: Metadata = generateMetadataFromConfig("/contact/");

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
