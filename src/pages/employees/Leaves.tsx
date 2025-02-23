
import { useState } from 'react';
import { Calendar, Search, Plus, Check, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface Leave {
  id: string;
  employeeName: string;
  type: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'rejected';
  daysCount: number;
}

const leaveTypes = [
  { id: 'sick', label: 'Congé maladie' },
  { id: 'paid', label: 'Congés payés' },
  { id: 'rtt-employee', label: 'RTT salarié' },
  { id: 'rtt-employer', label: 'RTT Employeur' }
];

const mockLeaves: Leave[] = [
  {
    id: '1',
    employeeName: 'Jean Dupont',
    type: 'Congés payés',
    startDate: '2024-07-15',
    endDate: '2024-07-26',
    status: 'approved',
    daysCount: 10,
  },
  {
    id: '2',
    employeeName: 'Marie Martin',
    type: 'RTT',
    startDate: '2024-05-02',
    endDate: '2024-05-03',
    status: 'pending',
    daysCount: 2,
  },
  {
    id: '3',
    employeeName: 'Pierre Laurent',
    type: 'Congé sans solde',
    startDate: '2024-06-10',
    endDate: '2024-06-14',
    status: 'rejected',
    daysCount: 5,
  },
];

const EmployeeLeaves = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [leaves] = useState<Leave[]>(mockLeaves);
  const [isNewLeaveDialogOpen, setIsNewLeaveDialogOpen] = useState(false);
  const [newLeave, setNewLeave] = useState({
    employeeName: '',
    type: '',
    startDate: '',
    endDate: '',
  });

  const filteredLeaves = leaves.filter(leave =>
    leave.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    leave.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateLeave = () => {
    if (!newLeave.employeeName || !newLeave.type || !newLeave.startDate || !newLeave.endDate) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    // Calculer le nombre de jours entre les dates
    const start = new Date(newLeave.startDate);
    const end = new Date(newLeave.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const daysCount = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    // Simuler l'ajout d'une nouvelle demande
    const leave: Leave = {
      id: (leaves.length + 1).toString(),
      ...newLeave,
      status: 'pending',
      daysCount
    };

    // Dans un cas réel, on appellerait ici l'API pour sauvegarder la demande
    toast.success("Demande de congé créée avec succès");
    setIsNewLeaveDialogOpen(false);
    setNewLeave({
      employeeName: '',
      type: '',
      startDate: '',
      endDate: '',
    });
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-6 h-6 text-neotech-600" />
        <h2 className="text-xl font-semibold">Congés</h2>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Rechercher un congé..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button onClick={() => setIsNewLeaveDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle demande
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employé</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Début</TableHead>
              <TableHead>Fin</TableHead>
              <TableHead>Jours</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeaves.map((leave) => (
              <TableRow key={leave.id}>
                <TableCell>{leave.employeeName}</TableCell>
                <TableCell>{leave.type}</TableCell>
                <TableCell>{new Date(leave.startDate).toLocaleDateString('fr-FR')}</TableCell>
                <TableCell>{new Date(leave.endDate).toLocaleDateString('fr-FR')}</TableCell>
                <TableCell>{leave.daysCount}</TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      leave.status === 'approved' ? 'default' : 
                      leave.status === 'pending' ? 'secondary' : 'destructive'
                    }
                  >
                    {leave.status === 'approved' ? 'Approuvé' : 
                     leave.status === 'pending' ? 'En attente' : 'Refusé'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {leave.status === 'pending' && (
                    <>
                      <Button variant="ghost" size="icon" className="mr-2 text-green-500">
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-500">
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isNewLeaveDialogOpen} onOpenChange={setIsNewLeaveDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Nouvelle demande de congé</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="employeeName" className="text-right">
                Employé
              </Label>
              <Input
                id="employeeName"
                className="col-span-3"
                value={newLeave.employeeName}
                onChange={(e) => setNewLeave({ ...newLeave, employeeName: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type de congé
              </Label>
              <Select
                value={newLeave.type}
                onValueChange={(value) => setNewLeave({ ...newLeave, type: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner un type de congé" />
                </SelectTrigger>
                <SelectContent>
                  {leaveTypes.map((type) => (
                    <SelectItem key={type.id} value={type.label}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startDate" className="text-right">
                Date de début
              </Label>
              <Input
                id="startDate"
                type="date"
                className="col-span-3"
                value={newLeave.startDate}
                onChange={(e) => setNewLeave({ ...newLeave, startDate: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="endDate" className="text-right">
                Date de fin
              </Label>
              <Input
                id="endDate"
                type="date"
                className="col-span-3"
                value={newLeave.endDate}
                onChange={(e) => setNewLeave({ ...newLeave, endDate: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsNewLeaveDialogOpen(false)}>
              Annuler
            </Button>
            <Button type="button" onClick={handleCreateLeave}>
              Créer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployeeLeaves;
