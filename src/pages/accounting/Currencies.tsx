import React from 'react';

const AccountingCurrencies = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Currencies</h2>
      <div className="grid gap-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium mb-3">Exchange Rates</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span>EUR/USD</span>
              <span className="font-medium">1.0876</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span>EUR/GBP</span>
              <span className="font-medium">0.8578</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span>EUR/JPY</span>
              <span className="font-medium">157.83</span>
            </div>
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium mb-3">Currency Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Base Currency
              </label>
              <select className="w-full border border-gray-300 rounded-md p-2">
                <option value="EUR">EUR - Euro</option>
                <option value="USD">USD - US Dollar</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="JPY">JPY - Japanese Yen</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Auto Update Frequency
              </label>
              <select className="w-full border border-gray-300 rounded-md p-2">
                <option value="daily">Daily</option>
                <option value="hourly">Hourly</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountingCurrencies;
