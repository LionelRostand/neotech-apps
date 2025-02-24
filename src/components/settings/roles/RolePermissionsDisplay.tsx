
import React from 'react';
import { defaultPermissions } from '@/types/auth';

export const RolePermissionsDisplay = () => {
  return (
    <div className="space-y-4">
      {Object.entries(defaultPermissions).map(([roleName, permissions]) => (
        <div key={roleName} className="border p-4 rounded-lg">
          <h4 className="font-semibold mb-2 capitalize">{roleName}</h4>
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
  );
};
