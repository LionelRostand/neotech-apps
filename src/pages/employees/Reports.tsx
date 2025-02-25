
import { useState } from 'react';
import { FileBarChart, Download, Mail, Calendar, Filter, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import AdvancedFilters, { FilterCondition } from '@/components/employees/AdvancedFilters';
import DepartmentChart from '@/components/employees/reports/DepartmentChart';
import PositionChart from '@/components/employees/reports/PositionChart';
import EvolutionChart from '@/components/employees/reports/EvolutionChart';
import SaveTemplateDialog from '@/components/employees/reports/SaveTemplateDialog';
import ReportScheduleDialog from '@/components/employees/reports/ReportScheduleDialog';

const availableColumns = [
  { id: 'department', label: 'Département' },
  { id: 'position', label: 'Poste' },
  { id: 'salary', label: 'Salaire' },
  { id: 'hireDate', label: 'Date d\'embauche' },
  { id: 'status', label: 'Statut' },
  { id: 'manager', label: 'Manager' },
  { id: 'team', label: 'Équipe' },
];

const EmployeeReports = () => {
  const [selectedColumns, setSelectedColumns] = useState(['department', 'position', 'salary']);
  const [exportFormat, setExportFormat] = useState('pdf');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showSaveTemplateDialog, setShowSaveTemplateDialog] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [scheduleEmail, setScheduleEmail] = useState('');
  const [scheduleFrequency, setScheduleFrequency] = useState('weekly');
  const { toast } = useToast();

  const handleExport = () => {
    toast({
      title: "Export en cours",
      description: `Export au format ${exportFormat} en préparation...`,
    });
  };

  const handleEmailReport = () => {
    toast({
      title: "Envoi du rapport",
      description: "Le rapport va être envoyé par email...",
    });
  };

  const handleSaveSchedule = () => {
    toast({
      title: "Rapport planifié",
      description: `Le rapport sera envoyé ${scheduleFrequency} à ${scheduleEmail}`,
    });
    setShowScheduleDialog(false);
  };

  const handleConfirmSaveTemplate = () => {
    toast({
      title: "Modèle sauvegardé",
      description: `Le modèle "${templateName}" a été sauvegardé avec succès.`,
    });
    setShowSaveTemplateDialog(false);
    setTemplateName('');
  };

  const handleApplyFilters = (filters: FilterCondition[]) => {
    console.log('Applied filters:', filters);
  };

  const toggleColumn = (columnId: string) => {
    setSelectedColumns(current =>
      current.includes(columnId)
        ? current.filter(id => id !== columnId)
        : [...current, columnId]
    );
  };

  return (
    <div className="space-y-6 p-6 animate-fade-in">
      <Card className="border-none shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-2xl font-semibold flex items-center gap-2">
            <FileBarChart className="w-6 h-6 text-neotech-600" />
            Rapports RH
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Colonnes
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Colonnes visibles</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {availableColumns.map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={selectedColumns.includes(column.id)}
                    onCheckedChange={() => toggleColumn(column.id)}
                  >
                    {column.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

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
                <DropdownMenuItem onClick={handleExport}>
                  Télécharger
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleEmailReport}>
                  <Mail className="w-4 h-4 mr-2" />
                  Envoyer par email
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowScheduleDialog(true)}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Planifier l'envoi
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" onClick={() => setShowSaveTemplateDialog(true)}>
              <Save className="w-4 h-4 mr-2" />
              Sauvegarder le modèle
            </Button>

            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={showAdvancedFilters ? 'bg-gray-100' : ''}
            >
              <Filter className="w-4 h-4" />
            </Button>
          </div>

          {showAdvancedFilters && (
            <div className="mb-6">
              <AdvancedFilters onApplyFilters={handleApplyFilters} />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DepartmentChart />
            <PositionChart />
            <EvolutionChart />
          </div>

          <SaveTemplateDialog
            open={showSaveTemplateDialog}
            onOpenChange={setShowSaveTemplateDialog}
            templateName={templateName}
            setTemplateName={setTemplateName}
            onSave={handleConfirmSaveTemplate}
          />

          <ReportScheduleDialog
            open={showScheduleDialog}
            onOpenChange={setShowScheduleDialog}
            scheduleEmail={scheduleEmail}
            setScheduleEmail={setScheduleEmail}
            scheduleFrequency={scheduleFrequency}
            setScheduleFrequency={setScheduleFrequency}
            onSave={handleSaveSchedule}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeReports;
