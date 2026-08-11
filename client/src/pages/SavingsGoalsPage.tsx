import React from 'react';
import { Target, Plus } from 'lucide-react';
import { EmptyState } from '../components/ui/EmptyState';

export const SavingsGoalsPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Savings Goals</h1>
          <p className="text-xs text-slate-400">Target funds, deposits, withdrawals, and completion estimates.</p>
        </div>
        <button
          disabled
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-slate-400 font-semibold text-xs border border-slate-700 cursor-not-allowed opacity-75"
        >
          <Plus className="h-4 w-4" />
          <span>New Goal</span>
        </button>
      </div>

      <EmptyState
        icon={Target}
        title="Savings Goal Tracker"
        description="Create laptop, emergency, or vacation funds with deposit/withdrawal logs and dynamic saving velocity calculations in Phase 7."
        action={
          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            Coming in Phase 7
          </span>
        }
      />
    </div>
  );
};
