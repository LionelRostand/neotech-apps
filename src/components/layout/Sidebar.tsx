
import { 
  Home, 
  Users, 
  ShoppingCart, 
  Package, 
  FileText, 
  Settings, 
  BarChart2, 
  UserCircle,
  TrendingDown,
  Box,
  Truck,
  CreditCard,
  FileBarChart,
  Store,
  UserCheck,
  ShieldCheck,
  PieChart,
  ClipboardCheck,
  BookOpen,
  PackageSearch,
  Warehouse,
  Calculator,
  Receipt,
  List,
  User,
  File,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'CRM', path: '/crm' },
  { icon: UserCircle, label: 'Clients', path: '/clients' },
  { icon: ShoppingCart, label: 'Ventes', path: '/sales' },
  { 
    icon: Package, 
    label: 'Achats', 
    path: '/purchases',
    subItems: [
      {
        icon: Store,
        label: 'Fournisseurs',
        path: '/purchases/suppliers',
        subItems: [
          { icon: User, label: 'Liste des fournisseurs', path: '/purchases/suppliers/list', description: 'Gestion des fiches fournisseurs' },
          { icon: File, label: 'Tarifs', path: '/purchases/suppliers/prices', description: 'Gestion des tarifs et listes de prix' },
          { icon: BarChart2, label: 'Statistiques', path: '/purchases/suppliers/analytics', description: 'Analyse des performances fournisseurs' },
          { icon: Settings, label: 'Paramètres', path: '/purchases/suppliers/settings', description: 'Configuration des fournisseurs' }
        ]
      },
      { icon: FileText, label: 'Demandes de prix', path: '/purchases/rfq', description: 'Création et suivi des demandes de prix' },
      { icon: Box, label: 'Bons de commande', path: '/purchases/orders', description: 'Gestion des commandes' },
      { icon: Truck, label: 'Réceptions', path: '/purchases/receipts', description: 'Suivi des livraisons' },
      { icon: Receipt, label: 'Retours', path: '/purchases/returns', description: 'Gestion des retours fournisseurs' },
      { icon: CreditCard, label: 'Factures', path: '/purchases/invoices', description: 'Gestion des factures fournisseurs' },
      { icon: TrendingDown, label: 'Contrats', path: '/purchases/contracts', description: 'Gestion des contrats fournisseurs' },
      { icon: PackageSearch, label: 'Stocks', path: '/purchases/inventory', description: 'Gestion des stocks' },
      { icon: Calculator, label: 'Comptabilité', path: '/purchases/accounting', description: 'Intégration comptable' },
      { icon: FileBarChart, label: 'Analyses', path: '/purchases/analytics', description: 'Rapports et analyses' }
    ]
  },
  { icon: FileText, label: 'Comptabilité', path: '/accounting' },
  { icon: BarChart2, label: 'Rapports', path: '/reports' },
  { icon: Settings, label: 'Paramètres', path: '/settings' },
];

const Sidebar = () => {
  const location = useLocation();
  
  const renderSubItems = (items: any[], parentPath: string = '', level: number = 0) => {
    if (!items) return null;

    return (
      <div className={`ml-${level * 4} border-l border-gray-200`}>
        {items.map((subItem, subIndex) => {
          const SubIcon = subItem.icon;
          const fullPath = `${parentPath}${subItem.path}`;
          const isActive = location.pathname === fullPath;
          
          return (
            <div key={`${fullPath}-${subIndex}`}>
              <Link
                to={fullPath}
                className={`
                  flex items-center px-6 py-2 text-sm text-gray-700 transition-all duration-200 group
                  ${isActive ? 'bg-neotech-50 border-r-4 border-neotech-500' : 'hover:bg-gray-50'}
                `}
              >
                <SubIcon className={`w-4 h-4 mr-3 ${isActive ? 'text-neotech-500' : 'text-gray-400'}`} />
                <div className="flex flex-col">
                  <span className={isActive ? 'font-medium text-neotech-700' : ''}>{subItem.label}</span>
                  {subItem.description && (
                    <span className="text-xs text-gray-500 hidden group-hover:block">
                      {subItem.description}
                    </span>
                  )}
                </div>
              </Link>
              {subItem.subItems && renderSubItems(subItem.subItems, parentPath, level + 1)}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <motion.aside 
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-0 h-screen w-64 bg-white border-r shadow-sm overflow-y-auto"
    >
      <div className="p-6">
        <h1 className="text-2xl font-bold text-neotech-600">NEOTECH</h1>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          const isSubMenuOpen = location.pathname.startsWith(item.path);
          
          return (
            <div key={index}>
              <Link
                to={item.path}
                className={`
                  flex items-center px-6 py-3 text-gray-700 transition-all duration-200
                  ${isActive ? 'bg-neotech-50 border-r-4 border-neotech-500' : 'hover:bg-gray-50'}
                `}
              >
                <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-neotech-500' : 'text-gray-400'}`} />
                <span className={isActive ? 'font-medium text-neotech-700' : ''}>{item.label}</span>
              </Link>
              
              {item.subItems && isSubMenuOpen && renderSubItems(item.subItems, '')}
            </div>
          );
        })}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
