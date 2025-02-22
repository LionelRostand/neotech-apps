
import { LucideIcon } from 'lucide-react';

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
  description?: string;
}

export interface SidebarProps {
  isVisible: boolean;
}

