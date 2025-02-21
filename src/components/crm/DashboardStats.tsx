
import { useQuery } from '@tanstack/react-query';
import { getClients } from '../../services';
import type { Client } from '../../types/crm';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, UserCheck, UserPlus, DollarSign } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const COLORS = ['#9b87f5', '#7E69AB', '#6E59A5', '#8E9196'];

const DashboardStats = () => {
  const { data: clients = [] } = useQuery<Client[]>({
    queryKey: ['clients'],
    queryFn: getClients
  });

  // Calcul des statistiques
  const totalClients = clients.length;
  const activeClients = clients.filter(client => client.status === 'Actif').length;
  const prospects = clients.filter(client => client.status === 'Prospect').length;
  const totalRevenue = clients.reduce((sum, client) => sum + (client.salesRevenue || 0), 0);

  // Données pour le graphique par segment
  const clientsBySegment = [
    { name: 'PME', value: clients.filter(c => c.segment === 'PME').length },
    { name: 'Grand Compte', value: clients.filter(c => c.segment === 'Grand Compte').length },
    { name: 'Particulier', value: clients.filter(c => c.segment === 'Particulier').length },
  ];

  // Données pour le graphique par origine
  const clientsByOrigin = [
    { name: 'Web', value: clients.filter(c => c.origin === 'Web').length },
    { name: 'Direct', value: clients.filter(c => c.origin === 'Direct').length },
    { name: 'Référence', value: clients.filter(c => c.origin === 'Référence').length },
    { name: 'Partenaire', value: clients.filter(c => c.origin === 'Partenaire').length },
  ];

  return (
    <>
      <Card className="col-span-full lg:col-span-4 glass-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-medium">Aperçu des clients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Total Clients</span>
              </div>
              <p className="text-2xl font-bold mt-2">{totalClients}</p>
            </div>

            <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
              <div className="flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Clients Actifs</span>
              </div>
              <p className="text-2xl font-bold mt-2">{activeClients}</p>
            </div>

            <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
              <div className="flex items-center gap-2">
                <UserPlus className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Prospects</span>
              </div>
              <p className="text-2xl font-bold mt-2">{prospects}</p>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 border border-primary/20 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-primary/80">Chiffre d'affaires</span>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-primary">
                  {totalRevenue.toLocaleString('fr-FR', {
                    style: 'currency',
                    currency: 'EUR',
                    maximumFractionDigits: 0
                  })}
                </p>
                <p className="text-xs text-primary/60">Revenus totaux</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-full md:col-span-2 glass-card">
        <CardHeader>
          <CardTitle className="text-base font-medium">Répartition par segment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={clientsBySegment}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#9b87f5"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {clientsBySegment.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-full md:col-span-2 glass-card">
        <CardHeader>
          <CardTitle className="text-base font-medium">Distribution par origine</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={clientsByOrigin}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#9b87f5" radius={[4, 4, 0, 0]}>
                  {clientsByOrigin.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default DashboardStats;
