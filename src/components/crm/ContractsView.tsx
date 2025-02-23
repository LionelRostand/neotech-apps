import { useState, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { FileText, FileSignature, Users, Building2, CheckCircle2, Clock } from 'lucide-react';
import DashboardLayout from '../layout/DashboardLayout';
import ContractsToolbar from './contracts/ContractsToolbar';
import ContractsTable from './contracts/ContractsTable';
import ContractForm from './ContractForm';
import type { Contract } from '../../types/crm';
import { Card } from "@/components/ui/card";
const mockContracts: Contract[] = [{
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
}, {
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
}];
const ContractsView = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<Contract | undefined>();
  const {
    data: contracts = mockContracts,
    isLoading
  } = useQuery({
    queryKey: ['contracts'],
    queryFn: () => Promise.resolve(mockContracts)
  });
  const filteredContracts = useCallback(() => contracts.filter(contract => contract.title.toLowerCase().includes(searchTerm.toLowerCase()) || contract.clientName.toLowerCase().includes(searchTerm.toLowerCase())), [contracts, searchTerm]);
  const handleEdit = useCallback((contract: Contract) => {
    setSelectedContract(contract);
    setIsFormOpen(true);
  }, []);
  const handleDelete = useCallback(async (contractId: string) => {
    try {
      toast.success("Contrat supprimé avec succès");
      queryClient.invalidateQueries({
        queryKey: ['contracts']
      });
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
    return <DashboardLayout hideHeader={true}>
        <div>Chargement...</div>
      </DashboardLayout>;
  }
  const contractsList = filteredContracts();
  return <DashboardLayout hideHeader={true}>
      <div className="container mx-auto mt-24 space-y-8 py-0 px-0 my-0">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Contrats</h1>
          <p className="mt-1 text-gray-500">Vue d'ensemble de vos contrats</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 space-y-2">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" />
              <h3 className="font-semibold">Contrats Actifs</h3>
            </div>
            <p className="text-2xl font-bold">{contracts.length}</p>
          </Card>

          <Card className="p-6 space-y-2">
            <div className="flex items-center gap-2">
              <FileSignature className="w-5 h-5 text-green-500" />
              <h3 className="font-semibold">En attente de signature</h3>
            </div>
            <p className="text-2xl font-bold">3</p>
          </Card>

          <Card className="p-6 space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-500" />
              <h3 className="font-semibold">À renouveler</h3>
            </div>
            <p className="text-2xl font-bold">2</p>
          </Card>

          <Card className="p-6 space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <h3 className="font-semibold">Complétés ce mois</h3>
            </div>
            <p className="text-2xl font-bold">5</p>
          </Card>
        </div>

        <div className="max-w-7xl mx-auto space-y-4">
          <ContractsToolbar searchTerm={searchTerm} onSearchChange={setSearchTerm} onNewContract={() => setIsFormOpen(true)} />

          <ContractsTable contracts={contractsList} onEdit={handleEdit} onDelete={handleDelete} />
        </div>

        <ContractForm isOpen={isFormOpen} onClose={handleFormClose} contract={selectedContract} />
      </div>
    </DashboardLayout>;
};
export default ContractsView;