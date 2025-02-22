
import { Outlet } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';

const Employees = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Gestion des Employés</h1>
        <div className="bg-white rounded-lg shadow">
          <Outlet />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Employees;

