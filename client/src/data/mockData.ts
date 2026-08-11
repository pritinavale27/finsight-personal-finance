import {
  SummaryMetric,
  IncomeExpensePoint,
  CategorySpendingPoint,
  RecentTransaction,
  BudgetCategory,
  SavingsGoal,
  AIInsight,
} from '../types/dashboard';

export const currentUser = {
  name: 'Priti',
  email: 'priti@finsight.app',
  avatarUrl: '',
  currency: '₹',
  timezone: 'Asia/Kolkata',
};

export const availableMonths = [
  'August 2026',
  'July 2026',
  'June 2026',
  'May 2026',
  'April 2026',
];

export const summaryMetrics: SummaryMetric[] = [
  {
    id: '1',
    title: 'Total Balance',
    value: '₹84,500',
    numericValue: 84500,
    change: '+12.4%',
    isPositive: true,
    comparisonText: 'vs last month',
    type: 'balance',
  },
  {
    id: '2',
    title: 'Monthly Income',
    value: '₹65,000',
    numericValue: 65000,
    change: '+5.0%',
    isPositive: true,
    comparisonText: 'vs last month',
    type: 'income',
  },
  {
    id: '3',
    title: 'Monthly Expenses',
    value: '₹38,200',
    numericValue: 38200,
    change: '-3.1%',
    isPositive: true, // Decreasing expenses is positive
    comparisonText: 'vs last month',
    type: 'expense',
  },
  {
    id: '4',
    title: 'Savings Rate',
    value: '41.2%',
    numericValue: 41.2,
    change: '+4.2%',
    isPositive: true,
    comparisonText: 'vs last month',
    type: 'savings_rate',
  },
];

export const incomeExpenseData: IncomeExpensePoint[] = [
  { month: 'April', income: 55000, expenses: 32000, savings: 23000 },
  { month: 'May', income: 60000, expenses: 35000, savings: 25000 },
  { month: 'June', income: 62000, expenses: 37000, savings: 25000 },
  { month: 'July', income: 63000, expenses: 36000, savings: 27000 },
  { month: 'August', income: 65000, expenses: 38200, savings: 26800 },
];

export const categorySpendingData: CategorySpendingPoint[] = [
  { category: 'Food', amount: 12500, percentage: 32.7, color: '#6366f1' }, // Indigo
  { category: 'Shopping', amount: 7200, percentage: 18.8, color: '#ec4899' }, // Pink
  { category: 'Travel', amount: 5800, percentage: 15.2, color: '#06b6d4' }, // Cyan
  { category: 'Bills', amount: 4500, percentage: 11.8, color: '#f59e0b' }, // Amber
  { category: 'Entertainment', amount: 3200, percentage: 8.4, color: '#8b5cf6' }, // Purple
  { category: 'Other', amount: 5000, percentage: 13.1, color: '#64748b' }, // Slate
];

export const recentTransactions: RecentTransaction[] = [
  {
    id: 't1',
    description: 'Monthly Salary',
    category: 'Income',
    merchant: 'TechCorp Solutions',
    date: '01 Aug 2026',
    amount: 65000,
    type: 'income',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: 't2',
    description: 'Swiggy Gourmet Order',
    category: 'Food',
    merchant: 'Swiggy',
    date: '08 Aug 2026',
    amount: 420,
    type: 'expense',
    paymentMethod: 'UPI / GPay',
  },
  {
    id: 't3',
    description: 'Uber Ride to Office',
    category: 'Transportation',
    merchant: 'Uber',
    date: '07 Aug 2026',
    amount: 280,
    type: 'expense',
    paymentMethod: 'Credit Card',
  },
  {
    id: 't4',
    description: 'Electronics Purchase',
    category: 'Shopping',
    merchant: 'Amazon',
    date: '05 Aug 2026',
    amount: 2450,
    type: 'expense',
    paymentMethod: 'Credit Card',
  },
  {
    id: 't5',
    description: 'Netflix 4K Subscription',
    category: 'Subscriptions',
    merchant: 'Netflix',
    date: '03 Aug 2026',
    amount: 649,
    type: 'expense',
    paymentMethod: 'Auto Debit',
  },
  {
    id: 't6',
    description: 'Electricity Utility Bill',
    category: 'Utilities',
    merchant: 'State Electricity Board',
    date: '02 Aug 2026',
    amount: 1850,
    type: 'expense',
    paymentMethod: 'Net Banking',
  },
];

export const budgetCategories: BudgetCategory[] = [
  {
    id: 'b1',
    category: 'Food & Dining',
    budgeted: 8000,
    spent: 6850,
    percentage: 85.6,
    status: 'warning',
    color: '#f59e0b',
  },
  {
    id: 'b2',
    category: 'Shopping',
    budgeted: 6000,
    spent: 4200,
    percentage: 70.0,
    status: 'normal',
    color: '#10b981',
  },
  {
    id: 'b3',
    category: 'Travel & Commute',
    budgeted: 5000,
    spent: 3800,
    percentage: 76.0,
    status: 'warning',
    color: '#f59e0b',
  },
  {
    id: 'b4',
    category: 'Bills & Utilities',
    budgeted: 4000,
    spent: 4500,
    percentage: 112.5,
    status: 'exceeded',
    color: '#ef4444',
  },
];

export const savingsGoals: SavingsGoal[] = [
  {
    id: 'g1',
    name: 'New M3 MacBook Laptop',
    targetAmount: 120000,
    currentAmount: 48000,
    percentage: 40.0,
    remainingAmount: 72000,
    targetDate: 'Dec 2026',
    color: '#6366f1',
  },
  {
    id: 'g2',
    name: 'Emergency Reserve Fund',
    targetAmount: 200000,
    currentAmount: 140000,
    percentage: 70.0,
    remainingAmount: 60000,
    targetDate: 'Mar 2027',
    color: '#10b981',
  },
  {
    id: 'g3',
    name: 'Japan Vacation Fund',
    targetAmount: 50000,
    currentAmount: 32000,
    percentage: 64.0,
    remainingAmount: 18000,
    targetDate: 'Nov 2026',
    color: '#06b6d4',
  },
];

export const mockAIInsights: AIInsight[] = [
  {
    id: 'i1',
    title: 'Food Spending Spike',
    description: 'Your food spending increased 28% compared with July. Swiggy orders accounted for ₹4,200.',
    type: 'warning',
    metric: '+28% vs July',
    timestamp: '2 hours ago',
  },
  {
    id: 'i2',
    title: 'Savings Rate Milestone',
    description: 'Your savings rate improved from 32% to 41.2% this month. Great discipline!',
    type: 'positive',
    metric: '41.2% Rate',
    timestamp: '1 day ago',
  },
  {
    id: 'i3',
    title: 'Travel Budget Alert',
    description: "You've used 76% of your monthly travel budget with 23 days remaining.",
    type: 'neutral',
    metric: '76% Used',
    timestamp: '2 days ago',
  },
  {
    id: 'i4',
    title: 'Subscription Efficiency',
    description: 'Your active recurring subscriptions total ₹3,200 this month across 4 services.',
    type: 'neutral',
    metric: '₹3,200 / mo',
    timestamp: '3 days ago',
  },
];
