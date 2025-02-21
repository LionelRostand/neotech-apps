
import { Clock } from 'lucide-react';

const EmployeeAttendance = () => {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="w-6 h-6 text-neotech-600" />
        <h2 className="text-xl font-semibold">Présences</h2>
      </div>
      <p className="text-gray-600">
        Module de suivi des présences en cours de développement.
      </p>
    </div>
  );
};

export default EmployeeAttendance;
