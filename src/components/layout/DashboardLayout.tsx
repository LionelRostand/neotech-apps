
import React from 'react';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Header from './Header';

interface DashboardLayoutProps {
  children: React.ReactNode;
  hideHeader?: boolean;
}

const DashboardLayout = ({ children, hideHeader = false }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-gray-50/95">
      <Sidebar />
      <div className="flex-1 min-w-0">
        {!hideHeader && <Header />}
        <motion.main 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative w-full min-h-[calc(100vh-4rem)] p-4"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
};

export default DashboardLayout;
