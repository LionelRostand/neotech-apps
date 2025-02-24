
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserRole } from '@/types/auth';
import { usePermissions } from '@/hooks/usePermissions';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';
import { UserRolesList } from './roles/UserRolesList';
import { RolePermissionsDisplay } from './roles/RolePermissionsDisplay';

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
    } catch (error) {
      throw error;
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
            <UserRolesList 
              users={users} 
              currentUserRole={role} 
              onRoleChange={handleRoleChange}
            />
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-4">Permissions par rôle</h3>
            <RolePermissionsDisplay />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
