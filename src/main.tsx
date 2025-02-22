
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App';
import Dashboard from './pages/Dashboard';
import CRM from './pages/CRM';
import Sales from './pages/Sales';
import Clients from './pages/Clients';
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import { GeneralSettings } from './components/settings/GeneralSettings';

import { AppProviders } from './providers/AppProviders';
import { accountingRoutes } from './routes/accountingRoutes';
import { employeeRoutes } from './routes/employeeRoutes';
import { freightRoutes } from './routes/freightRoutes';
import { calendarRoutes } from './routes/calendarRoutes';
import { purchasesRoutes } from './routes/purchasesRoutes';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
      accountingRoutes,
      employeeRoutes,
      freightRoutes,
      calendarRoutes,
      purchasesRoutes
    ]
  },
  {
    path: "/auth",
    element: <Auth />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  </React.StrictMode>,
);
