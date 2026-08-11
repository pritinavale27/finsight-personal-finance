import React from 'react';
import { Wallet, ArrowDownLeft, ArrowUpRight, Percent, TrendingUp, TrendingDown } from 'lucide-react';
import { SummaryMetric } from '../../types/dashboard';
import { cn } from '../../utils/cn';

interface SummaryCardProps {
  metric: SummaryMetric;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ metric }) => {
  const getIcon = () => {
    switch (metric.type) {
      case 'balance':
        return <Wallet className="h-5 w-5 text-indigo-400" />;
      case 'income':
        return <ArrowDownLeft className="h-5 w-5 text-emerald-400" />;
      case 'expense':
        return <ArrowUpRight className="h-5 w-5 text-amber-400" />;
      case 'savings_rate':
        return <Percent className="h-5 w-5 text-indigo-400" />;
      default:
        return <Wallet className="h-5 w-5 text-indigo-400" />;
    }
  };

  const getIconBg = () => {
    switch (metric.type) {
      case 'balance':
        return 'bg-indigo-500/10 border-indigo-500/20';
      case 'income':
        return 'bg-emerald-500/10 border-emerald-500/20';
      case 'expense':
        return 'bg-amber-500/10 border-amber-500/20';
      case 'savings_rate':
        return 'bg-indigo-500/10 border-indigo-500/20';
      default:
        return 'bg-slate-800 border-slate-700';
    }
  };

  return (
    <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700/80 transition-all duration-200 shadow-sm group">
      <div className="flex items-center justify-between">
        <div className={cn('p-2.5 rounded-xl border flex items-center justify-center', getIconBg())}>
          {getIcon()}
        </div>

        {/* Comparison Delta Badge */}
        <div
          className={cn(
            'inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full border',
            metric.isPositive
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
          )}
        >
          {metric.isPositive ? (
            <TrendingUp className="h-3 w-3" />
          ) : (
            <TrendingDown className="h-3 w-3" />
          )}
          <span>{metric.change}</span>
        </div>
      </div>

      <div className="mt-4">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {metric.title}
        </span>
        <div className="mt-1">
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight group-hover:text-indigo-400 transition-colors">
            {metric.value}
          </span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1 font-medium">{metric.comparisonText}</p>
      </div>
    </div>
  );
};
