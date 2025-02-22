
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { SidebarProps } from './types/sidebar';
import { menuItems } from './config/menuItems';
import SidebarMenuItem from './components/SidebarMenuItem';

const Sidebar = ({ isVisible }: SidebarProps) => {
  const location = useLocation();
  
  return (
    <motion.aside 
      initial={{ x: -250 }}
      animate={{ x: isVisible ? 0 : -250 }}
      transition={{ duration: 0.3 }}
      className={`
        fixed left-0 top-0 h-screen w-56 bg-white border-r shadow-sm overflow-y-auto z-40 
        lg:relative lg:translate-x-0
      `}
    >
      <div className="p-4 sticky top-0 bg-white border-b z-10">
        <h1 className="text-xl font-bold text-neotech-600">NEOTECH</h1>
      </div>
      
      <nav className="mt-4 pb-24">
        {menuItems.map((item, index) => (
          <SidebarMenuItem
            key={index}
            item={item}
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
