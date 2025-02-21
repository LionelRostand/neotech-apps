
import { useState } from 'react';
import { UserPlus, Search, Edit, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  status: 'active' | 'inactive';
  startDate: string;
}

const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'Jean Dupont',
    position: 'Développeur Senior',
    department: 'IT',
    status: 'active',
    startDate: '2022-01-15',
  },
  {
    id: '2',
    name: 'Marie Martin',
    position: 'Chef de Projet',
    department: 'IT',
    status: 'active',
    startDate: '2021-06-01',
  },
  {
    id: '3',
    name: 'Pierre Laurent',
    position: 'Designer UI/UX',
    department: 'Design',
    status: 'inactive',
    startDate: '2023-03-10',
  },
];

const EmployeeManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [employees] = useState<Employee[]>(mockEmployees);

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <UserPlus className="w-6 h-6 text-neotech-600" />
        <h2 className="text-xl font-semibold">Gestion des Employés</h2>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Rechercher un employé..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button>
          <UserPlus className="w-4 h-4 mr-2" />
          Nouvel employé
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Poste</TableHead>
              <TableHead>Département</TableHead>
              <TableHead>Date d'entrée</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{new Date(employee.startDate).toLocaleDateString('fr-FR')}</TableCell>
                <TableCell>
                  <Badge variant={employee.status === 'active' ? 'default' : 'secondary'}>
                    {employee.status === 'active' ? 'Actif' : 'Inactif'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="mr-2">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-red-500">
                    <Trash2 className="h-4 w-4" />
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

export default EmployeeManagement;
