/**
 * Register.tsx
 *
 * User registration page.
 * Handles both Supabase configurations:
 *  1. Email confirmation required → shows a "check your email" message
 *  2. Email confirmation disabled → user is immediately authenticated
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Eye,
  EyeOff,
  UserPlus,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Mail,
} from 'lucide-react';
import { AuthLayout } from '../components/layout/AuthLayout';
import { useAuth } from '../hooks/useAuth';
import { registerSchema, type RegisterFormValues } from '../schemas/authSchemas';

const Register: React.FC = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [emailConfirmationRequired, setEmailConfirmationRequired] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: '', email: '', password: '', confirmPassword: '' },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setServerError(null);

    const result = await signUp(values);

    if (result.error) {
      setServerError(result.error);
      return;
    }

    if (result.emailConfirmationRequired) {
      // User created but needs to verify email before they can log in
      setEmailConfirmationRequired(true);
      return;
    }

    // Email confirmation is disabled — user is now authenticated
    navigate('/dashboard', { replace: true });
  };

  // ── Email confirmation pending state ──────────────────
  if (emailConfirmationRequired) {
    return (
      <AuthLayout
        title="Check your inbox"
        subtitle="One last step before you get started."
      >
        <div className="space-y-6">
          <div className="flex flex-col items-center text-center py-6 space-y-4">
            <div className="h-16 w-16 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
              <Mail className="h-8 w-8 text-indigo-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">Verify your email address</h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                We sent a verification link to your email. Click the link in the email to activate
                your account and start using FinSight.
              </p>
            </div>
            <div className="w-full p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-400 space-y-1.5">
              <p className="font-semibold text-slate-300">Didn't receive the email?</p>
              <p>• Check your spam or junk folder</p>
              <p>• Make sure you entered the correct email</p>
              <p>• Wait a minute and check again</p>
            </div>
          </div>
          <Link
            to="/login"
            className="block w-full text-center px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:border-slate-600 text-sm font-medium transition-all"
          >
            Back to Sign in
          </Link>
        </div>
      </AuthLayout>
    );
  }

  // ── Registration form ─────────────────────────────────
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start understanding your finances today — it's free."
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
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

        {/* Full Name */}
        <div className="space-y-1.5">
          <label htmlFor="register-name" className="block text-xs font-semibold text-slate-300">
            Full Name
          </label>
          <input
            id="register-name"
            type="text"
            autoComplete="name"
            placeholder="Priti Navale"
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? 'register-name-error' : undefined}
            {...register('fullName')}
            className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
              errors.fullName
                ? 'border-red-500/60 focus:ring-red-500/50'
                : 'border-slate-700/60 focus:border-indigo-500/60'
            }`}
          />
          {errors.fullName && (
            <p id="register-name-error" role="alert" className="text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label htmlFor="register-email" className="block text-xs font-semibold text-slate-300">
            Email address
          </label>
          <input
            id="register-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'register-email-error' : undefined}
            {...register('email')}
            className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
              errors.email
                ? 'border-red-500/60 focus:ring-red-500/50'
                : 'border-slate-700/60 focus:border-indigo-500/60'
            }`}
          />
          {errors.email && (
            <p id="register-email-error" role="alert" className="text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label htmlFor="register-password" className="block text-xs font-semibold text-slate-300">
            Password
          </label>
          <div className="relative">
            <input
              id="register-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Minimum 8 characters"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'register-password-error' : undefined}
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
            <p id="register-password-error" role="alert" className="text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label htmlFor="register-confirm-password" className="block text-xs font-semibold text-slate-300">
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="register-confirm-password"
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Re-enter your password"
              aria-invalid={!!errors.confirmPassword}
              aria-describedby={errors.confirmPassword ? 'register-confirm-error' : undefined}
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
            <p id="register-confirm-error" role="alert" className="text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Password hint */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <CheckCircle2 className="h-3.5 w-3.5 text-slate-600 shrink-0" />
          <span>Use 8+ characters with a mix of letters and numbers for a strong password</span>
        </div>

        {/* Submit */}
        <button
          id="register-submit"
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all duration-150 shadow-lg shadow-indigo-500/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950 mt-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating account…
            </>
          ) : (
            <>
              <UserPlus className="h-4 w-4" />
              Create account
            </>
          )}
        </button>

        {/* Login link */}
        <p className="text-center text-xs text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Register;
