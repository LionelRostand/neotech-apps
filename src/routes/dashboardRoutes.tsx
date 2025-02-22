
import Dashboard from '@/pages/Dashboard';
import CRM from '@/pages/CRM';
import Clients from '@/pages/Clients';

export const dashboardRoutes = [
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
  }
];
