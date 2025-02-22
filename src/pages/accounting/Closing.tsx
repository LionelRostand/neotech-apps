
import React from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const AccountingClosing = () => {
  const { toast } = useToast();

  const handleStartClosing = () => {
    toast({
      title: "Clôture comptable",
      description: "Le processus de clôture a été initié",
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Closing</h2>
      <div className="grid gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Period Closing</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Current Period</span>
              <span className="font-medium">December 2023</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Last Closing Date</span>
              <span className="font-medium">November 30, 2023</span>
            </div>
            <Button
              onClick={handleStartClosing}
              className="w-full"
              variant="default"
            >
              Start Closing Process
            </Button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Closing Checklist</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <input type="checkbox" className="mr-3" />
              <span>Verify all transactions are posted</span>
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="mr-3" />
              <span>Reconcile bank accounts</span>
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="mr-3" />
              <span>Review accounts receivable</span>
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="mr-3" />
              <span>Review accounts payable</span>
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="mr-3" />
              <span>Process end-of-period adjustments</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Previous Closings</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span>November 2023</span>
              <span className="text-green-600">Completed</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>October 2023</span>
              <span className="text-green-600">Completed</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>September 2023</span>
              <span className="text-green-600">Completed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountingClosing;
