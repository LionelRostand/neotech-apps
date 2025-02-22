
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
    <div className="group">
      <Link
        to={path}
        className={`
          flex items-center px-6 py-3 text-gray-700 transition-all duration-200
          ${isActive ? 'bg-neotech-50 border-r-4 border-neotech-500' : 'hover:bg-gray-50'}
          ${isSubMenuOpen ? 'bg-gray-50' : ''}
        `}
      >
        <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-neotech-500' : 'text-gray-400'}`} />
        <span className={`${isActive ? 'font-medium text-neotech-700' : ''} ${isSubMenuOpen ? 'font-medium' : ''}`}>
          {label}
        </span>
      </Link>
      
      {subItems && isSubMenuOpen && (
        <div className="ml-6 border-l border-gray-200">
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

