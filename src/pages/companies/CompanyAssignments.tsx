
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { usePermissions } from '@/hooks/usePermissions';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface User {
  id: string;
  email: string;
  role: string;
}

interface Company {
  id: string;
  name: string;
}

const CompanyAssignments = () => {
  const { hasPermission } = usePermissions();
  const [users, setUsers] = useState<User[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersSnapshot, companiesSnapshot] = await Promise.all([
          getDocs(collection(db, 'users')),
          getDocs(collection(db, 'companies'))
        ]);

        const usersData = usersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as User[];
        
        const companiesData = companiesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Company[];

        setUsers(usersData);
        setCompanies(companiesData);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        toast.error('Erreur lors du chargement des données');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAssignment = async () => {
    if (!selectedUser || !selectedCompany) {
      toast.error('Veuillez sélectionner un utilisateur et une entreprise');
      return;
    }

    if (!hasPermission('companies', 'manage')) {
      toast.error("Vous n'avez pas la permission de gérer les assignations");
      return;
    }

    try {
      const userRef = doc(db, 'users', selectedUser);
      await updateDoc(userRef, {
        companyId: selectedCompany
      });

      toast.success('Assignation effectuée avec succès');
      setSelectedUser('');
      setSelectedCompany('');
    } catch (error) {
      console.error('Erreur lors de l\'assignation:', error);
      toast.error('Erreur lors de l\'assignation');
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div>Chargement...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Assignation des employés aux entreprises</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label>Sélectionner un utilisateur</label>
                <Select value={selectedUser} onValueChange={setSelectedUser}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un utilisateur" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.email} ({user.role})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label>Sélectionner une entreprise</label>
                <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir une entreprise" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map((company) => (
                      <SelectItem key={company.id} value={company.id}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleAssignment}>
                Assigner l'utilisateur à l'entreprise
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CompanyAssignments;
