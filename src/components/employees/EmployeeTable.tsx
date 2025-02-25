
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from 'lucide-react';
import { Employee } from "@/types/employees";

interface EmployeeTableProps {
  employees: Employee[];
  sortConfig: {
    key: keyof Employee;
    direction: 'asc' | 'desc';
  } | null;
  onSort: (key: keyof Employee) => void;
}

const EmployeeTable = ({ employees, sortConfig, onSort }: EmployeeTableProps) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 hover:bg-gray-50">
            <TableHead className="font-semibold cursor-pointer" onClick={() => onSort('name')}>
              Nom complet
            </TableHead>
            <TableHead className="font-semibold cursor-pointer" onClick={() => onSort('position')}>
              Poste
            </TableHead>
            <TableHead className="font-semibold cursor-pointer" onClick={() => onSort('department')}>
              Département
            </TableHead>
            <TableHead className="font-semibold">Type de contrat</TableHead>
            <TableHead className="font-semibold">Date d'entrée</TableHead>
            <TableHead className="font-semibold">Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                Aucun employé trouvé
              </TableCell>
            </TableRow>
          ) : (
            employees.map((employee) => (
              <TableRow key={employee.id} className="hover:bg-gray-50">
                <TableCell>
                  <div>
                    <div className="font-medium">{employee.name}</div>
                    <div className="text-sm text-gray-500">{employee.firstName}</div>
                  </div>
                </TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.contractType}</TableCell>
                <TableCell>{new Date(employee.startDate).toLocaleDateString('fr-FR')}</TableCell>
                <TableCell>
                  <Badge 
                    variant={employee.status === 'active' ? 'default' : 'secondary'}
                    className="font-medium"
                  >
                    {employee.status === 'active' ? 'Actif' : 'Inactif'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="mr-2 hover:text-primary">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default EmployeeTable;
