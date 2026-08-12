/**
 * ResetPassword.tsx
 *
 * Allows a user to set a new password after clicking the reset link in their email.
 *
 * How it works:
 * - Supabase sends a magic link to the user's email with a special token in the URL
 *   (e.g. /reset-password#access_token=...&type=recovery)
 * - When this page loads, supabase.auth (with detectSessionInUrl: true) automatically
 *   reads the token from the URL hash and establishes a temporary session.
 * - We then call supabase.auth.updateUser({ password }) to set the new password.
 * - After success, we sign the user out and redirect them to login.
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Eye,
  EyeOff,
  KeyRound,
  AlertCircle,
  CheckCircle2,
  Loader2,
  ArrowLeft,
  ShieldCheck,
} from 'lucide-react';
import { AuthLayout } from '../components/layout/AuthLayout';
import { useAuth } from '../hooks/useAuth';
import { resetPasswordSchema, type ResetPasswordFormValues } from '../schemas/authSchemas';

const ResetPassword: React.FC = () => {
  const { updatePassword, signOut } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const onSubmit = async (values: ResetPasswordFormValues) => {
    setServerError(null);

    const result = await updatePassword({ password: values.password });

    if (result.error) {
      setServerError(result.error);
      return;
    }

    setSuccess(true);

    // Sign out the temporary recovery session, then redirect to login
    await signOut();
    setTimeout(() => navigate('/login', { replace: true }), 3000);
  };

  // ── Success state ────────────────────────────────────────
  if (success) {
    return (
      <AuthLayout
        title="Password updated"
        subtitle="Your password has been reset successfully."
      >
        <div className="flex flex-col items-center text-center py-8 space-y-6">
          <div className="h-16 w-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-emerald-400" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white">All done!</h3>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Your password has been updated. You'll be redirected to the sign-in page in a
              moment.
            </p>
          </div>
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all shadow-lg shadow-indigo-500/20"
          >
            <ArrowLeft className="h-4 w-4" />
            Go to Sign in
          </Link>
        </div>
      </AuthLayout>
    );
  }

  // ── Reset form ───────────────────────────────────────────
  return (
    <AuthLayout
      title="Set new password"
      subtitle="Choose a strong password for your account."
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {/* Server Error */}
        {serverError && (
          <div
            role="alert"
            className="flex items-start gap-3 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
          >
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
            <span>{serverError}</span>
          </div>
        )}

        {/* New password */}
        <div className="space-y-1.5">
          <label htmlFor="reset-password" className="block text-xs font-semibold text-slate-300">
            New password
          </label>
          <div className="relative">
            <input
              id="reset-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Minimum 8 characters"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'reset-password-error' : undefined}
              {...register('password')}
              className={`w-full px-3.5 py-2.5 pr-10 rounded-xl bg-slate-800/80 border text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                errors.password
                  ? 'border-red-500/60 focus:ring-red-500/50'
                  : 'border-slate-700/60 focus:border-indigo-500/60'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <p id="reset-password-error" role="alert" className="text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm password */}
        <div className="space-y-1.5">
          <label htmlFor="reset-confirm-password" className="block text-xs font-semibold text-slate-300">
            Confirm new password
          </label>
          <div className="relative">
            <input
              id="reset-confirm-password"
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Re-enter your new password"
              aria-invalid={!!errors.confirmPassword}
              aria-describedby={errors.confirmPassword ? 'reset-confirm-error' : undefined}
              {...register('confirmPassword')}
              className={`w-full px-3.5 py-2.5 pr-10 rounded-xl bg-slate-800/80 border text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                errors.confirmPassword
                  ? 'border-red-500/60 focus:ring-red-500/50'
                  : 'border-slate-700/60 focus:border-indigo-500/60'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((v) => !v)}
              aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p id="reset-confirm-error" role="alert" className="text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Password hint */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="h-3.5 w-3.5 text-slate-600 shrink-0" />
          <span>Use 8+ characters with a mix of letters and numbers</span>
        </div>

        {/* Submit */}
        <button
          id="reset-password-submit"
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all duration-150 shadow-lg shadow-indigo-500/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Updating password…
            </>
          ) : (
            <>
              <KeyRound className="h-4 w-4" />
              Update password
            </>
          )}
        </button>

        <Link
          to="/login"
          className="flex items-center justify-center gap-2 w-full text-xs text-slate-500 hover:text-slate-400 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Sign in
        </Link>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;
