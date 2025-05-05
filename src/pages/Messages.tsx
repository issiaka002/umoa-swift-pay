
import React, { useState, useEffect } from 'react';
import MessageHeader from '@/components/messages/MessageHeader';
import MessageFilters from '@/components/messages/MessageFilters';
import MessageCarousel from '@/components/messages/MessageCarousel';
import MessagesList from '@/components/messages/MessagesList';

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
  const [filteredMessages, setFilteredMessages] = useState(messagesList);
  const [directionFilter, setDirectionFilter] = useState('Tous');
  const [typeFilter, setTypeFilter] = useState('Tous');
  const [statusFilter, setStatusFilter] = useState('Tous');
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);

  useEffect(() => {
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
  
  useEffect(() => {
    // Check if there are unread notifications
    setHasUnreadNotifications(notificationsData.some(notif => !notif.read));
  }, []);
  
  // Get unique message types for filter
  const messageTypes = ['Tous', ...Array.from(new Set(messagesList.map(msg => msg.type)))];
  
  // Get unique message statuses for filter
  const messageStatuses = ['Tous', ...Array.from(new Set(messagesList.map(msg => msg.status)))];

  return (
    <div className="flex-1 bg-background min-h-screen dark:bg-gray-900">
      <MessageHeader 
        hasUnreadNotifications={hasUnreadNotifications} 
        notifications={notificationsData} 
      />
      
      <main className="p-6">
        {/* Search and filters */}
        <MessageFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          directionFilter={directionFilter}
          setDirectionFilter={setDirectionFilter}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          messageTypes={messageTypes}
          messageStatuses={messageStatuses}
        />
        
        {/* Recent Messages Carousel */}
        <MessageCarousel messages={recentMessages} />
        
        {/* Messages List */}
        <MessagesList 
          messages={messagesList}
          filteredMessages={filteredMessages}
        />
      </main>
    </div>
  );
};

export default Messages;
