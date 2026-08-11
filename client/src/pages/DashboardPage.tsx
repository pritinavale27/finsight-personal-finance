import React from 'react';
import { ArrowUpRight, Sparkles, AlertCircle } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900/60 via-slate-900 to-slate-900 p-6 border border-indigo-500/20 shadow-xl">
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-indigo-500/10 to-transparent pointer-events-none" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold mb-2">
              <Sparkles className="h-3.5 w-3.5" /> Phase 1 Application Shell Live
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Welcome back, Alex 👋
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              FinSight Personal Finance Intelligence Platform shell initialized. Full metric dashboards, transaction management, and AI features will connect in upcoming phases.
            </p>
          </div>
          <button className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] shrink-0">
            <span>Explore Architecture</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Overview Cards Placeholder Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Total Balance', value: '₹84,500', change: '+12.4%', color: 'indigo' },
          { title: 'Monthly Income', value: '₹65,000', change: '+5.0%', color: 'emerald' },
          { title: 'Monthly Expenses', value: '₹38,200', change: '-3.1%', color: 'amber' },
          { title: 'Savings Rate', value: '41.2%', change: '+4.2%', color: 'indigo' },
        ].map((card, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all shadow-sm group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">{card.title}</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {card.change}
              </span>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-black text-white tracking-tight group-hover:text-indigo-400 transition-colors">
                {card.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Info Callout */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3 text-xs text-slate-400">
        <AlertCircle className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-slate-200">Phase 1 Infrastructure Ready</p>
          <p className="mt-0.5">
            React 18 + TypeScript + Vite + Tailwind CSS design tokens are active. Standardized API client ready to connect to Express backend.
          </p>
        </div>
      </div>
    </div>
  );
};
