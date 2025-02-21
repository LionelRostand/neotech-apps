
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createClient, updateClient } from '../../services';
import type { Client } from '../../types/crm';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface ClientFormProps {
  client?: Client;
  onClose?: () => void;
}

export const ClientForm = ({ client, onClose }: ClientFormProps) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<Partial<Client>>(client || {
    name: '',
    company: '',
    email: '',
    phone: '',
    status: 'Lead',
    industry: '',
    category: '',
    score: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (client?.id) {
        await updateClient(client.id, formData);
        toast.success('Client mis à jour avec succès');
      } else {
        await createClient(formData as Omit<Client, 'id' | 'createdAt' | 'updatedAt'>);
        toast.success('Client créé avec succès');
      }
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      onClose?.();
    } catch (error) {
      toast.error('Une erreur est survenue');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nom</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Société</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Téléphone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status">Statut</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as Client['status'] }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Lead">Lead</SelectItem>
              <SelectItem value="Prospect">Prospect</SelectItem>
              <SelectItem value="Client">Client</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="industry">Secteur d'activité</Label>
          <Input
            id="industry"
            value={formData.industry}
            onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
          />
        </div>
      </div>

      <div className="pt-4 flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Annuler
        </Button>
        <Button type="submit">
          {client ? 'Mettre à jour' : 'Créer'}
        </Button>
      </div>
    </form>
  );
};

export const ClientFormDialog = ({ client }: { client?: Client }) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={client ? "outline" : "default"} size="sm">
          {client ? 'Modifier' : 'Nouveau client'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{client ? 'Modifier le client' : 'Nouveau client'}</DialogTitle>
        </DialogHeader>
        <ClientForm client={client} onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
