import React from 'react';

const AccountingChart = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Chart of Accounts</h2>
      <div className="grid gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-3">Assets</h3>
          <div className="space-y-2">
            <div className="flex justify-between p-2 hover:bg-gray-50 rounded">
              <span>1000 - Cash and Cash Equivalents</span>
              <span className="text-gray-600">€0.00</span>
            </div>
            <div className="flex justify-between p-2 hover:bg-gray-50 rounded">
              <span>1100 - Accounts Receivable</span>
              <span className="text-gray-600">€0.00</span>
            </div>
            <div className="flex justify-between p-2 hover:bg-gray-50 rounded">
              <span>1200 - Inventory</span>
              <span className="text-gray-600">€0.00</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-3">Liabilities</h3>
          <div className="space-y-2">
            <div className="flex justify-between p-2 hover:bg-gray-50 rounded">
              <span>2000 - Accounts Payable</span>
              <span className="text-gray-600">€0.00</span>
            </div>
            <div className="flex justify-between p-2 hover:bg-gray-50 rounded">
              <span>2100 - Notes Payable</span>
              <span className="text-gray-600">€0.00</span>
            </div>
            <div className="flex justify-between p-2 hover:bg-gray-50 rounded">
              <span>2200 - Accrued Expenses</span>
              <span className="text-gray-600">€0.00</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-3">Equity</h3>
          <div className="space-y-2">
            <div className="flex justify-between p-2 hover:bg-gray-50 rounded">
              <span>3000 - Common Stock</span>
              <span className="text-gray-600">€0.00</span>
            </div>
            <div className="flex justify-between p-2 hover:bg-gray-50 rounded">
              <span>3100 - Retained Earnings</span>
              <span className="text-gray-600">€0.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountingChart;
