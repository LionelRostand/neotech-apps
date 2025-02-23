
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, TrendingUp, DollarSign, Settings, ShoppingCart } from 'lucide-react';
import QuotesView from '@/components/sales/QuotesView';
import { getQuotes } from '@/services';
import type { Quote } from '@/types/sales';
import DashboardLayout from '../components/layout/DashboardLayout';
import { GeneralSettings } from '../components/settings/GeneralSettings';

const Sales = () => {
  const [activeTab, setActiveTab] = useState('quotes');

  const { data: quotes = [] } = useQuery<Quote[]>({
    queryKey: ['quotes'],
    queryFn: getQuotes,
  });

  const calculateStats = () => {
    const totalAmount = quotes.reduce((sum, quote) => sum + quote.total, 0);
    const acceptedQuotes = quotes.filter(quote => quote.status === 'accepted').length;
    const pendingQuotes = quotes.filter(quote => quote.status === 'sent').length;
    const conversionRate = quotes.length > 0 ? (acceptedQuotes / quotes.length) * 100 : 0;

    return {
      totalAmount,
      acceptedQuotes,
      pendingQuotes,
      conversionRate
    };
  };

  const stats = calculateStats();

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6 pb-16">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Ventes</h1>
            <p className="text-muted-foreground">
              Gérez vos devis et suivez vos performances commerciales
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total des devis</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {stats.totalAmount.toLocaleString('fr-FR', {
                  style: 'currency',
                  currency: 'EUR'
                })}
              </div>
              <p className="text-xs text-muted-foreground">
                Sur tous les devis
              </p>
            </CardContent>
          </Card>

          <Card className="hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Devis acceptés</CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.acceptedQuotes}</div>
              <p className="text-xs text-muted-foreground">
                Devis signés par les clients
              </p>
            </CardContent>
          </Card>

          <Card className="hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Devis en attente</CardTitle>
              <ShoppingCart className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.pendingQuotes}</div>
              <p className="text-xs text-muted-foreground">
                En attente de réponse
              </p>
            </CardContent>
          </Card>

          <Card className="hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taux de conversion</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {stats.conversionRate.toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground">
                Des devis envoyés
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="quotes" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Tous les devis
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Modèles
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Paramètres
            </TabsTrigger>
          </TabsList>
          <TabsContent value="quotes" className="space-y-4">
            <QuotesView />
          </TabsContent>
          <TabsContent value="templates" className="space-y-4">
            <div className="rounded-lg border bg-card p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold">Modèles de devis</h3>
                  <p className="text-sm text-muted-foreground">Gérez vos modèles de devis prédéfinis</p>
                </div>
              </div>
              <Tabs defaultValue="list" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="list" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Liste des modèles
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Paramètres
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="list">
                  <div className="text-center text-muted-foreground">
                    Fonctionnalité à venir : Liste des modèles de devis
                  </div>
                </TabsContent>
                <TabsContent value="settings">
                  <GeneralSettings />
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>
          <TabsContent value="settings">
            <GeneralSettings />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Sales;

