
import React from 'react';
import { Card } from "@/components/ui/card";

const AccountingPayments = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Paiements</h1>
      <Card className="p-4">
        <div className="space-y-4">
          <p className="text-gray-500">Gestion des moyens de paiement</p>
          {/* TODO: Implement payments management functionality */}
        </div>
      </Card>
    </div>
  );
};

export default AccountingPayments;
