
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, AlertTriangle } from 'lucide-react';

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Données temporaires pour la démonstration
  const inventory = [
    { 
      id: 1, 
      reference: 'PROD-001', 
      name: 'Produit A',
      category: 'Catégorie 1',
      quantity: 150,
      minQuantity: 100,
      location: 'Zone A-01'
    },
    { 
      id: 2, 
      reference: 'PROD-002', 
      name: 'Produit B',
      category: 'Catégorie 2',
      quantity: 50,
      minQuantity: 75,
      location: 'Zone B-02'
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Stocks</h1>
          <p className="text-muted-foreground">
            Suivez vos niveaux de stock
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-4 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Rechercher un produit..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>État des stocks</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Référence</TableHead>
                <TableHead>Produit</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Emplacement</TableHead>
                <TableHead className="text-right">Quantité</TableHead>
                <TableHead className="text-right">Stock mini</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.reference}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">{item.minQuantity}</TableCell>
                  <TableCell>
                    {item.quantity < item.minQuantity ? (
                      <span className="inline-flex items-center text-red-600">
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        Rupture
                      </span>
                    ) : (
                      <span className="text-green-600">OK</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Inventory;
