
import React from 'react';

interface OrderStatusBadgeProps {
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
}

const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 text-green-800';
      case 'in_progress':
        return 'bg-yellow-50 text-yellow-800';
      case 'cancelled':
        return 'bg-red-50 text-red-800';
      default:
        return 'bg-gray-50 text-gray-800';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'in_progress':
        return 'En cours';
      case 'completed':
        return 'Terminé';
      case 'cancelled':
        return 'Annulé';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles()}`}>
      {getStatusText()}
    </span>
  );
};

export default OrderStatusBadge;
