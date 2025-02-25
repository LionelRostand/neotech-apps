
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building } from 'lucide-react';

interface Company {
  id: string;
  name: string;
}

interface CompanySelectProps {
  value?: string;
  onValueChange: (value: string) => void;
}

const CompanySelect = ({ value, onValueChange }: CompanySelectProps) => {
  const { data: companies = [], isLoading } = useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      const companiesSnapshot = await getDocs(collection(db, 'companies'));
      return companiesSnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name
      })) as Company[];
    }
  });

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <Building className="w-4 h-4 mr-2" />
        <SelectValue placeholder="Sélectionner une entreprise" />
      </SelectTrigger>
      <SelectContent>
        {isLoading ? (
          <SelectItem value="loading">Chargement...</SelectItem>
        ) : companies.length === 0 ? (
          <SelectItem value="empty">Aucune entreprise trouvée</SelectItem>
        ) : (
          companies.map((company) => (
            <SelectItem key={company.id} value={company.id}>
              {company.name}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
};

export default CompanySelect;
