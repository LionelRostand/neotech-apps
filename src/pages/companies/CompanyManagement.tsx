
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { usePermissions } from '@/hooks/usePermissions';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

interface CompanyForm {
  name: string;
  address: string;
  phone: string;
  email: string;
}

const CompanyManagement = () => {
  const { hasPermission } = usePermissions();
  const [formData, setFormData] = useState<CompanyForm>({
    name: '',
    address: '',
    phone: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hasPermission('companies', 'write')) {
      toast.error("Vous n'avez pas la permission de créer une entreprise");
      return;
    }

    try {
      await addDoc(collection(db, 'companies'), {
        ...formData,
        createdAt: new Date().toISOString(),
      });

      toast.success('Entreprise créée avec succès');
      setFormData({
        name: '',
        address: '',
        phone: '',
        email: '',
      });
    } catch (error) {
      console.error('Erreur lors de la création de l\'entreprise:', error);
      toast.error('Erreur lors de la création de l\'entreprise');
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Créer une nouvelle entreprise</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nom de l'entreprise</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="address">Adresse</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit">Créer l'entreprise</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CompanyManagement;
