
import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import MenuItem from './sidebar/MenuItem';
import SubMenuItem from './sidebar/SubMenuItem';
import SidebarHeader from './sidebar/SidebarHeader';
import { menuItems } from './sidebar/menuConfig';

interface SidebarProps {
  onClose?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const Sidebar = ({ onClose, isCollapsed = false, onToggleCollapse }: SidebarProps) => {
  const location = useLocation();

  return (
    <motion.aside
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className={`h-screen bg-white border-r shadow-sm relative ${isCollapsed ? 'w-20' : 'w-[280px]'} transition-all duration-300`}
    >
      <SidebarHeader
        isCollapsed={isCollapsed}
        onToggleCollapse={onToggleCollapse}
        onClose={onClose}
      />

      <nav className="mt-6 h-[calc(100vh-120px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
        {menuItems.map((item, index) => {
          const isSubMenuOpen = item.subItems && location.pathname.startsWith(item.path);

          return (
            <div key={index} className="group">
              <MenuItem
                icon={item.icon}
                label={item.label}
                path={item.path}
                isCollapsed={isCollapsed}
                onClose={onClose}
              />

              {!isCollapsed && item.subItems && isSubMenuOpen && (
                <div className="ml-6 border-l border-gray-200">
                  {item.subItems.map((subItem, subIndex) => (
                    <SubMenuItem
                      key={`${index}-${subIndex}`}
                      icon={subItem.icon}
                      label={subItem.label}
                      path={subItem.path}
                      description={subItem.description}
                      isActive={location.pathname === subItem.path}
                      onClose={onClose}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
