
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SupplierCategory } from '@/types/suppliers';

const categoryOptions: { value: SupplierCategory; label: string }[] = [
  { value: 'local', label: 'Local' },
  { value: 'international', label: 'International' },
  { value: 'distributor', label: 'Distributeur' },
  { value: 'manufacturer', label: 'Fabricant' },
];

interface SupplierFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: SupplierCategory | 'all';
  onCategoryChange: (value: SupplierCategory | 'all') => void;
}

export const SupplierFilters = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}: SupplierFiltersProps) => {
  return (
    <div className="flex gap-4 items-center">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Rechercher un fournisseur..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8"
        />
      </div>
      <Select
        value={selectedCategory}
        onValueChange={(value) => onCategoryChange(value as SupplierCategory | 'all')}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Filtrer par catégorie" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes les catégories</SelectItem>
          {categoryOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
