
import React from 'react';
import { Card } from "@/components/ui/card";

const AccountingReports = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Rapports Comptables</h1>
      <Card className="p-4">
        <div className="space-y-4">
          <p className="text-gray-500">Tableaux de bord et analyses financières</p>
          {/* TODO: Implement accounting reports functionality */}
        </div>
      </Card>
    </div>
  );
};

export default AccountingReports;
