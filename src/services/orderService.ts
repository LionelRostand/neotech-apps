import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { FreightOrder, NewFreightOrder } from '@/types/freight';

const COLLECTION = 'freight_orders';

export const fetchOrders = async (): Promise<FreightOrder[]> => {
  try {
    // Vérifier si db est correctement initialisé
    if (!db) {
      console.error('Firestore not initialized');
      throw new Error('Database not initialized');
    }

    // Tenter d'accéder à la collection
    const ordersCollection = collection(db, COLLECTION);
    console.log('Attempting to fetch orders from collection:', COLLECTION);

    const querySnapshot = await getDocs(ordersCollection);
    console.log('Query executed, documents count:', querySnapshot.size);

    // Mapper les documents avec plus de validation
    const orders = querySnapshot.docs.map(doc => {
      const data = doc.data();
      console.log('Document data:', { id: doc.id, ...data });
      return {
        id: doc.id,
        ...data
      } as FreightOrder;
    });

    return orders;
  } catch (error: any) {
    // Log plus détaillé de l'erreur
    console.error('Detailed error while fetching orders:', {
      error: error,
      message: error.message,
      code: error.code,
      name: error.name
    });
    throw new Error(`Erreur lors de la récupération des commandes: ${error.message}`);
  }
};

export const createOrder = async (order: NewFreightOrder): Promise<FreightOrder> => {
  const now = new Date().toISOString();
  const orderData = {
    ...order,
    status: 'pending',
    createdAt: now,
    updatedAt: now,
  };

  try {
    const docRef = await addDoc(collection(db, COLLECTION), orderData);
    console.log('Order created with ID:', docRef.id);
    return {
      id: docRef.id,
      ...orderData,
    } as FreightOrder;
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Erreur lors de la création de la commande');
  }
};

export const deleteOrder = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, COLLECTION, id));
    console.log('Order deleted:', id);
  } catch (error) {
    console.error('Error deleting order:', error);
    throw new Error('Erreur lors de la suppression de la commande');
  }
};

export const updateOrder = async (id: string, order: Partial<FreightOrder>): Promise<void> => {
  const updatedOrder = {
    ...order,
    updatedAt: new Date().toISOString(),
  };
  try {
    await updateDoc(doc(db, COLLECTION, id), updatedOrder);
    console.log('Order updated:', id);
  } catch (error) {
    console.error('Error updating order:', error);
    throw new Error('Erreur lors de la mise à jour de la commande');
  }
};
