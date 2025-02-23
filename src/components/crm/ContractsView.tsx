
import { useState, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Download, Upload, Search, Plus, MoreHorizontal, Eye, Pencil, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ContractForm from './ContractForm';
import type { Contract } from '../../types/crm';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Données de test pour le développement
const mockContracts: Contract[] = [
  {
    id: '1',
    reference: 'CONT-2024-001',
    title: 'Contrat de service annuel',
    clientId: '1',
    clientName: 'Société ABC',
    supplier: 'Fournisseur XYZ',
    status: 'En cours',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    value: 50000,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    reference: 'CONT-2024-002',
    title: 'Contrat de maintenance',
    clientId: '2',
    clientName: 'Entreprise DEF',
    supplier: 'Maintenance Pro',
    status: 'Signé',
    startDate: new Date('2024-02-01'),
    endDate: new Date('2025-01-31'),
    value: 25000,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const ContractsView = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<Contract | undefined>();

  // Simulation d'une requête API avec des données mock
  const { data: contracts = mockContracts, isLoading } = useQuery({
    queryKey: ['contracts'],
    queryFn: () => Promise.resolve(mockContracts),
  });

  const filteredContracts = useCallback(() => 
    contracts.filter(contract =>
      contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.clientName.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [contracts, searchTerm]
  );

  const handleEdit = useCallback((contract: Contract) => {
    setSelectedContract(contract);
    setIsFormOpen(true);
  }, []);

  const handleDelete = useCallback(async (contractId: string) => {
    try {
      // Simuler la suppression
      toast.success("Contrat supprimé avec succès");
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
    } catch (error) {
      console.error('Error:', error);
      toast.error("Une erreur est survenue lors de la suppression");
    }
  }, [queryClient]);

  const handleFormClose = useCallback(() => {
    setIsFormOpen(false);
    setSelectedContract(undefined);
  }, []);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  const contractsList = filteredContracts();

  return (
    <div className="flex-1 ml-64">
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 flex-1">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Rechercher un contrat..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Importer
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
            <Button size="sm" onClick={() => setIsFormOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Nouveau contrat
            </Button>
          </div>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date de début</TableHead>
                <TableHead>Date de fin</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contractsList.map((contract) => (
                <TableRow key={contract.id}>
                  <TableCell className="font-medium">{contract.title}</TableCell>
                  <TableCell>{contract.clientName}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      contract.status === 'Signé' ? 'bg-green-100 text-green-800' :
                      contract.status === 'En cours' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {contract.status}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(contract.startDate).toLocaleDateString('fr-FR')}</TableCell>
                  <TableCell>{new Date(contract.endDate).toLocaleDateString('fr-FR')}</TableCell>
                  <TableCell>
                    {contract.value.toLocaleString('fr-FR', {
                      style: 'currency',
                      currency: 'EUR',
                    })}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          Voir
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(contract)}>
                          <Pencil className="h-4 w-4 mr-2" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleDelete(contract.id!)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <ContractForm
          isOpen={isFormOpen}
          onClose={handleFormClose}
          contract={selectedContract}
        />
      </div>
    </div>
  );
};

export default ContractsView;
