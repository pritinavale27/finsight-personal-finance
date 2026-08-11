import React from 'react';
import { Receipt, Plus } from 'lucide-react';
import { EmptyState } from '../components/ui/EmptyState';

export const TransactionsPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Transactions</h1>
          <p className="text-xs text-slate-400">View, search, filter, and manage income & expenses.</p>
        </div>
        <button
          disabled
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-slate-400 font-semibold text-xs border border-slate-700 cursor-not-allowed opacity-75"
        >
          <Plus className="h-4 w-4" />
          <span>Add Transaction</span>
        </button>
      </div>

      <EmptyState
        icon={Receipt}
        title="Transaction Management Module"
        description="Full multi-criteria search, category filters, pagination, and transaction CRUD operations are scheduled for Phase 5."
        action={
          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            Coming in Phase 5
          </span>
        }
      />
    </div>
  );
};
