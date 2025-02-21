
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, TrendingUp, DollarSign } from 'lucide-react';
import QuotesView from '@/components/sales/QuotesView';
import { getQuotes } from '@/services';
import type { Quote } from '@/types/sales';

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
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Devis</h1>
        <p className="text-muted-foreground">
          Gérez vos devis et suivez leur évolution
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total des devis</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
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

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Devis acceptés</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.acceptedQuotes}</div>
            <p className="text-xs text-muted-foreground">
              Devis signés par les clients
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Devis en attente</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingQuotes}</div>
            <p className="text-xs text-muted-foreground">
              En attente de réponse
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de conversion</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
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
          <TabsTrigger value="quotes">Tous les devis</TabsTrigger>
          <TabsTrigger value="templates">Modèles</TabsTrigger>
          <TabsTrigger value="settings">Paramètres</TabsTrigger>
        </TabsList>
        <TabsContent value="quotes" className="space-y-4">
          <QuotesView />
        </TabsContent>
        <TabsContent value="templates">
          <div className="rounded-lg border bg-card p-8 text-center text-muted-foreground">
            Fonctionnalité à venir : Gestion des modèles de devis
          </div>
        </TabsContent>
        <TabsContent value="settings">
          <div className="rounded-lg border bg-card p-8 text-center text-muted-foreground">
            Fonctionnalité à venir : Paramètres des devis
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Sales;
