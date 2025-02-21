
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from "next-themes";
import { Toaster } from 'sonner';
import { AuthProvider } from './hooks/useAuth';

import App from './App';
import Dashboard from './pages/Dashboard';
import CRM from './pages/CRM';
import Sales from './pages/Sales';
import Clients from './pages/Clients';
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';
import './index.css';

// Create a component that wraps the app with providers
const Providers = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthProvider>
        {children}
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Providers>
        <App />
      </Providers>
    ),
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/crm",
        element: <CRM />,
      },
      {
        path: "/clients",
        element: <Clients />,
      },
      {
        path: "/sales",
        element: <Sales />,
      },
    ],
  },
  {
    path: "/auth",
    element: (
      <Providers>
        <Auth />
      </Providers>
    ),
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
