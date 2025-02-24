
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
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
import Profile from './pages/Profile';
import { GeneralSettings } from './components/settings/GeneralSettings';
import EmployeeReports from './pages/employees/Reports';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

import { accountingRoutes } from './routes/accountingRoutes';
import { employeeRoutes } from './routes/employeeRoutes';
import { freightRoutes } from './routes/freightRoutes';
import { purchaseRoutes } from './routes/purchaseRoutes';
import { calendarRoutes } from './routes/calendarRoutes';
import { companyRoutes } from './routes/companyRoutes';

const queryClient = new QueryClient();

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
    element: <Providers><App /></Providers>,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "reports",
        element: <Reports />
      },
      {
        path: "crm",
        element: <CRM />
      },
      {
        path: "clients",
        element: <Clients />
      },
      {
        path: "sales",
        element: <Sales />
      },
      {
        path: "settings",
        element: <Settings />
      },
      accountingRoutes,
      employeeRoutes,
      freightRoutes,
      purchaseRoutes,
      calendarRoutes,
      companyRoutes
    ]
  },
  {
    path: "/auth",
    element: <Providers><Auth /></Providers>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
