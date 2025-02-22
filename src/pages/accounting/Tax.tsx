
import React from 'react';
import { Card } from "@/components/ui/card";

const AccountingTax = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">TVA & Taxes</h1>
      <Card className="p-4">
        <div className="space-y-4">
          <p className="text-gray-500">Gestion de la TVA et des déclarations fiscales</p>
          {/* TODO: Implement tax management functionality */}
        </div>
      </Card>
    </div>
  );
};

export default AccountingTax;
