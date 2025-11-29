import { ImageResponse } from 'next/og';
import { attractionsSEOData } from '../../../lib/seo-config';

export const runtime = 'edge';
export const alt = 'Pristina Attraction Guide';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  const attraction = attractionsSEOData[params.slug];
  
  if (!attraction) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#F1C338',
          }}
        >
          <div style={{ fontSize: 60, color: 'white' }}>Hotel Xhema - Pristina Guide</div>
        </div>
      ),
      {
        ...size,
      }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#334e68',
          backgroundImage: 'linear-gradient(to bottom right, #334e68, #1a2332)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            color: 'white',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 28,
              marginBottom: 20,
              color: '#F1C338',
              textTransform: 'uppercase',
              letterSpacing: 2,
            }}
          >
            {attraction.category}
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              marginBottom: 30,
              color: 'white',
              lineHeight: 1.2,
            }}
          >
            {attraction.name}
          </div>
          <div
            style={{
              fontSize: 36,
              marginBottom: 20,
              color: 'rgba(255,255,255,0.9)',
            }}
          >
            📍 {attraction.distance} from Hotel Xhema
          </div>
          <div
            style={{
              fontSize: 28,
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            Pristina, Kosovo · Your Guide to the City
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
