
import { useState } from 'react';
import { Medal, Search, Star, TrendingUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Performance {
  id: string;
  employeeName: string;
  position: string;
  evaluationDate: string;
  score: number;
  status: 'excellent' | 'good' | 'average' | 'needs_improvement';
  reviewerName: string;
}

const mockPerformance: Performance[] = [
  {
    id: '1',
    employeeName: 'Jean Dupont',
    position: 'Développeur Senior',
    evaluationDate: '2024-01-15',
    score: 4.5,
    status: 'excellent',
    reviewerName: 'Marc Bernard',
  },
  {
    id: '2',
    employeeName: 'Marie Martin',
    position: 'Chef de Projet',
    evaluationDate: '2024-01-15',
    score: 4.0,
    status: 'good',
    reviewerName: 'Sophie Dubois',
  },
  {
    id: '3',
    employeeName: 'Pierre Laurent',
    position: 'Designer UI/UX',
    evaluationDate: '2024-01-15',
    score: 3.0,
    status: 'average',
    reviewerName: 'Marc Bernard',
  },
];

const EmployeePerformance = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [performance] = useState<Performance[]>(mockPerformance);

  const filteredPerformance = performance.filter(record =>
    record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: Performance['status']) => {
    switch (status) {
      case 'excellent':
        return 'default';
      case 'good':
        return 'secondary';
      case 'average':
        return 'secondary';
      case 'needs_improvement':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: Performance['status']) => {
    switch (status) {
      case 'excellent':
        return 'Excellent';
      case 'good':
        return 'Bon';
      case 'average':
        return 'Moyen';
      case 'needs_improvement':
        return 'À améliorer';
      default:
        return status;
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Medal className="w-6 h-6 text-neotech-600" />
        <h2 className="text-xl font-semibold">Performance</h2>
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
          <TrendingUp className="w-4 h-4 mr-2" />
          Nouvelle évaluation
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employé</TableHead>
              <TableHead>Poste</TableHead>
              <TableHead>Date d'évaluation</TableHead>
              <TableHead>Note</TableHead>
              <TableHead>Performance</TableHead>
              <TableHead>Évaluateur</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPerformance.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.employeeName}</TableCell>
                <TableCell>{record.position}</TableCell>
                <TableCell>{new Date(record.evaluationDate).toLocaleDateString('fr-FR')}</TableCell>
                <TableCell className="flex items-center gap-1">
                  {record.score}
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(record.status)}>
                    {getStatusText(record.status)}
                  </Badge>
                </TableCell>
                <TableCell>{record.reviewerName}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    Voir détails
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

export default EmployeePerformance;
