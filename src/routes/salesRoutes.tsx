
import Sales from '@/pages/Sales';
import QuotesView from '@/pages/sales/QuotesView';

export const salesRoutes = {
  path: "sales",
  element: <Sales />,
  children: [
    {
      index: true,
      element: <QuotesView />
    },
    {
      path: "quotes",
      element: <QuotesView />
    }
  ]
};
