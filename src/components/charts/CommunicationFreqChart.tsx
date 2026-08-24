import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface CommunicationFreqChartProps {
  data: Array<{ timeSlot: string; voiceCalls: number; encryptedMessages: number; interceptedRadio: number }>;
}

export const CommunicationFreqChart: React.FC<CommunicationFreqChartProps> = ({ data }) => {
  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="timeSlot" stroke="#64748b" tick={{ fontSize: 10 }} />
          <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(11, 21, 45, 0.95)',
              borderColor: 'rgba(6, 182, 212, 0.4)',
              borderRadius: '8px',
              color: '#f8fafc',
              fontSize: '12px',
            }}
          />
          <Legend wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
          <Bar dataKey="encryptedMessages" name="Encrypted IMs" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="voiceCalls" name="Voice Intercepts" fill="#06b6d4" radius={[4, 4, 0, 0]} />
          <Bar dataKey="interceptedRadio" name="Burst Radio" fill="#f59e0b" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
