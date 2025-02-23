
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
    const initializeUserPermissions = async () => {
      if (!user) {
        setRole('user');
        setPermissions(defaultPermissions.user);
        setIsLoading(false);
        return;
      }

      try {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);

        if (user.email === 'admin@neotech-consulting.com') {
          await setDoc(userRef, {
            role: 'admin',
            email: user.email,
            updatedAt: new Date().toISOString()
          }, { merge: true });

          setRole('admin');
          setPermissions(defaultPermissions.admin);
        } else if (userDoc.exists()) {
          const userData = userDoc.data();
          const userRole = userData?.role as UserRole || 'user';
          setRole(userRole);
          setPermissions(defaultPermissions[userRole]);
        } else {
          // For new users, create their document with default role
          const defaultRole: UserRole = 'user';
          await setDoc(userRef, {
            role: defaultRole,
            email: user.email,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });
          setRole(defaultRole);
          setPermissions(defaultPermissions[defaultRole]);
        }
      } catch (error: any) {
        console.error('Error initializing permissions:', error);
        // Set default permissions if there's an error
        setRole('user');
        setPermissions(defaultPermissions.user);
        toast.error("Erreur lors de l'initialisation des permissions");
      }
      setIsLoading(false);
    };

    initializeUserPermissions();
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
    if (!user) {
      toast.error("Vous devez être connecté pour effectuer cette action");
      return;
    }

    // Only admins can change roles
    if (role !== 'admin' && user.email !== 'admin@neotech-consulting.com') {
      toast.error("Vous n'avez pas les permissions nécessaires");
      return;
    }

    try {
      const userRef = doc(db, 'users', userId);
      await setDoc(userRef, { 
        role: newRole,
        email: user.email,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      
      if (user.uid === userId) {
        setRole(newRole);
        setPermissions(defaultPermissions[newRole]);
      }
      
      toast.success("Rôle mis à jour avec succès");
    } catch (error: any) {
      console.error('Erreur lors de la mise à jour du rôle:', error);
      toast.error("Erreur lors de la mise à jour du rôle");
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

