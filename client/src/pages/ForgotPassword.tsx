/**
 * ForgotPassword.tsx
 *
 * Sends a password reset email via Supabase.
 *
 * Security note: We show the same success message whether or not the email exists
 * in our database. This prevents account enumeration attacks (an attacker cannot
 * determine if an email address is registered by watching our responses).
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Mail, AlertCircle, Loader2, SendHorizonal } from 'lucide-react';
import { AuthLayout } from '../components/layout/AuthLayout';
import { useAuth } from '../hooks/useAuth';
import { forgotPasswordSchema, type ForgotPasswordFormValues } from '../schemas/authSchemas';

const ForgotPassword: React.FC = () => {
  const { resetPassword } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setServerError(null);

    const result = await resetPassword(values);

    if (result.error) {
      // Only show errors that aren't sensitive (e.g. network failure)
      // Do NOT reveal whether the email is registered
      setServerError(result.error);
      return;
    }

    // Always show the same success message regardless of whether the email exists
    setEmailSent(true);
  };

  // ── Success state ────────────────────────────────────────
  if (emailSent) {
    return (
      <AuthLayout
        title="Check your email"
        subtitle="We've sent you a password reset link."
      >
        <div className="space-y-6">
          <div className="flex flex-col items-center text-center py-6 space-y-4">
            <div className="h-16 w-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
              <Mail className="h-8 w-8 text-emerald-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">Reset link sent</h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                If an account exists for{' '}
                <span className="text-slate-200 font-medium">{getValues('email')}</span>, you'll
                receive a password reset link shortly.
              </p>
            </div>
            <div className="w-full p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-400 space-y-1.5 text-left">
              <p className="font-semibold text-slate-300">The link will:</p>
              <p>• Expire after 1 hour</p>
              <p>• Only be valid once</p>
              <p>• Take you directly to a password reset page</p>
            </div>
          </div>
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:border-slate-600 text-sm font-medium transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Sign in
          </Link>
        </div>
      </AuthLayout>
    );
  }

  // ── Request form ─────────────────────────────────────────
  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your email and we'll send you a reset link."
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

        {/* Email field */}
        <div className="space-y-1.5">
          <label htmlFor="forgot-email" className="block text-xs font-semibold text-slate-300">
            Email address
          </label>
          <input
            id="forgot-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'forgot-email-error' : undefined}
            {...register('email')}
            className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
              errors.email
                ? 'border-red-500/60 focus:ring-red-500/50'
                : 'border-slate-700/60 focus:border-indigo-500/60'
            }`}
          />
          {errors.email && (
            <p id="forgot-email-error" role="alert" className="text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          id="forgot-password-submit"
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all duration-150 shadow-lg shadow-indigo-500/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending link…
            </>
          ) : (
            <>
              <SendHorizonal className="h-4 w-4" />
              Send reset link
            </>
          )}
        </button>

        {/* Back to login */}
        <Link
          to="/login"
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-slate-700/60 text-slate-400 hover:text-slate-300 hover:border-slate-600 text-sm font-medium transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Sign in
        </Link>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;
