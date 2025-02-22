
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import CRM from '../pages/CRM';
import Sales from '../pages/Sales';
import Purchases from '../pages/Purchases';
import Clients from '../pages/Clients';
import Freight from '../pages/Freight';
import Employees from '../pages/Employees';
import Accounting from '../pages/Accounting';
import { GeneralSettings } from '../components/settings/GeneralSettings';
import { accountingRoutes } from './accountingRoutes';
import { employeeRoutes } from './employeeRoutes';
import { freightRoutes } from './freightRoutes';
import { purchaseRoutes } from './purchaseRoutes';

export const mainRoutes = [
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
    children: accountingRoutes
  },
  {
    path: "employees",
    element: <Employees />,
    children: employeeRoutes
  },
  {
    path: "freight",
    element: <Freight />,
    children: freightRoutes
  },
  {
    path: "purchases",
    element: <Purchases />,
    children: purchaseRoutes
  }
];
