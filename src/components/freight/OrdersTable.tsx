
import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';

const OrdersTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Référence</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Transporteur</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead>Date Livraison</TableHead>
          <TableHead>Coût</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">TR-001</TableCell>
          <TableCell>Société ABC</TableCell>
          <TableCell>Transport Express</TableCell>
          <TableCell>Camion</TableCell>
          <TableCell>
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
              En cours
            </span>
          </TableCell>
          <TableCell>25/03/2024</TableCell>
          <TableCell>450€</TableCell>
          <TableCell className="flex gap-2">
            <Button variant="outline" size="icon">
              <Edit className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Trash className="w-4 h-4" />
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default OrdersTable;
