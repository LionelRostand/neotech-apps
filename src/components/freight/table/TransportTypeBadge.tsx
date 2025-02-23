
import React from 'react';

interface TransportTypeBadgeProps {
  type: 'truck' | 'train' | 'ship' | 'plane';
}

const TransportTypeBadge = ({ type }: TransportTypeBadgeProps) => {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-800">
      {type}
    </span>
  );
};

export default TransportTypeBadge;
