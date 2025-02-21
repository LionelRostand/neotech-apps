
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ModuleCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  value?: string | number;
  onClick?: () => void;
}

const ModuleCard = ({ icon: Icon, title, description, value, onClick }: ModuleCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="glass-card p-6 cursor-pointer transition-all duration-200"
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="p-3 bg-neotech-100 rounded-lg">
          <Icon className="w-6 h-6 text-neotech-600" />
        </div>
        {value && (
          <span className="text-2xl font-semibold text-neotech-600">{value}</span>
        )}
      </div>
      
      <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </motion.div>
  );
};

export default ModuleCard;
