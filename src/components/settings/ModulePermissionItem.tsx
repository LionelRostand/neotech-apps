
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { UserModulePermissions } from '@/hooks/useModulePermissions';

interface ModulePermissionItemProps {
  moduleName: string;
  modulePerms: UserModulePermissions[string];
  selectedUserId: string;
  onPermissionChange: (
    userId: string,
    module: string,
    type: 'active' | 'read' | 'write' | 'manage',
    checked: boolean
  ) => void;
}

export const ModulePermissionItem = ({
  moduleName,
  modulePerms,
  selectedUserId,
  onPermissionChange
}: ModulePermissionItemProps) => {
  return (
    <div className="space-y-4 border-b pb-4 last:border-0">
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${selectedUserId}-${moduleName}-active`}
          checked={modulePerms.active}
          onCheckedChange={(checked) => 
            onPermissionChange(selectedUserId, moduleName, 'active', checked as boolean)
          }
        />
        <Label htmlFor={`${selectedUserId}-${moduleName}-active`} className="font-semibold capitalize">
          {moduleName}
        </Label>
      </div>
      
      {modulePerms.active && (
        <div className="ml-6 space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`${selectedUserId}-${moduleName}-read`}
              checked={modulePerms.read}
              onCheckedChange={(checked) => 
                onPermissionChange(selectedUserId, moduleName, 'read', checked as boolean)
              }
            />
            <Label htmlFor={`${selectedUserId}-${moduleName}-read`}>Lecture</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`${selectedUserId}-${moduleName}-write`}
              checked={modulePerms.write}
              onCheckedChange={(checked) => 
                onPermissionChange(selectedUserId, moduleName, 'write', checked as boolean)
              }
            />
            <Label htmlFor={`${selectedUserId}-${moduleName}-write`}>Écriture</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`${selectedUserId}-${moduleName}-manage`}
              checked={modulePerms.manage}
              onCheckedChange={(checked) => 
                onPermissionChange(selectedUserId, moduleName, 'manage', checked as boolean)
              }
            />
            <Label htmlFor={`${selectedUserId}-${moduleName}-manage`}>Gestion</Label>
          </div>
        </div>
      )}
    </div>
  );
};
