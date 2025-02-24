
import React, { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserRole, Company } from '@/types/auth';
import { toast } from 'sonner';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface User {
  id: string;
  email: string;
  role: UserRole;
  companyId?: string;
}

interface UserRolesListProps {
  users: User[];
  currentUserRole: UserRole;
  onRoleChange: (userId: string, newRole: UserRole) => Promise<void>;
  onCompanyChange: (userId: string, companyId: string) => Promise<void>;
}

export const UserRolesList = ({ users, currentUserRole, onRoleChange, onCompanyChange }: UserRolesListProps) => {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
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

    fetchCompanies();
  }, []);

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    try {
      await onRoleChange(userId, newRole);
      toast.success('Rôle mis à jour avec succès');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du rôle:', error);
      toast.error('Erreur lors de la mise à jour du rôle');
    }
  };

  const handleCompanyChange = async (userId: string, companyId: string) => {
    try {
      await onCompanyChange(userId, companyId);
      toast.success('Entreprise assignée avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'attribution de l\'entreprise:', error);
      toast.error('Erreur lors de l\'attribution de l\'entreprise');
    }
  };

  if (users.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        Aucun utilisateur trouvé
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div key={user.id} className="flex items-center justify-between p-4 border rounded">
          <span className="text-sm">{user.email}</span>
          <div className="flex items-center gap-4">
            <Select
              value={user.companyId}
              onValueChange={(companyId) => handleCompanyChange(user.id, companyId)}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Sélectionner une entreprise" />
              </SelectTrigger>
              <SelectContent>
                {companies.map((company) => (
                  <SelectItem key={company.id} value={company.id}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select
              value={user.role}
              onValueChange={(newRole: UserRole) => handleRoleChange(user.id, newRole)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sélectionner un rôle" />
              </SelectTrigger>
              <SelectContent>
                {currentUserRole === 'admin' ? (
                  <>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="user">Employé</SelectItem>
                  </>
                ) : (
                  <SelectItem value="user">Employé</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
      ))}
    </div>
  );
};
