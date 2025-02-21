
import { useQuery } from '@tanstack/react-query';
import { getClients } from '@/services';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Client } from '@/types/crm';

interface ClientSelectProps {
  value?: string;
  onValueChange: (value: string) => void;
}

const ClientSelect = ({ value, onValueChange }: ClientSelectProps) => {
  const { data: clients = [], isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: getClients,
  });

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Sélectionner un client" />
      </SelectTrigger>
      <SelectContent>
        {isLoading ? (
          <SelectItem value="loading">Chargement...</SelectItem>
        ) : clients.length === 0 ? (
          <SelectItem value="empty">Aucun client trouvé</SelectItem>
        ) : (
          clients.map((client: Client) => (
            <SelectItem key={client.id} value={client.id!}>
              {client.name} - {client.company}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
};

export default ClientSelect;
