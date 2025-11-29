import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Hotel Xhema - Boutique Hotel in Pristina, Kosovo',
    short_name: 'Hotel Xhema',
    description: 'Comfortable and affordable accommodation in the heart of Pristina, Kosovo. Modern rooms, excellent location, and warm hospitality.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#F1C338',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/images/logo/logo.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/images/logo/logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    categories: ['travel', 'hospitality', 'accommodation'],
    lang: 'en',
    dir: 'ltr',
  };
}
