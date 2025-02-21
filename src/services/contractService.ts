
import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Contract } from '../types/crm';

export const createContract = async (contractData: Omit<Contract, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const now = new Date();
    const docRef = await addDoc(collection(db, 'contracts'), {
      ...contractData,
      createdAt: now,
      updatedAt: now
    });
    return docRef.id;
  } catch (error) {
    console.error('Erreur lors de la création du contrat:', error);
    throw error;
  }
};

export const getContracts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'contracts'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Contract[];
  } catch (error) {
    console.error('Erreur lors de la récupération des contrats:', error);
    throw error;
  }
};

export const updateContract = async (id: string, updates: Partial<Contract>) => {
  try {
    const contractRef = doc(db, 'contracts', id);
    await updateDoc(contractRef, {
      ...updates,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du contrat:', error);
    throw error;
  }
};

export const deleteContract = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'contracts', id));
  } catch (error) {
    console.error('Erreur lors de la suppression du contrat:', error);
    throw error;
  }
};
