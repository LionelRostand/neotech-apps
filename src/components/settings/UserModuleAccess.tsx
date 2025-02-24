
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { usePermissions } from '@/hooks/usePermissions';
import { doc, collection, getDocs, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { toast } from 'sonner';
import { User } from 'firebase/auth';

interface UserModulePermission {
  active: boolean;
  read: boolean;
  write: boolean;
  manage: boolean;
}

interface UserModulePermissions {
  [key: string]: UserModulePermission;
}

interface UserPermissionsData {
  [userId: string]: UserModulePermissions;
}

export const UserModuleAccess = () => {
  const { role } = usePermissions();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [userPermissions, setUserPermissions] = useState<UserPermissionsData>({});
  const [loading, setLoading] = useState(true);

  const defaultModules = {
    crm: { active: true, read: true, write: false, manage: false },
    sales: { active: true, read: true, write: false, manage: false },
    purchases: { active: true, read: true, write: false, manage: false },
    freight: { active: true, read: true, write: false, manage: false },
    employees: { active: true, read: true, write: false, manage: false },
    accounting: { active: true, read: true, write: false, manage: false },
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const usersData = usersSnapshot.docs.map(doc => ({
          uid: doc.id,
          ...doc.data()
        })) as User[];
        setUsers(usersData);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        toast.error('Erreur lors de la récupération des utilisateurs');
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchUserPermissions = async () => {
      if (!selectedUserId) return;
      
      try {
        const userPermissionsRef = doc(db, 'userModulePermissions', selectedUserId);
        const docSnap = await getDoc(userPermissionsRef);
        
        if (docSnap.exists()) {
          setUserPermissions(prev => ({
            ...prev,
            [selectedUserId]: docSnap.data() as UserModulePermissions
          }));
        } else {
          // Si aucune configuration n'existe pour cet utilisateur, on utilise la configuration par défaut
          setUserPermissions(prev => ({
            ...prev,
            [selectedUserId]: defaultModules
          }));
        }
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des permissions:', error);
        toast.error('Erreur lors de la récupération des permissions');
      }
    };

    fetchUserPermissions();
  }, [selectedUserId]);

  const handlePermissionChange = async (
    userId: string,
    module: string,
    type: 'active' | 'read' | 'write' | 'manage',
    checked: boolean
  ) => {
    try {
      const newPermissions = {
        ...userPermissions[userId],
        [module]: {
          ...userPermissions[userId][module],
          [type]: checked,
        },
      };

      // Si le module est désactivé, on désactive toutes les permissions
      if (type === 'active' && !checked) {
        newPermissions[module] = {
          active: false,
          read: false,
          write: false,
          manage: false,
        };
      }

      // Mettre à jour le state local
      setUserPermissions(prev => ({
        ...prev,
        [userId]: newPermissions
      }));

      // Sauvegarder dans Firestore
      const userPermissionsRef = doc(db, 'userModulePermissions', userId);
      await setDoc(userPermissionsRef, newPermissions);

      toast.success('Permissions mises à jour avec succès');
    } catch (error) {
      console.error('Erreur lors de la mise à jour des permissions:', error);
      toast.error('Erreur lors de la mise à jour des permissions');
    }
  };

  if (role !== 'admin' && role !== 'manager') {
    return null;
  }

  if (loading) {
    return <div>Chargement...</div>;
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

        {selectedUserId && userPermissions[selectedUserId] && (
          <div className="space-y-4">
            {Object.entries(userPermissions[selectedUserId]).map(([moduleName, modulePerms]) => (
              <div key={moduleName} className="space-y-4 border-b pb-4 last:border-0">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`${selectedUserId}-${moduleName}-active`}
                    checked={modulePerms.active}
                    onCheckedChange={(checked) => 
                      handlePermissionChange(selectedUserId, moduleName, 'active', checked as boolean)
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
                          handlePermissionChange(selectedUserId, moduleName, 'read', checked as boolean)
                        }
                      />
                      <Label htmlFor={`${selectedUserId}-${moduleName}-read`}>Lecture</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`${selectedUserId}-${moduleName}-write`}
                        checked={modulePerms.write}
                        onCheckedChange={(checked) => 
                          handlePermissionChange(selectedUserId, moduleName, 'write', checked as boolean)
                        }
                      />
                      <Label htmlFor={`${selectedUserId}-${moduleName}-write`}>Écriture</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`${selectedUserId}-${moduleName}-manage`}
                        checked={modulePerms.manage}
                        onCheckedChange={(checked) => 
                          handlePermissionChange(selectedUserId, moduleName, 'manage', checked as boolean)
                        }
                      />
                      <Label htmlFor={`${selectedUserId}-${moduleName}-manage`}>Gestion</Label>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

