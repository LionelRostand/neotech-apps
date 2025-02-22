
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getQuotes, createQuote, updateQuote, deleteQuote } from '@/services/quoteService';
import type { Quote } from '@/types/sales';
import { QuoteFormDialog } from '@/components/sales/QuoteForm';
import { GeneralSettings } from '@/components/settings/GeneralSettings';
import { QuotesHeader } from '@/components/sales/quotes/QuotesHeader';
import { QuotesTable } from '@/components/sales/quotes/QuotesTable';
import { FileText, ShoppingCart, Settings } from 'lucide-react';

const QuotesView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<Quote | undefined>();
  const [activeTab, setActiveTab] = useState('quotes');
  const queryClient = useQueryClient();

  const { data: quotes = [], isLoading } = useQuery({
    queryKey: ['quotes'],
    queryFn: getQuotes,
    staleTime: 60000,
    gcTime: 300000,
  });

  const filteredQuotes = quotes.filter(quote =>
    (quote.clientName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (quote.number?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const handleCreateOrUpdateQuote = async (quoteData: Omit<Quote, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      if (selectedQuote?.id) {
        await updateQuote(selectedQuote.id, quoteData);
      } else {
        await createQuote(quoteData);
      }
      await queryClient.invalidateQueries({ queryKey: ['quotes'] });
      toast.success(selectedQuote?.id ? "Devis modifié avec succès" : "Devis créé avec succès");
      handleFormClose();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du devis:', error);
      toast.error("Une erreur est survenue lors de la sauvegarde du devis");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteQuote(id);
      await queryClient.invalidateQueries({ queryKey: ['quotes'] });
      toast.success("Devis supprimé avec succès");
    } catch (error) {
      console.error('Erreur lors de la suppression du devis:', error);
      toast.error("Erreur lors de la suppression du devis");
    }
  };

  const handleFormClose = () => {
    setSelectedQuote(undefined);
    setIsFormOpen(false);
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="space-y-4">
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
          <QuotesHeader
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onNewQuote={() => setIsFormOpen(true)}
          />

          <QuotesTable
            quotes={filteredQuotes}
            onEdit={(quote) => {
              setSelectedQuote(quote);
              setIsFormOpen(true);
            }}
            onDelete={handleDelete}
          />

          <QuoteFormDialog
            open={isFormOpen}
            onOpenChange={handleFormClose}
            quote={selectedQuote}
            onSubmit={handleCreateOrUpdateQuote}
          />
        </TabsContent>

        <TabsContent value="templates">
          <div className="rounded-lg border bg-card p-8 text-center text-muted-foreground">
            Fonctionnalité à venir : Gestion des modèles de devis
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <GeneralSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QuotesView;
