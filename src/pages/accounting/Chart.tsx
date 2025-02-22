
import React from 'react';
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AccountingChart = () => {
  const accounts = [
    { code: '101000', label: 'Capital', type: 'Passif', balance: 0 },
    { code: '411000', label: 'Clients', type: 'Actif', balance: 0 },
    { code: '445660', label: 'TVA déductible', type: 'Actif', balance: 0 },
    { code: '512000', label: 'Banque', type: 'Actif', balance: 0 },
    { code: '607000', label: 'Achats de marchandises', type: 'Charge', balance: 0 },
    { code: '707000', label: 'Ventes de marchandises', type: 'Produit', balance: 0 },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Plan Comptable</h2>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Code</TableHead>
              <TableHead className="font-semibold">Libellé</TableHead>
              <TableHead className="font-semibold">Type</TableHead>
              <TableHead className="font-semibold text-right">Solde</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.map((account) => (
              <TableRow key={account.code} className="hover:bg-muted/50">
                <TableCell className="font-mono">{account.code}</TableCell>
                <TableCell>{account.label}</TableCell>
                <TableCell>{account.type}</TableCell>
                <TableCell className="text-right font-mono">
                  {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(account.balance)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AccountingChart;
