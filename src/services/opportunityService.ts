
import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Opportunity } from '../types/crm';

export const createOpportunity = async (opportunityData: Omit<Opportunity, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const now = new Date();
    const docRef = await addDoc(collection(db, 'opportunities'), {
      ...opportunityData,
      createdAt: now,
      updatedAt: now
    });
    return docRef.id;
  } catch (error) {
    console.error('Erreur lors de la création de l\'opportunité:', error);
    throw error;
  }
};

export const getOpportunities = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'opportunities'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Opportunity[];
  } catch (error) {
    console.error('Erreur lors de la récupération des opportunités:', error);
    throw error;
  }
};

export const updateOpportunity = async (id: string, updates: Partial<Opportunity>) => {
  try {
    const opportunityRef = doc(db, 'opportunities', id);
    await updateDoc(opportunityRef, {
      ...updates,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'opportunité:', error);
    throw error;
  }
};

export const deleteOpportunity = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'opportunities', id));
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'opportunité:', error);
    throw error;
  }
};
