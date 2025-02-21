
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
