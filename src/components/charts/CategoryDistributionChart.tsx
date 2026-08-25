import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { CrimeCategory } from '../../types';

interface CategoryDistributionChartProps {
  data: Array<{ name: CrimeCategory; value: number; color: string }>;
}

const ENTERPRISE_COLORS = [
  '#0f172a', // Navy
  '#2563eb', // Blue
  '#7c3aed', // Purple
  '#ea580c', // Orange
  '#dc2626', // Red
  '#059669', // Emerald
  '#0891b2', // Cyan
  '#d97706', // Amber
];

export const CategoryDistributionChart: React.FC<CategoryDistributionChartProps> = ({ data }) => {
  return (
    <div className="w-full h-64 flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              borderColor: '#e2e8f0',
              borderRadius: '6px',
              color: '#0f172a',
              fontSize: '11px',
              boxShadow: '0 4px 12px rgba(15,23,42,0.08)',
            }}
            formatter={(value: any) => [`${value} Entities`, 'Share']}
          />
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={50}
            outerRadius={78}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={ENTERPRISE_COLORS[index % ENTERPRISE_COLORS.length]}
                stroke="#ffffff"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ fontSize: '10px', color: '#64748b', paddingTop: '8px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
