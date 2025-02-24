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
  UserCog,
  Calculator,
  Database,
  Receipt,
  Banknote,
  Euro,
  FileSignature,
  UserPlus,
  Calendar,
  Clock,
  Medal,
  DollarSign,
  Route,
  Scan,
  Wallet,
  Coins,
  Video,
  MessageCircle,
  CalendarCheck,
  BellRing,
  Building
} from 'lucide-react';

export interface MenuItem {
  icon: LucideIcon;
  label: string;
  path: string;
  subItems?: SubMenuItem[];
}

export interface SubMenuItem {
  icon: LucideIcon;
  label: string;
  path: string;
  description: string;
}

export const menuItems: MenuItem[] = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { 
    icon: Building, 
    label: 'Entreprises', 
    path: '/companies',
    subItems: [
      { 
        icon: Store, 
        label: 'Gestion des entreprises', 
        path: '/companies/management', 
        description: 'Créer et gérer les entreprises' 
      },
      { 
        icon: Users, 
        label: 'Assignation employés', 
        path: '/companies/assignments', 
        description: 'Gérer les assignations employés-entreprises' 
      }
    ]
  },
  { icon: Users, label: 'CRM', path: '/crm' },
  { icon: ShoppingCart, label: 'Ventes', path: '/sales' },
  { 
    icon: Calendar, 
    label: 'Calendrier', 
    path: '/calendar',
    subItems: [
      { icon: CalendarCheck, label: 'Mes Événements', path: '/calendar/events', description: 'Gérer vos événements et réunions' },
      { icon: Video, label: 'Réunions Vidéo', path: '/calendar/meetings', description: 'Planifier des réunions en visioconférence' },
      { icon: MessageCircle, label: 'Chat', path: '/calendar/chat', description: 'Discussions en temps réel' },
      { icon: BellRing, label: 'Notifications', path: '/calendar/notifications', description: 'Gérer vos notifications et rappels' },
    ]
  },
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
      { icon: Box, label: 'Stocks', path: '/purchases/inventory', description: 'Gestion des stocks' },
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
      { icon: Route, label: 'Itinéraires', path: '/freight/routes', description: 'Planification et suivi des trajets' },
      { icon: Scan, label: 'Suivi Colis', path: '/freight/tracking', description: 'Suivi des colis via CR-CODE' }
    ]
  },
  { 
    icon: Calculator, 
    label: 'Comptabilité', 
    path: '/accounting',
    subItems: [
      { icon: Database, label: 'Plan Comptable', path: '/accounting/chart', description: 'Configuration et gestion des comptes' },
      { icon: Receipt, label: 'Factures & Paiements', path: '/accounting/invoices', description: 'Gestion des factures et paiements' },
      { icon: Banknote, label: 'Trésorerie', path: '/accounting/treasury', description: 'Gestion de la trésorerie et banque' },
      { icon: Euro, label: 'TVA & Taxes', path: '/accounting/tax', description: 'Gestion de la TVA et déclarations fiscales' },
      { icon: FileSignature, label: 'Clôture', path: '/accounting/closing', description: 'Gestion des clôtures comptables' },
      { icon: FileBarChart, label: 'Rapports', path: '/accounting/reports', description: 'Tableaux de bord et analyses financières' },
      { icon: Wallet, label: 'Paiements', path: '/accounting/payments', description: 'Gestion des moyens de paiement' },
      { icon: Coins, label: 'Multi-devises', path: '/accounting/currencies', description: 'Gestion des devises et taux de change' }
    ]
  },
  { icon: BarChart2, label: 'Rapports', path: '/reports' },
  { icon: Settings, label: 'Paramètres', path: '/settings' }
];
