import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { IncomeExpensePoint } from '../../types/dashboard';

interface IncomeExpenseChartProps {
  data: IncomeExpensePoint[];
}

export const IncomeExpenseChart: React.FC<IncomeExpenseChartProps> = ({ data }) => {
  const formatCurrency = (val: number) => `₹${(val / 1000).toFixed(0)}k`;

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-100 tracking-tight">
            Income vs Expenses
          </h3>
          <p className="text-xs text-slate-400 font-medium">
            Historical 6-month financial performance comparison
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 inline-block" />
            <span>Income</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-400">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500 inline-block" />
            <span>Expenses</span>
          </div>
        </div>
      </div>

      <div className="h-64 sm:h-72 w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.5} />
            <XAxis
              dataKey="month"
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatCurrency}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: '#334155',
                borderRadius: '0.75rem',
                color: '#f8fafc',
                fontSize: '12px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
              }}
              formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
              labelStyle={{ fontWeight: 'bold', color: '#cbd5e1' }}
            />
            <Legend display="none" />
            <Bar dataKey="income" name="Income" fill="#10b981" radius={[6, 6, 0, 0]} barSize={16} />
            <Bar dataKey="expenses" name="Expenses" fill="#f59e0b" radius={[6, 6, 0, 0]} barSize={16} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
