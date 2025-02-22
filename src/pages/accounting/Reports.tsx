
import React from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileSpreadsheet, FileText, Download } from 'lucide-react';

const AccountingReports = () => {
  const { toast } = useToast();

  const handleGenerateReport = (type: string) => {
    toast({
      title: "Génération de rapport",
      description: `La génération du rapport ${type} a été initiée`,
    });
  };

  const handleExport = (format: string) => {
    toast({
      title: "Export de données",
      description: `L'export au format ${format} a été initié`,
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Reports</h2>
      <div className="grid gap-6">
        {/* États financiers */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">États Financiers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg bg-gray-50">
              <h4 className="font-medium mb-2">Bilan Comptable</h4>
              <p className="text-sm text-gray-600 mb-4">
                Situation financière de l'entreprise
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Dernière génération: 01/02/2024</span>
                <Button
                  onClick={() => handleGenerateReport('bilan')}
                  variant="outline"
                  size="sm"
                >
                  Générer
                </Button>
              </div>
            </div>
            <div className="p-4 border rounded-lg bg-gray-50">
              <h4 className="font-medium mb-2">Compte de Résultat</h4>
              <p className="text-sm text-gray-600 mb-4">
                Performance financière sur la période
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Dernière génération: 01/02/2024</span>
                <Button
                  onClick={() => handleGenerateReport('resultat')}
                  variant="outline"
                  size="sm"
                >
                  Générer
                </Button>
              </div>
            </div>
            <div className="p-4 border rounded-lg bg-gray-50">
              <h4 className="font-medium mb-2">Flux de Trésorerie</h4>
              <p className="text-sm text-gray-600 mb-4">
                Mouvements de trésorerie détaillés
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Dernière génération: 01/02/2024</span>
                <Button
                  onClick={() => handleGenerateReport('tresorerie')}
                  variant="outline"
                  size="sm"
                >
                  Générer
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Analyses et tableaux de bord */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Analyses Financières</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Indicateur</TableHead>
                <TableHead>Valeur</TableHead>
                <TableHead>Évolution</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Ratio de liquidité</TableCell>
                <TableCell>1.5</TableCell>
                <TableCell className="text-green-600">+0.2</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleGenerateReport('liquidite')}
                    variant="outline"
                    size="sm"
                  >
                    Détails
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Rentabilité</TableCell>
                <TableCell>12%</TableCell>
                <TableCell className="text-red-600">-2%</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleGenerateReport('rentabilite')}
                    variant="outline"
                    size="sm"
                  >
                    Détails
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Délai moyen de paiement</TableCell>
                <TableCell>45 jours</TableCell>
                <TableCell className="text-green-600">-5 jours</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleGenerateReport('delais')}
                    variant="outline"
                    size="sm"
                  >
                    Détails
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* Export des données */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Export des Données</h3>
          <div className="flex gap-4">
            <Button
              onClick={() => handleExport('excel')}
              variant="outline"
              className="flex items-center gap-2"
            >
              <FileSpreadsheet className="h-4 w-4" />
              Export Excel
            </Button>
            <Button
              onClick={() => handleExport('pdf')}
              variant="outline"
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Export PDF
            </Button>
            <Button
              onClick={() => handleExport('bi')}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export BI
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountingReports;
