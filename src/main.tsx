
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from "next-themes";
import { AuthProvider } from './hooks/useAuth';
import Auth from './pages/Auth';
import { mainRoutes } from './routes/mainRoutes';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  mainRoutes,
  {
    path: "/auth",
    element: (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <AuthProvider>
            <Auth />
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    )
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
