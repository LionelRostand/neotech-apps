
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

const Accounting = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Données temporaires pour la démonstration
  const entries = [
    { 
      id: 1, 
      date: '2024-02-20',
      reference: 'FAC-2024-001',
      type: 'Facture',
      account: '401000',
      description: 'Fournisseur A - Facture février',
      debit: 0,
      credit: 1500.00
    },
    { 
      id: 2, 
      date: '2024-02-20',
      reference: 'FAC-2024-001',
      type: 'Facture',
      account: '602100',
      description: 'Achats matières premières',
      debit: 1250.00,
      credit: 0
    },
    { 
      id: 3, 
      date: '2024-02-20',
      reference: 'FAC-2024-001',
      type: 'Facture',
      account: '445660',
      description: 'TVA déductible',
      debit: 250.00,
      credit: 0
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Comptabilité</h1>
          <p className="text-muted-foreground">
            Consultez les écritures comptables des achats
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-4 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Rechercher une écriture..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Journal des achats</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>N° Pièce</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Compte</TableHead>
                <TableHead>Libellé</TableHead>
                <TableHead className="text-right">Débit</TableHead>
                <TableHead className="text-right">Crédit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.reference}</TableCell>
                  <TableCell>{entry.type}</TableCell>
                  <TableCell>{entry.account}</TableCell>
                  <TableCell>{entry.description}</TableCell>
                  <TableCell className="text-right">
                    {entry.debit > 0 ? entry.debit.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) : ''}
                  </TableCell>
                  <TableCell className="text-right">
                    {entry.credit > 0 ? entry.credit.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) : ''}
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

export default Accounting;
