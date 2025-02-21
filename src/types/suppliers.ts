
export type SupplierCategory = 'local' | 'international' | 'distributor' | 'manufacturer';

export interface Supplier {
  id: string;
  companyName: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  contacts: {
    phone: string;
    email: string;
    website?: string;
  };
  vatNumber: string;
  category: SupplierCategory;
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'inactive' | 'blocked';
}

export interface SupplierProduct {
  id: string;
  supplierId: string;
  name: string;
  reference: string;
  minOrderQuantity: number;
  leadTime: number; // en jours
  price: number;
  currency: string;
  lastUpdate: Date;
}
