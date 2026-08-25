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
  data: Array<{
    month: string;
    total?: number;
    incidents?: number;
    resolved: number;
    [key: string]: any;
  }>;
}

export const CrimesMonthlyChart: React.FC<CrimesMonthlyChartProps> = ({ data }) => {
  const formattedData = (data || []).map(item => ({
    ...item,
    incidents: item.incidents !== undefined ? item.incidents : (item.total || 0),
  }));

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={formattedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="incidentsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="resolvedGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#059669" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
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
          />
          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{ fontSize: '11px', paddingBottom: '10px' }}
          />
          <Area
            type="monotone"
            dataKey="incidents"
            name="Detected Incidents"
            stroke="#2563eb"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#incidentsGrad)"
          />
          <Area
            type="monotone"
            dataKey="resolved"
            name="Resolved / Interdicted"
            stroke="#059669"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#resolvedGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
