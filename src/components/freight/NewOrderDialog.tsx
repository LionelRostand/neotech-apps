
import React from 'react';
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
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { toast } from "sonner";
import FreightCalculator from './FreightCalculator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NewOrderProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

// Simulation d'une base de données pour le dernier numéro de référence
let lastReferenceNumber = 1;

const NewOrderDialog = ({ isOpen, onOpenChange }: NewOrderProps) => {
  const [newOrder, setNewOrder] = React.useState({
    reference: '',
    client: '',
    carrier: '',
    transportType: '',
    deliveryDate: '',
    receptionDate: '',
    cost: 0
  });

  const generateReference = () => {
    const referenceNumber = String(lastReferenceNumber).padStart(3, '0');
    lastReferenceNumber += 1;
    return `TR-${referenceNumber}`;
  };

  const handleNewOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orderWithReference = {
      ...newOrder,
      reference: generateReference()
    };
    console.log('Nouvelle commande:', orderWithReference);
    toast.success('Commande créée avec succès');
    onOpenChange(false);
    setNewOrder({
      reference: '',
      client: '',
      carrier: '',
      transportType: '',
      deliveryDate: '',
      receptionDate: '',
      cost: 0
    });
  };

  const handleCalculatedCost = (cost: number) => {
    setNewOrder(prev => ({ ...prev, cost }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nouvelle Commande
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Créer une nouvelle commande de transport</DialogTitle>
          <DialogDescription>
            Remplissez les informations pour créer une nouvelle commande de transport.
            La référence sera générée automatiquement.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleNewOrder} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <Label htmlFor="transportType">Type de Transport</Label>
              <Select
                value={newOrder.transportType}
                onValueChange={(value) => setNewOrder({...newOrder, transportType: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un type de transport" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="truck">Camion</SelectItem>
                  <SelectItem value="train">Train</SelectItem>
                  <SelectItem value="ship">Bateau</SelectItem>
                  <SelectItem value="plane">Avion</SelectItem>
                </SelectContent>
              </Select>
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
          </div>

          <FreightCalculator onCalculate={handleCalculatedCost} />

          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">
              Créer la commande
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewOrderDialog;
