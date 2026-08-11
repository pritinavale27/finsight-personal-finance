import {
  LayoutDashboard,
  Receipt,
  PieChart,
  Target,
  Repeat,
  BarChart3,
  FileSpreadsheet,
  Bot,
  Settings,
} from 'lucide-react';
import { NavItem } from '../../types';

export const navigationItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    description: 'Financial overview & balance metrics',
  },
  {
    title: 'Transactions',
    href: '/transactions',
    icon: Receipt,
    description: 'Income and expense history',
  },
  {
    title: 'Budgets',
    href: '/budgets',
    icon: PieChart,
    description: 'Category spending limits',
  },
  {
    title: 'Savings Goals',
    href: '/goals',
    icon: Target,
    description: 'Target funds and progress',
  },
  {
    title: 'Recurring Expenses',
    href: '/recurring',
    icon: Repeat,
    description: 'Subscriptions & bills tracking',
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
    description: 'In-depth financial reports',
  },
  {
    title: 'Import Data',
    href: '/import',
    icon: FileSpreadsheet,
    description: 'Upload bank statement CSVs',
  },
  {
    title: 'AI Assistant',
    href: '/ai',
    icon: Bot,
    badge: 'Smart',
    description: 'Financial Q&A and advice',
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
    description: 'Profile & platform preferences',
  },
];
