
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Upload } from 'lucide-react';

const AccountingTreasury = () => {
  const { toast } = useToast();

  const handleImportStatement = () => {
    toast({
      title: "Import de relevé bancaire",
      description: "L'importation du relevé bancaire a été initiée",
    });
  };

  const handleReconciliation = () => {
    toast({
      title: "Rapprochement bancaire",
      description: "Le processus de rapprochement automatique a été initié",
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Treasury</h2>
      <div className="grid gap-6">
        {/* Import bancaire */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Importation bancaire</h3>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <Button onClick={handleImportStatement}>
                  Importer un relevé bancaire
                </Button>
                <p className="mt-2 text-sm text-gray-500">
                  Formats supportés : .csv, .ofx, .qif
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cash Flow */}
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

        {/* Bank Accounts */}
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
              <div className="flex-1">
                <span className="text-gray-600">Investment Account</span>
                <Button
                  onClick={handleReconciliation}
                  variant="outline"
                  size="sm"
                  className="ml-4"
                >
                  Rapprochement
                </Button>
              </div>
              <span className="font-medium">€125,890.00</span>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
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
