/**
 * supabase.ts
 *
 * Single, shared Supabase client instance for the entire application.
 * Import this wherever Supabase access is needed — do NOT create additional clients.
 *
 * Security notes:
 * - Only the anon/public key is used here (safe for frontend)
 * - The service-role key MUST NEVER appear in frontend code
 * - Credentials are loaded from environment variables, never hardcoded
 */

/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    '[FinSight] Missing Supabase environment variables.\n' +
      'Create client/.env.local with:\n' +
      '  VITE_SUPABASE_URL=https://your-project.supabase.co\n' +
      '  VITE_SUPABASE_ANON_KEY=your-anon-key'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Supabase automatically persists the session in localStorage under the hood.
    // Refreshing the page or reopening the browser will restore the session.
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true, // Needed for OAuth + magic link + password reset flows
  },
});
