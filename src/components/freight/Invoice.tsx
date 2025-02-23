
import React, { useRef } from 'react';
import { FreightOrder } from '@/types/freight';
import OrderQRCode from './OrderQRCode';
import toPDF from 'react-to-pdf';

interface InvoiceProps {
  order: FreightOrder;
}

const Invoice = ({ order }: InvoiceProps) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const TVA = 0.20; // 20% TVA
  const montantTVA = order.cost * TVA;
  const total = order.cost + montantTVA;

  const handleDownload = async () => {
    if (targetRef.current) {
      await toPDF(targetRef, {
        method: 'save',
        filename: `facture-${order.reference}.pdf`
      });
    }
  };

  return (
    <>
      <div ref={targetRef} className="p-8 max-w-4xl mx-auto bg-white">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">Facture</h1>
            <p className="text-gray-600">Référence: {order.reference}</p>
            <p className="text-gray-600">Date: {new Date(order.createdAt).toLocaleDateString('fr-FR')}</p>
          </div>
          <OrderQRCode order={order} />
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-2">Client</h3>
            <p>{order.client}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Transporteur</h3>
            <p>{order.carrier}</p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 mb-8">
          <h3 className="font-semibold mb-4">Détails de la prestation</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Transport - {order.transportType}</span>
              <span>{order.cost.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>TVA ({(TVA * 100)}%)</span>
              <span>{montantTVA.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t">
              <span>Total TTC</span>
              <span>{total.toFixed(2)}€</span>
            </div>
          </div>
        </div>
      </div>
      <button onClick={handleDownload} className="hidden print:hidden">
        Télécharger PDF
      </button>
    </>
  );
};

export default Invoice;

