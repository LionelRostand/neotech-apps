
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { usePermissions } from '@/hooks/usePermissions';
import { useModulePermissions } from '@/hooks/useModulePermissions';
import { ModulePermissionItem } from './ModulePermissionItem';

export const UserModuleAccess = () => {
  const { role } = usePermissions();
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const { users, userPermissions, loading, error, handlePermissionChange } = useModulePermissions(selectedUserId);

  if (role !== 'admin' && role !== 'manager') {
    return null;
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Erreur</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (loading && !selectedUserId) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Chargement...</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Chargement des utilisateurs...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des droits d'accès aux modules par utilisateur</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="user-select">Sélectionner un utilisateur</Label>
          <Select
            value={selectedUserId}
            onValueChange={setSelectedUserId}
          >
            <SelectTrigger id="user-select" className="w-full">
              <SelectValue placeholder="Sélectionner un utilisateur" />
            </SelectTrigger>
            <SelectContent>
              {users.map((user) => (
                <SelectItem key={user.uid} value={user.uid}>
                  {user.email}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {loading && selectedUserId ? (
          <p>Chargement des permissions...</p>
        ) : (
          selectedUserId && userPermissions[selectedUserId] && (
            <div className="space-y-4">
              {Object.entries(userPermissions[selectedUserId]).map(([moduleName, modulePerms]) => (
                <ModulePermissionItem
                  key={moduleName}
                  moduleName={moduleName}
                  modulePerms={modulePerms}
                  selectedUserId={selectedUserId}
                  onPermissionChange={handlePermissionChange}
                />
              ))}
            </div>
          )
        )}
      </CardContent>
    </Card>
  );
};
