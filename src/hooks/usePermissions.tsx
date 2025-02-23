
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
    const initializeAdminUser = async () => {
      if (!user) {
        setRole('user');
        setPermissions(defaultPermissions.user);
        setIsLoading(false);
        return;
      }

      try {
        if (user.email === 'admin@neotech-consulting.com') {
          const userRef = doc(db, 'users', user.uid);
          
          // Vérifier d'abord si le document existe
          const docSnap = await getDoc(userRef);
          
          // Mettre à jour ou créer le document avec le rôle admin
          await setDoc(userRef, {
            role: 'admin',
            email: user.email
          }, { merge: true });

          console.log('Admin role set for:', user.email);
          setRole('admin');
          setPermissions(defaultPermissions.admin);
          setIsLoading(false);
          return;
        }

        // Pour les autres utilisateurs
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        
        if (userDoc.exists()) {
          const userRole = userDoc.data()?.role as UserRole || 'user';
          setRole(userRole);
          setPermissions(defaultPermissions[userRole]);
        } else {
          const defaultRole: UserRole = 'user';
          await setDoc(userRef, { 
            role: defaultRole,
            email: user.email 
          });
          setRole(defaultRole);
          setPermissions(defaultPermissions[defaultRole]);
        }
      } catch (error) {
        console.error('Erreur lors de l\'initialisation des permissions:', error);
        // En cas d'erreur, définir un rôle par défaut
        setRole('user');
        setPermissions(defaultPermissions.user);
      }
      setIsLoading(false);
    };

    initializeAdminUser();
  }, [user]);

  const hasPermission = (module: string, action: string): boolean => {
    if (role === 'admin') return true;
    return permissions.some(
      permission => 
        (permission.module === '*' || permission.module === module) && 
        permission.actions.includes(action as any)
    );
  };

  const updateUserRole = async (userId: string, newRole: UserRole) => {
    try {
      const userRef = doc(db, 'users', userId);
      await setDoc(userRef, { 
        role: newRole,
        email: user?.email
      }, { merge: true });
      
      if (user?.uid === userId) {
        setRole(newRole);
        setPermissions(defaultPermissions[newRole]);
      }
      
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
