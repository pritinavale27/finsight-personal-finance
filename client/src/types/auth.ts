/**
 * auth.ts
 *
 * TypeScript types for the FinSight authentication system.
 * These are derived from Supabase types and our own application needs.
 */

import type { User, Session } from '@supabase/supabase-js';

// Re-export Supabase core types for convenience
export type { User, Session };

// ─────────────────────────────────────────────────────────
// Auth state
// ─────────────────────────────────────────────────────────

/** Current authentication lifecycle state */
export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

export interface AuthState {
  user: User | null;
  session: Session | null;
  status: AuthStatus;
  loading: boolean;
}

// ─────────────────────────────────────────────────────────
// Credential shapes
// ─────────────────────────────────────────────────────────

export interface SignUpCredentials {
  fullName: string;
  email: string;
  password: string;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface ResetPasswordCredentials {
  email: string;
}

export interface UpdatePasswordCredentials {
  password: string;
}

// ─────────────────────────────────────────────────────────
// Auth function return type
// ─────────────────────────────────────────────────────────

export interface AuthResult {
  error: string | null;
  /** True when signup succeeds but email confirmation is still pending */
  emailConfirmationRequired?: boolean;
}

// ─────────────────────────────────────────────────────────
// Auth context shape
// ─────────────────────────────────────────────────────────

export interface AuthContextType extends AuthState {
  signUp: (credentials: SignUpCredentials) => Promise<AuthResult>;
  signIn: (credentials: SignInCredentials) => Promise<AuthResult>;
  signOut: () => Promise<AuthResult>;
  resetPassword: (credentials: ResetPasswordCredentials) => Promise<AuthResult>;
  updatePassword: (credentials: UpdatePasswordCredentials) => Promise<AuthResult>;
}

// ─────────────────────────────────────────────────────────
// Derived helpers
// ─────────────────────────────────────────────────────────

/**
 * Extract display name from a Supabase User.
 * Priority: user_metadata.full_name → user_metadata.name → email prefix
 */
export function getUserDisplayName(user: User | null): string {
  if (!user) return '';
  return (
    (user.user_metadata?.full_name as string) ||
    (user.user_metadata?.name as string) ||
    user.email?.split('@')[0] ||
    'User'
  );
}

/**
 * Get initials (up to 2 chars) from a display name.
 * E.g. "Priti Navale" → "PN", "priti" → "P"
 */
export function getUserInitials(displayName: string): string {
  const parts = displayName.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return displayName.slice(0, 2).toUpperCase();
}
