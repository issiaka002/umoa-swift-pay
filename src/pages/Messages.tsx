
import React, { useState } from 'react';
import Header from '@/components/Header';
import SearchInput from '@/components/SearchInput';
import Pagination from '@/components/Pagination';
import StatusBadge from '@/components/StatusBadge';
import { Eye, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
    date: '05/05/2024 13:45',
    title: 'Requête compte',
    type: 'acmt.010',
    messageId: 'MJDIO493JDLMkdl...',
    status: 'Traité',
    participant: 'Société Générale (SGBCI)',
  },
  {
    id: '4',
    direction: 'Sortant',
    date: '05/05/2024 13:50',
    title: 'Réponse requête compte',
    type: 'acmt.011',
    messageId: 'MBKIO495UYLPJlm...',
    status: 'Envoyé',
    participant: 'ECOBANK (ECOCI)',
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
  }
];

const Messages = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const getDirectionBadge = (direction: string) => {
    if (direction === 'Entrant') {
      return (
        <span className="bg-blue-100 text-blue-700 py-1 px-2 rounded text-xs font-medium">
          Entrant
        </span>
      );
    } else {
      return (
        <span className="bg-green-100 text-green-700 py-1 px-2 rounded text-xs font-medium">
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

  return (
    <div className="flex-1 bg-background min-h-screen">
      <Header title="Gestion des Messages" />
      
      <main className="p-6">
        {/* Search and filters */}
        <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
          <div className="flex flex-wrap gap-4">
            <SearchInput
              placeholder="Rechercher un message..."
              value={searchQuery}
              onChange={setSearchQuery}
              className="flex-grow max-w-md"
            />
            
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">Direction:</span>
              <select className="border rounded p-2 text-sm">
                <option>Tous</option>
                <option>Entrant</option>
                <option>Sortant</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">Type:</span>
              <select className="border rounded p-2 text-sm">
                <option>Tous</option>
                <option>acmt.023</option>
                <option>acmt.024</option>
                <option>pacs.008</option>
                <option>pacs.002</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">Statut:</span>
              <select className="border rounded p-2 text-sm">
                <option>Tous</option>
                <option>Traité</option>
                <option>Envoyé</option>
                <option>En attente</option>
                <option>Erreur</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">Date:</span>
              <Input 
                type="date" 
                className="w-40"
              />
            </div>
          </div>
        </div>
        
        {/* Recent Messages as Carousel */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Messages Récents</h2>
          
          <Carousel 
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {recentMessages.map((message) => (
                <CarouselItem key={message.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="bg-white rounded-lg shadow-sm p-5 h-full">
                    <div className="flex justify-between items-center mb-3">
                      {getDirectionBadge(message.direction)}
                      <span className="text-sm text-gray-500">{message.date}</span>
                    </div>
                    
                    <h3 className="font-medium mb-2">{message.title}</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Type: {message.type}</p>
                      <p>ID: {message.messageId}</p>
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <div>
                        {message.status === 'Traité' ? (
                          <StatusBadge status="success" text="Traité" />
                        ) : (
                          <StatusBadge status="success" text="Envoyé" />
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <button className="text-gray-600 hover:text-primary bg-gray-100 p-2 rounded">
                          Détails
                        </button>
                        <button className="text-gray-600 hover:text-primary bg-gray-100 p-2 rounded">
                          Historique
                        </button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-4">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </Carousel>
        </div>
        
        {/* Messages List */}
        <div className="bg-white rounded-lg shadow-sm p-5">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Liste des Messages</h2>
          
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr className="bg-gray-50 border-b">
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
                {messagesList.map((message) => (
                  <tr key={message.id} className="hover:bg-gray-50 border-b">
                    <td>{message.date}</td>
                    <td className="font-medium">{message.messageId}</td>
                    <td>{message.type}</td>
                    <td>
                      <div className={message.direction === 'Entrant' 
                        ? "bg-blue-100 text-blue-700 py-1 px-2 rounded text-xs font-medium inline-block"
                        : "bg-green-100 text-green-700 py-1 px-2 rounded text-xs font-medium inline-block"}>
                        {message.direction}
                      </div>
                    </td>
                    <td>{getStatusBadge(message.status)}</td>
                    <td>{message.participant}</td>
                    <td>
                      <div className="flex gap-1">
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Eye size={18} className="text-gray-500" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <RotateCcw size={18} className="text-gray-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={10}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Messages;
