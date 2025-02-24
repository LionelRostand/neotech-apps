
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { purchaseRoutes } from './routes/purchaseRoutes';
import { accountingRoutes } from './routes/accountingRoutes';
import { freightRoutes } from './routes/freightRoutes';
import { calendarRoutes } from './routes/calendarRoutes';
import { employeeRoutes } from './routes/employeeRoutes';
import { companyRoutes } from './routes/companyRoutes';
import CRM from './pages/CRM';
import Clients from './pages/Clients';
import Sales from './pages/Sales';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Index from './pages/Index';
import { AuthProvider } from './hooks/useAuth';
import { PermissionsProvider } from './hooks/usePermissions';
import './App.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
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
  purchaseRoutes,
  accountingRoutes,
  freightRoutes,
  calendarRoutes,
  employeeRoutes,
  companyRoutes,
  {
    path: "/reports",
    element: <Reports />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <PermissionsProvider>
        <RouterProvider router={router} />
      </PermissionsProvider>
    </AuthProvider>
  );
}

export default App;
