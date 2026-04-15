'use client'

import { LineChart, Line, ResponsiveContainer, Tooltip, YAxis } from 'recharts'

interface Props {
  data: number[]
}

export default function Sparkline({ data }: Props) {
  const chartData = data.map((v, i) => ({ i, v }))

  return (
    <ResponsiveContainer width="100%" height={80}>
      <LineChart data={chartData}>
        <YAxis domain={[0, 100]} hide />
        <Tooltip
          contentStyle={{
            background: '#141929',
            border: '1px solid #1E2740',
            borderRadius: '8px',
            fontSize: '12px',
            color: '#E2E8F0',
          }}
          formatter={(value: number) => [`${value}%`, 'Probabilité']}
          labelFormatter={() => ''}
        />
        <Line
          type="monotone"
          dataKey="v"
          stroke="#0F9D58"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: '#0F9D58' }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
