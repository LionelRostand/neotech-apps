
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

const AccountingChart = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Plan Comptable</h1>
      <Card className="p-4">
        <ScrollArea className="h-[600px] w-full">
          <div className="space-y-4">
            <p className="text-gray-500">Configuration et gestion des comptes comptables</p>
            {/* TODO: Implement chart of accounts functionality */}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default AccountingChart;
