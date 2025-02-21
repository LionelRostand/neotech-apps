
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
import Purchases from './pages/Purchases';
import Clients from './pages/Clients';
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';

// Purchase module routes
import Suppliers from './pages/purchases/Suppliers';
import RFQ from './pages/purchases/RFQ';
import PurchaseOrders from './pages/purchases/PurchaseOrders';
import Receipts from './pages/purchases/Receipts';
import Invoices from './pages/purchases/Invoices';
import Contracts from './pages/purchases/Contracts';
import Inventory from './pages/purchases/Inventory';
import Accounting from './pages/purchases/Accounting';
import Analytics from './pages/purchases/Analytics';

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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <Providers>
          <App />
        </Providers>
      }
      errorElement={<NotFound />}
    >
      <Route index element={<Dashboard />} />
      <Route path="crm" element={<CRM />} />
      <Route path="clients" element={<Clients />} />
      <Route path="sales" element={<Sales />} />
      <Route path="purchases" element={<Purchases />}>
        <Route path="suppliers" element={<Suppliers />} />
        <Route path="rfq" element={<RFQ />} />
        <Route path="orders" element={<PurchaseOrders />} />
        <Route path="receipts" element={<Receipts />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="contracts" element={<Contracts />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="accounting" element={<Accounting />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
