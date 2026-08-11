import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import { BudgetCategory, BudgetStatus } from '../../types/dashboard';
import { ProgressBar } from '../ui/ProgressBar';
import { cn } from '../../utils/cn';

interface BudgetOverviewProps {
  categories: BudgetCategory[];
}

export const BudgetOverview: React.FC<BudgetOverviewProps> = ({ categories }) => {
  const getStatusBadge = (status: BudgetStatus) => {
    switch (status) {
      case 'normal':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle className="h-3 w-3" /> Normal
          </span>
        );
      case 'warning':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <AlertTriangle className="h-3 w-3" /> Warning (70-90%)
          </span>
        );
      case 'critical':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <AlertCircle className="h-3 w-3" /> Critical (&gt;90%)
          </span>
        );
      case 'exceeded':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-600/20 text-rose-400 border border-rose-500/40 animate-pulse">
            <AlertCircle className="h-3 w-3" /> Exceeded (&gt;100%)
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-100 tracking-tight">Budget Overview</h3>
          <p className="text-xs text-slate-400 font-medium">Monthly category spending limits</p>
        </div>
        <Link
          to="/budgets"
          className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors group"
        >
          <span>Manage budgets</span>
          <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="space-y-4">
        {categories.map((budget) => {
          const remaining = budget.budgeted - budget.spent;
          const isOver = remaining < 0;

          return (
            <div key={budget.id} className="space-y-2 p-3 rounded-xl bg-slate-950/40 border border-slate-800/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-100">{budget.category}</span>
                  {getStatusBadge(budget.status)}
                </div>

                <div className="text-xs font-semibold text-slate-300">
                  <span>₹{budget.spent.toLocaleString()}</span>
                  <span className="text-slate-500"> / ₹{budget.budgeted.toLocaleString()}</span>
                </div>
              </div>

              <ProgressBar value={budget.percentage} status={budget.status} color={budget.color} size="md" />

              <div className="flex items-center justify-between text-[11px] font-medium text-slate-400 pt-0.5">
                <span>
                  {isOver ? (
                    <span className="text-rose-400 font-bold">Over by ₹{Math.abs(remaining).toLocaleString()}</span>
                  ) : (
                    <span>Remaining: ₹{remaining.toLocaleString()}</span>
                  )}
                </span>
                <span className={cn(isOver ? 'text-rose-400 font-bold' : 'text-slate-300')}>
                  {budget.percentage.toFixed(1)}% Used
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
