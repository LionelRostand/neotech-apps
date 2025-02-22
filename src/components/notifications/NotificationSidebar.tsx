
import React from 'react';
import { Bell, Mail, BellDot, BellOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  isRead: boolean;
  timestamp: string;
}

interface NotificationSidebarProps {
  onSelectType: (type: 'all' | 'unread' | 'email') => void;
  selectedType: 'all' | 'unread' | 'email';
  notifications: NotificationItem[];
}

const NotificationSidebar = ({ onSelectType, selectedType, notifications }: NotificationSidebarProps) => {
  const navigate = useNavigate();
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="w-64 border-r border-gray-200 h-full bg-white">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/calendar')}
            className="hover:bg-gray-100"
          >
            <Bell className="w-5 h-5 text-gray-600" />
          </Button>
          <h2 className="text-xl font-semibold">Notifications</h2>
        </div>
      </div>

      <div className="p-2">
        <Button
          variant={selectedType === 'all' ? 'secondary' : 'ghost'}
          className="w-full justify-start mb-2"
          onClick={() => onSelectType('all')}
        >
          <Bell className="w-4 h-4 mr-2" />
          Toutes les notifications
        </Button>

        <Button
          variant={selectedType === 'unread' ? 'secondary' : 'ghost'}
          className="w-full justify-start mb-2"
          onClick={() => onSelectType('unread')}
        >
          <BellDot className="w-4 h-4 mr-2" />
          Non lues
          {unreadCount > 0 && (
            <span className="ml-2 bg-neotech-500 text-white text-xs px-2 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </Button>

        <Button
          variant={selectedType === 'email' ? 'secondary' : 'ghost'}
          className="w-full justify-start"
          onClick={() => onSelectType('email')}
        >
          <Mail className="w-4 h-4 mr-2" />
          Notifications par email
        </Button>
      </div>
    </div>
  );
};

export default NotificationSidebar;
