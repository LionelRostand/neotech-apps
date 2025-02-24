
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { toast } from 'sonner';

export const CompanyInformation = () => {
  const [companyData, setCompanyData] = useState({
    name: '',
    address: '',
    phone: '',
    email: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCompanyData(prev => ({
      ...prev,
      [id.replace('company-', '')]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const companyRef = doc(db, 'companies', Date.now().toString());
      await setDoc(companyRef, {
        ...companyData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      toast.success('Entreprise créée avec succès');
      setCompanyData({
        name: '',
        address: '',
        phone: '',
        email: ''
      });
    } catch (error) {
      console.error('Erreur lors de la création de l\'entreprise:', error);
      toast.error('Erreur lors de la création de l\'entreprise');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Informations de la société</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="company-name">Nom de la société</Label>
            <Input 
              id="company-name" 
              placeholder="Entrez le nom de votre société"
              value={companyData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company-address">Adresse</Label>
            <Input 
              id="company-address" 
              placeholder="Entrez l'adresse de votre société"
              value={companyData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company-phone">Téléphone</Label>
            <Input 
              id="company-phone" 
              type="tel" 
              placeholder="Entrez le numéro de téléphone"
              value={companyData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company-email">Email</Label>
            <Input 
              id="company-email" 
              type="email" 
              placeholder="Entrez l'email de contact"
              value={companyData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="pt-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Création en cours...' : 'Créer l\'entreprise'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

