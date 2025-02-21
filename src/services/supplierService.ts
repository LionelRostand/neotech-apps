
import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Supplier, SupplierProduct } from '../types/suppliers';

const SUPPLIERS_COLLECTION = 'suppliers';
const SUPPLIER_PRODUCTS_COLLECTION = 'supplier_products';

export const createSupplier = async (supplierData: Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const now = new Date();
    const docRef = await addDoc(collection(db, SUPPLIERS_COLLECTION), {
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

export const getSuppliers = async (): Promise<Supplier[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, SUPPLIERS_COLLECTION));
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
    const supplierRef = doc(db, SUPPLIERS_COLLECTION, id);
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
    await deleteDoc(doc(db, SUPPLIERS_COLLECTION, id));
  } catch (error) {
    console.error('Erreur lors de la suppression du fournisseur:', error);
    throw error;
  }
};

export const addSupplierProduct = async (productData: Omit<SupplierProduct, 'id' | 'lastUpdate'>) => {
  try {
    const docRef = await addDoc(collection(db, SUPPLIER_PRODUCTS_COLLECTION), {
      ...productData,
      lastUpdate: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Erreur lors de l\'ajout du produit fournisseur:', error);
    throw error;
  }
};

export const getSupplierProducts = async (supplierId: string): Promise<SupplierProduct[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, SUPPLIER_PRODUCTS_COLLECTION));
    return querySnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      .filter(product => product.supplierId === supplierId) as SupplierProduct[];
  } catch (error) {
    console.error('Erreur lors de la récupération des produits fournisseur:', error);
    throw error;
  }
};
