
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FileText, Receipt } from 'lucide-react';
import { FreightOrder } from '@/types/freight';
import DeliveryNote from './DeliveryNote';
import Invoice from './Invoice';

interface DocumentViewerProps {
  order: FreightOrder;
}

const DocumentViewer = ({ order }: DocumentViewerProps) => {
  const triggerPdfDownload = () => {
    const downloadButton = document.querySelector('button.hidden') as HTMLButtonElement;
    if (downloadButton) {
      downloadButton.click();
    }
  };

  return (
    <div className="flex gap-2">
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
              <Button onClick={triggerPdfDownload}>
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
              <Button onClick={triggerPdfDownload}>
                Imprimer
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default DocumentViewer;
