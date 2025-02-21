
import { Users, ShoppingCart, CreditCard, TrendingUp, Package, FileText } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import StatCard from '../components/dashboard/StatCard';
import ModuleCard from '../components/modules/ModuleCard';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="mt-1 text-gray-500">Vue d'ensemble de votre activité</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Clients actifs"
            value="1,234"
            change={12}
            icon={Users}
          />
          <StatCard
            title="Ventes du mois"
            value="€45,678"
            change={-2.5}
            icon={ShoppingCart}
          />
          <StatCard
            title="Commandes en cours"
            value="89"
            change={5.8}
            icon={Package}
          />
          <StatCard
            title="Chiffre d'affaires"
            value="€123,456"
            change={8.2}
            icon={TrendingUp}
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Modules principaux</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ModuleCard
              icon={Users}
              title="CRM & Ventes"
              description="Gérez vos contacts et opportunités commerciales"
            />
            <ModuleCard
              icon={ShoppingCart}
              title="Gestion des achats"
              description="Suivez vos commandes et fournisseurs"
            />
            <ModuleCard
              icon={Package}
              title="Stocks & Logistique"
              description="Optimisez votre gestion des stocks"
            />
            <ModuleCard
              icon={CreditCard}
              title="Facturation"
              description="Gérez vos factures et paiements"
            />
            <ModuleCard
              icon={FileText}
              title="Comptabilité"
              description="Suivez vos opérations comptables"
            />
            <ModuleCard
              icon={TrendingUp}
              title="Rapports"
              description="Analysez vos performances"
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
