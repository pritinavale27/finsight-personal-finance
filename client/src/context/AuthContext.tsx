/**
 * AuthContext.tsx
 *
 * Application-level authentication context.
 *
 * Security decisions:
 * - Passwords are NEVER handled, stored, or hashed here — Supabase Auth does all of that.
 * - We never log tokens or sessions to the console.
 * - We never store credentials in localStorage manually.
 * - The auth state change listener is the single source of truth for user/session.
 *
 * Session persistence:
 * - Supabase automatically persists the session (using its own localStorage keys).
 * - On mount, we call getSession() to hydrate the initial state synchronously-ish.
 * - The `loading` flag prevents any protected routes from rendering until auth is resolved.
 * - This eliminates the "auth flash" (brief display of protected content to unauth users).
 */

import React, { createContext, useCallback, useEffect, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import type {
  AuthContextType,
  AuthResult,
  ResetPasswordCredentials,
  SignInCredentials,
  SignUpCredentials,
  UpdatePasswordCredentials,
} from '../types/auth';

// ─────────────────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────────────────

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ─────────────────────────────────────────────────────────
// Helper — map Supabase error messages to user-friendly text
// ─────────────────────────────────────────────────────────

function friendlyError(message: string): string {
  const map: Record<string, string> = {
    'Invalid login credentials': 'Incorrect email or password. Please try again.',
    'Email not confirmed': 'Please verify your email address before signing in.',
    'User already registered': 'An account with this email already exists. Try signing in.',
    'Password should be at least 6 characters': 'Password must be at least 8 characters.',
    'Auth session missing!': 'Your session has expired. Please sign in again.',
    'Email rate limit exceeded': 'Too many requests. Please wait a moment and try again.',
    'For security purposes, you can only request this after': 'Please wait before requesting another email.',
    'Unable to validate email address: invalid format':
      'That email address appears to be invalid.',
    'signup_disabled': 'New registrations are temporarily disabled.',
  };

  for (const [key, friendly] of Object.entries(map)) {
    if (message.includes(key)) return friendly;
  }

  // Fallback — show the original message but strip technical prefixes
  return message.replace(/^AuthApiError:\s*/i, '').replace(/^error:\s*/i, '');
}

// ─────────────────────────────────────────────────────────
// Provider
// ─────────────────────────────────────────────────────────

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Derived status for consumers
  const status = loading ? 'loading' : user ? 'authenticated' : 'unauthenticated';

  // ── On mount: hydrate session from Supabase storage ──
  useEffect(() => {
    let mounted = true;

    // 1. Get any existing session (e.g. after page refresh)
    supabase.auth.getSession().then(({ data: { session: existingSession } }) => {
      if (!mounted) return;
      setSession(existingSession);
      setUser(existingSession?.user ?? null);
      setLoading(false);
    });

    // 2. Subscribe to future auth state changes (login, logout, token refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (!mounted) return;
      setSession(newSession);
      setUser(newSession?.user ?? null);
      // Once we get an event, loading is definitely resolved
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // ── signUp ──────────────────────────────────────────────
  const signUp = useCallback(async (credentials: SignUpCredentials): Promise<AuthResult> => {
    const { fullName, email, password } = credentials;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      return { error: friendlyError(error.message) };
    }

    // Supabase returns a user but with identities=[] when email confirmation is required
    const needsConfirmation =
      data.user !== null &&
      (data.user.identities === null || data.user.identities?.length === 0);

    return {
      error: null,
      emailConfirmationRequired: needsConfirmation,
    };
  }, []);

  // ── signIn ──────────────────────────────────────────────
  const signIn = useCallback(async (credentials: SignInCredentials): Promise<AuthResult> => {
    const { email, password } = credentials;

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return { error: friendlyError(error.message) };
    }

    return { error: null };
  }, []);

  // ── signOut ─────────────────────────────────────────────
  const signOut = useCallback(async (): Promise<AuthResult> => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return { error: friendlyError(error.message) };
    }

    return { error: null };
  }, []);

  // ── resetPassword ────────────────────────────────────────
  const resetPassword = useCallback(
    async (credentials: ResetPasswordCredentials): Promise<AuthResult> => {
      const { email } = credentials;

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        return { error: friendlyError(error.message) };
      }

      return { error: null };
    },
    []
  );

  // ── updatePassword ───────────────────────────────────────
  const updatePassword = useCallback(
    async (credentials: UpdatePasswordCredentials): Promise<AuthResult> => {
      const { password } = credentials;

      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        return { error: friendlyError(error.message) };
      }

      return { error: null };
    },
    []
  );

  const value: AuthContextType = {
    user,
    session,
    loading,
    status,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
