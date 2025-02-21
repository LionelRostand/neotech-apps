
import { Medal } from 'lucide-react';

const EmployeePerformance = () => {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Medal className="w-6 h-6 text-neotech-600" />
        <h2 className="text-xl font-semibold">Performance</h2>
      </div>
      <p className="text-gray-600">
        Module d'évaluation des performances en cours de développement.
      </p>
    </div>
  );
};

export default EmployeePerformance;
