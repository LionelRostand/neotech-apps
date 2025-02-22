
import { useState } from 'react';
import {
  Table,
  TableBody,
} from "@/components/ui/table";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { getClients, deleteClient } from '../../services';
import type { Client } from '../../types/crm';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import ClientDetails from './ClientDetails';
import { ClientTableHeader } from './client-list/ClientTableHeader';
import { ClientTableRow } from './client-list/ClientTableRow';
import { SearchBar } from './client-list/SearchBar';

const ClientList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  
  const { 
    data: clients = [], 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['clients'],
    queryFn: getClients,
  });

  const filteredClients = clients.filter(client =>
    (client?.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (client?.company?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (client?.email?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const handleDeleteClient = async (id: string) => {
    try {
      await deleteClient(id);
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast.success('Client supprimé avec succès');
    } catch (error) {
      toast.error('Erreur lors de la suppression du client');
    }
  };

  const handleViewClient = (client: Client) => {
    setSelectedClient(client);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    // Clear the selected client after the dialog animation completes
    setTimeout(() => setSelectedClient(null), 300);
  };

  if (error) {
    toast.error("Erreur lors du chargement des clients");
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 flex-1">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <ClientTableHeader />
          <TableBody>
            {isLoading ? (
              <tr>
                <td colSpan={7} className="text-center p-4">
                  Chargement...
                </td>
              </tr>
            ) : filteredClients.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center p-4">
                  Aucun client trouvé
                </td>
              </tr>
            ) : (
              filteredClients.map((client) => (
                <ClientTableRow
                  key={client.id}
                  client={client}
                  onDelete={handleDeleteClient}
                  onView={handleViewClient}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-4xl">
          {selectedClient && <ClientDetails client={selectedClient} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientList;

