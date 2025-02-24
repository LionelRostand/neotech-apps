
import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';

const CompaniesPage = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto p-4">
        <div className="w-full bg-white rounded-lg shadow-sm p-6">
          <Outlet />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CompaniesPage;
