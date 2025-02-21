
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createClient, updateClient } from '../../services';
import type { Client, ClientStatus, ClientPriority, ClientSegment, ClientOrigin } from '../../types/crm';
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
    status: 'Prospect',
    segment: 'PME',
    priority: 'Moyenne',
    origin: 'Direct',
    contacts: [],
    interactions: [],
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
            onValueChange={(value: ClientStatus) => setFormData(prev => ({ ...prev, status: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Prospect">Prospect</SelectItem>
              <SelectItem value="Actif">Actif</SelectItem>
              <SelectItem value="Inactif">Inactif</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="priority">Priorité</Label>
          <Select
            value={formData.priority}
            onValueChange={(value: ClientPriority) => setFormData(prev => ({ ...prev, priority: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une priorité" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Basse">Basse</SelectItem>
              <SelectItem value="Moyenne">Moyenne</SelectItem>
              <SelectItem value="Haute">Haute</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="segment">Segment</Label>
          <Select
            value={formData.segment}
            onValueChange={(value: ClientSegment) => setFormData(prev => ({ ...prev, segment: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un segment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PME">PME</SelectItem>
              <SelectItem value="Grand Compte">Grand Compte</SelectItem>
              <SelectItem value="Particulier">Particulier</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="origin">Origine</Label>
          <Select
            value={formData.origin}
            onValueChange={(value: ClientOrigin) => setFormData(prev => ({ ...prev, origin: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une origine" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Référence">Référence</SelectItem>
              <SelectItem value="Web">Web</SelectItem>
              <SelectItem value="Direct">Direct</SelectItem>
              <SelectItem value="Partenaire">Partenaire</SelectItem>
            </SelectContent>
          </Select>
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
