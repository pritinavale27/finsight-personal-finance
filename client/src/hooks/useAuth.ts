/**
 * useAuth.ts
 *
 * Typed convenience hook for consuming the AuthContext.
 * Throws a clear error if used outside of <AuthProvider>.
 */

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import type { AuthContextType } from '../types/auth';

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      '[FinSight] useAuth() must be used within an <AuthProvider>.\n' +
        'Ensure <AuthProvider> wraps your application in App.tsx.'
    );
  }

  return context;
}
