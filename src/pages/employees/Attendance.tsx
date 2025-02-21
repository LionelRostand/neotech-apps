
import { useState } from 'react';
import { Clock, Search, Check, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Attendance {
  id: string;
  employeeName: string;
  date: string;
  timeIn: string;
  timeOut: string;
  status: 'present' | 'absent' | 'late';
  hoursWorked: number;
}

const mockAttendance: Attendance[] = [
  {
    id: '1',
    employeeName: 'Jean Dupont',
    date: '2024-03-18',
    timeIn: '09:00',
    timeOut: '18:00',
    status: 'present',
    hoursWorked: 8,
  },
  {
    id: '2',
    employeeName: 'Marie Martin',
    date: '2024-03-18',
    timeIn: '09:30',
    timeOut: '18:00',
    status: 'late',
    hoursWorked: 7.5,
  },
  {
    id: '3',
    employeeName: 'Pierre Laurent',
    date: '2024-03-18',
    timeIn: '',
    timeOut: '',
    status: 'absent',
    hoursWorked: 0,
  },
];

const EmployeeAttendance = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [attendance] = useState<Attendance[]>(mockAttendance);

  const filteredAttendance = attendance.filter(record =>
    record.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="w-6 h-6 text-neotech-600" />
        <h2 className="text-xl font-semibold">Présences</h2>
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
        <div className="flex gap-2">
          <Button variant="outline">
            Pointer l'arrivée
          </Button>
          <Button variant="outline">
            Pointer le départ
          </Button>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employé</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Heure d'arrivée</TableHead>
              <TableHead>Heure de départ</TableHead>
              <TableHead>Heures travaillées</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Validation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAttendance.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.employeeName}</TableCell>
                <TableCell>{new Date(record.date).toLocaleDateString('fr-FR')}</TableCell>
                <TableCell>{record.timeIn || '-'}</TableCell>
                <TableCell>{record.timeOut || '-'}</TableCell>
                <TableCell>{record.hoursWorked}</TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      record.status === 'present' ? 'default' : 
                      record.status === 'late' ? 'secondary' : 'destructive'
                    }
                  >
                    {record.status === 'present' ? 'Présent' : 
                     record.status === 'late' ? 'En retard' : 'Absent'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="mr-2 text-green-500">
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-red-500">
                    <X className="h-4 w-4" />
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

export default EmployeeAttendance;
