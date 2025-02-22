
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, FileText } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface JournalEntry {
  id: string;
  date: string;
  accountNumber: string;
  label: string;
  debit: number;
  credit: number;
  journal: string;
}

const initialEntries: JournalEntry[] = [
  {
    id: '1',
    date: '2024-02-10',
    accountNumber: '411',
    label: 'Facture client ABC',
    debit: 1200.00,
    credit: 0,
    journal: 'VE'
  },
  {
    id: '2',
    date: '2024-02-10',
    accountNumber: '707',
    label: 'Facture client ABC',
    debit: 0,
    credit: 1000.00,
    journal: 'VE'
  },
  {
    id: '3',
    date: '2024-02-10',
    accountNumber: '445',
    label: 'TVA sur facture ABC',
    debit: 0,
    credit: 200.00,
    journal: 'VE'
  },
];

const AccountingJournals = () => {
  const [entries] = useState<JournalEntry[]>(initialEntries);
  const { toast } = useToast();

  const handleNewEntry = () => {
    toast({
      title: "Nouvelle écriture",
      description: "L'ajout d'une nouvelle écriture a été initié",
    });
  };

  const journals = [
    { code: 'AC', name: 'Achats' },
    { code: 'VE', name: 'Ventes' },
    { code: 'BQ', name: 'Banque' },
    { code: 'OD', name: 'Opérations Diverses' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Journaux Comptables</h2>
        <Button onClick={handleNewEntry} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nouvelle Écriture
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {journals.map((journal) => (
          <div key={journal.code} className="p-4 border rounded-lg bg-white">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">{journal.name}</h3>
              <FileText className="w-4 h-4 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500">Journal {journal.code}</p>
          </div>
        ))}
      </div>

      <div className="border rounded-lg bg-white overflow-hidden">
        <div className="p-4 border-b bg-gray-50">
          <h3 className="font-medium">Dernières Écritures</h3>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Journal</TableHead>
                <TableHead>N° Compte</TableHead>
                <TableHead>Libellé</TableHead>
                <TableHead className="text-right">Débit</TableHead>
                <TableHead className="text-right">Crédit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.journal}</TableCell>
                  <TableCell>{entry.accountNumber}</TableCell>
                  <TableCell>{entry.label}</TableCell>
                  <TableCell className="text-right">
                    {entry.debit > 0 ? entry.debit.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    {entry.credit > 0 ? entry.credit.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) : '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AccountingJournals;
