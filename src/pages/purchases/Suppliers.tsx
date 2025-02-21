
import React, { useState } from 'react';
import { Plus, Filter, Search, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/components/ui/use-toast';
import { Supplier, SupplierCategory } from '@/types/suppliers';
import DashboardLayout from '@/components/layout/DashboardLayout';

const categoryOptions: { value: SupplierCategory; label: string }[] = [
  { value: 'local', label: 'Local' },
  { value: 'international', label: 'International' },
  { value: 'distributor', label: 'Distributeur' },
  { value: 'manufacturer', label: 'Fabricant' },
];

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

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.contacts.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || supplier.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (supplierId: string) => {
    setSuppliers(suppliers.filter(s => s.id !== supplierId));
    toast({
      title: "Fournisseur supprimé",
      description: "Le fournisseur a été supprimé avec succès.",
    });
  };

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
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Raison sociale</Label>
                    <Input id="companyName" name="companyName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vatNumber">Numéro de TVA</Label>
                    <Input id="vatNumber" name="vatNumber" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Catégorie</Label>
                    <Select name="category" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input id="phone" name="phone" type="tel" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Site web</Label>
                    <Input id="website" name="website" type="url" />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="street">Adresse</Label>
                    <Input id="street" name="street" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Ville</Label>
                    <Input id="city" name="city" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Code postal</Label>
                    <Input id="postalCode" name="postalCode" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Pays</Label>
                    <Input id="country" name="country" required />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button type="submit">
                    Ajouter
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Rechercher un fournisseur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value as SupplierCategory | 'all')}
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

        {filteredSuppliers.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            {searchTerm || selectedCategory !== 'all'
              ? "Aucun fournisseur ne correspond aux critères de recherche."
              : "Aucun fournisseur n'a été ajouté."}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSuppliers.map((supplier) => (
              <div key={supplier.id} className="border rounded-lg p-4 hover:border-primary/50 transition-colors">
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
                        onClick={() => handleDelete(supplier.id)}
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
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Suppliers;

