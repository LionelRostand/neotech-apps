
import { useState } from 'react';
import { DollarSign, Search, Download, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Payroll {
  id: string;
  employeeName: string;
  month: string;
  year: number;
  grossSalary: number;
  netSalary: number;
  status: 'paid' | 'pending' | 'processing';
}

const mockPayroll: Payroll[] = [
  {
    id: '1',
    employeeName: 'Jean Dupont',
    month: 'Mars',
    year: 2024,
    grossSalary: 4500,
    netSalary: 3500,
    status: 'paid',
  },
  {
    id: '2',
    employeeName: 'Marie Martin',
    month: 'Mars',
    year: 2024,
    grossSalary: 5000,
    netSalary: 3900,
    status: 'processing',
  },
  {
    id: '3',
    employeeName: 'Pierre Laurent',
    month: 'Mars',
    year: 2024,
    grossSalary: 3800,
    netSalary: 2900,
    status: 'pending',
  },
];

const EmployeePayroll = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [payroll] = useState<Payroll[]>(mockPayroll);

  const filteredPayroll = payroll.filter(record =>
    record.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <DollarSign className="w-6 h-6 text-neotech-600" />
        <h2 className="text-xl font-semibold">Salaires</h2>
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
          <FileText className="w-4 h-4 mr-2" />
          Générer les fiches de paie
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employé</TableHead>
              <TableHead>Période</TableHead>
              <TableHead>Salaire brut</TableHead>
              <TableHead>Salaire net</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayroll.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.employeeName}</TableCell>
                <TableCell>{record.month} {record.year}</TableCell>
                <TableCell>{formatCurrency(record.grossSalary)}</TableCell>
                <TableCell>{formatCurrency(record.netSalary)}</TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      record.status === 'paid' ? 'default' : 
                      record.status === 'processing' ? 'secondary' : 'destructive'
                    }
                  >
                    {record.status === 'paid' ? 'Payé' : 
                     record.status === 'processing' ? 'En cours' : 'En attente'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="mr-2" title="Voir la fiche de paie">
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Télécharger">
                    <Download className="h-4 w-4" />
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

export default EmployeePayroll;
