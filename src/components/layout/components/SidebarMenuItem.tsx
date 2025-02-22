
import { Link } from 'react-router-dom';
import { MenuItem } from '../types/sidebar';
import SidebarSubItem from './SidebarSubItem';

interface SidebarMenuItemProps {
  item: MenuItem;
  isActive: boolean;
  isSubMenuOpen: boolean;
  currentPath: string;
}

const SidebarMenuItem = ({ item, isActive, isSubMenuOpen, currentPath }: SidebarMenuItemProps) => {
  const Icon = item.icon;
  
  return (
    <div className="group">
      <Link
        to={item.path}
        className={`
          flex items-center px-4 py-2 text-sm text-gray-700 transition-all duration-200
          ${isActive ? 'bg-neotech-50 border-r-4 border-neotech-500' : 'hover:bg-gray-50'}
          ${isSubMenuOpen ? 'bg-gray-50' : ''}
        `}
      >
        <Icon className={`w-4 h-4 mr-3 ${isActive ? 'text-neotech-500' : 'text-gray-400'}`} />
        <span className={`${isActive ? 'font-medium text-neotech-700' : ''} ${isSubMenuOpen ? 'font-medium' : ''}`}>
          {item.label}
        </span>
      </Link>
      
      {item.subItems && isSubMenuOpen && (
        <div className="ml-4 border-l border-gray-200">
          {item.subItems.map((subItem, index) => (
            <SidebarSubItem
              key={index}
              subItem={subItem}
              isActive={currentPath === subItem.path}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarMenuItem;

