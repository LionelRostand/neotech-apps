import React from 'react';

const AccountingTreasury = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Treasury</h2>
      <div className="grid gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Cash Flow</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Current Balance</span>
              <span className="font-medium">€245,678.90</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Incoming Payments</span>
              <span className="text-green-600 font-medium">+€15,420.00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Outgoing Payments</span>
              <span className="text-red-600 font-medium">-€8,750.30</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Bank Accounts</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Main Account</span>
              <span className="font-medium">€180,245.60</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Savings Account</span>
              <span className="font-medium">€65,433.30</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Investment Account</span>
              <span className="font-medium">€125,890.00</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Recent Transactions</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Supplier Payment</p>
                <p className="text-sm text-gray-500">Invoice #INV-2023-001</p>
              </div>
              <span className="text-red-600 font-medium">-€4,520.00</span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Client Payment</p>
                <p className="text-sm text-gray-500">Invoice #OUT-2023-042</p>
              </div>
              <span className="text-green-600 font-medium">+€8,750.00</span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Bank Fees</p>
                <p className="text-sm text-gray-500">Monthly Service Charge</p>
              </div>
              <span className="text-red-600 font-medium">-€29.90</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountingTreasury;
