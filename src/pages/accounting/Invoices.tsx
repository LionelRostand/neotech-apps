
import React from 'react';
import { Card } from "@/components/ui/card";

const AccountingInvoices = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Factures & Paiements</h1>
      <Card className="p-4">
        <div className="space-y-4">
          <p className="text-gray-500">Gestion des factures et des paiements</p>
          {/* TODO: Implement invoices and payments management */}
        </div>
      </Card>
    </div>
  );
};

export default AccountingInvoices;
