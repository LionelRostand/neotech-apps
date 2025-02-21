
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Download } from 'lucide-react';

const PurchaseOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Données temporaires pour la démonstration
  const orders = [
    { 
      id: 1, 
      reference: 'BC-2024-001', 
      supplier: 'Fournisseur A', 
      date: '2024-02-20', 
      status: 'En cours',
      total: 1500.00
    },
    { 
      id: 2, 
      reference: 'BC-2024-002', 
      supplier: 'Fournisseur B', 
      date: '2024-02-21', 
      status: 'Validé',
      total: 2300.00
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bons de commande</h1>
          <p className="text-muted-foreground">
            Gérez vos commandes fournisseurs
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-4 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Rechercher une commande..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle commande
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des bons de commande</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Référence</TableHead>
                <TableHead>Fournisseur</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.reference}</TableCell>
                  <TableCell>{order.supplier}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      order.status === 'En cours' 
                        ? 'bg-blue-50 text-blue-700'
                        : 'bg-green-50 text-green-700'
                    }`}>
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {order.total.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
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

export default PurchaseOrders;
