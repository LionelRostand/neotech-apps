
import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Route, Scan, TrendingUp, Truck } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';

const Freight = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Set initial active tab based on current path
    const path = location.pathname;
    if (path.includes('/routes')) {
      setActiveTab('routes');
    } else if (path.includes('/tracking')) {
      setActiveTab('tracking');
    } else {
      setActiveTab('overview');
    }
  }, [location.pathname]);

  // Données simulées pour les statistiques
  const stats = {
    activeOrders: 48,
    deliveriesInProgress: 12,
    parcelsScanned: 156,
    onTimeDelivery: 94.5
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    switch (value) {
      case 'overview':
        navigate('/freight/orders', { replace: true });
        break;
      case 'routes':
        navigate('/freight/routes', { replace: true });
        break;
      case 'tracking':
        navigate('/freight/tracking', { replace: true });
        break;
      default:
        navigate('/freight/orders', { replace: true });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6 pb-16">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Transport</h1>
            <p className="text-muted-foreground">
              Gérez vos commandes de transport et suivez vos livraisons
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Commandes actives</CardTitle>
              <Package className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.activeOrders}</div>
              <p className="text-xs text-muted-foreground">
                Commandes en cours
              </p>
            </CardContent>
          </Card>

          <Card className="hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Livraisons en cours</CardTitle>
              <Truck className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.deliveriesInProgress}</div>
              <p className="text-xs text-muted-foreground">
                En transit
              </p>
            </CardContent>
          </Card>

          <Card className="hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Colis scannés</CardTitle>
              <Scan className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.parcelsScanned}</div>
              <p className="text-xs text-muted-foreground">
                Aujourd'hui
              </p>
            </CardContent>
          </Card>

          <Card className="hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Livraison à l'heure</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {stats.onTimeDelivery}%
              </div>
              <p className="text-xs text-muted-foreground">
                Taux de ponctualité
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Vue d'ensemble
            </TabsTrigger>
            <TabsTrigger value="routes" className="flex items-center gap-2">
              <Route className="h-4 w-4" />
              Itinéraires
            </TabsTrigger>
            <TabsTrigger value="tracking" className="flex items-center gap-2">
              <Scan className="h-4 w-4" />
              Suivi
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Outlet />
          </TabsContent>
          <TabsContent value="routes">
            <Outlet />
          </TabsContent>
          <TabsContent value="tracking">
            <Outlet />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Freight;
