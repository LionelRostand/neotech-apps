
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from 'lucide-react';

const SupplierPrices = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Données temporaires pour la démonstration
  const prices = [
    { 
      id: 1, 
      supplier: 'Fournisseur A',
      product: 'Produit X',
      price: 100.00,
      currency: 'EUR',
      minQuantity: 10,
      discount: '5%',
      validUntil: '2024-12-31'
    },
    { 
      id: 2, 
      supplier: 'Fournisseur B',
      product: 'Produit Y',
      price: 150.00,
      currency: 'USD',
      minQuantity: 5,
      discount: '3%',
      validUntil: '2024-12-31'
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tarifs fournisseurs</h1>
          <p className="text-muted-foreground">
            Gérez les tarifs et conditions négociées avec vos fournisseurs
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-4 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Rechercher un tarif..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau tarif
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des prix</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fournisseur</TableHead>
                <TableHead>Produit</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Devise</TableHead>
                <TableHead>Quantité min.</TableHead>
                <TableHead>Remise</TableHead>
                <TableHead>Validité</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prices.map((price) => (
                <TableRow key={price.id}>
                  <TableCell className="font-medium">{price.supplier}</TableCell>
                  <TableCell>{price.product}</TableCell>
                  <TableCell>{price.price.toFixed(2)}</TableCell>
                  <TableCell>{price.currency}</TableCell>
                  <TableCell>{price.minQuantity}</TableCell>
                  <TableCell>{price.discount}</TableCell>
                  <TableCell>{price.validUntil}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupplierPrices;
