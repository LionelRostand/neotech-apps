
import { db } from '../lib/firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy
} from 'firebase/firestore';

export interface Client {
  id?: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: 'Client' | 'Prospect' | 'Lead';
  category?: string;
  industry?: string;
  score?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Opportunity {
  id?: string;
  title: string;
  clientId: string;
  clientName: string;
  value: number;
  stage: 'Qualification' | 'Proposition' | 'Négociation' | 'Gagné' | 'Perdu';
  assignedTo?: string;
  expectedCloseDate?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Contract {
  id?: string;
  title: string;
  clientId: string;
  clientName: string;
  status: 'En cours' | 'Signé' | 'Expiré';
  startDate: Date;
  endDate: Date;
  value: number;
  documents?: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Gestion des clients
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

// Gestion des opportunités
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

// Gestion des contrats
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
