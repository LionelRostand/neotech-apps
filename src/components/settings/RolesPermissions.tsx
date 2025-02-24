
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserRole, defaultPermissions } from '@/types/auth';
import { usePermissions } from '@/hooks/usePermissions';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

interface User {
  id: string;
  email: string;
  role: UserRole;
}

export const RolesPermissions = () => {
  const { role, updateUserRole } = usePermissions();
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!user) {
        setError("Vous devez être connecté pour accéder à cette page");
        setLoading(false);
        return;
      }

      if (role !== 'admin' && role !== 'manager') {
        setError("Vous n'avez pas les permissions nécessaires pour accéder à cette page");
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching users...');
        const usersCollection = await getDocs(collection(db, 'users'));
        console.log('Users data:', usersCollection.docs);
        const usersData = usersCollection.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as User[];
        setUsers(usersData);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        setError("Erreur lors du chargement des utilisateurs. Vérifiez les règles de sécurité Firestore.");
        toast.error('Erreur lors du chargement des utilisateurs');
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user, role]);

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    try {
      await updateUserRole(userId, newRole);
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
      toast.success('Rôle mis à jour avec succès');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du rôle:', error);
      toast.error('Erreur lors de la mise à jour du rôle');
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Gestion des rôles et permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">Chargement...</div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Gestion des rôles et permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-red-500">{error}</div>
        </CardContent>
      </Card>
    );
  }

  if (role !== 'admin' && role !== 'manager') {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des rôles et permissions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-4">Attribution des rôles</h3>
            {users.length === 0 ? (
              <div className="text-center text-muted-foreground">
                Aucun utilisateur trouvé
              </div>
            ) : (
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
                          {role === 'admin' && (
                            <>
                              <SelectItem value="admin">Administrateur</SelectItem>
                              <SelectItem value="manager">Manager</SelectItem>
                              <SelectItem value="accountant">Comptable</SelectItem>
                              <SelectItem value="user">Utilisateur</SelectItem>
                            </>
                          )}
                          {role === 'manager' && (
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
            )}
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-4">Permissions par rôle</h3>
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

