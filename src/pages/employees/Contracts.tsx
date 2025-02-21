
import { FileSignature } from 'lucide-react';

const EmployeeContracts = () => {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <FileSignature className="w-6 h-6 text-neotech-600" />
        <h2 className="text-xl font-semibold">Contrats</h2>
      </div>
      <p className="text-gray-600">
        Module de gestion des contrats en cours de développement.
      </p>
    </div>
  );
};

export default EmployeeContracts;
