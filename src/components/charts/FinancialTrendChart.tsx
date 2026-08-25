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
  data: Array<{ week: string; flaggedVolume: number; totalVolume: number }>;
}

export const FinancialTrendChart: React.FC<FinancialTrendChartProps> = ({ data }) => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis dataKey="week" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              borderColor: '#e2e8f0',
              borderRadius: '6px',
              color: '#0f172a',
              fontSize: '11px',
              boxShadow: '0 4px 12px rgba(15,23,42,0.08)',
            }}
            formatter={(value: any) => [`$${value}M USD`, '']}
          />
          <Legend verticalAlign="top" align="right" wrapperStyle={{ fontSize: '11px', paddingBottom: '10px' }} />
          <Line
            type="monotone"
            dataKey="totalVolume"
            name="Monitored Flow"
            stroke="#94a3b8"
            strokeWidth={1.5}
            dot={{ r: 3, fill: '#94a3b8' }}
          />
          <Line
            type="monotone"
            dataKey="flaggedVolume"
            name="Illicit / Tumbler Capital"
            stroke="#dc2626"
            strokeWidth={2}
            dot={{ r: 3.5, fill: '#dc2626' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
