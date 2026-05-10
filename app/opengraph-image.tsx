import { ImageResponse } from 'next/og'

export const alt = 'Baycast — Prediction Polling Platform'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#0A0E1A',
          padding: '60px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative gradient circles */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            left: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(15,157,88,0.12) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-80px',
            right: '-80px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(66,133,244,0.12) 0%, transparent 70%)',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '12px',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #0F9D58 0%, #4285F4 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                fontWeight: 800,
                color: 'white',
              }}
            >
              B
            </div>
            <span
              style={{
                fontSize: '52px',
                fontWeight: 800,
                color: '#E2E8F0',
                letterSpacing: '-1px',
              }}
            >
              Baycast
            </span>
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: '28px',
              color: '#718096',
              textAlign: 'center',
              lineHeight: 1.4,
            }}
          >
            Prediction Polling Platform
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: '20px',
              color: '#4a5568',
              textAlign: 'center',
              lineHeight: 1.4,
            }}
          >
            Where collective intelligence meets scored forecasting
          </div>

          {/* Divider line */}
          <div
            style={{
              width: '200px',
              height: '3px',
              background: 'linear-gradient(90deg, #0F9D58, #4285F4)',
              borderRadius: '2px',
              marginTop: '8px',
            }}
          />

          {/* Features row */}
          <div
            style={{
              display: 'flex',
              gap: '32px',
              marginTop: '12px',
            }}
          >
            {[
              { label: 'Blind Consensus', emoji: '🔒' },
              { label: 'Brier Scores', emoji: '📊' },
              { label: 'AI + Human', emoji: '🤖' },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '18px',
                  color: '#E2E8F0',
                }}
              >
                <span>{item.emoji}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* URL footer */}
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            fontSize: '16px',
            color: '#4a5568',
          }}
        >
          baycast-p.vercel.app
        </div>
      </div>
    ),
    { ...size }
  )
}
