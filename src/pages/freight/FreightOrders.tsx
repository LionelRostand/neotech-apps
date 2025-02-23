
import React, { useState } from 'react';
import OrdersTable from '@/components/freight/OrdersTable';
import NewOrderDialog from '@/components/freight/NewOrderDialog';

const FreightOrders = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Commandes de Transport</h1>
          <p className="text-gray-500">Gérez vos commandes de transport et leurs statuts</p>
        </div>
        <NewOrderDialog 
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />
      </div>
      
      <OrdersTable />
    </div>
  );
};

export default FreightOrders;
