import { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import EmployeeTable from '@/components/employees/EmployeeTable';
import EmployeeDialog from '@/components/employees/EmployeeDialog';
import EmployeeSearch from '@/components/employees/EmployeeSearch';
import OrganizationChart from '@/components/employees/OrganizationChart';
import { Employee } from '@/types/employees';

const mockEmployees: Employee[] = [
  {
    id: '1',
    firstName: 'Jean',
    name: 'Dupont',
    position: 'Directeur',
    department: 'Direction',
    status: 'active',
    startDate: '2022-01-15',
    birthDate: '1985-06-15',
    address: '123 rue de la Paix',
    city: 'Paris',
    contractType: 'CDI',
    companyId: '',
    managerId: ''
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
    city: 'Paris',
    contractType: 'CDI',
    companyId: '',
    managerId: '1'
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
    city: 'Paris',
    contractType: 'CDD',
    companyId: '',
    managerId: '2'
  },
];

const EmployeeManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [isNewEmployeeDialogOpen, setIsNewEmployeeDialogOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState<Omit<Employee, 'id' | 'status'>>({
    firstName: '',
    name: '',
    position: '',
    department: '',
    startDate: '',
    birthDate: '',
    address: '',
    city: '',
    contractType: 'CDI',
    companyId: '',
    managerId: ''
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
        !newEmployee.address || !newEmployee.city || !newEmployee.companyId) {
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
      city: '',
      contractType: 'CDI',
      companyId: '',
      managerId: ''
    });
    toast.success("Employé ajouté avec succès");
  };

  const handleEmployeeChange = (field: keyof Omit<Employee, 'id' | 'status'>, value: string) => {
    setNewEmployee({ ...newEmployee, [field]: value });
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
            <EmployeeSearch 
              value={searchTerm}
              onChange={setSearchTerm}
            />
            <Button onClick={() => setIsNewEmployeeDialogOpen(true)} className="w-full sm:w-auto">
              <UserPlus className="w-4 h-4 mr-2" />
              Nouvel employé
            </Button>
          </div>

          <EmployeeTable 
            employees={filteredEmployees}
            sortConfig={sortConfig}
            onSort={sortData}
          />
        </CardContent>
      </Card>

      <Card className="border-none shadow-md">
        <CardContent>
          <OrganizationChart employees={employees} />
        </CardContent>
      </Card>

      <EmployeeDialog
        open={isNewEmployeeDialogOpen}
        onOpenChange={setIsNewEmployeeDialogOpen}
        newEmployee={newEmployee}
        onEmployeeChange={handleEmployeeChange}
        onCreateEmployee={handleCreateEmployee}
      />
    </div>
  );
};

export default EmployeeManagement;
