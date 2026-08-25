import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CommunicationFreqChartProps {
  data: Array<{ hour: string; count: number }>;
}

export const CommunicationFreqChart: React.FC<CommunicationFreqChartProps> = ({ data }) => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis dataKey="hour" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
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
            formatter={(value: any) => [`${value} Wiretaps`, 'Intercepts']}
          />
          <Bar dataKey="count" name="Intercept Volume" fill="#0f172a" radius={[3, 3, 0, 0]} barSize={14} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
