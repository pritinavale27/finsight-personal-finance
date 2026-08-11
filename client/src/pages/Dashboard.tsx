import React, { useState } from 'react';
import { Calendar, RefreshCw, Filter } from 'lucide-react';
import {
  currentUser,
  availableMonths,
  summaryMetrics,
  incomeExpenseData,
  categorySpendingData,
  recentTransactions,
  budgetCategories,
  savingsGoals,
  mockAIInsights,
} from '../data/mockData';
import { SummaryCard } from '../components/dashboard/SummaryCard';
import { IncomeExpenseChart } from '../components/dashboard/IncomeExpenseChart';
import { SpendingCategoryChart } from '../components/dashboard/SpendingCategoryChart';
import { RecentTransactions } from '../components/dashboard/RecentTransactions';
import { BudgetOverview } from '../components/dashboard/BudgetOverview';
import { SavingsGoalCard } from '../components/dashboard/SavingsGoalCard';
import { AIInsights } from '../components/dashboard/AIInsights';
import { SkeletonCard } from '../components/ui/skeletons/SkeletonCard';
import { SkeletonChart } from '../components/ui/skeletons/SkeletonChart';
import { useToast } from '../components/ui/Toast';

export const Dashboard: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState('August 2026');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    setIsLoading(true);
    toast.info('Updating Dashboard Data', `Simulating view for ${month}`);
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      {/* Dashboard Top Header & Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Good afternoon, {currentUser.name} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">
            Here's your financial overview.
          </p>
        </div>

        {/* Month Selector Dropdown & Refresh */}
        <div className="flex items-center gap-2">
          <div className="relative inline-flex items-center">
            <Calendar className="absolute left-3 h-4 w-4 text-indigo-400 pointer-events-none" />
            <select
              value={selectedMonth}
              onChange={(e) => handleMonthChange(e.target.value)}
              className="pl-9 pr-8 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer hover:bg-slate-750 transition-colors"
              aria-label="Select month for financial overview"
            >
              {availableMonths.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <Filter className="absolute right-3 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          </div>

          <button
            onClick={() => handleMonthChange(selectedMonth)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-300 transition-colors"
            title="Refresh Data"
            aria-label="Refresh financial data"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin text-indigo-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Summary Cards Row */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryMetrics.map((metric) => (
            <SummaryCard key={metric.id} metric={metric} />
          ))}
        </div>
      )}

      {/* Main Grid Section: 2 Columns on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          {isLoading ? (
            <SkeletonChart />
          ) : (
            <IncomeExpenseChart data={incomeExpenseData} />
          )}

          <RecentTransactions transactions={recentTransactions} />

          <SavingsGoalCard goals={savingsGoals} />

          <AIInsights insights={mockAIInsights} />
        </div>

        {/* Right Column (Span 1) */}
        <div className="space-y-6">
          <SpendingCategoryChart data={categorySpendingData} />

          <BudgetOverview categories={budgetCategories} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
