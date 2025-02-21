
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createOpportunity, updateOpportunity } from '../../services';
import type { Opportunity } from '../../types/crm';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

type OpportunityStage = 'Qualification' | 'Proposition' | 'Négociation' | 'Gagné' | 'Perdu';

interface OpportunityFormProps {
  opportunity?: Opportunity;
  onClose?: () => void;
}

export const OpportunityForm = ({ opportunity, onClose }: OpportunityFormProps) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<Partial<Opportunity>>(opportunity || {
    title: '',
    clientId: '',
    clientName: '',
    value: 0,
    stage: 'Qualification' as OpportunityStage,
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (opportunity?.id) {
        await updateOpportunity(opportunity.id, formData);
        toast.success('Opportunité mise à jour avec succès');
      } else {
        await createOpportunity(formData as Omit<Opportunity, 'id' | 'createdAt' | 'updatedAt'>);
        toast.success('Opportunité créée avec succès');
      }
      queryClient.invalidateQueries({ queryKey: ['opportunities'] });
      onClose?.();
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

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="clientName">Client</Label>
          <Input
            id="clientName"
            value={formData.clientName}
            onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="value">Montant (€)</Label>
          <Input
            id="value"
            type="number"
            value={formData.value}
            onChange={(e) => setFormData(prev => ({ ...prev, value: Number(e.target.value) }))}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="stage">Étape</Label>
          <Select
            value={formData.stage}
            onValueChange={(value: OpportunityStage) => setFormData(prev => ({ ...prev, stage: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une étape" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Qualification">Qualification</SelectItem>
              <SelectItem value="Proposition">Proposition</SelectItem>
              <SelectItem value="Négociation">Négociation</SelectItem>
              <SelectItem value="Gagné">Gagné</SelectItem>
              <SelectItem value="Perdu">Perdu</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="expectedCloseDate">Date de clôture prévue</Label>
          <Input
            id="expectedCloseDate"
            type="date"
            value={formData.expectedCloseDate?.toString().split('T')[0]}
            onChange={(e) => setFormData(prev => ({ ...prev, expectedCloseDate: new Date(e.target.value) }))}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Input
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
        />
      </div>

      <div className="pt-4 flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Annuler
        </Button>
        <Button type="submit">
          {opportunity ? 'Mettre à jour' : 'Créer'}
        </Button>
      </div>
    </form>
  );
};

export const OpportunityFormDialog = ({ opportunity }: { opportunity?: Opportunity }) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={opportunity ? "outline" : "default"} size="sm">
          {opportunity ? 'Modifier' : 'Nouvelle opportunité'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{opportunity ? 'Modifier l\'opportunité' : 'Nouvelle opportunité'}</DialogTitle>
        </DialogHeader>
        <OpportunityForm opportunity={opportunity} onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
