import React from 'react';
import { User, Shield, DollarSign } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { getUserDisplayName } from '../types/auth';

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const displayName = getUserDisplayName(user);
  const email = user?.email ?? '';

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">Platform Settings</h1>
        <p className="text-xs text-slate-400">User profile, currency formatting, timezone, and security configurations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Profile</h3>
              <p className="text-[11px] text-slate-400">{displayName}</p>
            </div>
          </div>
          <p className="text-xs text-slate-400">{email}</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Currency &amp; Region</h3>
              <p className="text-[11px] text-slate-400">₹ (INR) • Asia/Kolkata</p>
            </div>
          </div>
          <p className="text-xs text-slate-400">Indian Rupee (₹) formatting enabled by default.</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Security</h3>
              <p className="text-[11px] text-slate-400">Supabase Auth &amp; RLS</p>
            </div>
          </div>
          <p className="text-xs text-slate-400">Row Level Security active on all financial tables.</p>
        </div>
      </div>
    </div>
  );
};
