
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { Permission, UserRole, defaultPermissions } from '../types/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface PermissionsContextType {
  role: UserRole;
  permissions: Permission[];
  hasPermission: (module: string, action: string) => boolean;
  isLoading: boolean;
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
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();
        const userRole = (userData?.role as UserRole) || 'user';
        
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
    if (role === 'admin') return true;
    
    return permissions.some(
      permission => 
        (permission.module === '*' || permission.module === module) && 
        permission.actions.includes(action as any)
    );
  };

  return (
    <PermissionsContext.Provider value={{ role, permissions, hasPermission, isLoading }}>
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
