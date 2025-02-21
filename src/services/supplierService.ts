
import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { Supplier, SupplierContact, PriceHistory } from '../types/purchases';

export const createSupplier = async (supplierData: Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const now = new Date();
    const docRef = await addDoc(collection(db, 'suppliers'), {
      ...supplierData,
      createdAt: now,
      updatedAt: now
    });
    return docRef.id;
  } catch (error) {
    console.error('Erreur lors de la création du fournisseur:', error);
    throw error;
  }
};

export const getSuppliers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'suppliers'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Supplier[];
  } catch (error) {
    console.error('Erreur lors de la récupération des fournisseurs:', error);
    throw error;
  }
};

export const updateSupplier = async (id: string, updates: Partial<Supplier>) => {
  try {
    const supplierRef = doc(db, 'suppliers', id);
    await updateDoc(supplierRef, {
      ...updates,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du fournisseur:', error);
    throw error;
  }
};

export const deleteSupplier = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'suppliers', id));
  } catch (error) {
    console.error('Erreur lors de la suppression du fournisseur:', error);
    throw error;
  }
};

export const getSupplierContacts = async (supplierId: string) => {
  try {
    const q = query(collection(db, 'supplier_contacts'), where('supplierId', '==', supplierId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as SupplierContact[];
  } catch (error) {
    console.error('Erreur lors de la récupération des contacts:', error);
    throw error;
  }
};

export const getPriceHistory = async (supplierId: string, productId: string) => {
  try {
    const q = query(
      collection(db, 'price_history'),
      where('supplierId', '==', supplierId),
      where('productId', '==', productId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as PriceHistory[];
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'historique des prix:', error);
    throw error;
  }
};

