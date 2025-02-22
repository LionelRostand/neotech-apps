
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
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Plan Comptable</h1>
      <Card className="p-4">
        <div className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Libellé</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Solde</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.map((account) => (
                <TableRow key={account.code}>
                  <TableCell>{account.code}</TableCell>
                  <TableCell>{account.label}</TableCell>
                  <TableCell>{account.type}</TableCell>
                  <TableCell className="text-right">
                    {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(account.balance)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default AccountingChart;
