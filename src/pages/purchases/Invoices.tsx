
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Upload } from 'lucide-react';

const Invoices = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Données temporaires pour la démonstration
  const invoices = [
    { 
      id: 1, 
      reference: 'FAC-2024-001', 
      supplier: 'Fournisseur A', 
      date: '2024-02-20', 
      dueDate: '2024-03-20',
      status: 'À payer',
      total: 1500.00
    },
    { 
      id: 2, 
      reference: 'FAC-2024-002', 
      supplier: 'Fournisseur B', 
      date: '2024-02-21', 
      dueDate: '2024-03-21',
      status: 'Payée',
      total: 2300.00
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Factures</h1>
          <p className="text-muted-foreground">
            Gérez vos factures fournisseurs
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-4 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Rechercher une facture..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Importer
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle facture
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des factures</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Référence</TableHead>
                <TableHead>Fournisseur</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Échéance</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.reference}</TableCell>
                  <TableCell>{invoice.supplier}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      invoice.status === 'À payer' 
                        ? 'bg-yellow-50 text-yellow-700'
                        : 'bg-green-50 text-green-700'
                    }`}>
                      {invoice.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {invoice.total.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
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

export default Invoices;
