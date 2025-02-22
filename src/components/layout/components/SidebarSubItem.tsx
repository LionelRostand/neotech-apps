
import { Link } from 'react-router-dom';
import { SubMenuItem } from '../types/sidebar';

interface SidebarSubItemProps {
  subItem: SubMenuItem;
  isActive: boolean;
}

const SidebarSubItem = ({ subItem, isActive }: SidebarSubItemProps) => {
  const SubIcon = subItem.icon;
  
  return (
    <Link
      to={subItem.path}
      className={`
        flex items-center px-4 py-2 text-xs text-gray-700 transition-all duration-200 group
        ${isActive ? 'bg-neotech-50 border-r-4 border-neotech-500' : 'hover:bg-gray-50'}
      `}
    >
      <SubIcon className={`w-3 h-3 mr-2 ${isActive ? 'text-neotech-500' : 'text-gray-400'}`} />
      <div className="flex flex-col">
        <span className={isActive ? 'font-medium text-neotech-700' : ''}>{subItem.label}</span>
        {subItem.description && (
          <span className="text-[10px] text-gray-500 hidden group-hover:block">
            {subItem.description}
          </span>
        )}
      </div>
    </Link>
  );
};

export default SidebarSubItem;

