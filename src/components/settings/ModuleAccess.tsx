
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export const ModuleAccess = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des droits d'accès aux modules</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Modules actifs</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="crm-module" className="rounded border-gray-300" />
              <Label htmlFor="crm-module">CRM</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="sales-module" className="rounded border-gray-300" />
              <Label htmlFor="sales-module">Ventes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="purchases-module" className="rounded border-gray-300" />
              <Label htmlFor="purchases-module">Achats</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="freight-module" className="rounded border-gray-300" />
              <Label htmlFor="freight-module">Transport</Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
