import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import App from './App.jsx';
import "./styles/index.css";
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 20 * (60 * 1000), // 20 mins
      cacheTime: 30 * (60 * 1000), // 30 mins
      retry: 3, // retry 3 times
      retryDelay: (retryCount) => Math.min(retryCount * 1000, 3000), // wait 3 seconds between retries
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  </React.StrictMode>
);
