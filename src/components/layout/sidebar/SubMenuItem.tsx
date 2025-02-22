
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
        flex items-center px-6 py-3 my-0.5 text-sm transition-all duration-200 group hover:bg-gray-50/90
        ${isActive ? 'bg-neotech-50 border-r-4 border-neotech-500' : ''}
        rounded-l-lg
      `}
    >
      <Icon className={`w-4 h-4 mr-3 ${isActive ? 'text-neotech-500' : 'text-gray-400 group-hover:text-neotech-400'}`} />
      <div className="flex flex-col">
        <span className={`${isActive ? 'font-medium text-neotech-700' : 'text-gray-700'} group-hover:text-neotech-600`}>
          {label}
        </span>
        <span className="text-xs text-gray-500 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {description}
        </span>
      </div>
    </Link>
  );
};

export default SubMenuItem;

