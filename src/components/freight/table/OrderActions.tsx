
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import { Edit, Trash, Check } from 'lucide-react';
import { FreightOrder } from '@/types/freight';
import NewOrderDialog from '../NewOrderDialog';
import DocumentViewer from '../DocumentViewer';

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

      <DocumentViewer order={order} />

      {canManageOrders && (
        <>
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                title="Modifier"
                className="hover:bg-gray-50"
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
