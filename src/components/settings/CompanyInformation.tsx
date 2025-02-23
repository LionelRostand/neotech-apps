
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const CompanyInformation = () => {
  return (
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
  );
};
