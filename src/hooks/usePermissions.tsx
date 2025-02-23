
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { Permission, UserRole, defaultPermissions } from '../types/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { toast } from 'sonner';

interface PermissionsContextType {
  role: UserRole;
  permissions: Permission[];
  hasPermission: (module: string, action: string) => boolean;
  isLoading: boolean;
  updateUserRole: (userId: string, newRole: UserRole) => Promise<void>;
}

const PermissionsContext = createContext<PermissionsContextType | null>(null);

export const PermissionsProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [role, setRole] = useState<UserRole>('user');
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user) {
        setRole('user');
        setPermissions(defaultPermissions.user);
        setIsLoading(false);
        return;
      }

      try {
        console.log('Fetching role for user:', user.email);
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        let userRole: UserRole = 'user';

        if (user.email === 'admin@neotech-consulting.com') {
          console.log('Admin user detected');
          userRole = 'admin';
          await setDoc(doc(db, 'users', user.uid), { role: 'admin' }, { merge: true });
        } else if (userDoc.exists()) {
          userRole = (userDoc.data()?.role as UserRole) || 'user';
        }
        
        console.log('User role set to:', userRole);
        setRole(userRole);
        setPermissions(defaultPermissions[userRole]);
      } catch (error) {
        console.error('Erreur lors de la récupération du rôle:', error);
        setRole('user');
        setPermissions(defaultPermissions.user);
      }
      setIsLoading(false);
    };

    fetchUserRole();
  }, [user]);

  const hasPermission = (module: string, action: string): boolean => {
    console.log('Checking permission:', { module, action, role, permissions });
    if (role === 'admin') return true;
    
    const hasAccess = permissions.some(
      permission => 
        (permission.module === '*' || permission.module === module) && 
        permission.actions.includes(action as any)
    );
    console.log('Permission result:', hasAccess);
    return hasAccess;
  };

  const updateUserRole = async (userId: string, newRole: UserRole) => {
    try {
      await setDoc(doc(db, 'users', userId), { role: newRole }, { merge: true });
      toast.success(`Rôle mis à jour avec succès`);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du rôle:', error);
      toast.error(`Erreur lors de la mise à jour du rôle`);
      throw error;
    }
  };

  return (
    <PermissionsContext.Provider value={{ 
      role, 
      permissions, 
      hasPermission, 
      isLoading,
      updateUserRole
    }}>
      {children}
    </PermissionsContext.Provider>
  );
};

export const usePermissions = () => {
  const context = useContext(PermissionsContext);
  if (!context) {
    throw new Error('usePermissions must be used within a PermissionsProvider');
  }
  return context;
};
