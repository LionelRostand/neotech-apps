import { useState, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import DashboardLayout from '../layout/DashboardLayout';
import ContractsToolbar from './contracts/ContractsToolbar';
import ContractsTable from './contracts/ContractsTable';
import ContractForm from './ContractForm';
import type { Contract } from '../../types/crm';

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
    return (
      <DashboardLayout hideHeader={true}>
        <div>Chargement...</div>
      </DashboardLayout>
    );
  }

  const contractsList = filteredContracts();

  return (
    <DashboardLayout hideHeader={true}>
      <div className="pl-2 pr-6 py-6 space-y-4">
        <ContractsToolbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onNewContract={() => setIsFormOpen(true)}
        />

        <ContractsTable
          contracts={contractsList}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <ContractForm
          isOpen={isFormOpen}
          onClose={handleFormClose}
          contract={selectedContract}
        />
      </div>
    </DashboardLayout>
  );
};

export default ContractsView;
