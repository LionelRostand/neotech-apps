
import { DollarSign } from 'lucide-react';

const EmployeePayroll = () => {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <DollarSign className="w-6 h-6 text-neotech-600" />
        <h2 className="text-xl font-semibold">Salaires</h2>
      </div>
      <p className="text-gray-600">
        Module de gestion des salaires en cours de développement.
      </p>
    </div>
  );
};

export default EmployeePayroll;
