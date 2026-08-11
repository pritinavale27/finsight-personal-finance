import { QueryClient } from '@tanstack/react-query';

/**
 * Global TanStack Query Client Configuration
 * Optimizes network requests with 5-minute stale time and single automatic retry.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data remains fresh for 5 minutes
      gcTime: 1000 * 60 * 15, // Garbage collect unused cache after 15 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
