
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CompanySelect from '@/components/company/CompanySelect';
import ManagerSelect from '@/components/employees/ManagerSelect';
import { Employee } from "@/types/employees";

interface EmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newEmployee: Omit<Employee, 'id' | 'status'>;
  onEmployeeChange: (field: keyof Omit<Employee, 'id' | 'status'>, value: string) => void;
  onCreateEmployee: () => void;
}

const EmployeeDialog = ({ 
  open, 
  onOpenChange, 
  newEmployee, 
  onEmployeeChange, 
  onCreateEmployee 
}: EmployeeDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
              onChange={(e) => onEmployeeChange('name', e.target.value)}
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
              onChange={(e) => onEmployeeChange('firstName', e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="company" className="text-right">
              Entreprise
            </Label>
            <div className="col-span-3">
              <CompanySelect
                value={newEmployee.companyId}
                onValueChange={(value) => onEmployeeChange('companyId', value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="manager" className="text-right">
              Manager
            </Label>
            <div className="col-span-3">
              <ManagerSelect
                value={newEmployee.managerId}
                onValueChange={(value) => onEmployeeChange('managerId', value)}
                companyId={newEmployee.companyId}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="position" className="text-right">
              Poste
            </Label>
            <Input
              id="position"
              className="col-span-3"
              value={newEmployee.position}
              onChange={(e) => onEmployeeChange('position', e.target.value)}
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
              onChange={(e) => onEmployeeChange('department', e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="contractType" className="text-right">
              Type de contrat
            </Label>
            <Select
              value={newEmployee.contractType}
              onValueChange={(value: 'CDI' | 'CDD') => onEmployeeChange('contractType', value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Sélectionner le type de contrat" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CDI">CDI</SelectItem>
                <SelectItem value="CDD">CDD</SelectItem>
              </SelectContent>
            </Select>
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
              onChange={(e) => onEmployeeChange('birthDate', e.target.value)}
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
              onChange={(e) => onEmployeeChange('startDate', e.target.value)}
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
              onChange={(e) => onEmployeeChange('address', e.target.value)}
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
              onChange={(e) => onEmployeeChange('city', e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button type="button" onClick={onCreateEmployee}>
            Créer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeDialog;
