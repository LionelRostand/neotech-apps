
import { Bell, Search, User, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white border-b h-16 flex items-center justify-between px-4 md:px-6 sticky top-0 z-10"
    >
      <div className="flex items-center flex-1">
        <div className="relative max-w-md w-full hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neotech-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-full relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-neotech-500 rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-2 md:gap-3 md:pl-4 md:border-l">
          <span className="text-sm font-medium hidden md:block">{user?.email || 'Utilisateur'}</span>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigate('/profile')}
              className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors duration-200"
              title="Mon profil"
            >
              <User className="w-5 h-5 text-gray-600" />
            </button>
            <button 
              onClick={() => signOut()} 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              title="Se déconnecter"
            >
              <LogOut className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
