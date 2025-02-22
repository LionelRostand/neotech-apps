import React from 'react';

const AccountingTax = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Tax Management</h2>
      <div className="grid gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">VAT Summary</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 border rounded-md">
              <p className="text-sm text-gray-600">VAT Collected</p>
              <p className="text-2xl font-bold mt-1">€24,500.00</p>
            </div>
            <div className="p-4 border rounded-md">
              <p className="text-sm text-gray-600">VAT Paid</p>
              <p className="text-2xl font-bold mt-1">€18,750.00</p>
            </div>
            <div className="p-4 border rounded-md">
              <p className="text-sm text-gray-600">Net VAT Due</p>
              <p className="text-2xl font-bold mt-1 text-neotech-600">€5,750.00</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Tax Returns</h3>
          <div className="border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Q4 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">VAT Return</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">31/01/2024</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">€5,750.00</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Q3 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">VAT Return</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">31/10/2023</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Submitted
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">€4,250.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountingTax;
