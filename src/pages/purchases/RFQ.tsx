
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Download } from 'lucide-react';

const RFQ = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Données temporaires pour la démonstration
  const rfqs = [
    { 
      id: 1, 
      reference: 'RFQ-2024-001', 
      supplier: 'Fournisseur A', 
      date: '2024-02-20', 
      status: 'En attente',
      total: 1500.00
    },
    { 
      id: 2, 
      reference: 'RFQ-2024-002', 
      supplier: 'Fournisseur B', 
      date: '2024-02-21', 
      status: 'Répondu',
      total: 2300.00
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Demandes de prix</h1>
          <p className="text-muted-foreground">
            Gérez vos demandes de prix aux fournisseurs
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-4 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Rechercher une demande..."
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
            Nouvelle demande
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des demandes de prix</CardTitle>
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
              {rfqs.map((rfq) => (
                <TableRow key={rfq.id}>
                  <TableCell className="font-medium">{rfq.reference}</TableCell>
                  <TableCell>{rfq.supplier}</TableCell>
                  <TableCell>{rfq.date}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      rfq.status === 'En attente' 
                        ? 'bg-yellow-50 text-yellow-700'
                        : 'bg-green-50 text-green-700'
                    }`}>
                      {rfq.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {rfq.total.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
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

export default RFQ;
