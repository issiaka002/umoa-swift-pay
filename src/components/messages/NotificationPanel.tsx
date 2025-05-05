
import React, { useState } from 'react';
import SearchInput from '@/components/SearchInput';
import { Badge } from '@/components/ui/badge';
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: string;
}

interface NotificationPanelProps {
  notifications: Notification[];
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ notifications }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('Tous');
  const [filteredNotifications, setFilteredNotifications] = useState(notifications);
  
  React.useEffect(() => {
    let filtered = notifications;
    
    // Search filter for notifications
    if (searchQuery) {
      filtered = filtered.filter(
        notif => notif.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                notif.message.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Type filter for notifications
    if (typeFilter !== 'Tous') {
      filtered = filtered.filter(notif => notif.type === typeFilter);
    }
    
    setFilteredNotifications(filtered);
  }, [searchQuery, typeFilter, notifications]);
  
  const getNotificationTypeColor = (type: string) => {
    switch (type) {
      case 'transaction':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'message':
        return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'error':
        return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      case 'participant':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300';
      case 'system':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  
  // Get unique notification types for filter
  const notificationTypes = ['Tous', ...Array.from(new Set(notifications.map(notif => notif.type)))];

  return (
    <SheetContent className="w-[400px] sm:w-[540px] dark:bg-gray-800">
      <SheetHeader>
        <SheetTitle className="dark:text-white">Notifications</SheetTitle>
        <SheetDescription className="dark:text-gray-400">
          Notifications et alertes du système d'interface SIP.
        </SheetDescription>
      </SheetHeader>
      
      <div className="mt-4 space-y-4">
        <div className="flex gap-4">
          <SearchInput
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={setSearchQuery}
            className="flex-1"
          />
          
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600 dark:text-gray-400">Type:</span>
            <select 
              className="border rounded p-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              {notificationTypes.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="space-y-3 mt-4">
          {filteredNotifications.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-4">Aucune notification trouvée</p>
          ) : (
            filteredNotifications.map(notification => (
              <div 
                key={notification.id} 
                className={`p-3 border rounded-md ${notification.read ? 'bg-gray-50 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'} border-gray-200 dark:border-gray-600`}
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="font-medium dark:text-white">{notification.title}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{notification.message}</p>
                <div className="mt-2 flex justify-between">
                  <Badge className={getNotificationTypeColor(notification.type)}>
                    {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                  </Badge>
                  {!notification.read && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                      Nouveau
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </SheetContent>
  );
};

export default NotificationPanel;
