
import React from 'react';
import { MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Supplier, SupplierCategory } from '@/types/suppliers';

const categoryOptions: { value: SupplierCategory; label: string }[] = [
  { value: 'local', label: 'Local' },
  { value: 'international', label: 'International' },
  { value: 'distributor', label: 'Distributeur' },
  { value: 'manufacturer', label: 'Fabricant' },
];

interface SupplierCardProps {
  supplier: Supplier;
  onDelete: (id: string) => void;
}

export const SupplierCard = ({ supplier, onDelete }: SupplierCardProps) => {
  return (
    <div className="border rounded-lg p-4 hover:border-primary/50 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold">{supplier.companyName}</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => console.log('Edit', supplier.id)}>
              Modifier
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onDelete(supplier.id)}
              className="text-red-600"
            >
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="space-y-1 text-sm text-gray-600">
        <p>{supplier.contacts.email}</p>
        <p>{supplier.contacts.phone}</p>
        <p className="text-xs">
          {supplier.address.street}, {supplier.address.postalCode} {supplier.address.city}
        </p>
        <p className="text-xs">{supplier.address.country}</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-primary/10 text-primary">
            {categoryOptions.find(cat => cat.value === supplier.category)?.label}
          </span>
          <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
            supplier.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {supplier.status === 'active' ? 'Actif' : 'Inactif'}
          </span>
        </div>
      </div>
    </div>
  );
};
