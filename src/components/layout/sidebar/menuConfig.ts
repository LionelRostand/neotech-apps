
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
  PackageSearch,
  Calculator,
  UserCog,
  UserPlus,
  FileSignature,
  Calendar,
  Clock,
  Medal,
  DollarSign
} from 'lucide-react';

export const menuItems = [
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
    icon: UserCog,
    label: 'Employés',
    path: '/employees',
    subItems: [
      { icon: UserPlus, label: 'Gestion employés', path: '/employees/management', description: 'Création et gestion des employés' },
      { icon: FileSignature, label: 'Contrats', path: '/employees/contracts', description: 'Gestion des contrats de travail' },
      { icon: Calendar, label: 'Congés', path: '/employees/leaves', description: 'Gestion des absences et congés' },
      { icon: Clock, label: 'Présences', path: '/employees/attendance', description: 'Suivi du temps et des présences' },
      { icon: Medal, label: 'Performance', path: '/employees/performance', description: 'Évaluation et objectifs' },
      { icon: DollarSign, label: 'Salaires', path: '/employees/payroll', description: 'Gestion des salaires et avantages' },
      { icon: FileBarChart, label: 'Rapports RH', path: '/employees/reports', description: 'Reporting et statistiques' }
    ]
  },
  {
    icon: Truck,
    label: 'Transport',
    path: '/freight',
    subItems: [
      { icon: Box, label: 'Commandes Transport', path: '/freight/orders', description: 'Gestion des commandes de transport' },
      { icon: Truck, label: 'Itinéraires', path: '/freight/routes', description: 'Planification et suivi des trajets' },
      { icon: Package, label: 'Suivi Colis', path: '/freight/tracking', description: 'Suivi des colis via CR-CODE' }
    ]
  },
  { icon: FileText, label: 'Comptabilité', path: '/accounting' },
  { icon: BarChart2, label: 'Rapports', path: '/reports' },
  { icon: Settings, label: 'Paramètres', path: '/settings' }
];
