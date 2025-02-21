
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const SupplierAnalytics = () => {
  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analyse fournisseurs</h1>
          <p className="text-muted-foreground">
            Analysez les performances et statistiques de vos fournisseurs
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Montant total des achats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0,00 €</div>
            <p className="text-xs text-muted-foreground">
              +0% par rapport au mois dernier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Délai moyen de livraison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0 jours</div>
            <p className="text-xs text-muted-foreground">
              Sur les 30 derniers jours
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Taux de conformité</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0%</div>
            <p className="text-xs text-muted-foreground">
              Sur les dernières livraisons
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Graphiques et statistiques détaillées</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex items-center justify-center text-muted-foreground">
            Les graphiques et analyses détaillées seront bientôt disponibles
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupplierAnalytics;
