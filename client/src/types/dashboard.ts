export type TransactionType = 'income' | 'expense';

export interface SummaryMetric {
  id: string;
  title: string;
  value: string;
  numericValue: number;
  change: string;
  isPositive: boolean;
  comparisonText: string;
  type: 'balance' | 'income' | 'expense' | 'savings_rate';
}

export interface IncomeExpensePoint {
  month: string;
  income: number;
  expenses: number;
  savings: number;
}

export interface CategorySpendingPoint {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface RecentTransaction {
  id: string;
  description: string;
  category: string;
  merchant: string;
  date: string;
  amount: number;
  type: TransactionType;
  paymentMethod: string;
}

export type BudgetStatus = 'normal' | 'warning' | 'critical' | 'exceeded';

export interface BudgetCategory {
  id: string;
  category: string;
  budgeted: number;
  spent: number;
  percentage: number;
  status: BudgetStatus;
  color: string;
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  percentage: number;
  remainingAmount: number;
  targetDate: string;
  color: string;
}

export type InsightType = 'positive' | 'warning' | 'neutral';

export interface AIInsight {
  id: string;
  title: string;
  description: string;
  type: InsightType;
  metric?: string;
  timestamp: string;
}
