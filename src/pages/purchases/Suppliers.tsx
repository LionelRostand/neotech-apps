
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { Supplier, SupplierCategory } from '@/types/suppliers';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { SupplierForm } from '@/components/suppliers/SupplierForm';
import { SupplierFilters } from '@/components/suppliers/SupplierFilters';
import { SupplierCard } from '@/components/suppliers/SupplierCard';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SupplierCategory | 'all'>('all');
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    const newSupplier: Supplier = {
      id: Date.now().toString(),
      companyName: formData.get('companyName') as string,
      address: {
        street: formData.get('street') as string,
        city: formData.get('city') as string,
        postalCode: formData.get('postalCode') as string,
        country: formData.get('country') as string,
      },
      contacts: {
        phone: formData.get('phone') as string,
        email: formData.get('email') as string,
        website: formData.get('website') as string || undefined,
      },
      vatNumber: formData.get('vatNumber') as string,
      category: formData.get('category') as SupplierCategory,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setSuppliers([...suppliers, newSupplier]);
    setIsDialogOpen(false);
    toast({
      title: "Fournisseur ajouté",
      description: `${newSupplier.companyName} a été ajouté avec succès.`,
    });
  };

  const handleDelete = (supplierId: string) => {
    setSuppliers(suppliers.filter(s => s.id !== supplierId));
    toast({
      title: "Fournisseur supprimé",
      description: "Le fournisseur a été supprimé avec succès.",
    });
  };

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.contacts.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || supplier.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Fournisseurs</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter un fournisseur
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Ajouter un nouveau fournisseur</DialogTitle>
                <DialogDescription>
                  Remplissez les informations du fournisseur ci-dessous.
                </DialogDescription>
              </DialogHeader>
              <SupplierForm 
                onSubmit={handleSubmit}
                onCancel={() => setIsDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>

        <SupplierFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {filteredSuppliers.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            {searchTerm || selectedCategory !== 'all'
              ? "Aucun fournisseur ne correspond aux critères de recherche."
              : "Aucun fournisseur n'a été ajouté."}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSuppliers.map((supplier) => (
              <SupplierCard
                key={supplier.id}
                supplier={supplier}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Suppliers;
