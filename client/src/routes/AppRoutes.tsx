/**
 * AppRoutes.tsx
 *
 * Centralized route configuration for FinSight.
 *
 * Route structure:
 *
 * Public-only routes (redirect to /dashboard if authenticated):
 *   /login
 *   /register
 *   /forgot-password
 *   /reset-password
 *
 * Protected routes (redirect to /login if unauthenticated):
 *   /dashboard
 *   /transactions
 *   /budgets
 *   /goals
 *   /recurring
 *   /analytics
 *   /import
 *   /ai
 *   /settings
 */

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Route guards
import { ProtectedRoute } from './ProtectedRoute';
import { PublicOnlyRoute } from './PublicOnlyRoute';

// Layout
import { AppLayout } from '../components/layout/AppLayout';

// Auth pages
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

// App pages
import Dashboard from '../pages/Dashboard';
import { TransactionsPage } from '../pages/TransactionsPage';
import { BudgetsPage } from '../pages/BudgetsPage';
import { SavingsGoalsPage } from '../pages/SavingsGoalsPage';
import { RecurringExpensesPage } from '../pages/RecurringExpensesPage';
import { AnalyticsPage } from '../pages/AnalyticsPage';
import { ImportDataPage } from '../pages/ImportDataPage';
import { AiAssistantPage } from '../pages/AiAssistantPage';
import { SettingsPage } from '../pages/SettingsPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* ── Root redirect ── */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* ── Public-only routes (auth pages) ── */}
      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* /reset-password is intentionally NOT inside PublicOnlyRoute:
            the user needs a temporary Supabase recovery session active here,
            which means they ARE technically "authenticated" for a moment.
            We keep it public so the guard doesn't redirect them away. */}
      </Route>

      {/* Reset password: always accessible (recovery session is ephemeral) */}
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* ── Protected routes (require authentication) ── */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/budgets" element={<BudgetsPage />} />
          <Route path="/goals" element={<SavingsGoalsPage />} />
          <Route path="/recurring" element={<RecurringExpensesPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/import" element={<ImportDataPage />} />
          <Route path="/ai" element={<AiAssistantPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  );
};
