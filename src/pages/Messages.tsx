
import React, { useState } from 'react';
import Header from '@/components/Header';
import SearchInput from '@/components/SearchInput';
import Pagination from '@/components/Pagination';
import StatusBadge from '@/components/StatusBadge';
import { Eye, RotateCcw, Filter, Bell, BellDot, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from '@/components/ui/badge';

// Sample message data
const recentMessages = [
  {
    id: '1',
    direction: 'Entrant',
    date: '05/05/2024 14:30',
    title: 'Vérification d\'identité',
    type: 'acmt.023',
    messageId: 'MPIUMOA9vydyOl7l...',
    status: 'Traité',
    participant: 'PSP EME CI 001 (CICI001)',
  },
  {
    id: '2',
    direction: 'Sortant',
    date: '05/05/2024 14:32',
    title: 'Réponse vérification',
    type: 'acmt.024',
    messageId: 'MCIC001KJhjhgl...',
    status: 'Envoyé',
    participant: 'BCEAO (PIUMOA)',
  },
  {
    id: '3',
    direction: 'Entrant',
    date: '05/05/2024 14:25',
    title: 'Demande de paiement',
    type: 'pacs.008',
    messageId: 'MPIUMOA4567jkl...',
    status: 'En attente',
    participant: 'PSP EME ML 003 (MLSP003)',
  },
  {
    id: '4',
    direction: 'Sortant',
    date: '05/05/2024 14:20',
    title: 'Confirmation paiement',
    type: 'pacs.002',
    messageId: 'MCIC001abcdef...',
    status: 'Envoyé',
    participant: 'Banque SN 002 (SNSN002)',
  }
];

const messagesList = [
  {
    id: '1',
    date: '05/05/2024 14:32',
    messageId: 'MCIC001KJhjhgl...',
    type: 'acmt.024',
    direction: 'Sortant',
    status: 'Envoyé',
    participant: 'BCEAO (PIUMOA)',
  },
  {
    id: '2',
    date: '05/05/2024 14:30',
    messageId: 'MPIUMOA9vydyOl7l...',
    type: 'acmt.023',
    direction: 'Entrant',
    status: 'Traité',
    participant: 'PSP EME CI 001 (CICI001)',
  },
  {
    id: '3',
    date: '05/05/2024 14:25',
    messageId: 'MPIUMOA4567jkl...',
    type: 'pacs.008',
    direction: 'Entrant',
    status: 'En attente',
    participant: 'PSP EME ML 003 (MLSP003)',
  },
  {
    id: '4',
    date: '05/05/2024 14:20',
    messageId: 'MCIC001abcdef...',
    type: 'pacs.002',
    direction: 'Sortant',
    status: 'Envoyé',
    participant: 'Banque SN 002 (SNSN002)',
  }
];

// Sample notifications
const notificationsData = [
  {
    id: '1',
    title: 'Nouvelle transaction',
    message: 'Une nouvelle transaction a été reçue de CICI001',
    time: '14:45',
    read: false,
    type: 'transaction'
  },
  {
    id: '2',
    title: 'Message en attente',
    message: 'Message pacs.008 en attente de traitement',
    time: '13:30',
    read: true,
    type: 'message'
  },
  {
    id: '3',
    title: 'Erreur système',
    message: 'Erreur de connexion à l\'API SIP',
    time: '11:15',
    read: false,
    type: 'error'
  },
  {
    id: '4',
    title: 'Nouveau participant',
    message: 'Le participant BJBQ004 a été ajouté au système',
    time: '09:22',
    read: true,
    type: 'participant'
  },
  {
    id: '5',
    title: 'Maintenance programmée',
    message: 'Maintenance du système prévue ce soir à 23:00',
    time: '08:10',
    read: false,
    type: 'system'
  }
];

const Messages = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredMessages, setFilteredMessages] = useState(messagesList);
  const [directionFilter, setDirectionFilter] = useState('Tous');
  const [typeFilter, setTypeFilter] = useState('Tous');
  const [statusFilter, setStatusFilter] = useState('Tous');
  const [notifSearchQuery, setNotifSearchQuery] = useState('');
  const [filteredNotifications, setFilteredNotifications] = useState(notificationsData);
  const [notifTypeFilter, setNotifTypeFilter] = useState('Tous');
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);

  React.useEffect(() => {
    let filtered = messagesList;
    
    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        msg => msg.messageId.toLowerCase().includes(searchQuery.toLowerCase()) || 
               msg.participant.toLowerCase().includes(searchQuery.toLowerCase()) ||
               msg.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Direction filter
    if (directionFilter !== 'Tous') {
      filtered = filtered.filter(msg => msg.direction === directionFilter);
    }
    
    // Type filter
    if (typeFilter !== 'Tous') {
      filtered = filtered.filter(msg => msg.type === typeFilter);
    }
    
    // Status filter
    if (statusFilter !== 'Tous') {
      filtered = filtered.filter(msg => msg.status === statusFilter);
    }
    
    setFilteredMessages(filtered);
  }, [searchQuery, directionFilter, typeFilter, statusFilter]);
  
  React.useEffect(() => {
    let filtered = notificationsData;
    
    // Search filter for notifications
    if (notifSearchQuery) {
      filtered = filtered.filter(
        notif => notif.title.toLowerCase().includes(notifSearchQuery.toLowerCase()) || 
                 notif.message.toLowerCase().includes(notifSearchQuery.toLowerCase())
      );
    }
    
    // Type filter for notifications
    if (notifTypeFilter !== 'Tous') {
      filtered = filtered.filter(notif => notif.type === notifTypeFilter);
    }
    
    setFilteredNotifications(filtered);
    
    // Check if there are unread notifications
    setHasUnreadNotifications(notificationsData.some(notif => !notif.read));
  }, [notifSearchQuery, notifTypeFilter]);
  
  const getDirectionBadge = (direction: string) => {
    if (direction === 'Entrant') {
      return (
        <span className="bg-blue-100 text-blue-700 py-1 px-2 rounded text-xs font-medium dark:bg-blue-900 dark:text-blue-300">
          Entrant
        </span>
      );
    } else {
      return (
        <span className="bg-green-100 text-green-700 py-1 px-2 rounded text-xs font-medium dark:bg-green-900 dark:text-green-300">
          Sortant
        </span>
      );
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === 'Traité') {
      return <StatusBadge status="success" text={status} />;
    } else if (status === 'Envoyé') {
      return <StatusBadge status="success" text={status} />;
    } else {
      return <StatusBadge status="pending" text={status} />;
    }
  };
  
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
  
  // Get unique message types for filter
  const messageTypes = ['Tous', ...Array.from(new Set(messagesList.map(msg => msg.type)))];
  
  // Get unique message statuses for filter
  const messageStatuses = ['Tous', ...Array.from(new Set(messagesList.map(msg => msg.status)))];
  
  // Get unique notification types for filter
  const notificationTypes = ['Tous', ...Array.from(new Set(notificationsData.map(notif => notif.type)))];

  return (
    <div className="flex-1 bg-background min-h-screen dark:bg-gray-900">
      <Header title="Gestion des Messages">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                {hasUnreadNotifications ? <BellDot className="h-[1.2rem] w-[1.2rem]" /> : <Bell className="h-[1.2rem] w-[1.2rem]" />}
                {hasUnreadNotifications && (
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                )}
              </Button>
            </SheetTrigger>
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
                    value={notifSearchQuery}
                    onChange={setNotifSearchQuery}
                    className="flex-1"
                  />
                  
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Type:</span>
                    <select 
                      className="border rounded p-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      value={notifTypeFilter}
                      onChange={(e) => setNotifTypeFilter(e.target.value)}
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
          </Sheet>
        </div>
      </Header>
      
      <main className="p-6">
        {/* Search and filters */}
        <div className="bg-white rounded-lg shadow-sm p-5 mb-6 dark:bg-gray-800">
          <div className="flex flex-wrap gap-4">
            <SearchInput
              placeholder="Rechercher un message..."
              value={searchQuery}
              onChange={setSearchQuery}
              className="flex-grow max-w-md"
            />
            
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-300">Filtres:</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 dark:text-gray-300">Direction:</span>
              <select 
                className="border rounded p-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={directionFilter}
                onChange={(e) => setDirectionFilter(e.target.value)}
              >
                <option>Tous</option>
                <option>Entrant</option>
                <option>Sortant</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 dark:text-gray-300">Type:</span>
              <select 
                className="border rounded p-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option>Tous</option>
                {messageTypes.slice(1).map(type => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 dark:text-gray-300">Statut:</span>
              <select 
                className="border rounded p-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option>Tous</option>
                {messageStatuses.slice(1).map(status => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 dark:text-gray-300">Date:</span>
              <Input 
                type="date" 
                className="w-40 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
        </div>
        
        {/* Recent Messages Carousel */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-800 mb-4 dark:text-white">Messages Récents</h2>
          
          <Carousel className="w-full">
            <CarouselContent className="-ml-4">
              {recentMessages.map((message) => (
                <CarouselItem key={message.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-3">
                        {getDirectionBadge(message.direction)}
                        <span className="text-sm text-gray-500 dark:text-gray-400">{message.date}</span>
                      </div>
                      
                      <h3 className="font-medium mb-2 dark:text-white">{message.title}</h3>
                      <div className="text-sm text-gray-600 space-y-1 dark:text-gray-300">
                        <p>Type: {message.type}</p>
                        <p>ID: {message.messageId}</p>
                      </div>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <div>
                          {message.status === 'Traité' ? (
                            <StatusBadge status="success" text="Traité" />
                          ) : message.status === 'Envoyé' ? (
                            <StatusBadge status="success" text="Envoyé" />
                          ) : (
                            <StatusBadge status="pending" text={message.status} />
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <button className="text-gray-600 hover:text-primary bg-gray-100 p-2 rounded dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                            Détails
                          </button>
                          <button className="text-gray-600 hover:text-primary bg-gray-100 p-2 rounded dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                            Historique
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-4">
              <CarouselPrevious className="static translate-y-0 dark:border-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600" />
              <CarouselNext className="static translate-y-0 dark:border-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600" />
            </div>
          </Carousel>
        </div>
        
        {/* Messages List */}
        <div className="bg-white rounded-lg shadow-sm p-5 dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-800 mb-4 dark:text-white">Liste des Messages</h2>
          
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr className="bg-gray-50 border-b dark:bg-gray-700 dark:border-gray-600">
                  <th>Date/Heure</th>
                  <th>ID Message</th>
                  <th>Type</th>
                  <th>Direction</th>
                  <th>Statut</th>
                  <th>Participant</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMessages.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-4 text-gray-500 dark:text-gray-400">
                      Aucun message correspondant aux filtres
                    </td>
                  </tr>
                ) : (
                  filteredMessages.map((message) => (
                    <tr key={message.id} className="hover:bg-gray-50 border-b dark:hover:bg-gray-700 dark:border-gray-600">
                      <td className="dark:text-gray-300">{message.date}</td>
                      <td className="font-medium dark:text-white">{message.messageId}</td>
                      <td className="dark:text-gray-300">{message.type}</td>
                      <td>
                        <div className={message.direction === 'Entrant' 
                          ? "bg-blue-100 text-blue-700 py-1 px-2 rounded text-xs font-medium inline-block dark:bg-blue-900 dark:text-blue-300"
                          : "bg-green-100 text-green-700 py-1 px-2 rounded text-xs font-medium inline-block dark:bg-green-900 dark:text-green-300"}>
                          {message.direction}
                        </div>
                      </td>
                      <td>{getStatusBadge(message.status)}</td>
                      <td className="dark:text-gray-300">{message.participant}</td>
                      <td>
                        <div className="flex gap-1">
                          <button className="p-1 hover:bg-gray-100 rounded dark:hover:bg-gray-700">
                            <Eye size={18} className="text-gray-500 dark:text-gray-400" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded dark:hover:bg-gray-700">
                            <RotateCcw size={18} className="text-gray-500 dark:text-gray-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredMessages.length / 10)}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Messages;
