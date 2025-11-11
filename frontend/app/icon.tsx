import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFD100',
          border: '2px solid #000000',
          position: 'relative',
        }}
      >
        {/* Tea cup emoji */}
        <div
          style={{
            fontSize: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          🍵
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
