
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { useAuth } from "./hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import { AuthProvider } from "./hooks/useAuth";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Chargement...</div>;
  }
  
  if (!user) {
    return <Navigate to="/auth" />;
  }
  
  return <DashboardLayout>{children}</DashboardLayout>;
};

const App = () => (
  <AuthProvider>
    <Toaster />
    <Sonner />
    <PrivateRoute>
      <Outlet />
    </PrivateRoute>
  </AuthProvider>
);

export default App;
