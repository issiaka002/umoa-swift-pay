
import React, { useState } from 'react';
import { Eye, RotateCcw } from 'lucide-react';
import Pagination from '@/components/Pagination';
import StatusBadge from '@/components/StatusBadge';

interface Message {
  id: string;
  date: string;
  messageId: string;
  type: string;
  direction: string;
  status: string;
  participant: string;
}

interface MessagesListProps {
  messages: Message[];
  filteredMessages: Message[];
}

const MessagesList: React.FC<MessagesListProps> = ({ filteredMessages }) => {
  const [currentPage, setCurrentPage] = useState(1);
  
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
  );
};

export default MessagesList;
