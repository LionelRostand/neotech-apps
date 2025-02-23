
import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash, FileText, Receipt, QrCode } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchOrders, deleteOrder } from '@/services/orderService';
import { toast } from "sonner";
import { FreightOrder } from '@/types/freight';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import DeliveryNote from './DeliveryNote';
import Invoice from './Invoice';

const OrdersTable = () => {
  const queryClient = useQueryClient();

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    console.error('Error in OrdersTable:', error);
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

  const handlePrint = (content: React.ReactNode) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Impression</title>
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          </head>
          <body>
            <div id="print-content">
              ${content}
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

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
        {orders.map((order: FreightOrder) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.reference}</TableCell>
            <TableCell>{order.client}</TableCell>
            <TableCell>{order.carrier}</TableCell>
            <TableCell>{order.transportType}</TableCell>
            <TableCell>
              <span className={`px-2 py-1 rounded-full text-sm ${
                order.status === 'completed' ? 'bg-green-100 text-green-800' :
                order.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {order.status === 'pending' ? 'En attente' :
                 order.status === 'in_progress' ? 'En cours' :
                 order.status === 'completed' ? 'Terminé' :
                 'Annulé'}
              </span>
            </TableCell>
            <TableCell>{new Date(order.deliveryDate).toLocaleDateString('fr-FR')}</TableCell>
            <TableCell>{order.cost}€</TableCell>
            <TableCell className="flex gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" title="Bon de livraison">
                    <FileText className="w-4 h-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[800px] sm:w-[900px]">
                  <SheetHeader>
                    <SheetTitle>Bon de livraison</SheetTitle>
                    <SheetDescription>
                      Référence: {order.reference}
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-4">
                    <DeliveryNote order={order} />
                    <div className="flex justify-end mt-4">
                      <Button onClick={() => handlePrint(<DeliveryNote order={order} />)}>
                        Imprimer
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" title="Facture">
                    <Receipt className="w-4 h-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[800px] sm:w-[900px]">
                  <SheetHeader>
                    <SheetTitle>Facture</SheetTitle>
                    <SheetDescription>
                      Référence: {order.reference}
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-4">
                    <Invoice order={order} />
                    <div className="flex justify-end mt-4">
                      <Button onClick={() => handlePrint(<Invoice order={order} />)}>
                        Imprimer
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <Button variant="outline" size="icon" title="Modifier">
                <Edit className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => deleteMutation.mutate(order.id)}
                title="Supprimer"
              >
                <Trash className="w-4 h-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrdersTable;
