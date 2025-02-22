
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "./hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Chargement...</div>;
  }
  
  if (!user) {
    return <Navigate to="/auth" />;
  }
  
  return children;
};

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <PrivateRoute>
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </PrivateRoute>
  </TooltipProvider>
);

export default App;

