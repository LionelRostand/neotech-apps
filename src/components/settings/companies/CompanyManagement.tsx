
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
      const companiesSnapshot = await getDocs(collection(db, 'companies'));
      const companiesData = companiesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Company[];
      setCompanies(companiesData);
    } catch (error) {
      console.error('Erreur lors de la récupération des entreprises:', error);
      toast.error('Erreur lors de la récupération des entreprises');
    }
  };

  const handleCreateCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const now = new Date().toISOString();
      const companyData = {
        ...newCompany,
        createdAt: now,
        updatedAt: now
      };
      
      const docRef = await addDoc(collection(db, 'companies'), companyData);
      toast.success('Entreprise créée avec succès');
      setNewCompany({ name: '', address: '', phone: '', email: '' });
      fetchCompanies();
    } catch (error) {
      console.error('Erreur lors de la création de l\'entreprise:', error);
      toast.error('Erreur lors de la création de l\'entreprise');
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
          <Button type="submit">Créer l'entreprise</Button>
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
