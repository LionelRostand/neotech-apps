
import { DeliveryStatus, PaymentTerm } from './sales';

export type SupplierStatus = 'active' | 'inactive' | 'blocked';
export type RFQStatus = 'draft' | 'sent' | 'received' | 'accepted' | 'rejected';
export type PurchaseOrderStatus = 'draft' | 'to_approve' | 'approved' | 'confirmed' | 'in_progress' | 'received' | 'cancelled';
export type ReceiptStatus = 'pending' | 'partial' | 'complete' | 'cancelled';
export type ReturnStatus = 'draft' | 'pending' | 'in_progress' | 'completed' | 'cancelled';
export type InvoiceStatus = 'draft' | 'to_validate' | 'validated' | 'paid' | 'cancelled';
export type ContractStatus = 'draft' | 'active' | 'expired' | 'terminated';

export interface PriceHistory {
  id?: string;
  productId: string;
  supplierId: string;
  price: number;
  startDate: Date;
  endDate?: Date;
  conditions?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Supplier {
  id?: string;
  code: string;
  name: string;
  vatNumber?: string;
  address: string;
  city: string;
  country: string;
  phone?: string;
  email?: string;
  website?: string;
  paymentTerm: PaymentTerm;
  currency: string;
  status: SupplierStatus;
  notes?: string;
  contacts: SupplierContact[];
  priceHistory?: PriceHistory[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SupplierContact {
  id?: string;
  supplierId: string;
  firstName: string;
  lastName: string;
  role?: string;
  email: string;
  phone?: string;
  isMain: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface RFQ {
  id?: string;
  number: string;
  supplierId: string;
  supplierName: string;
  status: RFQStatus;
  items: RFQItem[];
  deliveryDate?: Date;
  notes?: string;
  sentAt?: Date;
  receivedAt?: Date;
  validUntil?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface RFQItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice?: number;
  expectedPrice?: number;
  notes?: string;
}

export interface PurchaseOrder {
  id?: string;
  number: string;
  rfqId?: string;
  supplierId: string;
  supplierName: string;
  status: PurchaseOrderStatus;
  items: PurchaseOrderItem[];
  subtotal: number;
  taxTotal: number;
  total: number;
  paymentTerm: PaymentTerm;
  deliveryStatus: DeliveryStatus;
  deliveryAddress: string;
  deliveryDate?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PurchaseOrderItem {
  productId: string;
  productName: string;
  quantity: number;
  receivedQuantity: number;
  unitPrice: number;
  taxRate: number;
  total: number;
}

export interface Receipt {
  id?: string;
  number: string;
  purchaseOrderId: string;
  purchaseOrderNumber: string;
  supplierId: string;
  supplierName: string;
  status: ReceiptStatus;
  items: ReceiptItem[];
  receivedAt: Date;
  qualityCheck?: boolean;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReceiptItem {
  productId: string;
  productName: string;
  orderedQuantity: number;
  receivedQuantity: number;
  rejectedQuantity: number;
  notes?: string;
}

export interface Return {
  id?: string;
  number: string;
  receiptId?: string;
  supplierId: string;
  supplierName: string;
  status: ReturnStatus;
  items: ReturnItem[];
  returnReason: string;
  returnDate: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReturnItem {
  productId: string;
  productName: string;
  quantity: number;
  reason: string;
  notes?: string;
}

export interface Invoice {
  id?: string;
  number: string;
  purchaseOrderId: string;
  purchaseOrderNumber: string;
  supplierId: string;
  supplierName: string;
  status: InvoiceStatus;
  items: InvoiceItem[];
  subtotal: number;
  taxTotal: number;
  total: number;
  dueDate: Date;
  paymentTerm: PaymentTerm;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface InvoiceItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  total: number;
}

export interface Contract {
  id?: string;
  number: string;
  supplierId: string;
  supplierName: string;
  status: ContractStatus;
  startDate: Date;
  endDate: Date;
  terms: string;
  attachments?: string[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

