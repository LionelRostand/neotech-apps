
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import MenuItem from './sidebar/MenuItem';
import { menuItems } from './sidebar/menuItems';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { usePermissions } from '@/hooks/usePermissions';

interface ModulePermission {
  active: boolean;
  read: boolean;
  write: boolean;
  manage: boolean;
}

interface ModulePermissions {
  [key: string]: ModulePermission;
}

const Sidebar = () => {
  const location = useLocation();
  const { role } = usePermissions();
  const [modulePermissions, setModulePermissions] = useState<ModulePermissions | null>(null);
  
  useEffect(() => {
    const fetchModulePermissions = async () => {
      try {
        const modulePermissionsRef = doc(db, 'settings', 'modulePermissions');
        const docSnap = await getDoc(modulePermissionsRef);
        
        if (docSnap.exists()) {
          setModulePermissions(docSnap.data() as ModulePermissions);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des permissions:', error);
      }
    };

    fetchModulePermissions();
  }, []);

  const filteredMenuItems = menuItems.filter(item => {
    if (role === 'admin') return true;
    if (!modulePermissions) return true;
    
    const moduleName = item.path.split('/')[1] || 'dashboard';
    const permissions = modulePermissions[moduleName];
    
    return permissions?.active && permissions?.read;
  });
  
  return (
    <motion.aside 
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-0 h-screen w-64 bg-white/80 backdrop-blur-xl border-r border-gray-200/50 shadow-lg z-50"
    >
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-neotech-600 to-neotech-400 bg-clip-text text-transparent">
          NEOTECH-ERP
        </h1>
      </div>
      
      <nav className="mt-4 h-[calc(100vh-120px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
        {filteredMenuItems.map((item, index) => (
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
