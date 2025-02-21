
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createQuote, updateQuote } from '@/services';
import type { Quote } from '@/types/sales';
import ClientSelect from './ClientSelect';

interface QuoteFormProps {
  quote?: Quote;
  onClose: () => void;
}

interface QuoteFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quote?: Quote;
  onSubmit: (data: Partial<Quote>) => Promise<void>;
}

export const QuoteFormDialog = ({
  open,
  onOpenChange,
  quote,
  onSubmit
}: QuoteFormDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{quote ? 'Modifier le devis' : 'Nouveau devis'}</DialogTitle>
        </DialogHeader>
        <QuoteForm quote={quote} onClose={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
};

export const QuoteForm = ({ quote, onClose }: QuoteFormProps) => {
  const queryClient = useQueryClient();
  const initialData: Partial<Quote> = quote || {
    title: '',
    clientId: '',
    clientName: '',
    description: '',
    total: 0,
    status: 'draft' as const,
    items: [],
    subtotal: 0,
    taxTotal: 0,
    validUntil: new Date(),
    number: `DEV-${Date.now()}`,
  };

  const [formData, setFormData] = useState<Partial<Quote>>(initialData);

  const handleClientChange = (clientId: string) => {
    const selectedClient = queryClient.getQueryData<any>(['clients'])?.find(
      (client: any) => client.id === clientId
    );
    
    if (selectedClient) {
      setFormData(prev => ({
        ...prev,
        clientId,
        clientName: selectedClient.name,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (quote?.id) {
        await updateQuote(quote.id, formData);
        toast.success('Devis mis à jour avec succès');
      } else {
        await createQuote(formData as Quote);
        toast.success('Devis créé avec succès');
      }
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
      onClose();
    } catch (error) {
      toast.error('Une erreur est survenue');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Titre</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="client">Client</Label>
        <ClientSelect 
          value={formData.clientId} 
          onValueChange={handleClientChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="total">Montant total</Label>
          <Input
            id="total"
            type="number"
            value={formData.total}
            onChange={(e) => setFormData(prev => ({ ...prev, total: Number(e.target.value) }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Statut</Label>
          <Select
            value={formData.status}
            onValueChange={(value: Quote['status']) => setFormData(prev => ({ ...prev, status: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Brouillon</SelectItem>
              <SelectItem value="sent">Envoyé</SelectItem>
              <SelectItem value="accepted">Accepté</SelectItem>
              <SelectItem value="rejected">Refusé</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="pt-4 flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Annuler
        </Button>
        <Button type="submit">
          {quote ? 'Mettre à jour' : 'Créer'}
        </Button>
      </div>
    </form>
  );
};

export default QuoteForm;
