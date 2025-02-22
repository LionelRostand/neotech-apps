
import { GeneralSettings } from '@/components/settings/GeneralSettings';
import App from '@/App';
import Auth from '@/pages/Auth';
import NotFound from '@/pages/NotFound';
import { dashboardRoutes } from './dashboardRoutes';
import { salesRoutes } from './salesRoutes';
import { purchaseRoutes } from './purchaseRoutes';
import { employeeRoutes } from './employeeRoutes';
import { freightRoutes } from './freightRoutes';

export const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      ...dashboardRoutes,
      salesRoutes,
      purchaseRoutes,
      employeeRoutes,
      freightRoutes,
      {
        path: "settings",
        element: <GeneralSettings />
      }
    ]
  },
  {
    path: "/auth",
    element: <Auth />
  }
];
