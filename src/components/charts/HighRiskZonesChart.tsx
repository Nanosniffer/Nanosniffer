import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface HighRiskZonesChartProps {
  data: Array<{ zone: string; threatLevel: number; activeSuspects: number; incidents: number }>;
}

export const HighRiskZonesChart: React.FC<HighRiskZonesChartProps> = ({ data }) => {
  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
          <XAxis type="number" domain={[0, 100]} stroke="#64748b" tick={{ fontSize: 11 }} />
          <YAxis
            type="category"
            dataKey="zone"
            stroke="#64748b"
            tick={{ fontSize: 10 }}
            width={120}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(11, 21, 45, 0.95)',
              borderColor: 'rgba(239, 68, 68, 0.4)',
              borderRadius: '8px',
              color: '#f8fafc',
              fontSize: '12px',
            }}
            formatter={(value: any, name: string) => [
              `${value}/100`,
              name === 'threatLevel' ? 'Threat Score' : name,
            ]}
          />
          <Bar dataKey="threatLevel" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => {
              const color = entry.threatLevel >= 90 ? '#ef4444' : entry.threatLevel >= 80 ? '#f59e0b' : '#06b6d4';
              return <Cell key={`cell-${index}`} fill={color} />;
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
