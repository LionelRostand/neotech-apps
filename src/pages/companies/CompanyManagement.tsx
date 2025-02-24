
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CompanyInformation } from '@/components/settings/CompanyInformation';

const CompanyManagement = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Gestion des entreprises</h1>
          <p className="text-muted-foreground">
            Créez et gérez les informations de vos entreprises.
          </p>
        </div>

        <div className="grid gap-6">
          <CompanyInformation />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CompanyManagement;

