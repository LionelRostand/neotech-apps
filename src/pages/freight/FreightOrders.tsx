
import React, { useState } from 'react';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const FreightOrders = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newOrder, setNewOrder] = useState({
    reference: '',
    client: '',
    carrier: '',
    deliveryDate: '',
    receptionDate: ''
  });

  const handleNewOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, vous pourriez ajouter la logique pour sauvegarder la commande
    console.log('Nouvelle commande:', newOrder);
    toast.success('Commande créée avec succès');
    setIsDialogOpen(false);
    setNewOrder({
      reference: '',
      client: '',
      carrier: '',
      deliveryDate: '',
      receptionDate: ''
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Commandes de Transport</h1>
          <p className="text-gray-500">Gérez vos commandes de transport et leurs statuts</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Nouvelle Commande
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Créer une nouvelle commande de transport</DialogTitle>
              <DialogDescription>
                Remplissez les informations pour créer une nouvelle commande de transport.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleNewOrder} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reference">Référence</Label>
                <Input
                  id="reference"
                  value={newOrder.reference}
                  onChange={(e) => setNewOrder({...newOrder, reference: e.target.value})}
                  placeholder="TR-XXX"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client">Client</Label>
                <Input
                  id="client"
                  value={newOrder.client}
                  onChange={(e) => setNewOrder({...newOrder, client: e.target.value})}
                  placeholder="Nom du client"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="carrier">Transporteur</Label>
                <Input
                  id="carrier"
                  value={newOrder.carrier}
                  onChange={(e) => setNewOrder({...newOrder, carrier: e.target.value})}
                  placeholder="Nom du transporteur"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="receptionDate">Date de réception</Label>
                <Input
                  id="receptionDate"
                  type="date"
                  value={newOrder.receptionDate}
                  onChange={(e) => setNewOrder({...newOrder, receptionDate: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deliveryDate">Date de livraison</Label>
                <Input
                  id="deliveryDate"
                  type="date"
                  value={newOrder.deliveryDate}
                  onChange={(e) => setNewOrder({...newOrder, deliveryDate: e.target.value})}
                  required
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Annuler
                </Button>
                <Button type="submit">
                  Créer la commande
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
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

