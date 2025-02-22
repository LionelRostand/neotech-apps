
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import DashboardLayout from '@/components/layout/DashboardLayout';

const Accounting = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 p-6 pb-16">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Comptabilité</h1>
            <p className="text-muted-foreground">
              Gérez votre comptabilité et suivez vos opérations financières
            </p>
          </div>
        </div>

        <Card className="hover:border-primary/50 transition-colors">
          <CardContent className="p-6">
            <Outlet />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Accounting;
