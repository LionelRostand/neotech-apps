
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User } from 'lucide-react';

interface Employee {
  id: string;
  firstName: string;
  name: string;
}

interface ManagerSelectProps {
  value?: string;
  onValueChange: (value: string) => void;
  companyId?: string;
}

const ManagerSelect = ({ value, onValueChange, companyId }: ManagerSelectProps) => {
  const { data: managers = [], isLoading } = useQuery({
    queryKey: ['managers', companyId],
    queryFn: async () => {
      const employeesSnapshot = await getDocs(collection(db, 'employees'));
      return employeesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Employee[];
    },
    enabled: !!companyId
  });

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <User className="w-4 h-4 mr-2" />
        <SelectValue placeholder="Sélectionner un manager" />
      </SelectTrigger>
      <SelectContent>
        {!companyId ? (
          <SelectItem value="no-company">Sélectionnez d'abord une entreprise</SelectItem>
        ) : isLoading ? (
          <SelectItem value="loading">Chargement...</SelectItem>
        ) : managers.length === 0 ? (
          <SelectItem value="empty">Aucun manager trouvé</SelectItem>
        ) : (
          managers.map((manager) => (
            <SelectItem key={manager.id} value={manager.id}>
              {manager.firstName} {manager.name}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
};

export default ManagerSelect;
