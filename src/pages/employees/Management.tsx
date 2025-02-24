
import React from 'react';
import { UserModuleAccess } from '@/components/settings/UserModuleAccess';

const Management = () => {
  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold">Gestion des permissions</h2>
      <p className="text-gray-500">
        Définissez les modules accessibles pour chaque utilisateur et leurs niveaux de permissions.
      </p>
      <div className="bg-white rounded-lg shadow">
        <UserModuleAccess />
      </div>
    </div>
  );
};

export default Management;
