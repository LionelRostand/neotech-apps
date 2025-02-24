
import { Outlet } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { PermissionsProvider } from './hooks/usePermissions';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <PermissionsProvider>
        <Outlet />
      </PermissionsProvider>
    </AuthProvider>
  );
}

export default App;
