
import { Outlet } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';

const Employees = () => {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};

export default Employees;

