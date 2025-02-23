
import { Eye, Pencil, Trash2, MoreHorizontal } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Contract } from '../../../types/crm';

interface ContractsTableProps {
  contracts: Contract[];
  onEdit: (contract: Contract) => void;
  onDelete: (contractId: string) => void;
}

const ContractsTable = ({ contracts, onEdit, onDelete }: ContractsTableProps) => {
  return (
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
          {contracts.map((contract) => (
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
                    <DropdownMenuItem onClick={() => onEdit(contract)}>
                      <Pencil className="h-4 w-4 mr-2" />
                      Modifier
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-red-600"
                      onClick={() => onDelete(contract.id!)}
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
  );
};

export default ContractsTable;
