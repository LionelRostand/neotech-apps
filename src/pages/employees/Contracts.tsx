
import { useState } from 'react';
import { FileSignature, Search, Download, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Contract {
  id: string;
  employeeName: string;
  type: string;
  startDate: string;
  endDate?: string;
  status: 'active' | 'expired' | 'terminated';
}

const mockContracts: Contract[] = [
  {
    id: '1',
    employeeName: 'Jean Dupont',
    type: 'CDI',
    startDate: '2022-01-15',
    status: 'active',
  },
  {
    id: '2',
    employeeName: 'Marie Martin',
    type: 'CDI',
    startDate: '2021-06-01',
    status: 'active',
  },
  {
    id: '3',
    employeeName: 'Pierre Laurent',
    type: 'CDD',
    startDate: '2023-03-10',
    endDate: '2024-03-09',
    status: 'active',
  },
];

const EmployeeContracts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [contracts] = useState<Contract[]>(mockContracts);

  const filteredContracts = contracts.filter(contract =>
    contract.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contract.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <FileSignature className="w-6 h-6 text-neotech-600" />
        <h2 className="text-xl font-semibold">Contrats</h2>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Rechercher un contrat..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button>
          <FileSignature className="w-4 h-4 mr-2" />
          Nouveau contrat
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employé</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date de début</TableHead>
              <TableHead>Date de fin</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContracts.map((contract) => (
              <TableRow key={contract.id}>
                <TableCell>{contract.employeeName}</TableCell>
                <TableCell>{contract.type}</TableCell>
                <TableCell>{new Date(contract.startDate).toLocaleDateString('fr-FR')}</TableCell>
                <TableCell>
                  {contract.endDate ? new Date(contract.endDate).toLocaleDateString('fr-FR') : 'N/A'}
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      contract.status === 'active' ? 'default' : 
                      contract.status === 'expired' ? 'secondary' : 'destructive'
                    }
                  >
                    {contract.status === 'active' ? 'Actif' : 
                     contract.status === 'expired' ? 'Expiré' : 'Résilié'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="mr-2" title="Voir le contrat">
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Télécharger">
                    <Download className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default EmployeeContracts;
