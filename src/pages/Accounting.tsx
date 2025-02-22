
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import DashboardLayout from '@/components/layout/DashboardLayout';

const Accounting = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold tracking-tight">Comptabilité</h1>
        </div>
        <Card className="p-6">
          <Outlet />
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Accounting;

