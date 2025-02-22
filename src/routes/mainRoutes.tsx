
import App from '@/App';
import Dashboard from '@/pages/Dashboard';
import CRM from '@/pages/CRM';
import Sales from '@/pages/Sales';
import Clients from '@/pages/Clients';
import NotFound from '@/pages/NotFound';
import { GeneralSettings } from '@/components/settings/GeneralSettings';
import { employeeRoutes } from './employeeRoutes';
import { freightRoutes } from './freightRoutes';
import { purchaseRoutes } from './purchaseRoutes';

export const mainRoutes = {
  path: "/",
  element: <App />,
  errorElement: <NotFound />,
  children: [
    {
      index: true,
      element: <Dashboard />
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
    employeeRoutes,
    freightRoutes,
    purchaseRoutes
  ]
};
