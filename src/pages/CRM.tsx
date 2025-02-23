import { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Briefcase, FileText, BarChart2 } from 'lucide-react';
import ClientList from '../components/crm/ClientList';
import PipelineView from '../components/crm/PipelineView';
import DashboardStats from '../components/crm/DashboardStats';
import ContractsView from '../components/crm/ContractsView';
const CRM = () => {
  return <DashboardLayout>
      <div className="space-y-6 p-6 pb-16">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">CRM</h1>
            <p className="text-muted-foreground">
              Gérez vos clients et opportunités commerciales
            </p>
          </div>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList>
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              Tableau de bord
            </TabsTrigger>
            <TabsTrigger value="clients" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Clients
            </TabsTrigger>
            <TabsTrigger value="pipeline" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Pipeline
            </TabsTrigger>
            <TabsTrigger value="contracts" className="flex items-center gap-2 px-0">
              <FileText className="h-4 w-4" />
              Contrats
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <DashboardStats />
          </TabsContent>

          <TabsContent value="clients">
            <ClientList />
          </TabsContent>

          <TabsContent value="pipeline">
            <PipelineView />
          </TabsContent>

          <TabsContent value="contracts">
            <ContractsView />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>;
};
export default CRM;