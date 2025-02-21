
import { Calendar } from 'lucide-react';

const EmployeeLeaves = () => {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-6 h-6 text-neotech-600" />
        <h2 className="text-xl font-semibold">Congés</h2>
      </div>
      <p className="text-gray-600">
        Module de gestion des congés en cours de développement.
      </p>
    </div>
  );
};

export default EmployeeLeaves;
