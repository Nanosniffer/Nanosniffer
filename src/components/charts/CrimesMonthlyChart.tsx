import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface CrimesMonthlyChartProps {
  data: Array<{ month: string; total: number; resolved: number; drugTrafficking: number; cybercrime: number; extortion: number }>;
}

export const CrimesMonthlyChart: React.FC<CrimesMonthlyChartProps> = ({ data }) => {
  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="totalGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="resolvedGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 11 }} />
          <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(11, 21, 45, 0.95)',
              borderColor: 'rgba(6, 182, 212, 0.4)',
              borderRadius: '8px',
              color: '#f8fafc',
              fontSize: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            }}
          />
          <Legend wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
          <Area
            type="monotone"
            dataKey="total"
            name="Total Incidents"
            stroke="#06b6d4"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#totalGrad)"
          />
          <Area
            type="monotone"
            dataKey="resolved"
            name="Interdicted / Resolved"
            stroke="#8b5cf6"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#resolvedGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
