
import { RouteObject } from "react-router-dom";
import Freight from '../pages/Freight';
import FreightOrders from '../pages/freight/FreightOrders';
import RouteTracking from '../pages/freight/RouteTracking';
import ParcelScanning from '../pages/freight/ParcelScanning';

export const freightRoutes: RouteObject = {
  path: "freight",
  element: <Freight />,
  children: [
    {
      index: true,
      element: <FreightOrders />
    },
    {
      path: "orders",
      element: <FreightOrders />
    },
    {
      path: "routes",
      element: <RouteTracking />
    },
    {
      path: "tracking",
      element: <ParcelScanning />
    }
  ]
};
