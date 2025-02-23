
export interface FreightOrder {
  id: string;
  reference: string;
  client: string;
  carrier: string;
  transportType: 'truck' | 'train' | 'ship' | 'plane';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  deliveryDate: string;
  receptionDate: string;
  cost: number;
  createdAt: string;
  updatedAt: string;
}

export type NewFreightOrder = Omit<FreightOrder, 'id' | 'status' | 'createdAt' | 'updatedAt'>;
