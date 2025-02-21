
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from 'lucide-react';

const Receipts = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Données temporaires pour la démonstration
  const receipts = [
    { 
      id: 1, 
      reference: 'BR-2024-001', 
      orderRef: 'BC-2024-001',
      supplier: 'Fournisseur A', 
      date: '2024-02-20', 
      status: 'Partiel'
    },
    { 
      id: 2, 
      reference: 'BR-2024-002', 
      orderRef: 'BC-2024-002',
      supplier: 'Fournisseur B', 
      date: '2024-02-21', 
      status: 'Complet'
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Réceptions</h1>
          <p className="text-muted-foreground">
            Gérez vos bons de réception
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-4 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Rechercher une réception..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle réception
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des bons de réception</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Référence</TableHead>
                <TableHead>Commande</TableHead>
                <TableHead>Fournisseur</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {receipts.map((receipt) => (
                <TableRow key={receipt.id}>
                  <TableCell className="font-medium">{receipt.reference}</TableCell>
                  <TableCell>{receipt.orderRef}</TableCell>
                  <TableCell>{receipt.supplier}</TableCell>
                  <TableCell>{receipt.date}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      receipt.status === 'Partiel' 
                        ? 'bg-yellow-50 text-yellow-700'
                        : 'bg-green-50 text-green-700'
                    }`}>
                      {receipt.status}
                    </span>
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

export default Receipts;
