
import Accounting from '../pages/accounting/Accounting';
import AccountingChart from '../pages/accounting/Chart';
import AccountingInvoices from '../pages/accounting/Invoices';
import AccountingTreasury from '../pages/accounting/Treasury';
import AccountingTax from '../pages/accounting/Tax';
import AccountingClosing from '../pages/accounting/Closing';
import AccountingReports from '../pages/accounting/Reports';
import AccountingPayments from '../pages/accounting/Payments';
import AccountingCurrencies from '../pages/accounting/Currencies';
import AccountingJournals from '../pages/accounting/Journals';
import ProtectedRoute from '../components/auth/ProtectedRoute';

export const accountingRoutes = {
  path: "accounting",
  element: (
    <ProtectedRoute module="accounting">
      <Accounting />
    </ProtectedRoute>
  ),
  children: [
    {
      index: true,
      element: (
        <ProtectedRoute module="accounting">
          <AccountingChart />
        </ProtectedRoute>
      )
    },
    {
      path: "chart",
      element: (
        <ProtectedRoute module="accounting">
          <AccountingChart />
        </ProtectedRoute>
      )
    },
    {
      path: "invoices",
      element: (
        <ProtectedRoute module="accounting" action="write">
          <AccountingInvoices />
        </ProtectedRoute>
      )
    },
    {
      path: "journals",
      element: (
        <ProtectedRoute module="accounting" action="write">
          <AccountingJournals />
        </ProtectedRoute>
      )
    },
    {
      path: "treasury",
      element: (
        <ProtectedRoute module="accounting" action="write">
          <AccountingTreasury />
        </ProtectedRoute>
      )
    },
    {
      path: "tax",
      element: (
        <ProtectedRoute module="accounting" action="write">
          <AccountingTax />
        </ProtectedRoute>
      )
    },
    {
      path: "closing",
      element: (
        <ProtectedRoute module="accounting" action="manage">
          <AccountingClosing />
        </ProtectedRoute>
      )
    },
    {
      path: "reports",
      element: (
        <ProtectedRoute module="accounting">
          <AccountingReports />
        </ProtectedRoute>
      )
    },
    {
      path: "payments",
      element: (
        <ProtectedRoute module="accounting" action="write">
          <AccountingPayments />
        </ProtectedRoute>
      )
    },
    {
      path: "currencies",
      element: (
        <ProtectedRoute module="accounting" action="write">
          <AccountingCurrencies />
        </ProtectedRoute>
      )
    }
  ]
};
