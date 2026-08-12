/**
 * PublicOnlyRoute.tsx
 *
 * Route guard for public-only pages (login, register, etc.)
 *
 * Behavior:
 * 1. While auth is loading → show nothing (let ProtectedRoute handle spinner)
 * 2. If user IS authenticated → redirect to /dashboard
 * 3. If user is NOT authenticated → render the public page (<Outlet />)
 *
 * This prevents logged-in users from visiting /login or /register.
 */

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const PublicOnlyRoute: React.FC = () => {
  const { user, loading } = useAuth();

  // Don't make redirect decisions until auth is resolved
  if (loading) {
    return null;
  }

  // Redirect authenticated users away from auth pages
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
