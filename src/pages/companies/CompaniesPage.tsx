
import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';

const CompaniesPage = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow">
          <Outlet />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CompaniesPage;
