import React from 'react';
import { Repeat, Plus } from 'lucide-react';
import { EmptyState } from '../components/ui/EmptyState';

export const RecurringExpensesPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Recurring Expenses</h1>
          <p className="text-xs text-slate-400">Track active subscriptions, rent, and utility commitments.</p>
        </div>
        <button
          disabled
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-slate-400 font-semibold text-xs border border-slate-700 cursor-not-allowed opacity-75"
        >
          <Plus className="h-4 w-4" />
          <span>Add Recurring</span>
        </button>
      </div>

      <EmptyState
        icon={Repeat}
        title="Recurring Subscriptions Tracker"
        description="Monitor Netflix, internet, and gym memberships with payment frequency and upcoming due date reminders in Phase 8."
        action={
          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            Coming in Phase 8
          </span>
        }
      />
    </div>
  );
};
