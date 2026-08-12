/**
 * ProtectedRoute.tsx
 *
 * Route guard for authenticated-only pages.
 *
 * Behavior:
 * 1. While auth is loading → show a full-page spinner (prevents auth flash)
 * 2. If user is NOT authenticated → redirect to /login
 * 3. If user IS authenticated → render the child route (<Outlet />)
 */

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { TrendingUp } from 'lucide-react';

export const ProtectedRoute: React.FC = () => {
  const { user, loading } = useAuth();

  // Phase 1: Auth state is being resolved — show spinner, don't redirect yet.
  // This prevents unauthenticated users from ever seeing protected content.
  if (loading) {
    return <AuthLoadingScreen />;
  }

  // Phase 2: Auth resolved — gate access
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Phase 3: Authenticated — render the requested page
  return <Outlet />;
};

// ─────────────────────────────────────────────────────────
// Full-page loading screen shown while Supabase resolves session
// ─────────────────────────────────────────────────────────

const AuthLoadingScreen: React.FC = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center bg-slate-950 z-50">
    {/* Brand logo */}
    <div className="flex items-center gap-3 mb-8">
      <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-indigo-400 flex items-center justify-center shadow-2xl shadow-indigo-500/40 ring-1 ring-white/20">
        <TrendingUp className="h-7 w-7 text-white" />
      </div>
      <div>
        <h1 className="font-extrabold text-2xl text-white tracking-tight">FinSight</h1>
        <p className="text-xs text-slate-400 font-medium">Understand your money</p>
      </div>
    </div>

    {/* Spinner */}
    <div className="relative">
      <div className="h-10 w-10 rounded-full border-2 border-slate-700" />
      <div className="absolute inset-0 h-10 w-10 rounded-full border-2 border-transparent border-t-indigo-500 animate-spin" />
    </div>
    <p className="mt-4 text-xs text-slate-500 font-medium tracking-wide">Loading your session…</p>
  </div>
);
