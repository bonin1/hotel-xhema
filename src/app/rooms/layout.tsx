import { Metadata } from 'next';
import { generateMetadataFromConfig } from '@/lib/seo-metadata';

export const metadata: Metadata = generateMetadataFromConfig("/rooms/");

export default function RoomsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
