
import { useState } from 'react';
import { Medal, Search, Star, TrendingUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

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
  const [performance, setPerformance] = useState<Performance[]>(mockPerformance);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newEvaluation, setNewEvaluation] = useState({
    employeeName: '',
    position: '',
    score: 3,
    reviewerName: '',
  });

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

  const getStatusFromScore = (score: number): Performance['status'] => {
    if (score >= 4.5) return 'excellent';
    if (score >= 3.5) return 'good';
    if (score >= 2.5) return 'average';
    return 'needs_improvement';
  };

  const handleCreateEvaluation = () => {
    const newRecord: Performance = {
      id: (performance.length + 1).toString(),
      employeeName: newEvaluation.employeeName,
      position: newEvaluation.position,
      evaluationDate: new Date().toISOString().split('T')[0],
      score: newEvaluation.score,
      status: getStatusFromScore(newEvaluation.score),
      reviewerName: newEvaluation.reviewerName,
    };

    setPerformance([...performance, newRecord]);
    setDialogOpen(false);
    setNewEvaluation({
      employeeName: '',
      position: '',
      score: 3,
      reviewerName: '',
    });
    toast.success("Nouvelle évaluation créée avec succès");
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
        <Button onClick={() => setDialogOpen(true)}>
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

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nouvelle évaluation de performance</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Nom de l'employé</Label>
              <Input
                value={newEvaluation.employeeName}
                onChange={(e) => setNewEvaluation({ ...newEvaluation, employeeName: e.target.value })}
                placeholder="Nom de l'employé"
              />
            </div>
            <div className="space-y-2">
              <Label>Poste</Label>
              <Input
                value={newEvaluation.position}
                onChange={(e) => setNewEvaluation({ ...newEvaluation, position: e.target.value })}
                placeholder="Poste de l'employé"
              />
            </div>
            <div className="space-y-2">
              <Label>Note (1-5)</Label>
              <Input
                type="number"
                min="1"
                max="5"
                step="0.5"
                value={newEvaluation.score}
                onChange={(e) => setNewEvaluation({ ...newEvaluation, score: parseFloat(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label>Évaluateur</Label>
              <Input
                value={newEvaluation.reviewerName}
                onChange={(e) => setNewEvaluation({ ...newEvaluation, reviewerName: e.target.value })}
                placeholder="Nom de l'évaluateur"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleCreateEvaluation}>
              Créer l'évaluation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployeePerformance;

