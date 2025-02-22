
import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import SubMenuItem from './SubMenuItem';
import { SubMenuItem as SubMenuItemType } from './menuItems';

interface MenuItemProps {
  icon: LucideIcon;
  label: string;
  path: string;
  subItems?: SubMenuItemType[];
  isActive: boolean;
  isSubMenuOpen: boolean;
  currentPath: string;
}

const MenuItem = ({ 
  icon: Icon, 
  label, 
  path, 
  subItems,
  isActive,
  isSubMenuOpen,
  currentPath
}: MenuItemProps) => {
  return (
    <div className="group my-1">
      <Link
        to={path}
        className={`
          flex items-center px-6 py-3 text-gray-700 transition-all duration-200
          hover:bg-gray-50/90 rounded-lg mx-2
          ${isActive ? 'bg-neotech-50 text-neotech-700 shadow-sm' : ''}
          ${isSubMenuOpen ? 'bg-gray-50/80' : ''}
        `}
      >
        <Icon 
          className={`
            w-5 h-5 mr-3 transition-colors
            ${isActive ? 'text-neotech-500' : 'text-gray-400 group-hover:text-neotech-400'}
          `} 
        />
        <span className={`
          transition-all
          ${isActive ? 'font-medium text-neotech-700' : ''} 
          ${isSubMenuOpen ? 'font-medium' : ''}
          group-hover:text-neotech-600
        `}>
          {label}
        </span>
      </Link>
      
      {subItems && isSubMenuOpen && (
        <div className="mt-1 ml-7 pl-4 border-l border-gray-200/70 space-y-0.5">
          {subItems.map((subItem, subIndex) => (
            <SubMenuItem
              key={subIndex}
              {...subItem}
              isActive={currentPath === subItem.path}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuItem;

