
import { toast } from "sonner";

export interface ParcelData {
  id: string;
  trackingNumber: string;
  status: 'pending' | 'in_transit' | 'delivered' | 'cancelled';
  origin: string;
  destination: string;
  clientId?: string;
  purchaseOrderId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Simuler une base de données en mémoire
let parcels: ParcelData[] = [];

export const scanParcel = async (code: string): Promise<ParcelData | null> => {
  // Simuler une recherche dans la base de données
  const parcel = parcels.find(p => p.trackingNumber === code);
  
  if (parcel) {
    toast.success(`Colis trouvé: ${parcel.trackingNumber}`);
    return parcel;
  }
  
  // Créer un nouveau colis si le code n'existe pas
  const newParcel: ParcelData = {
    id: Math.random().toString(36).substring(7),
    trackingNumber: code,
    status: 'pending',
    origin: 'Entrepôt principal',
    destination: 'En attente',
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  parcels.push(newParcel);
  toast.success(`Nouveau colis enregistré: ${code}`);
  return newParcel;
};

export const linkParcelToOrder = async (parcelId: string, purchaseOrderId: string) => {
  const parcel = parcels.find(p => p.id === parcelId);
  if (parcel) {
    parcel.purchaseOrderId = purchaseOrderId;
    parcel.updatedAt = new Date();
    return parcel;
  }
  return null;
};

export const linkParcelToClient = async (parcelId: string, clientId: string) => {
  const parcel = parcels.find(p => p.id === parcelId);
  if (parcel) {
    parcel.clientId = clientId;
    parcel.updatedAt = new Date();
    return parcel;
  }
  return null;
};
