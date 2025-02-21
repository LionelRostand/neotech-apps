
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Plus,
  FileText,
  Mail,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  Check,
  X,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getQuotes, createQuote, updateQuote, deleteQuote } from '../../services/quoteService';
import type { Quote } from '../../types/sales';
import { QuoteFormDialog } from './QuoteForm';

const QuotesView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<Quote | undefined>();
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
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du devis:', error);
      throw error;
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

  const openEditForm = (quote: Quote) => {
    setSelectedQuote(quote);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setSelectedQuote(undefined);
    setIsFormOpen(false);
  };

  const getStatusColor = (status: Quote['status']) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Rechercher un devis..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau devis
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Numéro</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Validité</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredQuotes.map((quote) => (
              <TableRow key={quote.id}>
                <TableCell className="font-medium">{quote.number}</TableCell>
                <TableCell>{quote.clientName}</TableCell>
                <TableCell>
                  {new Date(quote.createdAt).toLocaleDateString('fr-FR')}
                </TableCell>
                <TableCell>
                  {quote.total.toLocaleString('fr-FR', {
                    style: 'currency',
                    currency: 'EUR',
                  })}
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(quote.status)}`}>
                    {quote.status}
                  </span>
                </TableCell>
                <TableCell>
                  {new Date(quote.validUntil).toLocaleDateString('fr-FR')}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEditForm(quote)}>
                        <Pencil className="h-4 w-4 mr-2" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toast.info("Fonctionnalité à venir")}>
                        <Eye className="h-4 w-4 mr-2" />
                        Voir
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toast.info("Fonctionnalité à venir")}>
                        <Mail className="h-4 w-4 mr-2" />
                        Envoyer
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toast.info("Fonctionnalité à venir")}>
                        <FileText className="h-4 w-4 mr-2" />
                        PDF
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toast.info("Fonctionnalité à venir")}>
                        <Check className="h-4 w-4 mr-2" />
                        Accepter
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toast.info("Fonctionnalité à venir")}>
                        <X className="h-4 w-4 mr-2" />
                        Rejeter
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={() => handleDelete(quote.id!)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <QuoteFormDialog
        open={isFormOpen}
        onOpenChange={handleFormClose}
        quote={selectedQuote}
        onSubmit={handleCreateOrUpdateQuote}
      />
    </div>
  );
};

export default QuotesView;
