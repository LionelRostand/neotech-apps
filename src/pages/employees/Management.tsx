
import { UserPlus } from 'lucide-react';

const EmployeeManagement = () => {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <UserPlus className="w-6 h-6 text-neotech-600" />
        <h2 className="text-xl font-semibold">Gestion des Employés</h2>
      </div>
      <p className="text-gray-600">
        Module de gestion des employés en cours de développement.
      </p>
    </div>
  );
};

export default EmployeeManagement;
