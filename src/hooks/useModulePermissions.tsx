
import { useState, useEffect } from 'react';
import { doc, collection, getDocs, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { User } from 'firebase/auth';
import { toast } from 'sonner';

interface UserModulePermission {
  active: boolean;
  read: boolean;
  write: boolean;
  manage: boolean;
}

export interface UserModulePermissions {
  [key: string]: UserModulePermission;
}

export interface UserPermissionsData {
  [userId: string]: UserModulePermissions;
}

export const defaultModules = {
  crm: { active: true, read: true, write: false, manage: false },
  sales: { active: true, read: true, write: false, manage: false },
  purchases: { active: true, read: true, write: false, manage: false },
  freight: { active: true, read: true, write: false, manage: false },
  employees: { active: true, read: true, write: false, manage: false },
  accounting: { active: true, read: true, write: false, manage: false },
};

export const useModulePermissions = (selectedUserId: string) => {
  const [users, setUsers] = useState<User[]>([]);
  const [userPermissions, setUserPermissions] = useState<UserPermissionsData>({});
  const [loading, setLoading] = useState(true);

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

      if (type === 'active' && !checked) {
        newPermissions[module] = {
          active: false,
          read: false,
          write: false,
          manage: false,
        };
      }

      setUserPermissions(prev => ({
        ...prev,
        [userId]: newPermissions
      }));

      const userPermissionsRef = doc(db, 'userModulePermissions', userId);
      await setDoc(userPermissionsRef, newPermissions);

      toast.success('Permissions mises à jour avec succès');
    } catch (error) {
      console.error('Erreur lors de la mise à jour des permissions:', error);
      toast.error('Erreur lors de la mise à jour des permissions');
    }
  };

  return {
    users,
    userPermissions,
    loading,
    handlePermissionChange
  };
};
