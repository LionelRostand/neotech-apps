
export type ClientStatus = 'Prospect' | 'Actif' | 'Inactif';
export type ClientPriority = 'Basse' | 'Moyenne' | 'Haute';
export type ClientSegment = 'PME' | 'Grand Compte' | 'Particulier';
export type ClientOrigin = 'Référence' | 'Web' | 'Direct' | 'Partenaire';

export interface ClientContact {
  id?: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  isMain: boolean;
}

export interface ClientInteraction {
  id?: string;
  type: 'Appel' | 'Rendez-vous' | 'Email';
  date: Date;
  notes: string;
  contactId?: string;
  userId: string;
}

export interface Client {
  id?: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: ClientStatus;
  segment: ClientSegment;
  priority: ClientPriority;
  origin: ClientOrigin;
  contacts: ClientContact[];
  interactions: ClientInteraction[];
  paymentTerms?: string;
  creditLimit?: number;
  salesRevenue?: number;
  lastPurchaseDate?: Date;
  notes?: string;
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
  reference: string;
  supplier: string;
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
