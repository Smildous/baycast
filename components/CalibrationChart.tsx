'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

export interface CalibrationPoint {
  predicted: number  // bucket midpoint (5, 15, 25, …, 95)
  actual: number     // observed resolution rate 0–100
  count: number      // number of forecasts in this bucket
}

interface Props {
  data: CalibrationPoint[]
}

// Build a unified dataset for the chart:
// every decile gets an "ideal" value (perfect calibration = predicted)
// and an "actual" value only where we have data
function buildChartData(points: CalibrationPoint[]) {
  return Array.from({ length: 10 }, (_, i) => {
    const midpoint = i * 10 + 5
    const match = points.find((p) => p.predicted === midpoint)
    return {
      predicted: midpoint,
      ideal: midpoint,
      actual: match?.actual ?? null,
      count: match?.count ?? 0,
    }
  })
}

const TOOLTIP_STYLE = {
  backgroundColor: '#0F1629',
  border: '1px solid #1E2740',
  borderRadius: '8px',
  fontSize: '12px',
  color: '#C9D1E3',
}

export default function CalibrationChart({ data }: Props) {
  const chartData = buildChartData(data)

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1E2740" />
        <XAxis
          dataKey="predicted"
          domain={[0, 100]}
          ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
          tickFormatter={(v) => `${v}%`}
          stroke="#4B5B7B"
          tick={{ fontSize: 11, fill: '#4B5B7B' }}
          label={{ value: 'Predicted', position: 'insideBottomRight', offset: -4, fontSize: 11, fill: '#4B5B7B' }}
        />
        <YAxis
          domain={[0, 100]}
          ticks={[0, 25, 50, 75, 100]}
          tickFormatter={(v) => `${v}%`}
          stroke="#4B5B7B"
          tick={{ fontSize: 11, fill: '#4B5B7B' }}
          label={{ value: 'Actual', angle: -90, position: 'insideLeft', offset: 8, fontSize: 11, fill: '#4B5B7B' }}
        />
        <Tooltip
          contentStyle={TOOLTIP_STYLE}
          labelFormatter={(label) => `Predicted: ${label}%`}
          formatter={(value: number | null, name: string) => {
            if (value === null) return ['—', name]
            return [`${value.toFixed(1)}%`, name]
          }}
        />
        <Legend
          wrapperStyle={{ fontSize: '12px', color: '#4B5B7B', paddingTop: '8px' }}
        />
        {/* Perfect calibration reference line */}
        <Line
          type="linear"
          dataKey="ideal"
          name="Perfect calibration"
          stroke="#4B5B7B"
          strokeDasharray="4 4"
          dot={false}
          strokeWidth={1.5}
          legendType="plainline"
        />
        {/* Actual calibration */}
        <Line
          type="monotone"
          dataKey="actual"
          name="Your calibration"
          stroke="#0F9D58"
          strokeWidth={2}
          dot={{ r: 4, fill: '#0F9D58', strokeWidth: 0 }}
          activeDot={{ r: 6, fill: '#0F9D58' }}
          connectNulls={false}
          legendType="circle"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
