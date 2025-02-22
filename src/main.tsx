
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from "next-themes";
import { Toaster } from 'sonner';

import App from './App';
import Dashboard from './pages/Dashboard';
import CRM from './pages/CRM';
import Sales from './pages/Sales';
import Purchases from './pages/Purchases';
import Clients from './pages/Clients';
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';
import Freight from './pages/Freight';
import { GeneralSettings } from './components/settings/GeneralSettings';

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

// Freight management routes
import FreightOrders from './pages/freight/FreightOrders';
import RouteTracking from './pages/freight/RouteTracking';
import ParcelScanning from './pages/freight/ParcelScanning';
import { AuthProvider } from './hooks/useAuth';

import './index.css';

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/"
        element={
          <QueryClientProvider client={queryClient}>
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
              <AuthProvider>
                <App />
              </AuthProvider>
            </ThemeProvider>
          </QueryClientProvider>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="crm" element={<CRM />} />
        <Route path="clients" element={<Clients />} />
        <Route path="sales" element={<Sales />} />
        <Route path="settings">
          <Route path="general" element={<GeneralSettings />} />
        </Route>
        <Route path="freight" element={<Freight />}>
          <Route index element={<FreightOrders />} />
          <Route path="orders" element={<FreightOrders />} />
          <Route path="routes" element={<RouteTracking />} />
          <Route path="tracking" element={<ParcelScanning />} />
        </Route>
        <Route path="purchases" element={<Purchases />}>
          <Route index element={<Suppliers />} />
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
      <Route
        path="/auth"
        element={
          <QueryClientProvider client={queryClient}>
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
              <AuthProvider>
                <Auth />
              </AuthProvider>
            </ThemeProvider>
          </QueryClientProvider>
        }
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>,
);
