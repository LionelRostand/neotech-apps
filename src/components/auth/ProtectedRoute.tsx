
import { Navigate } from 'react-router-dom';
import { usePermissions } from '../../hooks/usePermissions';
import { useToast } from '../../components/ui/use-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
  module: string;
  action?: 'read' | 'write' | 'delete' | 'manage';
}

const ProtectedRoute = ({ children, module, action = 'read' }: ProtectedRouteProps) => {
  const { hasPermission, isLoading } = usePermissions();
  const { toast } = useToast();

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (!hasPermission(module, action)) {
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
