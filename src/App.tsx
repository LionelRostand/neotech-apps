
import { useAuth } from "./hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";

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
  <PrivateRoute>
    <Outlet />
  </PrivateRoute>
);

export default App;
