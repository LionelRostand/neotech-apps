
import Suppliers from '../pages/purchases/Suppliers';
import RFQ from '../pages/purchases/RFQ';
import PurchaseOrders from '../pages/purchases/PurchaseOrders';
import Receipts from '../pages/purchases/Receipts';
import Invoices from '../pages/purchases/Invoices';
import Contracts from '../pages/purchases/Contracts';
import Inventory from '../pages/purchases/Inventory';
import Analytics from '../pages/purchases/Analytics';
import { accountingRoutes } from './accountingRoutes';

export const purchaseRoutes = [
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
    children: accountingRoutes
  },
  {
    path: "analytics",
    element: <Analytics />
  }
];
