import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface HighRiskZonesChartProps {
  data: Array<{ zone: string; threatScore: number; incidentsCount: number }>;
}

export const HighRiskZonesChart: React.FC<HighRiskZonesChartProps> = ({ data }) => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
          <XAxis type="number" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} domain={[0, 100]} />
          <YAxis
            type="category"
            dataKey="zone"
            stroke="#475569"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            width={90}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              borderColor: '#e2e8f0',
              borderRadius: '6px',
              color: '#0f172a',
              fontSize: '11px',
              boxShadow: '0 4px 12px rgba(15,23,42,0.08)',
            }}
            formatter={(value: any, name: string) => [
              name === 'threatScore' ? `${value}/100` : value,
              name === 'threatScore' ? 'Threat Score' : 'Incidents',
            ]}
          />
          <Bar dataKey="threatScore" name="threatScore" radius={[0, 4, 4, 0]} barSize={12}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  entry.threatScore > 80
                    ? '#dc2626'
                    : entry.threatScore > 60
                    ? '#ea580c'
                    : '#2563eb'
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
