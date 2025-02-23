
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserRole, defaultPermissions } from '@/types/auth';

interface RolesPermissionsProps {
  role: UserRole;
}

export const RolesPermissions = ({ role }: RolesPermissionsProps) => {
  if (role !== 'admin') return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des rôles et permissions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(defaultPermissions).map(([roleName, permissions]) => (
            <div key={roleName} className="border p-4 rounded-lg">
              <h3 className="font-semibold mb-2 capitalize">{roleName}</h3>
              <div className="space-y-2">
                {permissions.map((permission) => (
                  <div key={permission.module} className="text-sm">
                    <span className="font-medium capitalize">{permission.module}</span>:
                    <span className="ml-2 text-muted-foreground">
                      {permission.actions.join(', ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
