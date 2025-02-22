
import Dashboard from '@/pages/Dashboard';
import CRM from '@/pages/CRM';
import Clients from '@/pages/Clients';

export const dashboardRoutes = [
  {
    path: "",
    element: <Dashboard />,
    index: true
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

