
import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash, FileText, Receipt } from 'lucide-react';
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
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-800">
                  {order.transportType}
                </span>
              </TableCell>
              <TableCell>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  order.status === 'completed' ? 'bg-green-50 text-green-800' :
                  order.status === 'in_progress' ? 'bg-yellow-50 text-yellow-800' :
                  order.status === 'cancelled' ? 'bg-red-50 text-red-800' :
                  'bg-gray-50 text-gray-800'
                }`}>
                  {order.status === 'pending' ? 'En attente' :
                   order.status === 'in_progress' ? 'En cours' :
                   order.status === 'completed' ? 'Terminé' :
                   'Annulé'}
                </span>
              </TableCell>
              <TableCell className="text-gray-600">
                {new Date(order.deliveryDate).toLocaleDateString('fr-FR')}
              </TableCell>
              <TableCell className="font-semibold text-gray-900">
                {order.cost.toLocaleString('fr-FR')}€
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon"
                        title="Bon de livraison"
                        className="hover:bg-gray-50"
                      >
                        <FileText className="w-4 h-4 text-gray-600" />
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
                      <Button 
                        variant="outline" 
                        size="icon"
                        title="Facture"
                        className="hover:bg-gray-50"
                      >
                        <Receipt className="w-4 h-4 text-gray-600" />
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

                  <Button 
                    variant="outline" 
                    size="icon" 
                    title="Modifier"
                    className="hover:bg-gray-50"
                  >
                    <Edit className="w-4 h-4 text-gray-600" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => deleteMutation.mutate(order.id)}
                    title="Supprimer"
                    className="hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersTable;

