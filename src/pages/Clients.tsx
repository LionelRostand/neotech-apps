
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardStats from '@/components/crm/DashboardStats';
import ClientList from '@/components/crm/ClientList';
import { Button } from '@/components/ui/button';
import { ClientFormDialog } from '@/components/crm/ClientForm';
import { Download, Upload, FileText, TrendingUp, DollarSign, Settings, UserCircle } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { toast } from "sonner";

const Clients = () => {
  const [activeTab, setActiveTab] = useState('list');

  const handleExport = () => {
    toast.info("L'export des clients sera bientôt disponible");
  };

  const handleImport = () => {
    toast.info("L'import des clients sera bientôt disponible");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6 pb-16 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-primary">Clients</h1>
            <p className="text-muted-foreground">
              Gérez vos clients et suivez vos relations commerciales
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleExport} className="hover:bg-primary/10">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
            <Button variant="outline" size="sm" onClick={handleImport} className="hover:bg-primary/10">
              <Upload className="h-4 w-4 mr-2" />
              Importer
            </Button>
            <ClientFormDialog />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DashboardStats />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-background border">
            <TabsTrigger value="list" className="flex items-center gap-2 data-[state=active]:bg-primary/10">
              <UserCircle className="h-4 w-4" />
              Liste des clients
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2 data-[state=active]:bg-primary/10">
              <TrendingUp className="h-4 w-4" />
              Statistiques
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2 data-[state=active]:bg-primary/10">
              <Settings className="h-4 w-4" />
              Paramètres
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="space-y-4">
            <div className="glass-card">
              <ClientList />
            </div>
          </TabsContent>
          
          <TabsContent value="stats">
            <div className="rounded-lg border bg-card/50 backdrop-blur-sm p-8 text-center text-muted-foreground shadow-sm">
              <div className="flex flex-col items-center gap-2">
                <TrendingUp className="h-8 w-8 text-primary/50" />
                <h3 className="font-semibold">Statistiques détaillées des clients</h3>
                <p>Cette fonctionnalité sera bientôt disponible</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <div className="rounded-lg border bg-card/50 backdrop-blur-sm p-8 text-center text-muted-foreground shadow-sm">
              <div className="flex flex-col items-center gap-2">
                <Settings className="h-8 w-8 text-primary/50" />
                <h3 className="font-semibold">Paramètres des clients</h3>
                <p>Cette fonctionnalité sera bientôt disponible</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Clients;
