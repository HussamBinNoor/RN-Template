import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { QUERY_CACHE_TIME, QUERY_RETRY, QUERY_STALE_TIME } from '@/constants';

export type QueryProviderProps = { children: React.ReactNode };

export function QueryProvider({ children }: QueryProviderProps): React.JSX.Element {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: QUERY_STALE_TIME,
            gcTime: QUERY_CACHE_TIME,
            retry: QUERY_RETRY,
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
          },
          mutations: {
            retry: 0,
          },
        },
      }),
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
