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
import Purchases from './pages/Purchases';
import Clients from './pages/Clients';
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';
import Freight from './pages/Freight';
import Profile from './pages/Profile';
import { GeneralSettings } from './components/settings/GeneralSettings';
import Accounting from './pages/Accounting';

import Suppliers from './pages/purchases/Suppliers';
import RFQ from './pages/purchases/RFQ';
import PurchaseOrders from './pages/purchases/PurchaseOrders';
import Receipts from './pages/purchases/Receipts';
import Invoices from './pages/purchases/Invoices';
import Contracts from './pages/purchases/Contracts';
import Inventory from './pages/purchases/Inventory';
import Analytics from './pages/purchases/Analytics';

import Employees from './pages/Employees';
import EmployeeManagement from './pages/employees/Management';
import EmployeeContracts from './pages/employees/Contracts';
import EmployeeLeaves from './pages/employees/Leaves';
import EmployeeAttendance from './pages/employees/Attendance';
import EmployeePerformance from './pages/employees/Performance';
import EmployeePayroll from './pages/employees/Payroll';
import EmployeeReports from './pages/employees/Reports';

import FreightOrders from './pages/freight/FreightOrders';
import RouteTracking from './pages/freight/RouteTracking';
import ParcelScanning from './pages/freight/ParcelScanning';

import AccountingChart from './pages/accounting/Chart';
import AccountingInvoices from './pages/accounting/Invoices';
import AccountingTreasury from './pages/accounting/Treasury';
import AccountingTax from './pages/accounting/Tax';
import AccountingClosing from './pages/accounting/Closing';
import AccountingReports from './pages/accounting/Reports';
import AccountingPayments from './pages/accounting/Payments';
import AccountingCurrencies from './pages/accounting/Currencies';

import './index.css';

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
        element: <GeneralSettings />
      },
      {
        path: "accounting",
        element: <Accounting />,
        children: [
          {
            index: true,
            element: <AccountingChart />
          },
          {
            path: "chart",
            element: <AccountingChart />
          },
          {
            path: "invoices",
            element: <AccountingInvoices />
          },
          {
            path: "treasury",
            element: <AccountingTreasury />
          },
          {
            path: "tax",
            element: <AccountingTax />
          },
          {
            path: "closing",
            element: <AccountingClosing />
          },
          {
            path: "reports",
            element: <AccountingReports />
          },
          {
            path: "payments",
            element: <AccountingPayments />
          },
          {
            path: "currencies",
            element: <AccountingCurrencies />
          }
        ]
      },
      {
        path: "employees",
        element: <Employees />,
        children: [
          {
            index: true,
            element: <EmployeeManagement />
          },
          {
            path: "management",
            element: <EmployeeManagement />
          },
          {
            path: "contracts",
            element: <EmployeeContracts />
          },
          {
            path: "leaves",
            element: <EmployeeLeaves />
          },
          {
            path: "attendance",
            element: <EmployeeAttendance />
          },
          {
            path: "performance",
            element: <EmployeePerformance />
          },
          {
            path: "payroll",
            element: <EmployeePayroll />
          },
          {
            path: "reports",
            element: <EmployeeReports />
          }
        ]
      },
      {
        path: "freight",
        element: <Freight />,
        children: [
          {
            index: true,
            element: <FreightOrders />
          },
          {
            path: "orders",
            element: <FreightOrders />
          },
          {
            path: "routes",
            element: <RouteTracking />
          },
          {
            path: "tracking",
            element: <ParcelScanning />
          }
        ]
      },
      {
        path: "purchases",
        element: <Purchases />,
        children: [
          {
            index: true,
            element: <Suppliers />
          },
          {
            path: "suppliers",
            element: <Suppliers />
          },
          {
            path: "rfq",
            element: <RFQ />
          },
          {
            path: "orders",
            element: <PurchaseOrders />
          },
          {
            path: "receipts",
            element: <Receipts />
          },
          {
            path: "invoices",
            element: <Invoices />
          },
          {
            path: "contracts",
            element: <Contracts />
          },
          {
            path: "inventory",
            element: <Inventory />
          },
          {
            path: "accounting",
            element: <Accounting />,
            children: [
              {
                path: "chart",
                element: <AccountingChart />
              },
              {
                path: "invoices",
                element: <AccountingInvoices />
              },
              {
                path: "treasury",
                element: <AccountingTreasury />
              },
              {
                path: "tax",
                element: <AccountingTax />
              },
              {
                path: "closing",
                element: <AccountingClosing />
              },
              {
                path: "reports",
                element: <AccountingReports />
              },
              {
                path: "payments",
                element: <AccountingPayments />
              },
              {
                path: "currencies",
                element: <AccountingCurrencies />
              }
            ]
          },
          {
            path: "analytics",
            element: <Analytics />
          }
        ]
      }
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
