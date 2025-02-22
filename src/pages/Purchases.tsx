
import DashboardLayout from '../components/layout/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Package, TrendingDown, FileText, BarChart2 } from 'lucide-react';

const Purchases = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 p-6 pb-16">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Achats</h1>
            <p className="text-muted-foreground">
              Gérez vos commandes fournisseurs et suivez vos dépenses
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total des achats</CardTitle>
              <Package className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">0,00 €</div>
              <p className="text-xs text-muted-foreground">
                Ce mois-ci
              </p>
            </CardContent>
          </Card>

          <Card className="hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Commandes en cours</CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">0</div>
              <p className="text-xs text-muted-foreground">
                À réceptionner
              </p>
            </CardContent>
          </Card>

          <Card className="hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Évolution des dépenses</CardTitle>
              <TrendingDown className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">+0%</div>
              <p className="text-xs text-muted-foreground">
                Par rapport au mois dernier
              </p>
            </CardContent>
          </Card>

          <Card className="hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Budget mensuel</CardTitle>
              <BarChart2 className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">0%</div>
              <p className="text-xs text-muted-foreground">
                Du budget consommé
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="rounded-lg border bg-card p-8 text-center text-muted-foreground">
          La gestion des achats est en cours de développement. 
          Bientôt, vous pourrez gérer vos commandes fournisseurs, suivre vos dépenses et analyser vos coûts.
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Purchases;
