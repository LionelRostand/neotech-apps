
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
}

const StatCard = ({ title, value, change, icon: Icon }: StatCardProps) => {
  const isPositive = change && change > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6"
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <h4 className="mt-2 text-2xl font-bold text-gray-900">{value}</h4>
        </div>
        <div className="p-3 bg-neotech-100 rounded-lg">
          <Icon className="w-6 h-6 text-neotech-600" />
        </div>
      </div>

      {change && (
        <div className="mt-4 flex items-center">
          {isPositive ? (
            <ArrowUpRight className="w-4 h-4 text-green-500" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-red-500" />
          )}
          <span className={`ml-1 text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {Math.abs(change)}%
          </span>
          <span className="ml-2 text-sm text-gray-500">vs mois dernier</span>
        </div>
      )}
    </motion.div>
  );
};

export default StatCard;
