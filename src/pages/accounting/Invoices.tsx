import React from 'react';

const AccountingInvoices = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Invoices</h2>
      <div className="grid gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Recent Invoices</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Invoice #</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Client</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Date</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Amount</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-900">INV-2024-001</td>
                  <td className="px-4 py-2 text-sm text-gray-900">Acme Corp</td>
                  <td className="px-4 py-2 text-sm text-gray-900">2024-01-15</td>
                  <td className="px-4 py-2 text-sm text-gray-900">€1,250.00</td>
                  <td className="px-4 py-2 text-sm">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Paid</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-900">INV-2024-002</td>
                  <td className="px-4 py-2 text-sm text-gray-900">TechStart Inc</td>
                  <td className="px-4 py-2 text-sm text-gray-900">2024-01-18</td>
                  <td className="px-4 py-2 text-sm text-gray-900">€2,750.00</td>
                  <td className="px-4 py-2 text-sm">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Pending</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Invoice Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Outstanding</span>
                <span className="font-medium">€4,000.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Overdue</span>
                <span className="font-medium text-red-600">€750.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Paid (This Month)</span>
                <span className="font-medium text-green-600">€12,500.00</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full px-4 py-2 text-sm font-medium text-white bg-neotech-500 rounded-md hover:bg-neotech-600">
                Create New Invoice
              </button>
              <button className="w-full px-4 py-2 text-sm font-medium text-neotech-600 border border-neotech-500 rounded-md hover:bg-neotech-50">
                Import Invoices
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountingInvoices;
