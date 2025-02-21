
import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { Quote } from '../types/sales';

export const createQuote = async (quoteData: Omit<Quote, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const now = new Date();
    const docRef = await addDoc(collection(db, 'quotes'), {
      ...quoteData,
      createdAt: now,
      updatedAt: now
    });
    return docRef.id;
  } catch (error) {
    console.error('Erreur lors de la création du devis:', error);
    throw error;
  }
};

export const getQuotes = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'quotes'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Quote[];
  } catch (error) {
    console.error('Erreur lors de la récupération des devis:', error);
    throw error;
  }
};

export const updateQuote = async (id: string, updates: Partial<Quote>) => {
  try {
    const quoteRef = doc(db, 'quotes', id);
    await updateDoc(quoteRef, {
      ...updates,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du devis:', error);
    throw error;
  }
};

export const deleteQuote = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'quotes', id));
  } catch (error) {
    console.error('Erreur lors de la suppression du devis:', error);
    throw error;
  }
};

export const getQuotesByClient = async (clientId: string) => {
  try {
    const q = query(collection(db, 'quotes'), where('clientId', '==', clientId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Quote[];
  } catch (error) {
    console.error('Erreur lors de la récupération des devis du client:', error);
    throw error;
  }
};
