
import React from 'react';
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AccountingTreasury = () => {
  const movements = [
    { date: '2024-03-01', label: 'Paiement facture client', type: 'Encaissement', amount: 1200.00 },
    { date: '2024-03-02', label: 'Paiement fournisseur', type: 'Décaissement', amount: -850.00 },
    { date: '2024-03-03', label: 'Virement bancaire reçu', type: 'Encaissement', amount: 3000.00 }
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Trésorerie</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-2">Solde bancaire</h3>
          <p className="text-2xl font-bold text-green-600">3,350.00 €</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-2">Total encaissements</h3>
          <p className="text-2xl font-bold text-blue-600">4,200.00 €</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-2">Total décaissements</h3>
          <p className="text-2xl font-bold text-red-600">-850.00 €</p>
        </Card>
      </div>
      
      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">Mouvements de trésorerie</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Libellé</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Montant</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {movements.map((movement, index) => (
              <TableRow key={index}>
                <TableCell>{new Date(movement.date).toLocaleDateString('fr-FR')}</TableCell>
                <TableCell>{movement.label}</TableCell>
                <TableCell>{movement.type}</TableCell>
                <TableCell className={`text-right ${movement.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(movement.amount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default AccountingTreasury;
