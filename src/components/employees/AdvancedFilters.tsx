
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from 'lucide-react';

export type FilterCondition = {
  field: string;
  operator: string;
  value: string;
};

interface AdvancedFiltersProps {
  onApplyFilters: (filters: FilterCondition[]) => void;
}

const AdvancedFilters = ({ onApplyFilters }: AdvancedFiltersProps) => {
  const [filters, setFilters] = useState<FilterCondition[]>([
    { field: 'department', operator: 'equals', value: '' }
  ]);

  const fields = [
    { value: 'department', label: 'Département' },
    { value: 'position', label: 'Poste' },
    { value: 'salary', label: 'Salaire' },
    { value: 'status', label: 'Statut' },
    { value: 'startDate', label: 'Date d\'entrée' },
  ];

  const operators = [
    { value: 'equals', label: 'Est égal à' },
    { value: 'contains', label: 'Contient' },
    { value: 'gt', label: 'Supérieur à' },
    { value: 'lt', label: 'Inférieur à' },
    { value: 'between', label: 'Entre' },
  ];

  const addFilter = () => {
    setFilters([...filters, { field: 'department', operator: 'equals', value: '' }]);
  };

  const removeFilter = (index: number) => {
    const newFilters = filters.filter((_, i) => i !== index);
    setFilters(newFilters);
  };

  const updateFilter = (index: number, field: keyof FilterCondition, value: string) => {
    const newFilters = [...filters];
    newFilters[index] = { ...newFilters[index], [field]: value };
    setFilters(newFilters);
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow-sm border">
      <div className="space-y-4">
        {filters.map((filter, index) => (
          <div key={index} className="flex gap-3 items-center">
            <Select
              value={filter.field}
              onValueChange={(value) => updateFilter(index, 'field', value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Choisir un champ" />
              </SelectTrigger>
              <SelectContent>
                {fields.map((field) => (
                  <SelectItem key={field.value} value={field.value}>
                    {field.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filter.operator}
              onValueChange={(value) => updateFilter(index, 'operator', value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Choisir un opérateur" />
              </SelectTrigger>
              <SelectContent>
                {operators.map((operator) => (
                  <SelectItem key={operator.value} value={operator.value}>
                    {operator.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              placeholder="Valeur"
              value={filter.value}
              onChange={(e) => updateFilter(index, 'value', e.target.value)}
              className="w-[200px]"
            />

            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeFilter(index)}
              className="text-gray-500 hover:text-red-500"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={addFilter}>
          Ajouter un filtre
        </Button>
        <Button onClick={handleApplyFilters}>
          Appliquer les filtres
        </Button>
      </div>
    </div>
  );
};

export default AdvancedFilters;
