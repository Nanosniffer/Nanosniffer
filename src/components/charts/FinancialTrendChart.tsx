import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface FinancialTrendChartProps {
  data: Array<{ date: string; volumeUSD: number; flaggedVolumeUSD: number }>;
}

export const FinancialTrendChart: React.FC<FinancialTrendChartProps> = ({ data }) => {
  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 11 }} />
          <YAxis
            stroke="#64748b"
            tick={{ fontSize: 11 }}
            tickFormatter={(val) => `$${val}M`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(11, 21, 45, 0.95)',
              borderColor: 'rgba(16, 185, 129, 0.4)',
              borderRadius: '8px',
              color: '#f8fafc',
              fontSize: '12px',
            }}
            formatter={(value: any) => [`$${value}M USD`, '']}
          />
          <Legend wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
          <Line
            type="monotone"
            dataKey="volumeUSD"
            name="Gross Monitored Volume"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 3, fill: '#3b82f6' }}
          />
          <Line
            type="monotone"
            dataKey="flaggedVolumeUSD"
            name="Flagged Illicit Flow"
            stroke="#ef4444"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#ef4444' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
