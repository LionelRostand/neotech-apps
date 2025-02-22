
import FreightOrders from '../pages/freight/FreightOrders';
import RouteTracking from '../pages/freight/RouteTracking';
import ParcelScanning from '../pages/freight/ParcelScanning';

export const freightRoutes = [
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
];
