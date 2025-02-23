
import React from 'react';
import { QRCode } from 'qrcode.react';
import { FreightOrder } from '@/types/freight';

interface OrderQRCodeProps {
  order: FreightOrder;
  size?: number;
}

const OrderQRCode = ({ order, size = 128 }: OrderQRCodeProps) => {
  const qrData = JSON.stringify({
    id: order.id,
    reference: order.reference,
    status: order.status
  });

  return (
    <div className="flex flex-col items-center gap-2">
      <QRCode value={qrData} size={size} />
      <span className="text-sm text-gray-500">{order.reference}</span>
    </div>
  );
};

export default OrderQRCode;

