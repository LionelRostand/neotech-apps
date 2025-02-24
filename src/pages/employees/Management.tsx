
import React from 'react';
import { UserModuleAccess } from '@/components/settings/UserModuleAccess';

const Management = () => {
  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold">Gestion des employés</h2>
      <UserModuleAccess />
    </div>
  );
};

export default Management;

