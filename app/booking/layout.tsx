import { Metadata } from 'next';
import { generateMetadataFromConfig } from '../../lib/seo-metadata';

export const metadata: Metadata = generateMetadataFromConfig("/booking/");

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
