
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { FreightOrder } from '@/types/freight';

interface JournalEntry {
  date: string;
  accountNumber: string;
  label: string;
  debit: number;
  credit: number;
  journal: string;
}

export const createFreightJournalEntries = async (order: FreightOrder) => {
  try {
    if (!db) throw new Error('Database not initialized');

    const journalEntries: JournalEntry[] = [
      // Débit client
      {
        date: new Date().toISOString(),
        accountNumber: '411',
        label: `Transport ${order.reference}`,
        debit: order.cost,
        credit: 0,
        journal: 'VE'
      },
      // Crédit compte de produit
      {
        date: new Date().toISOString(),
        accountNumber: '706',
        label: `Transport ${order.reference}`,
        debit: 0,
        credit: order.cost * 0.8, // HT (80% du TTC)
        journal: 'VE'
      },
      // Crédit TVA
      {
        date: new Date().toISOString(),
        accountNumber: '44571',
        label: `TVA Transport ${order.reference}`,
        debit: 0,
        credit: order.cost * 0.2, // TVA (20% du TTC)
        journal: 'VE'
      }
    ];

    const entriesCollection = collection(db, 'journal_entries');
    const promises = journalEntries.map(entry => addDoc(entriesCollection, entry));
    await Promise.all(promises);

    console.log('Journal entries created for order:', order.reference);
  } catch (error) {
    console.error('Error creating journal entries:', error);
    throw new Error('Erreur lors de la création des écritures comptables');
  }
};
