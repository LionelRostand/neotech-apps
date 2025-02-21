
import { useQuery } from '@tanstack/react-query';
import { getClients, getOpportunities } from '../../services/crm';
import StatCard from '../dashboard/StatCard';
import { Users, TrendingUp, CheckCircle2, Timer } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const DashboardStats = () => {
  const { data: clients = [] } = useQuery({
    queryKey: ['clients'],
    queryFn: getClients
  });

  const { data: opportunities = [] } = useQuery({
    queryKey: ['opportunities'],
    queryFn: getOpportunities
  });

  // Calcul des statistiques
  const totalClients = clients.length;
  const activeOpportunities = opportunities.filter(opp => 
    !['Gagné', 'Perdu'].includes(opp.stage)
  ).length;
  const wonOpportunities = opportunities.filter(opp => opp.stage === 'Gagné').length;
  const totalPipeline = opportunities.reduce((sum, opp) => 
    !['Gagné', 'Perdu'].includes(opp.stage) ? sum + opp.value : sum, 0
  );

  // Préparation des données pour le graphique
  const opportunitiesByStage = [
    { name: 'Qualification', value: opportunities.filter(opp => opp.stage === 'Qualification').length },
    { name: 'Proposition', value: opportunities.filter(opp => opp.stage === 'Proposition').length },
    { name: 'Négociation', value: opportunities.filter(opp => opp.stage === 'Négociation').length },
    { name: 'Gagné', value: opportunities.filter(opp => opp.stage === 'Gagné').length },
    { name: 'Perdu', value: opportunities.filter(opp => opp.stage === 'Perdu').length },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Clients"
          value={totalClients}
          icon={Users}
        />
        <StatCard
          title="Opportunités actives"
          value={activeOpportunities}
          icon={Timer}
        />
        <StatCard
          title="Opportunités gagnées"
          value={wonOpportunities}
          icon={CheckCircle2}
        />
        <StatCard
          title="Pipeline total"
          value={totalPipeline.toLocaleString('fr-FR', {
            style: 'currency',
            currency: 'EUR',
          })}
          icon={TrendingUp}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Distribution des opportunités par étape</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={opportunitiesByStage}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
