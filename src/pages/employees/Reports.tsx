
import { useState } from 'react';
import { FileBarChart, BarChart, PieChart, LineChart, Download, Mail, Calendar, Filter, Search, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AdvancedFilters, { FilterCondition } from '@/components/employees/AdvancedFilters';

const EmployeeReports = () => {
  const [selectedColumns, setSelectedColumns] = useState(['department', 'position', 'salary']);
  const [exportFormat, setExportFormat] = useState('pdf');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const handleExport = () => {
    console.log(`Exporting in ${exportFormat} format...`);
    // Implémentation de l'export à venir
  };

  const handleEmailReport = () => {
    console.log('Preparing email report...');
    // Implémentation de l'envoi par email à venir
  };

  const handleScheduleReport = () => {
    console.log('Opening schedule dialog...');
    // Implémentation de la planification à venir
  };

  const handleSaveTemplate = () => {
    console.log('Saving report template...');
    // Implémentation de la sauvegarde du modèle à venir
  };

  const handleApplyFilters = (filters: FilterCondition[]) => {
    console.log('Applied filters:', filters);
    // Implémentation du filtrage à venir
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FileBarChart className="w-6 h-6 text-neotech-600" />
          <h2 className="text-xl font-semibold">Rapports RH</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-64"
            />
          </div>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={showAdvancedFilters ? 'bg-gray-100' : ''}
          >
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {showAdvancedFilters && (
        <div className="mb-6">
          <AdvancedFilters onApplyFilters={handleApplyFilters} />
        </div>
      )}

      <div className="flex flex-wrap gap-4 mb-6">
        <Select onValueChange={(value) => setExportFormat(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Format d'export" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pdf">PDF</SelectItem>
            <SelectItem value="excel">Excel</SelectItem>
            <SelectItem value="csv">CSV</SelectItem>
          </SelectContent>
        </Select>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleExport()}>
              Télécharger
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEmailReport()}>
              <Mail className="w-4 h-4 mr-2" />
              Envoyer par email
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleScheduleReport()}>
              <Calendar className="w-4 h-4 mr-2" />
              Planifier l'envoi
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="outline" onClick={handleSaveTemplate}>
          <Save className="w-4 h-4 mr-2" />
          Sauvegarder le modèle
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="w-5 h-5" />
              Effectifs par département
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center bg-gray-100 rounded-lg">
              Chart: Effectifs par département
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Distribution des postes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center bg-gray-100 rounded-lg">
              Chart: Distribution des postes
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="w-5 h-5" />
              Évolution des effectifs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center bg-gray-100 rounded-lg">
              Chart: Évolution des effectifs
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeReports;
