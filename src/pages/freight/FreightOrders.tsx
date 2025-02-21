
import React from 'react';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash } from 'lucide-react';

const FreightOrders = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Commandes de Transport</h1>
          <p className="text-gray-500">Gérez vos commandes de transport et leurs statuts</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nouvelle Commande
        </Button>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Référence</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Transporteur</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Date Livraison</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">TR-001</TableCell>
            <TableCell>Société ABC</TableCell>
            <TableCell>Transport Express</TableCell>
            <TableCell>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                En cours
              </span>
            </TableCell>
            <TableCell>25/03/2024</TableCell>
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
    </div>
  );
};

export default FreightOrders;
