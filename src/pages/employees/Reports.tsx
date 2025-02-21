
import { FileBarChart } from 'lucide-react';

const EmployeeReports = () => {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <FileBarChart className="w-6 h-6 text-neotech-600" />
        <h2 className="text-xl font-semibold">Rapports RH</h2>
      </div>
      <p className="text-gray-600">
        Module de reporting RH en cours de développement.
      </p>
    </div>
  );
};

export default EmployeeReports;
