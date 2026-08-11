import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { CategorySpendingPoint } from '../../types/dashboard';

interface SpendingCategoryChartProps {
  data: CategorySpendingPoint[];
}

export const SpendingCategoryChart: React.FC<SpendingCategoryChartProps> = ({ data }) => {
  const totalSpending = data.reduce((acc, item) => acc + item.amount, 0);

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
      <div>
        <h3 className="text-base font-bold text-slate-100 tracking-tight">Spending by Category</h3>
        <p className="text-xs text-slate-400 font-medium">Distribution of expenses this month</p>
      </div>

      {/* Donut Chart Container */}
      <div className="h-48 w-full relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={75}
              paddingAngle={4}
              dataKey="amount"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="#0f172a" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: '#334155',
                borderRadius: '0.75rem',
                color: '#f8fafc',
                fontSize: '12px',
              }}
              formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Amount']}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Donut Center Metrics */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total</span>
          <span className="text-sm font-extrabold text-white">₹{totalSpending.toLocaleString()}</span>
        </div>
      </div>

      {/* Legend / Breakdown List */}
      <div className="space-y-2 pt-2 border-t border-slate-800/80 max-h-40 overflow-y-auto">
        {data.map((item) => (
          <div key={item.category} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-slate-300 font-medium">{item.category}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-slate-400 font-semibold">{item.percentage}%</span>
              <span className="text-slate-200 font-bold w-16 text-right">₹{item.amount.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
