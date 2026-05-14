import { ImageResponse } from 'next/og'
import { createClient } from '@supabase/supabase-js'

export const alt = 'Baycast Question'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

function truncate(text: string, max: number): string {
  return text.length > max ? text.slice(0, max).trimEnd() + '…' : text
}

const STATUS_COLORS: Record<string, string> = {
  open: '#0F9D58',
  closed: '#F59E0B',
  resolved: '#4285F4',
}

const STATUS_LABELS: Record<string, string> = {
  open: '● Open',
  closed: '● Closed',
  resolved: '✓ Resolved',
}

export default async function Image({ params }: { params: { id: string } }) {
  // Lazily create Supabase client to avoid build-time initialization
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If no env vars (build time), return a fallback image
  if (!supabaseUrl || !supabaseKey) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#0A0E1A',
            padding: '56px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontSize: '40px',
              fontWeight: 700,
              color: '#E2E8F0',
            }}
          >
            Baycast
          </div>
          <div style={{ fontSize: '24px', color: '#718096', marginTop: '16px' }}>
            Prediction Poll
          </div>
        </div>
      ),
      { ...size }
    )
  }

  const supabase = createClient(supabaseUrl, supabaseKey)
  // Fetch question data
  const { data: question } = await supabase
    .from('questions')
    .select('id, title, category, status, closes_at')
    .eq('id', params.id)
    .single()

  // Fetch forecast count
  const { count: forecastCount } = await supabase
    .from('forecasts')
    .select('*', { count: 'exact', head: true })
    .eq('question_id', params.id)

  // Fetch aggregate probability
  const { data: forecasts } = await supabase
    .from('forecasts')
    .select('prediction')
    .eq('question_id', params.id)

  const avgProb =
    forecasts && forecasts.length > 0
      ? Math.round(
          forecasts.reduce(
            (sum: number, f: { prediction: { probability: number } }) =>
              sum + f.prediction.probability,
            0
          ) / forecasts.length
        )
      : null

  const title = question?.title ?? 'Unknown Question'
  const category = question?.category ?? 'Other'
  const status = question?.status ?? 'open'
  const fcCount = forecastCount ?? 0

  const statusColor = STATUS_COLORS[status] ?? '#718096'
  const statusLabel = STATUS_LABELS[status] ?? status

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0A0E1A',
          padding: '56px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative gradient */}
        <div
          style={{
            position: 'absolute',
            top: '-60px',
            right: '-60px',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(15,157,88,0.1) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-40px',
            left: '-40px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(66,133,244,0.08) 0%, transparent 70%)',
          }}
        />

        {/* Header: Logo + Category + Status */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '40px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '11px',
                background: 'linear-gradient(135deg, #0F9D58 0%, #4285F4 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                fontWeight: 800,
                color: 'white',
              }}
            >
              B
            </div>
            <span
              style={{
                fontSize: '26px',
                fontWeight: 800,
                color: '#E2E8F0',
                letterSpacing: '-0.5px',
              }}
            >
              Baycast
            </span>
          </div>

          {/* Badges */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {/* Category badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '6px 16px',
                borderRadius: '20px',
                backgroundColor: 'rgba(66,133,244,0.15)',
                border: '1px solid rgba(66,133,244,0.3)',
                fontSize: '16px',
                color: '#4285F4',
                fontWeight: 600,
              }}
            >
              {category}
            </div>
            {/* Status badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '6px 16px',
                borderRadius: '20px',
                backgroundColor: `${statusColor}20`,
                border: `1px solid ${statusColor}50`,
                fontSize: '16px',
                color: statusColor,
                fontWeight: 600,
              }}
            >
              {statusLabel}
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Question title */}
          <div
            style={{
              fontSize: '40px',
              fontWeight: 700,
              color: '#E2E8F0',
              lineHeight: 1.25,
              marginBottom: '36px',
              letterSpacing: '-0.5px',
              maxWidth: '900px',
            }}
          >
            {truncate(title, 80)}
          </div>

          {/* Probability + Stats row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '48px',
            }}
          >
            {/* Probability */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '4px',
              }}
            >
              <div
                style={{
                  fontSize: '64px',
                  fontWeight: 800,
                  color: '#0F9D58',
                  lineHeight: 1,
                  letterSpacing: '-2px',
                }}
              >
                {avgProb !== null ? `${avgProb}%` : '—'}
              </div>
              <div
                style={{
                  fontSize: '18px',
                  color: '#718096',
                  fontWeight: 500,
                }}
              >
                {avgProb !== null ? 'Community Forecast' : 'No forecasts yet'}
              </div>
            </div>

            {/* Divider */}
            <div
              style={{
                width: '2px',
                height: '64px',
                backgroundColor: '#1E2740',
                borderRadius: '1px',
              }}
            />

            {/* Stats */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '28px', fontWeight: 700, color: '#E2E8F0' }}>
                  {fcCount}
                </span>
                <span style={{ fontSize: '16px', color: '#718096' }}>
                  Forecaster{fcCount !== 1 ? 's' : ''}
                </span>
              </div>
              <div
                style={{
                  fontSize: '14px',
                  color: '#4a5568',
                }}
              >
                Blind Consensus Protocol
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: '14px',
              color: '#4a5568',
            }}
          >
            baycast-p.vercel.app
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '14px',
              color: '#4a5568',
            }}
          >
            <span>Crowd predictions.</span>
            <span style={{ color: '#0F9D58' }}>Scored by reality.</span>
          </div>
        </div>

        {/* Bottom gradient accent line */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #0F9D58 0%, #4285F4 100%)',
          }}
        />
      </div>
    ),
    { ...size }
  )
}
