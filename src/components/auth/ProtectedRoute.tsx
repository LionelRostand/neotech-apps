
import { Navigate } from 'react-router-dom';
import { usePermissions } from '../../hooks/usePermissions';
import { useToast } from '../../components/ui/use-toast';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useEffect, useState } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  module: string;
  action?: 'read' | 'write' | 'manage';
}

const ProtectedRoute = ({ children, module, action = 'read' }: ProtectedRouteProps) => {
  const { role } = usePermissions();
  const { toast } = useToast();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAccess = async () => {
      if (role === 'admin') {
        setHasAccess(true);
        return;
      }

      try {
        const modulePermissionsRef = doc(db, 'settings', 'modulePermissions');
        const docSnap = await getDoc(modulePermissionsRef);
        
        if (docSnap.exists()) {
          const permissions = docSnap.data();
          const modulePerms = permissions[module];
          
          if (!modulePerms?.active) {
            setHasAccess(false);
            return;
          }

          switch (action) {
            case 'read':
              setHasAccess(modulePerms.read);
              break;
            case 'write':
              setHasAccess(modulePerms.write);
              break;
            case 'manage':
              setHasAccess(modulePerms.manage);
              break;
            default:
              setHasAccess(false);
          }
        } else {
          setHasAccess(true); // Par défaut si aucune configuration n'existe
        }
      } catch (error) {
        console.error('Erreur lors de la vérification des permissions:', error);
        setHasAccess(false);
      }
    };

    checkAccess();
  }, [module, action, role]);

  if (hasAccess === null) {
    return <div>Chargement...</div>;
  }

  if (!hasAccess) {
    toast({
      title: "Accès refusé",
      description: "Vous n'avez pas les permissions nécessaires pour accéder à cette page.",
      variant: "destructive",
    });
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
