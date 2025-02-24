
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserRole } from '@/types/auth';
import { usePermissions } from '@/hooks/usePermissions';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';
import { UserRolesList } from './roles/UserRolesList';
import { RolePermissionsDisplay } from './roles/RolePermissionsDisplay';
import { CompanyManagement } from './companies/CompanyManagement';

interface User {
  id: string;
  email: string;
  role: UserRole;
  companyId?: string;
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
        const usersCollection = await getDocs(collection(db, 'users'));
        const usersData = usersCollection.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as User[];
        setUsers(usersData);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        setError("Erreur lors du chargement des utilisateurs");
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

  const handleCompanyChange = async (userId: string, companyId: string) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        companyId,
        updatedAt: new Date().toISOString()
      });
      
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userId ? { ...user, companyId } : user
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
    <div className="space-y-6">
      {role === 'admin' && (
        <CompanyManagement />
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>Gestion des rôles et permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-4">Attribution des rôles et entreprises</h3>
              <UserRolesList 
                users={users} 
                currentUserRole={role} 
                onRoleChange={handleRoleChange}
                onCompanyChange={handleCompanyChange}
              />
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-4">Permissions par rôle</h3>
              <RolePermissionsDisplay />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
