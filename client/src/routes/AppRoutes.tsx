import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
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
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="transactions" element={<TransactionsPage />} />
        <Route path="budgets" element={<BudgetsPage />} />
        <Route path="goals" element={<SavingsGoalsPage />} />
        <Route path="recurring" element={<RecurringExpensesPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="import" element={<ImportDataPage />} />
        <Route path="ai" element={<AiAssistantPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
