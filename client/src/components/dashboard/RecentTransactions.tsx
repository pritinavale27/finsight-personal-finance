import React from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Utensils,
  Car,
  ShoppingBag,
  Tv,
  Zap,
  ArrowUpRight,
  ArrowDownLeft,
  ChevronRight,
} from 'lucide-react';
import { RecentTransaction } from '../../types/dashboard';

interface RecentTransactionsProps {
  transactions: RecentTransaction[];
}

export const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'income':
        return <Briefcase className="h-4 w-4 text-emerald-400" />;
      case 'food':
        return <Utensils className="h-4 w-4 text-indigo-400" />;
      case 'transportation':
        return <Car className="h-4 w-4 text-cyan-400" />;
      case 'shopping':
        return <ShoppingBag className="h-4 w-4 text-pink-400" />;
      case 'subscriptions':
        return <Tv className="h-4 w-4 text-purple-400" />;
      case 'utilities':
        return <Zap className="h-4 w-4 text-amber-400" />;
      default:
        return <ShoppingBag className="h-4 w-4 text-slate-400" />;
    }
  };

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-100 tracking-tight">Recent Transactions</h3>
          <p className="text-xs text-slate-400 font-medium">Latest financial activity</p>
        </div>
        <Link
          to="/transactions"
          className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors group"
        >
          <span>View all transactions</span>
          <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Transaction List */}
      <div className="divide-y divide-slate-800/60">
        {transactions.map((tx) => {
          const isIncome = tx.type === 'income';
          return (
            <div
              key={tx.id}
              className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3 group hover:bg-slate-800/30 px-2 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-9 w-9 rounded-xl bg-slate-800 border border-slate-700/60 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  {getCategoryIcon(tx.category)}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-100 truncate group-hover:text-indigo-300 transition-colors">
                    {tx.description}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                    <span className="truncate">{tx.merchant}</span>
                    <span>•</span>
                    <span>{tx.date}</span>
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <p
                  className={`text-xs font-extrabold flex items-center justify-end gap-1 ${
                    isIncome ? 'text-emerald-400' : 'text-slate-200'
                  }`}
                >
                  {isIncome ? (
                    <ArrowDownLeft className="h-3 w-3 text-emerald-400" />
                  ) : (
                    <ArrowUpRight className="h-3 w-3 text-slate-400" />
                  )}
                  <span>
                    {isIncome ? '+' : '-'}₹{tx.amount.toLocaleString()}
                  </span>
                </p>
                <span className="inline-block text-[10px] font-medium text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded border border-slate-700/50 mt-1">
                  {tx.category}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
