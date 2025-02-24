
import React from 'react';
import { UserModuleAccess } from '@/components/settings/UserModuleAccess';
import DashboardLayout from '@/components/layout/DashboardLayout';

const Management = () => {
  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold">Gestion des employés</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <UserModuleAccess />
      </div>
    </div>
  );
};

export default Management;

