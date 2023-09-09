import { QueryClient } from '@tanstack/react-query';

const STALE_TIME = 10000;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: STALE_TIME,
    },
  },
});

export default queryClient;
