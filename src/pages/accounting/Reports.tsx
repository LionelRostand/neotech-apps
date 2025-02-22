
import React from 'react';
import { useToast } from "@/components/ui/use-toast";

const AccountingReports = () => {
  const { toast } = useToast();

  const handleGenerateReport = () => {
    toast({
      title: "Génération de rapport",
      description: "La génération du rapport a été initiée",
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Reports</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 border rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-2">Balance Sheet</h3>
          <p className="text-gray-600 mb-4">View your company's financial position</p>
          <button 
            onClick={handleGenerateReport}
            className="text-neotech-500 hover:text-neotech-600"
          >
            Generate Report →
          </button>
        </div>
        <div className="p-4 border rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-2">Income Statement</h3>
          <p className="text-gray-600 mb-4">Track revenue, expenses, and profit</p>
          <button 
            onClick={handleGenerateReport}
            className="text-neotech-500 hover:text-neotech-600"
          >
            Generate Report →
          </button>
        </div>
        <div className="p-4 border rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-2">Cash Flow</h3>
          <p className="text-gray-600 mb-4">Monitor your cash movements</p>
          <button 
            onClick={handleGenerateReport}
            className="text-neotech-500 hover:text-neotech-600"
          >
            Generate Report →
          </button>
        </div>
        <div className="p-4 border rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-2">Tax Reports</h3>
          <p className="text-gray-600 mb-4">Tax declarations and summaries</p>
          <button 
            onClick={handleGenerateReport}
            className="text-neotech-500 hover:text-neotech-600"
          >
            Generate Report →
          </button>
        </div>
        <div className="p-4 border rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-2">Accounts Receivable</h3>
          <p className="text-gray-600 mb-4">Track customer payments and aging</p>
          <button 
            onClick={handleGenerateReport}
            className="text-neotech-500 hover:text-neotech-600"
          >
            Generate Report →
          </button>
        </div>
        <div className="p-4 border rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-2">Accounts Payable</h3>
          <p className="text-gray-600 mb-4">Monitor vendor payments and due dates</p>
          <button 
            onClick={handleGenerateReport}
            className="text-neotech-500 hover:text-neotech-600"
          >
            Generate Report →
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountingReports;
