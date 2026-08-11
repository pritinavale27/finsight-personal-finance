import React from 'react';
import { BarChart3 } from 'lucide-react';
import { EmptyState } from '../components/ui/EmptyState';

export const AnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">Analytics & Financial Health</h1>
        <p className="text-xs text-slate-400">Deep financial reports, merchant distributions, and 0-100 score engine.</p>
      </div>

      <EmptyState
        icon={BarChart3}
        title="Advanced Analytics Hub"
        description="Comprehensive spending trends, payment method distributions, and the FinSight 0-100 Financial Health Score build in Phase 9."
        action={
          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            Coming in Phase 9
          </span>
        }
      />
    </div>
  );
};
