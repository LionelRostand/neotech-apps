
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface MenuItemProps {
  icon: LucideIcon;
  label: string;
  path: string;
  isCollapsed?: boolean;
  onClose?: () => void;
}

const MenuItem = ({ icon: Icon, label, path, isCollapsed, onClose }: MenuItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <Link
      to={path}
      className={`
        flex items-center px-6 py-3 text-gray-700 transition-all duration-200
        ${isActive ? 'bg-neotech-50 border-r-4 border-neotech-500' : 'hover:bg-gray-50'}
      `}
      onClick={() => {
        if (window.innerWidth < 1024) {
          onClose?.();
        }
      }}
    >
      <Icon className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'} ${isActive ? 'text-neotech-500' : 'text-gray-400'}`} />
      <span className={`
        ${isActive ? 'font-medium text-neotech-700' : ''} 
        ${isCollapsed ? 'hidden' : 'block'}
        transition-opacity duration-300
      `}>
        {label}
      </span>
    </Link>
  );
};

export default MenuItem;
