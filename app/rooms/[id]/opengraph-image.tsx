import { ImageResponse } from 'next/og';
import { roomsSEOData } from '../../../lib/seo-config';

export const runtime = 'edge';
export const alt = 'Hotel Xhema Room';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: { id: string } }) {
  const room = roomsSEOData[params.id];
  
  if (!room) {
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
          <div style={{ fontSize: 60, color: 'white' }}>Hotel Xhema</div>
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
              fontSize: 72,
              fontWeight: 'bold',
              marginBottom: 20,
              color: '#F1C338',
            }}
          >
            {room.name}
          </div>
          <div
            style={{
              fontSize: 36,
              marginBottom: 30,
              color: 'rgba(255,255,255,0.9)',
            }}
          >
            {room.description}
          </div>
          <div
            style={{
              fontSize: 48,
              fontWeight: 'bold',
              marginBottom: 20,
              color: '#F1C338',
            }}
          >
            {room.price}
          </div>
          <div
            style={{
              fontSize: 32,
              color: 'rgba(255,255,255,0.8)',
            }}
          >
            Hotel Xhema · Pristina, Kosovo
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
