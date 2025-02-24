
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Company } from '@/types/auth';

export const CompanyManagement = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newCompany, setNewCompany] = useState({
    name: '',
    address: '',
    phone: '',
    email: ''
  });

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      console.log('Tentative de récupération des entreprises...');
      const companiesCollection = collection(db, 'companies');
      console.log('Collection référencée:', companiesCollection);
      
      const companiesSnapshot = await getDocs(companiesCollection);
      console.log('Snapshot reçu:', companiesSnapshot.size, 'documents');
      
      const companiesData = companiesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Company[];
      
      console.log('Données des entreprises:', companiesData);
      setCompanies(companiesData);
    } catch (error) {
      console.error('Erreur détaillée lors de la récupération des entreprises:', error);
      if (error instanceof Error) {
        toast.error(`Erreur lors de la récupération des entreprises: ${error.message}`);
      }
    }
  };

  const handleCreateCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Début de la création de l\'entreprise');
    setIsLoading(true);

    try {
      if (!newCompany.name) {
        toast.error('Le nom de l\'entreprise est requis');
        setIsLoading(false);
        return;
      }

      const now = new Date().toISOString();
      const companyData = {
        ...newCompany,
        createdAt: now,
        updatedAt: now
      };
      
      console.log('Données de l\'entreprise à créer:', companyData);
      console.log('Tentative d\'accès à la collection companies...');
      
      const companiesCollection = collection(db, 'companies');
      console.log('Collection référencée, tentative d\'ajout du document...');
      
      const docRef = await addDoc(companiesCollection, companyData);
      console.log('Entreprise créée avec succès, ID:', docRef.id);
      
      toast.success('Entreprise créée avec succès');
      setNewCompany({ name: '', address: '', phone: '', email: '' });
      await fetchCompanies();
    } catch (error) {
      console.error('Erreur détaillée lors de la création de l\'entreprise:', error);
      if (error instanceof Error) {
        toast.error(`Erreur lors de la création de l'entreprise: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des Entreprises</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCreateCompany} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nom de l'entreprise</label>
            <Input
              required
              value={newCompany.name}
              onChange={(e) => setNewCompany(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Nom de l'entreprise"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Adresse</label>
            <Input
              value={newCompany.address}
              onChange={(e) => setNewCompany(prev => ({ ...prev, address: e.target.value }))}
              placeholder="Adresse"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Téléphone</label>
            <Input
              value={newCompany.phone}
              onChange={(e) => setNewCompany(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="Téléphone"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              type="email"
              value={newCompany.email}
              onChange={(e) => setNewCompany(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Email"
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Création en cours...' : 'Créer l\'entreprise'}
          </Button>
        </form>

        <div className="mt-8 space-y-4">
          <h3 className="font-semibold">Entreprises existantes</h3>
          {companies.map((company) => (
            <div key={company.id} className="p-4 border rounded">
              <h4 className="font-medium">{company.name}</h4>
              {company.address && <p className="text-sm text-gray-600">{company.address}</p>}
              {company.phone && <p className="text-sm text-gray-600">{company.phone}</p>}
              {company.email && <p className="text-sm text-gray-600">{company.email}</p>}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
