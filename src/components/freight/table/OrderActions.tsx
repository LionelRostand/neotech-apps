
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import { Edit, Trash, FileText, Receipt, Check } from 'lucide-react';
import { FreightOrder } from '@/types/freight';
import DeliveryNote from '../DeliveryNote';
import Invoice from '../Invoice';
import NewOrderDialog from '../NewOrderDialog';

interface OrderActionsProps {
  order: FreightOrder;
  canManageOrders: boolean;
  onValidate: (order: FreightOrder) => void;
  onEdit: (order: FreightOrder) => void;
  onDelete: (id: string) => void;
  handlePrint: (content: React.ReactNode) => void;
  validateMutationPending: boolean;
}

const OrderActions = ({
  order,
  canManageOrders,
  onValidate,
  onEdit,
  onDelete,
  handlePrint,
  validateMutationPending
}: OrderActionsProps) => {
  return (
    <div className="flex items-center gap-2">
      {order.status !== 'completed' && canManageOrders && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => onValidate(order)}
          title="Valider"
          className="hover:bg-green-50 hover:text-green-600 hover:border-green-200"
          disabled={validateMutationPending}
        >
          <Check className="w-4 h-4" />
        </Button>
      )}

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

      {canManageOrders && (
        <>
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                title="Modifier"
                className="hover:bg-gray-50"
                onClick={() => onEdit(order)}
              >
                <Edit className="w-4 h-4 text-gray-600" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[800px] sm:w-[900px]">
              <SheetHeader>
                <SheetTitle>Modifier la commande</SheetTitle>
                <SheetDescription>
                  Référence: {order.reference}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-4">
                <NewOrderDialog isEditing order={order} onClose={() => onEdit(null)} />
              </div>
            </SheetContent>
          </Sheet>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => onDelete(order.id)}
            title="Supprimer"
            className="hover:bg-red-50 hover:text-red-600 hover:border-red-200"
          >
            <Trash className="w-4 h-4" />
          </Button>
        </>
      )}
    </div>
  );
};

export default OrderActions;
