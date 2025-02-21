
import { useState } from 'react';
import { Calendar, Search, Plus, Check, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Leave {
  id: string;
  employeeName: string;
  type: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'rejected';
  daysCount: number;
}

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

  const filteredLeaves = leaves.filter(leave =>
    leave.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    leave.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <Button>
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
    </div>
  );
};

export default EmployeeLeaves;
