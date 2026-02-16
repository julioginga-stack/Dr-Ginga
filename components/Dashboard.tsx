
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { MOCK_METRICS } from '../constants';

const Dashboard: React.FC = () => {
  const totalMinutes = MOCK_METRICS.reduce((acc, curr) => acc + curr.minutes, 0);
  const avgMinutes = Math.round(totalMinutes / MOCK_METRICS.length);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h2 className="text-4xl font-premium font-bold mb-2">My Performance</h2>
          <p className="text-slate-400">Track your learning journey and podcast engagement.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-[#1e293b] p-4 rounded-2xl border border-slate-800">
            <p className="text-[10px] uppercase text-slate-500 font-bold mb-1">Total Time</p>
            <p className="text-2xl font-premium text-[#d4af37]">{totalMinutes}m</p>
          </div>
          <div className="bg-[#1e293b] p-4 rounded-2xl border border-slate-800">
            <p className="text-[10px] uppercase text-slate-500 font-bold mb-1">Daily Avg</p>
            <p className="text-2xl font-premium text-[#d4af37]">{avgMinutes}m</p>
          </div>
        </div>
      </div>

      <div className="bg-[#0a121e] border border-slate-800 rounded-3xl p-8">
        <h3 className="text-xl font-premium font-bold mb-8">Weekly Listening Time</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MOCK_METRICS}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 12 }} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 12 }} 
                unit="m"
              />
              <Tooltip 
                cursor={{ fill: '#1e293b', opacity: 0.4 }}
                contentStyle={{ 
                  backgroundColor: '#0a121e', 
                  borderColor: '#1e293b',
                  borderRadius: '12px',
                  color: '#fff' 
                }}
              />
              <Bar dataKey="minutes" radius={[6, 6, 0, 0]}>
                {MOCK_METRICS.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.minutes > 40 ? '#d4af37' : '#2d3436'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1e293b] p-6 rounded-2xl border border-slate-800 flex items-center gap-4">
           <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
           </div>
           <div>
             <h4 className="font-bold text-lg">12</h4>
             <p className="text-xs text-slate-400">Episodes Finished</p>
           </div>
        </div>
        <div className="bg-[#1e293b] p-6 rounded-2xl border border-slate-800 flex items-center gap-4">
           <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
           </div>
           <div>
             <h4 className="font-bold text-lg">4</h4>
             <p className="text-xs text-slate-400">Active Streaks (Days)</p>
           </div>
        </div>
        <div className="bg-[#1e293b] p-6 rounded-2xl border border-slate-800 flex items-center gap-4">
           <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M21 3.01H3c-1.1 0-2 .9-2 2V18c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5.01c0-1.1-.9-2-2-2zm-10 12h-1V14h1v1.01zm0-3h-1v-4h1v4zm4 3h-1V14h1v1.01zm0-3h-1v-4h1v4z"/></svg>
           </div>
           <div>
             <h4 className="font-bold text-lg">8</h4>
             <p className="text-xs text-slate-400">Summaries Read</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
