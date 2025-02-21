
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
  MapPin,
  Route,
  Scan,
  Database,
  BarChart,
  FileSpreadsheet
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
      { icon: Store, label: 'Fournisseurs', path: '/purchases/suppliers', description: 'Gestion des fournisseurs' },
      { icon: FileText, label: 'Demandes de prix', path: '/purchases/rfq', description: 'Création et suivi des demandes de prix' },
      { icon: Box, label: 'Bons de commande', path: '/purchases/orders', description: 'Gestion des commandes' },
      { icon: Truck, label: 'Réceptions', path: '/purchases/receipts', description: 'Suivi des livraisons' },
      { icon: CreditCard, label: 'Factures', path: '/purchases/invoices', description: 'Gestion des factures fournisseurs' },
      { icon: TrendingDown, label: 'Contrats', path: '/purchases/contracts', description: 'Gestion des contrats fournisseurs' },
      { icon: PackageSearch, label: 'Stocks', path: '/purchases/inventory', description: 'Gestion des stocks' },
      { icon: Calculator, label: 'Comptabilité', path: '/purchases/accounting', description: 'Intégration comptable' },
      { icon: FileBarChart, label: 'Analyses', path: '/purchases/analytics', description: 'Rapports et analyses' }
    ]
  },
  { 
    icon: Truck, 
    label: 'Transport', 
    path: '/freight',
    subItems: [
      { 
        icon: Box, 
        label: 'Commandes Transport', 
        path: '/freight/orders', 
        description: 'Gestion des commandes de transport' 
      },
      { 
        icon: Route, 
        label: 'Itinéraires', 
        path: '/freight/routes', 
        description: 'Planification et suivi des trajets' 
      },
      { 
        icon: Scan, 
        label: 'Suivi Colis', 
        path: '/freight/tracking', 
        description: 'Suivi des colis via CR-CODE' 
      }
    ]
  },
  { icon: FileText, label: 'Comptabilité', path: '/accounting' },
  { icon: BarChart2, label: 'Rapports', path: '/reports' },
  { icon: Settings, label: 'Paramètres', path: '/settings' }
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
          const isSubMenuOpen = item.subItems && location.pathname.startsWith(item.path);
          
          return (
            <div key={index} className="group">
              <Link
                to={item.path}
                className={`
                  flex items-center px-6 py-3 text-gray-700 transition-all duration-200
                  ${isActive ? 'bg-neotech-50 border-r-4 border-neotech-500' : 'hover:bg-gray-50'}
                  ${isSubMenuOpen ? 'bg-gray-50' : ''}
                `}
              >
                <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-neotech-500' : 'text-gray-400'}`} />
                <span className={`${isActive ? 'font-medium text-neotech-700' : ''} ${isSubMenuOpen ? 'font-medium' : ''}`}>
                  {item.label}
                </span>
              </Link>
              
              {item.subItems && isSubMenuOpen && (
                <div className="ml-6 border-l border-gray-200">
                  {item.subItems.map((subItem, subIndex) => {
                    const SubIcon = subItem.icon;
                    const isSubActive = location.pathname === subItem.path;
                    
                    return (
                      <Link
                        key={`${index}-${subIndex}`}
                        to={subItem.path}
                        className={`
                          flex items-center px-6 py-2 text-sm text-gray-700 transition-all duration-200 group
                          ${isSubActive ? 'bg-neotech-50 border-r-4 border-neotech-500' : 'hover:bg-gray-50'}
                        `}
                      >
                        <SubIcon className={`w-4 h-4 mr-3 ${isSubActive ? 'text-neotech-500' : 'text-gray-400'}`} />
                        <div className="flex flex-col">
                          <span className={isSubActive ? 'font-medium text-neotech-700' : ''}>{subItem.label}</span>
                          {subItem.description && (
                            <span className="text-xs text-gray-500 hidden group-hover:block">
                              {subItem.description}
                            </span>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;

