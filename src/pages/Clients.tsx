
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardStats from '@/components/crm/DashboardStats';
import ClientList from '@/components/crm/ClientList';
import { Button } from '@/components/ui/button';
import { ClientFormDialog } from '@/components/crm/ClientForm';
import { Download, Upload, FileText, TrendingUp, DollarSign, Settings, UserCircle } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';

const Clients = () => {
  const [activeTab, setActiveTab] = useState('list');

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6 pb-16">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
            <p className="text-muted-foreground">
              Gérez vos clients et suivez vos relations commerciales
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
            <Button variant="outline" size="sm">
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
          <TabsList>
            <TabsTrigger value="list" className="flex items-center gap-2">
              <UserCircle className="h-4 w-4" />
              Liste des clients
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Statistiques
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Paramètres
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="space-y-4">
            <ClientList />
          </TabsContent>
          
          <TabsContent value="stats">
            <div className="rounded-lg border bg-card p-8 text-center text-muted-foreground">
              Fonctionnalité à venir : Statistiques détaillées des clients
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <div className="rounded-lg border bg-card p-8 text-center text-muted-foreground">
              Fonctionnalité à venir : Paramètres des clients
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Clients;
