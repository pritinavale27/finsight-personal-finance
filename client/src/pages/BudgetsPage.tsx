import React from 'react';
import { PieChart, Plus } from 'lucide-react';
import { EmptyState } from '../components/ui/EmptyState';

export const BudgetsPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Budgets</h1>
          <p className="text-xs text-slate-400">Set and monitor category spending limits.</p>
        </div>
        <button
          disabled
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-slate-400 font-semibold text-xs border border-slate-700 cursor-not-allowed opacity-75"
        >
          <Plus className="h-4 w-4" />
          <span>Create Budget</span>
        </button>
      </div>

      <EmptyState
        icon={PieChart}
        title="Category Budget Planner"
        description="Define custom monthly spending targets, track progress bars, and configure warning thresholds in Phase 6."
        action={
          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            Coming in Phase 6
          </span>
        }
      />
    </div>
  );
};
