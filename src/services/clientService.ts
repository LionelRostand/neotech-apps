
import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Client } from '../types/crm';

export const createClient = async (clientData: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const now = new Date();
    const docRef = await addDoc(collection(db, 'clients'), {
      ...clientData,
      createdAt: now,
      updatedAt: now
    });
    return docRef.id;
  } catch (error) {
    console.error('Erreur lors de la création du client:', error);
    throw error;
  }
};

export const getClients = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'clients'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Client[];
  } catch (error) {
    console.error('Erreur lors de la récupération des clients:', error);
    throw error;
  }
};

export const updateClient = async (id: string, updates: Partial<Client>) => {
  try {
    const clientRef = doc(db, 'clients', id);
    await updateDoc(clientRef, {
      ...updates,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du client:', error);
    throw error;
  }
};

export const deleteClient = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'clients', id));
  } catch (error) {
    console.error('Erreur lors de la suppression du client:', error);
    throw error;
  }
};
