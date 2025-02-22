import { useState } from 'react';
import { FileBarChart, BarChart as BarChartIcon, PieChart as PieChartIcon, LineChart as LineChartIcon, Download, Mail, Calendar, Filter, Search, Save, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
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
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  LineChart,
  Line,
  Legend,
  Cell
} from 'recharts';

const COLORS = ['#9b87f5', '#7E69AB', '#6E59A5', '#8E9196'];

const departmentData = [
  { name: 'R&D', value: 30 },
  { name: 'Marketing', value: 20 },
  { name: 'Ventes', value: 25 },
  { name: 'RH', value: 15 },
];

const positionData = [
  { name: 'Ingénieur', value: 40 },
  { name: 'Manager', value: 15 },
  { name: 'Designer', value: 20 },
  { name: 'Analyste', value: 25 },
];

const evolutionData = [
  { month: 'Jan', employees: 100 },
  { month: 'Fév', employees: 110 },
  { month: 'Mar', employees: 115 },
  { month: 'Avr', employees: 125 },
  { month: 'Mai', employees: 130 },
  { month: 'Juin', employees: 140 },
];

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
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleScheduleReport = () => {
    setShowScheduleDialog(true);
  };

  const handleSaveSchedule = () => {
    toast({
      title: "Rapport planifié",
      description: `Le rapport sera envoyé ${scheduleFrequency} à ${scheduleEmail}`,
    });
    setShowScheduleDialog(false);
  };

  const handleSaveTemplate = () => {
    setShowSaveTemplateDialog(true);
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
    <DashboardLayout>
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
              <DropdownMenuItem onClick={handleScheduleReport}>
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
                <BarChartIcon className="w-5 h-5" />
                Effectifs par département
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#9b87f5">
                      {departmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChartIcon className="w-5 h-5" />
                Distribution des postes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={positionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#9b87f5"
                      dataKey="value"
                    >
                      {positionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChartIcon className="w-5 h-5" />
                Évolution des effectifs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={evolutionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="employees"
                      name="Employés"
                      stroke="#9b87f5"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Dialog open={showSaveTemplateDialog} onOpenChange={setShowSaveTemplateDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Sauvegarder le modèle</DialogTitle>
              <DialogDescription>
                Donnez un nom à votre modèle de rapport pour pouvoir le réutiliser ultérieurement.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="template-name" className="text-right">
                  Nom du modèle
                </Label>
                <Input
                  id="template-name"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowSaveTemplateDialog(false)}>
                Annuler
              </Button>
              <Button onClick={handleConfirmSaveTemplate}>
                <Save className="w-4 h-4 mr-2" />
                Sauvegarder
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Planifier l'envoi du rapport</DialogTitle>
              <DialogDescription>
                Configurez la fréquence d'envoi et l'adresse email de destination.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="schedule-email" className="text-right">
                  Email
                </Label>
                <Input
                  id="schedule-email"
                  type="email"
                  value={scheduleEmail}
                  onChange={(e) => setScheduleEmail(e.target.value)}
                  className="col-span-3"
                  placeholder="exemple@entreprise.com"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="schedule-frequency" className="text-right">
                  Fréquence
                </Label>
                <Select
                  value={scheduleFrequency}
                  onValueChange={setScheduleFrequency}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Sélectionnez une fréquence" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Quotidien</SelectItem>
                    <SelectItem value="weekly">Hebdomadaire</SelectItem>
                    <SelectItem value="monthly">Mensuel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowScheduleDialog(false)}>
                Annuler
              </Button>
              <Button onClick={handleSaveSchedule}>
                <Calendar className="w-4 h-4 mr-2" />
                Planifier
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeReports;
