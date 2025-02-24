
import React from 'react';
import CompaniesPage from '@/pages/companies/CompaniesPage';
import { CompanyManagement } from '@/components/settings/companies/CompanyManagement';
import EmployeeManagement from '@/pages/employees/Management';

export const companyRoutes = {
  path: "companies",
  element: <CompaniesPage />,
  children: [
    {
      index: true,
      element: <CompanyManagement />
    },
    {
      path: "management",
      element: <CompanyManagement />
    },
    {
      path: "employees",
      element: <EmployeeManagement />
    }
  ]
};
