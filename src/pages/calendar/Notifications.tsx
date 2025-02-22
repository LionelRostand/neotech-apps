
import React, { useState } from 'react';
import NotificationSidebar from '@/components/notifications/NotificationSidebar';
import EmailNotifications from '@/components/notifications/EmailNotifications';

// Exemple de données pour les notifications
const mockNotifications = [
  {
    id: '1',
    title: 'Nouvelle réunion',
    description: 'Réunion d\'équipe à 14h',
    isRead: false,
    timestamp: '10:30'
  },
  {
    id: '2',
    title: 'Rappel',
    description: 'Revue de projet demain',
    isRead: true,
    timestamp: 'Hier'
  },
];

const Notifications = () => {
  const [selectedType, setSelectedType] = useState<'all' | 'unread' | 'email'>('all');
  const [notifications] = useState(mockNotifications);

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-gray-50">
      <NotificationSidebar
        onSelectType={setSelectedType}
        selectedType={selectedType}
        notifications={notifications}
      />
      <div className="flex-1 p-6 overflow-auto">
        {selectedType === 'email' ? (
          <EmailNotifications />
        ) : (
          <div className="space-y-4">
            {notifications
              .filter(n => selectedType === 'all' || (selectedType === 'unread' && !n.isRead))
              .map(notification => (
                <div
                  key={notification.id}
                  className={`p-4 bg-white rounded-lg shadow-sm border ${
                    !notification.isRead ? 'border-neotech-200 bg-neotech-50/30' : 'border-gray-100'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{notification.title}</h3>
                    <span className="text-xs text-gray-500">{notification.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
