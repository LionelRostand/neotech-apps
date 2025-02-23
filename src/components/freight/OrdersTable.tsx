
import React, { useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchOrders, deleteOrder, updateOrder } from '@/services/orderService';
import { createFreightJournalEntries } from '@/services/journalService';
import { toast } from "sonner";
import { FreightOrder } from '@/types/freight';
import { usePermissions } from '@/hooks/usePermissions';
import OrderStatusBadge from './table/OrderStatusBadge';
import TransportTypeBadge from './table/TransportTypeBadge';
import OrderActions from './table/OrderActions';

const OrdersTable = () => {
  const queryClient = useQueryClient();
  const { role } = usePermissions();
  const canManageOrders = role === 'admin' || role === 'manager';
  const [editingOrder, setEditingOrder] = useState<FreightOrder | null>(null);

  const { data: orders = [], isLoading, error } = useQuery({
    queryKey: ['freight-orders'],
    queryFn: fetchOrders,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['freight-orders'] });
      toast.success('Commande supprimée avec succès');
    },
    onError: (error) => {
      console.error('Error deleting order:', error);
      toast.error('Erreur lors de la suppression de la commande');
    },
  });

  const validateMutation = useMutation({
    mutationFn: async (order: FreightOrder) => {
      if (!canManageOrders) {
        throw new Error("Vous n'avez pas les permissions nécessaires");
      }
      await updateOrder(order.id, { status: 'completed' });
      await createFreightJournalEntries(order);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['freight-orders'] });
      toast.success('Commande validée et écritures comptables créées');
    },
    onError: (error) => {
      console.error('Error validating order:', error);
      toast.error('Erreur lors de la validation de la commande');
    },
  });

  const handleEdit = (order: FreightOrder) => {
    if (!canManageOrders) {
      toast.error("Vous n'avez pas les permissions nécessaires");
      return;
    }
    setEditingOrder(order);
  };

  const handlePrint = (content: React.ReactNode) => {
    const timer = setTimeout(() => {
      const downloadButton = document.querySelector('button[class="hidden"]') as HTMLButtonElement;
      if (downloadButton) {
        downloadButton.click();
      }
    }, 100);

    return () => clearTimeout(timer);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-8 text-red-500">
        Erreur lors du chargement des commandes. Veuillez réessayer.
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="text-center p-8 text-gray-500">
        Aucune commande trouvée
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border animate-fade-in">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold text-gray-600">Référence</TableHead>
            <TableHead className="font-semibold text-gray-600">Client</TableHead>
            <TableHead className="font-semibold text-gray-600">Transporteur</TableHead>
            <TableHead className="font-semibold text-gray-600">Type</TableHead>
            <TableHead className="font-semibold text-gray-600">Statut</TableHead>
            <TableHead className="font-semibold text-gray-600">Date Livraison</TableHead>
            <TableHead className="font-semibold text-gray-600">Coût</TableHead>
            <TableHead className="font-semibold text-gray-600">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order: FreightOrder) => (
            <TableRow 
              key={order.id}
              className="hover:bg-gray-50 transition-colors duration-150 ease-in-out"
            >
              <TableCell className="font-medium text-primary">
                {order.reference}
              </TableCell>
              <TableCell>{order.client}</TableCell>
              <TableCell>{order.carrier}</TableCell>
              <TableCell>
                <TransportTypeBadge type={order.transportType} />
              </TableCell>
              <TableCell>
                <OrderStatusBadge status={order.status} />
              </TableCell>
              <TableCell className="text-gray-600">
                {new Date(order.deliveryDate).toLocaleDateString('fr-FR')}
              </TableCell>
              <TableCell className="font-semibold text-gray-900">
                {typeof order.cost === 'number' ? `${order.cost.toLocaleString('fr-FR')}€` : 'N/A'}
              </TableCell>
              <TableCell>
                <OrderActions
                  order={order}
                  canManageOrders={canManageOrders}
                  onValidate={(order) => validateMutation.mutate(order)}
                  onEdit={handleEdit}
                  onDelete={(id) => deleteMutation.mutate(id)}
                  handlePrint={handlePrint}
                  validateMutationPending={validateMutation.isPending}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersTable;
