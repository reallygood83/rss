import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'TeaBoard RSS - 한국어 최적화 RSS 서비스'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
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
          backgroundColor: '#FFFFFF',
          position: 'relative',
        }}
      >
        {/* Yellow accent box */}
        <div
          style={{
            position: 'absolute',
            top: '150px',
            left: '50%',
            transform: 'translateX(-50%) rotate(-2deg)',
            width: '500px',
            height: '160px',
            backgroundColor: '#FFD100',
            border: '8px solid #000000',
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            zIndex: 10,
          }}
        >
          {/* Title */}
          <div
            style={{
              fontSize: '72px',
              fontWeight: 900,
              color: '#000000',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            🍵 TeaBoard RSS
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: '36px',
              fontWeight: 700,
              color: '#000000',
            }}
          >
            한국어 최적화 RSS 서비스
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: '28px',
              fontWeight: 400,
              color: '#333333',
              maxWidth: '900px',
              textAlign: 'center',
              marginTop: '20px',
            }}
          >
            RSS를 지원하지 않는 웹사이트도 클릭 몇 번으로 RSS 피드로 만들기
          </div>

          {/* Feature boxes */}
          <div
            style={{
              display: 'flex',
              gap: '40px',
              marginTop: '60px',
            }}
          >
            {/* Box 1 */}
            <div
              style={{
                width: '240px',
                height: '120px',
                backgroundColor: '#FFD100',
                border: '6px solid #000000',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <div style={{ fontSize: '36px' }}>🎯</div>
              <div style={{ fontSize: '20px', fontWeight: 700, color: '#000000' }}>
                쉬운 생성
              </div>
            </div>

            {/* Box 2 */}
            <div
              style={{
                width: '240px',
                height: '120px',
                backgroundColor: '#FFFFFF',
                border: '6px solid #000000',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <div style={{ fontSize: '36px' }}>⚡</div>
              <div style={{ fontSize: '20px', fontWeight: 700, color: '#000000' }}>
                빠른 업데이트
              </div>
            </div>

            {/* Box 3 */}
            <div
              style={{
                width: '240px',
                height: '120px',
                backgroundColor: '#000000',
                border: '6px solid #000000',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <div style={{ fontSize: '36px' }}>🇰🇷</div>
              <div style={{ fontSize: '20px', fontWeight: 700, color: '#FFFFFF' }}>
                한국어 최적화
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
