import { Metadata } from 'next';
import { generateMetadataFromConfig } from '../../../lib/seo-metadata';

export const metadata: Metadata = generateMetadataFromConfig("/booking/success/");

export default function BookingSuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
