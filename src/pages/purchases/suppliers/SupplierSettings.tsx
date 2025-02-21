
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SupplierSettings = () => {
  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Paramètres fournisseurs</h1>
          <p className="text-muted-foreground">
            Configurez les paramètres généraux pour la gestion des fournisseurs
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Numérotation automatique</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="supplier-prefix" className="text-sm font-medium">
                Préfixe des codes fournisseurs
              </label>
              <Input
                id="supplier-prefix"
                placeholder="FOUR-"
                className="max-w-xs"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="supplier-digits" className="text-sm font-medium">
                Nombre de chiffres
              </label>
              <Input
                id="supplier-digits"
                type="number"
                placeholder="5"
                className="max-w-xs"
              />
            </div>
          </div>
          <Button className="mt-4">
            Enregistrer
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Conditions de paiement par défaut</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="payment-terms" className="text-sm font-medium">
                Délai de paiement
              </label>
              <Input
                id="payment-terms"
                placeholder="30"
                className="max-w-xs"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="default-currency" className="text-sm font-medium">
                Devise par défaut
              </label>
              <Input
                id="default-currency"
                placeholder="EUR"
                className="max-w-xs"
              />
            </div>
          </div>
          <Button className="mt-4">
            Enregistrer
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupplierSettings;
