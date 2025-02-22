
import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import MenuItem from './sidebar/MenuItem';
import { menuItems } from './sidebar/menuItems';

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <motion.aside 
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-0 h-screen w-64 bg-white border-r shadow-sm z-50"
    >
      <div className="p-6">
        <h1 className="text-2xl font-bold text-neotech-600">NEOTECH</h1>
      </div>
      
      <nav className="mt-6 h-[calc(100vh-120px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            {...item}
            isActive={location.pathname === item.path}
            isSubMenuOpen={item.subItems && location.pathname.startsWith(item.path)}
            currentPath={location.pathname}
          />
        ))}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;

