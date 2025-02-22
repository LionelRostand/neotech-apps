
import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface SubMenuItemProps {
  icon: LucideIcon;
  label: string;
  path: string;
  description: string;
  isActive: boolean;
}

const SubMenuItem = ({ icon: Icon, label, path, description, isActive }: SubMenuItemProps) => {
  return (
    <Link
      to={path}
      className={`
        flex items-center px-6 py-2 text-sm text-gray-700 transition-all duration-200 group
        ${isActive ? 'bg-neotech-50 border-r-4 border-neotech-500' : 'hover:bg-gray-50'}
      `}
    >
      <Icon className={`w-4 h-4 mr-3 ${isActive ? 'text-neotech-500' : 'text-gray-400'}`} />
      <div className="flex flex-col">
        <span className={isActive ? 'font-medium text-neotech-700' : ''}>{label}</span>
        <span className="text-xs text-gray-500 hidden group-hover:block">
          {description}
        </span>
      </div>
    </Link>
  );
};

export default SubMenuItem;

