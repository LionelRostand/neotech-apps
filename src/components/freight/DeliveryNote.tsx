
import React, { useRef } from 'react';
import { FreightOrder } from '@/types/freight';
import OrderQRCode from './OrderQRCode';
import toPDF from 'react-to-pdf';

interface DeliveryNoteProps {
  order: FreightOrder;
}

const DeliveryNote = ({ order }: DeliveryNoteProps) => {
  const targetRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (targetRef.current) {
      await toPDF(targetRef, {
        method: 'save',
        filename: `bon-livraison-${order.reference}.pdf`
      });
    }
  };

  return (
    <>
      <div ref={targetRef} className="p-8 max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">Bon de Livraison</h1>
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

        <div className="border-t border-gray-200 pt-4">
          <h3 className="font-semibold mb-4">Détails de la livraison</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Type de transport</p>
              <p>{order.transportType}</p>
            </div>
            <div>
              <p className="text-gray-600">Date de livraison prévue</p>
              <p>{new Date(order.deliveryDate).toLocaleDateString('fr-FR')}</p>
            </div>
          </div>
        </div>
      </div>
      {!targetRef.current && (
        <button onClick={handleDownload} className="hidden">
          Télécharger PDF
        </button>
      )}
    </>
  );
};

export default DeliveryNote;

