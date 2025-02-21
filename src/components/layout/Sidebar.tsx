
import { Home, Users, ShoppingCart, Package, FileText, Settings, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'CRM', path: '/crm' },
  { icon: ShoppingCart, label: 'Ventes', path: '/sales' },
  { icon: Package, label: 'Achats', path: '/purchases' },
  { icon: FileText, label: 'Comptabilité', path: '/accounting' },
  { icon: BarChart2, label: 'Rapports', path: '/reports' },
  { icon: Settings, label: 'Paramètres', path: '/settings' },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <motion.aside 
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-0 h-screen w-64 bg-white border-r shadow-sm"
    >
      <div className="p-6">
        <h1 className="text-2xl font-bold text-neotech-600">NEOTECH</h1>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={index}
              to={item.path}
              className={`
                flex items-center px-6 py-3 text-gray-700 transition-all duration-200
                ${isActive ? 'bg-neotech-50 border-r-4 border-neotech-500' : 'hover:bg-gray-50'}
              `}
            >
              <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-neotech-500' : 'text-gray-400'}`} />
              <span className={isActive ? 'font-medium text-neotech-700' : ''}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
