
import { useState } from 'react';
import { UserPlus, Search, Edit, Trash2, ArrowUpDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

  const [sortConfig, setSortConfig] = useState<{
    key: keyof Employee;
    direction: 'asc' | 'desc';
  } | null>(null);

  const sortData = (key: keyof Employee) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedEmployees = [...employees].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setEmployees(sortedEmployees);
  };

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
    <div className="space-y-6 p-6 animate-fade-in">
      <Card className="border-none shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-2xl font-semibold flex items-center gap-2">
            <UserPlus className="w-6 h-6 text-neotech-600" />
            Liste des Employés
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Rechercher un employé..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-full"
              />
            </div>
            <Button onClick={() => setIsNewEmployeeDialogOpen(true)} className="w-full sm:w-auto">
              <UserPlus className="w-4 h-4 mr-2" />
              Nouvel employé
            </Button>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableHead className="font-semibold cursor-pointer" onClick={() => sortData('name')}>
                    Nom complet {sortConfig?.key === 'name' && <ArrowUpDown className="inline w-4 h-4 ml-1" />}
                  </TableHead>
                  <TableHead className="font-semibold cursor-pointer" onClick={() => sortData('position')}>
                    Poste {sortConfig?.key === 'position' && <ArrowUpDown className="inline w-4 h-4 ml-1" />}
                  </TableHead>
                  <TableHead className="font-semibold cursor-pointer" onClick={() => sortData('department')}>
                    Département {sortConfig?.key === 'department' && <ArrowUpDown className="inline w-4 h-4 ml-1" />}
                  </TableHead>
                  <TableHead className="font-semibold">Date d'entrée</TableHead>
                  <TableHead className="font-semibold">Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id} className="hover:bg-gray-50">
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
                ))}
                {filteredEmployees.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      Aucun employé trouvé
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isNewEmployeeDialogOpen} onOpenChange={setIsNewEmployeeDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Nouvel employé</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
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
