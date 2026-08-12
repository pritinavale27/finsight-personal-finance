/**
 * AuthLayout.tsx
 *
 * Shared layout wrapper for all authentication pages.
 * Provides the branded split-screen design with the FinSight logo.
 */

import React from 'react';
import { TrendingUp, ShieldCheck, BarChart3, Zap } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const features = [
  { icon: BarChart3, text: 'Real-time financial insights' },
  { icon: ShieldCheck, text: 'Bank-grade security with Row-Level Security' },
  { icon: Zap, text: 'AI-powered spending analysis' },
];

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* ── Left Panel: Branding (hidden on mobile) ── */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[40%] flex-col justify-between p-10 xl:p-14 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/60 border-r border-slate-800 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-indigo-400 flex items-center justify-center shadow-2xl shadow-indigo-500/40 ring-1 ring-white/20">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-extrabold text-xl text-white tracking-tight flex items-center gap-2">
              FinSight
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                PRO
              </span>
            </h1>
            <p className="text-xs text-slate-400 font-medium">Understand your money</p>
          </div>
        </div>

        {/* Hero text */}
        <div className="relative z-10 space-y-6">
          <div className="space-y-3">
            <h2 className="text-3xl xl:text-4xl font-extrabold text-white leading-tight tracking-tight">
              Your personal
              <br />
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                finance command
              </span>
              <br />
              centre.
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Track income, analyse spending, set budgets, and let AI surface insights that actually
              move the needle.
            </p>
          </div>

          {/* Feature list */}
          <ul className="space-y-3">
            {features.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <div className="h-7 w-7 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center shrink-0">
                  <Icon className="h-3.5 w-3.5 text-indigo-400" />
                </div>
                <span className="text-xs text-slate-300 font-medium">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center gap-2 text-[11px] text-slate-500">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span>Your data is encrypted and protected by Supabase RLS</span>
        </div>
      </div>

      {/* ── Right Panel: Auth Form ── */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 overflow-y-auto">
        {/* Mobile logo */}
        <div className="lg:hidden mb-8 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-500/30 ring-1 ring-white/20">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <h1 className="font-extrabold text-lg text-white tracking-tight">FinSight</h1>
        </div>

        {/* Card */}
        <div className="w-full max-w-md">
          <div className="mb-7">
            <h2 className="text-2xl font-extrabold text-white tracking-tight">{title}</h2>
            <p className="mt-1.5 text-sm text-slate-400">{subtitle}</p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};
