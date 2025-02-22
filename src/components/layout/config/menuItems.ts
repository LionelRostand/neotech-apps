
import { 
  Home, Users, ShoppingCart, Package, FileText, Settings, BarChart2,
  UserCircle, TrendingDown, Box, Truck, CreditCard, FileBarChart,
  Store, Route, Scan, Cog, Building, Globe, DollarSign, Clock,
  Users2, PackageSearch, Calculator
} from 'lucide-react';
import { MenuItem } from '../types/sidebar';

export const menuItems: MenuItem[] = [
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
      { icon: Box, label: 'Commandes Transport', path: '/freight/orders', description: 'Gestion des commandes de transport' },
      { icon: Route, label: 'Itinéraires', path: '/freight/routes', description: 'Planification et suivi des trajets' },
      { icon: Scan, label: 'Suivi Colis', path: '/freight/tracking', description: 'Suivi des colis via CR-CODE' }
    ]
  },
  { icon: FileText, label: 'Comptabilité', path: '/accounting' },
  { icon: BarChart2, label: 'Rapports', path: '/reports' },
  { 
    icon: Settings, 
    label: 'Paramètres', 
    path: '/settings',
    subItems: [
      { icon: Cog, label: 'Paramètres généraux', path: '/settings/general', description: 'Configuration générale du système' },
      { icon: Building, label: 'Société', path: '/settings/company', description: 'Paramètres de la société' },
      { icon: Globe, label: 'Localisation', path: '/settings/localization', description: 'Langue et format régional' },
      { icon: DollarSign, label: 'Devise', path: '/settings/currency', description: 'Configuration des devises' },
      { icon: Clock, label: 'Fuseau horaire', path: '/settings/timezone', description: 'Configuration du fuseau horaire' },
      { icon: Users2, label: 'Multi-société', path: '/settings/multicompany', description: 'Gestion multi-sociétés' }
    ]
  }
];

