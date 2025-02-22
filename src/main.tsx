
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from "next-themes";
import { AuthProvider } from './hooks/useAuth';
import Auth from './pages/Auth';
import App from './App';
import NotFound from './pages/NotFound';
import { mainRoutes } from './routes/mainRoutes';

const queryClient = new QueryClient();

// Create a Providers component to wrap the entire application
const Providers = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Providers><App /></Providers>,
    errorElement: <NotFound />,
    children: mainRoutes.children
  },
  {
    path: "/auth",
    element: (
      <Providers>
        <Auth />
      </Providers>
    )
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
