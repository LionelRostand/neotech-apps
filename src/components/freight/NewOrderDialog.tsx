
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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrder, updateOrder } from '@/services/orderService';
import { NewFreightOrder, FreightOrder } from '@/types/freight';

interface NewOrderProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  isEditing?: boolean;
  order?: FreightOrder;
  onClose?: () => void;
}

let lastReferenceNumber = 1;

const NewOrderDialog: React.FC<NewOrderProps> = ({ 
  isOpen, 
  onOpenChange, 
  isEditing = false, 
  order,
  onClose 
}) => {
  const queryClient = useQueryClient();
  const [newOrder, setNewOrder] = React.useState<Omit<NewFreightOrder, 'reference'>>({
    client: order?.client || '',
    carrier: order?.carrier || '',
    transportType: order?.transportType || 'truck',
    deliveryDate: order?.deliveryDate || '',
    receptionDate: order?.receptionDate || '',
    cost: order?.cost || 0
  });

  const generateReference = () => {
    const referenceNumber = String(lastReferenceNumber).padStart(3, '0');
    lastReferenceNumber += 1;
    return `TR-${referenceNumber}`;
  };

  const mutation = useMutation({
    mutationFn: async (data: NewFreightOrder | FreightOrder) => {
      if (isEditing && order) {
        await updateOrder(order.id, data);
      } else {
        await createOrder(data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['freight-orders'] });
      toast.success(isEditing ? 'Commande modifiée avec succès' : 'Commande créée avec succès');
      if (onOpenChange) onOpenChange(false);
      if (onClose) onClose();
      setNewOrder({
        client: '',
        carrier: '',
        transportType: 'truck',
        deliveryDate: '',
        receptionDate: '',
        cost: 0
      });
    },
    onError: (error) => {
      console.error('Error creating/updating order:', error);
      toast.error(isEditing ? 'Erreur lors de la modification de la commande' : 'Erreur lors de la création de la commande');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderData = isEditing && order 
      ? { ...order, ...newOrder }
      : { ...newOrder, reference: generateReference() };
    mutation.mutate(orderData);
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
          <DialogTitle>{isEditing ? 'Modifier la commande' : 'Créer une nouvelle commande de transport'}</DialogTitle>
          <DialogDescription>
            {isEditing 
              ? 'Modifiez les informations de la commande de transport.'
              : 'Remplissez les informations pour créer une nouvelle commande de transport. La référence sera générée automatiquement.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
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
                onValueChange={(value: 'truck' | 'train' | 'ship' | 'plane') => 
                  setNewOrder({...newOrder, transportType: value})}
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
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                if (onOpenChange) onOpenChange(false);
                if (onClose) onClose();
              }}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? 'Enregistrement...' : (isEditing ? 'Modifier' : 'Créer')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewOrderDialog;

