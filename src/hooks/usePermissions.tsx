
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
        // Définir d'abord le rôle admin pour l'utilisateur admin
        if (user.email === 'admin@neotech-consulting.com') {
          console.log('Setting admin role for:', user.email);
          setRole('admin');
          setPermissions(defaultPermissions.admin);
          
          // S'assurer que le document existe dans Firestore
          const userRef = doc(db, 'users', user.uid);
          await setDoc(userRef, { 
            role: 'admin',
            email: user.email 
          }, { merge: true });
          
          setIsLoading(false);
          return;
        }

        // Pour les autres utilisateurs, lire leur rôle depuis Firestore
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        
        if (userDoc.exists()) {
          const userRole = userDoc.data()?.role as UserRole || 'user';
          console.log('Fetched role for user:', user.email, 'Role:', userRole);
          setRole(userRole);
          setPermissions(defaultPermissions[userRole]);
        } else {
          // Créer un nouveau document pour l'utilisateur avec le rôle par défaut
          const defaultRole: UserRole = 'user';
          await setDoc(userRef, { 
            role: defaultRole,
            email: user.email 
          });
          setRole(defaultRole);
          setPermissions(defaultPermissions[defaultRole]);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du rôle:', error);
        // En cas d'erreur, définir un rôle par défaut
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

  const updateUserRole = async (userId: string, newRole: UserRole) => {
    try {
      await setDoc(doc(db, 'users', userId), { 
        role: newRole,
        email: user?.email
      }, { merge: true });
      
      // Si l'utilisateur met à jour son propre rôle
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

