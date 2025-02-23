
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { FreightOrder, NewFreightOrder } from '@/types/freight';

const COLLECTION = 'freight_orders';

export const fetchOrders = async (): Promise<FreightOrder[]> => {
  const querySnapshot = await getDocs(collection(db, COLLECTION));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as FreightOrder[];
};

export const createOrder = async (order: NewFreightOrder): Promise<FreightOrder> => {
  const now = new Date().toISOString();
  const orderData = {
    ...order,
    status: 'pending',
    createdAt: now,
    updatedAt: now,
  };

  const docRef = await addDoc(collection(db, COLLECTION), orderData);
  return {
    id: docRef.id,
    ...orderData,
  } as FreightOrder;
};

export const deleteOrder = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, COLLECTION, id));
};

export const updateOrder = async (id: string, order: Partial<FreightOrder>): Promise<void> => {
  const updatedOrder = {
    ...order,
    updatedAt: new Date().toISOString(),
  };
  await updateDoc(doc(db, COLLECTION, id), updatedOrder);
};
