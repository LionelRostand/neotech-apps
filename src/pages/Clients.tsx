
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardStats from '@/components/crm/DashboardStats';
import ClientList from '@/components/crm/ClientList';
import { Button } from '@/components/ui/button';
import { ClientFormDialog } from '@/components/crm/ClientForm';
import { Download, Upload } from 'lucide-react';

const Clients = () => {
  const [activeTab, setActiveTab] = useState('list');

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestion des Clients</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => {}}>
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button variant="outline" size="sm" onClick={() => {}}>
            <Upload className="h-4 w-4 mr-2" />
            Importer
          </Button>
          <ClientFormDialog />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Liste des clients</TabsTrigger>
          <TabsTrigger value="dashboard">Tableau de bord</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <ClientList />
        </TabsContent>

        <TabsContent value="dashboard">
          <DashboardStats />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Clients;
