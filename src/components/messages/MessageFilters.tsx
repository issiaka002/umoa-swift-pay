
import React from 'react';
import { Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import SearchInput from '@/components/SearchInput';

interface MessageFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  directionFilter: string;
  setDirectionFilter: (value: string) => void;
  typeFilter: string;
  setTypeFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  messageTypes: string[];
  messageStatuses: string[];
}

const MessageFilters: React.FC<MessageFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  directionFilter,
  setDirectionFilter,
  typeFilter,
  setTypeFilter,
  statusFilter,
  setStatusFilter,
  messageTypes,
  messageStatuses
}) => {
  return (
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
  );
};

export default MessageFilters;
