
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserRole } from '@/types/auth';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  role: UserRole;
}

interface UserRolesListProps {
  users: User[];
  currentUserRole: UserRole;
  onRoleChange: (userId: string, newRole: UserRole) => Promise<void>;
}

export const UserRolesList = ({ users, currentUserRole, onRoleChange }: UserRolesListProps) => {
  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    try {
      await onRoleChange(userId, newRole);
      toast.success('Rôle mis à jour avec succès');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du rôle:', error);
      toast.error('Erreur lors de la mise à jour du rôle');
    }
  };

  if (users.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        Aucun utilisateur trouvé
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div key={user.id} className="flex items-center justify-between p-2 border rounded">
          <span className="text-sm">{user.email}</span>
          <div className="flex items-center gap-2">
            <Select
              value={user.role}
              onValueChange={(newRole: UserRole) => handleRoleChange(user.id, newRole)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sélectionner un rôle" />
              </SelectTrigger>
              <SelectContent>
                {currentUserRole === 'admin' && (
                  <>
                    <SelectItem value="admin">Administrateur</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="accountant">Comptable</SelectItem>
                    <SelectItem value="user">Utilisateur</SelectItem>
                  </>
                )}
                {currentUserRole === 'manager' && (
                  <>
                    <SelectItem value="accountant">Comptable</SelectItem>
                    <SelectItem value="user">Utilisateur</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
      ))}
    </div>
  );
};
