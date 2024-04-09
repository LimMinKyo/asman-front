'use client';

import React, { useState } from 'react';
import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { FetchError } from 'ofetch';
import { authAPI } from 'src/api/auth';
import { jwtUtils } from 'src/utils/jwt.utils';

interface Props {
  children: React.ReactNode;
}

function ReactQueryClientProvider({ children }: Props) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: false,
        },
      },
      queryCache: new QueryCache({
        onError: async (error, query) => {
          if (error instanceof FetchError) {
            const { response } = error;
            if (response?.status === 401) {
              const { ok, data } = await authAPI.refresh();
              if (ok && data?.accessToken) {
                jwtUtils.setAccessToken(data.accessToken);
                client.invalidateQueries({ queryKey: query.queryKey });
              } else {
                jwtUtils.removeAccessToken();
                await authAPI.logout();
                location.href = '/login';
              }
            }
          }
        },
      }),
    }),
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default ReactQueryClientProvider;
