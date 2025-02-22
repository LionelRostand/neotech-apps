
import Accounting from '@/pages/accounting/Accounting';
import AccountingChart from '@/pages/accounting/Chart';
import AccountingInvoices from '@/pages/accounting/Invoices';
import AccountingTreasury from '@/pages/accounting/Treasury';
import AccountingTax from '@/pages/accounting/Tax';
import AccountingClosing from '@/pages/accounting/Closing';
import AccountingReports from '@/pages/accounting/Reports';
import AccountingPayments from '@/pages/accounting/Payments';
import AccountingCurrencies from '@/pages/accounting/Currencies';

export const accountingRoutes = {
  path: "accounting",
  element: <Accounting />,
  children: [
    {
      index: true,
      element: <AccountingChart />
    },
    {
      path: "chart",
      element: <AccountingChart />
    },
    {
      path: "invoices",
      element: <AccountingInvoices />
    },
    {
      path: "treasury",
      element: <AccountingTreasury />
    },
    {
      path: "tax",
      element: <AccountingTax />
    },
    {
      path: "closing",
      element: <AccountingClosing />
    },
    {
      path: "reports",
      element: <AccountingReports />
    },
    {
      path: "payments",
      element: <AccountingPayments />
    },
    {
      path: "currencies",
      element: <AccountingCurrencies />
    }
  ]
};
