
import { useState } from 'react';
import { UserPlus, Search, Edit, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface Employee {
  id: string;
  firstName: string;
  name: string;
  position: string;
  department: string;
  status: 'active' | 'inactive';
  startDate: string;
  birthDate: string;
  address: string;
  city: string;
}

const mockEmployees: Employee[] = [
  {
    id: '1',
    firstName: 'Jean',
    name: 'Dupont',
    position: 'Développeur Senior',
    department: 'IT',
    status: 'active',
    startDate: '2022-01-15',
    birthDate: '1985-06-15',
    address: '123 rue de la Paix',
    city: 'Paris'
  },
  {
    id: '2',
    firstName: 'Marie',
    name: 'Martin',
    position: 'Chef de Projet',
    department: 'IT',
    status: 'active',
    startDate: '2021-06-01',
    birthDate: '1990-03-22',
    address: '45 avenue des Champs-Élysées',
    city: 'Paris'
  },
  {
    id: '3',
    firstName: 'Pierre',
    name: 'Laurent',
    position: 'Designer UI/UX',
    department: 'Design',
    status: 'inactive',
    startDate: '2023-03-10',
    birthDate: '1988-11-30',
    address: '78 boulevard Saint-Michel',
    city: 'Paris'
  },
];

const EmployeeManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [isNewEmployeeDialogOpen, setIsNewEmployeeDialogOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    firstName: '',
    name: '',
    position: '',
    department: '',
    startDate: '',
    birthDate: '',
    address: '',
    city: ''
  });

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateEmployee = () => {
    if (!newEmployee.firstName || !newEmployee.name || !newEmployee.position || 
        !newEmployee.department || !newEmployee.startDate || !newEmployee.birthDate || 
        !newEmployee.address || !newEmployee.city) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const employee: Employee = {
      id: (employees.length + 1).toString(),
      ...newEmployee,
      status: 'active'
    };

    setEmployees([...employees, employee]);
    setIsNewEmployeeDialogOpen(false);
    setNewEmployee({ 
      firstName: '',
      name: '', 
      position: '', 
      department: '', 
      startDate: '',
      birthDate: '',
      address: '',
      city: ''
    });
    toast.success("Employé ajouté avec succès");
  };

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
        <Button onClick={() => setIsNewEmployeeDialogOpen(true)}>
          <UserPlus className="w-4 h-4 mr-2" />
          Nouvel employé
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom complet</TableHead>
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
                <TableCell>
                  <div>
                    <div className="font-medium">{employee.name}</div>
                    <div className="text-sm text-gray-500">{employee.firstName}</div>
                  </div>
                </TableCell>
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

      <Dialog open={isNewEmployeeDialogOpen} onOpenChange={setIsNewEmployeeDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Nouvel employé</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstName" className="text-right">
                Prénom
              </Label>
              <Input
                id="firstName"
                className="col-span-3"
                value={newEmployee.firstName}
                onChange={(e) => setNewEmployee({ ...newEmployee, firstName: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nom
              </Label>
              <Input
                id="name"
                className="col-span-3"
                value={newEmployee.name}
                onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="position" className="text-right">
                Poste
              </Label>
              <Input
                id="position"
                className="col-span-3"
                value={newEmployee.position}
                onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">
                Département
              </Label>
              <Input
                id="department"
                className="col-span-3"
                value={newEmployee.department}
                onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="birthDate" className="text-right">
                Date de naissance
              </Label>
              <Input
                id="birthDate"
                type="date"
                className="col-span-3"
                value={newEmployee.birthDate}
                onChange={(e) => setNewEmployee({ ...newEmployee, birthDate: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startDate" className="text-right">
                Date d'entrée
              </Label>
              <Input
                id="startDate"
                type="date"
                className="col-span-3"
                value={newEmployee.startDate}
                onChange={(e) => setNewEmployee({ ...newEmployee, startDate: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Adresse
              </Label>
              <Input
                id="address"
                className="col-span-3"
                value={newEmployee.address}
                onChange={(e) => setNewEmployee({ ...newEmployee, address: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="city" className="text-right">
                Ville
              </Label>
              <Input
                id="city"
                className="col-span-3"
                value={newEmployee.city}
                onChange={(e) => setNewEmployee({ ...newEmployee, city: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsNewEmployeeDialogOpen(false)}>
              Annuler
            </Button>
            <Button type="button" onClick={handleCreateEmployee}>
              Créer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployeeManagement;
