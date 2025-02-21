
export type PaymentTerm = 'immediate' | '30_days' | '60_days';
export type DeliveryStatus = 'pending' | 'in_progress' | 'delivered';
export type OrderStatus = 'draft' | 'confirmed' | 'shipped' | 'completed' | 'cancelled';
export type QuoteStatus = 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';

export interface Product {
  id?: string;
  name: string;
  description?: string;
  price: number;
  taxRate: number;
  unit: string;
  inStock: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuoteItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  discount?: number;
  total: number;
}

export interface Quote {
  id?: string;
  number: string;
  clientId: string;
  clientName: string;
  status: QuoteStatus;
  items: QuoteItem[];
  subtotal: number;
  taxTotal: number;
  discount?: number;
  total: number;
  validUntil: Date;
  notes?: string;
  template?: string;
  signatureUrl?: string;
  sentAt?: Date;
  viewedAt?: Date;
  acceptedAt?: Date;
  rejectedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id?: string;
  number: string;
  quoteId?: string;
  clientId: string;
  clientName: string;
  status: OrderStatus;
  items: QuoteItem[];
  subtotal: number;
  taxTotal: number;
  discount?: number;
  total: number;
  paymentTerm: PaymentTerm;
  deliveryStatus: DeliveryStatus;
  deliveryAddress: string;
  deliveryDate?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
