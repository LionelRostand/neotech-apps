
import React from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";

export const GeneralSettings = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Handle form submission
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Paramètres généraux</h1>
          <p className="text-muted-foreground">Configurez les paramètres généraux de l'application.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6">
          {/* Informations de la société */}
          <Card>
            <CardHeader>
              <CardTitle>Informations de la société</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Nom de la société</Label>
                <Input id="company-name" placeholder="Entrez le nom de votre société" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-address">Adresse</Label>
                <Input id="company-address" placeholder="Entrez l'adresse de votre société" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-phone">Téléphone</Label>
                <Input id="company-phone" type="tel" placeholder="Entrez le numéro de téléphone" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-email">Email</Label>
                <Input id="company-email" type="email" placeholder="Entrez l'email de contact" />
              </div>
            </CardContent>
          </Card>

          {/* Localisation */}
          <Card>
            <CardHeader>
              <CardTitle>Localisation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">Langue</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une langue" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Droits d'accès aux modules */}
          <Card>
            <CardHeader>
              <CardTitle>Gestion des droits d'accès aux modules</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Modules actifs</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="crm-module" className="rounded border-gray-300" />
                    <Label htmlFor="crm-module">CRM</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="sales-module" className="rounded border-gray-300" />
                    <Label htmlFor="sales-module">Ventes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="purchases-module" className="rounded border-gray-300" />
                    <Label htmlFor="purchases-module">Achats</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="freight-module" className="rounded border-gray-300" />
                    <Label htmlFor="freight-module">Transport</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fuseau horaire */}
          <Card>
            <CardHeader>
              <CardTitle>Fuseau horaire</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="timezone">Fuseau horaire</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un fuseau horaire" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Europe/Paris">Europe/Paris (UTC+1)</SelectItem>
                    <SelectItem value="Europe/London">Europe/London (UTC)</SelectItem>
                    <SelectItem value="America/New_York">America/New_York (UTC-5)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Devise */}
          <Card>
            <CardHeader>
              <CardTitle>Devise</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currency">Devise par défaut</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une devise" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EUR">Euro (€)</SelectItem>
                    <SelectItem value="USD">Dollar US ($)</SelectItem>
                    <SelectItem value="GBP">Livre Sterling (£)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit">
              Enregistrer les modifications
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default GeneralSettings;
