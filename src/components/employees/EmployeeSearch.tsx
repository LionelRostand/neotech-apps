
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface EmployeeSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const EmployeeSearch = ({ value, onChange }: EmployeeSearchProps) => {
  return (
    <div className="relative w-full sm:w-64">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
      <Input
        placeholder="Rechercher un employé..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-8 w-full"
      />
    </div>
  );
};

export default EmployeeSearch;
