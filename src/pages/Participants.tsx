
import React, { useState } from 'react';
import Header from '@/components/Header';
import SearchInput from '@/components/SearchInput';
import Pagination from '@/components/Pagination';
import StatusBadge from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Filter } from 'lucide-react';

// Données d'exemple pour les participants
const participantsData = [
  {
    uuid: '1',
    code_membre: 'CICI001',
    nom: 'PSP EME CI 001',
    type: 'PSP',
    pays: 'Côte d\'Ivoire',
    est_direct: true,
    id_sponsor: '',
    statut: 'Actif',
    date_creation: '2023-01-15T10:30:00',
    date_modification: '2023-05-20T14:45:00'
  },
  {
    uuid: '2',
    code_membre: 'SNSN002',
    nom: 'Banque SN 002',
    type: 'Banque',
    pays: 'Sénégal',
    est_direct: true,
    id_sponsor: '',
    statut: 'Actif',
    date_creation: '2023-02-10T09:15:00',
    date_modification: '2023-06-12T11:20:00'
  },
  {
    uuid: '3',
    code_membre: 'MLSP003',
    nom: 'PSP Mali SP 003',
    type: 'PSP',
    pays: 'Mali',
    est_direct: false,
    id_sponsor: '1',
    statut: 'Inactif',
    date_creation: '2023-03-05T11:45:00',
    date_modification: '2023-04-18T16:30:00'
  },
  {
    uuid: '4',
    code_membre: 'BJBQ004',
    nom: 'Banque BJ 004',
    type: 'Banque',
    pays: 'Bénin',
    est_direct: true,
    id_sponsor: '',
    statut: 'En attente',
    date_creation: '2023-04-22T13:20:00',
    date_modification: '2023-07-01T10:10:00'
  }
];

const Participants = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredParticipants, setFilteredParticipants] = useState(participantsData);
  const [typeFilter, setTypeFilter] = useState('Tous');
  const [paysFilter, setPaysFilter] = useState('Tous');
  const [statutFilter, setStatutFilter] = useState('Tous');
  
  // Filtrer les participants
  React.useEffect(() => {
    let filtered = participantsData;
    
    // Filtre de recherche
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.code_membre.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filtre par type
    if (typeFilter !== 'Tous') {
      filtered = filtered.filter(p => p.type === typeFilter);
    }
    
    // Filtre par pays
    if (paysFilter !== 'Tous') {
      filtered = filtered.filter(p => p.pays === paysFilter);
    }
    
    // Filtre par statut
    if (statutFilter !== 'Tous') {
      filtered = filtered.filter(p => p.statut === statutFilter);
    }
    
    setFilteredParticipants(filtered);
  }, [searchQuery, typeFilter, paysFilter, statutFilter]);

  const getStatutBadge = (statut: string) => {
    switch (statut) {
      case 'Actif':
        return <StatusBadge status="success" text={statut} />;
      case 'Inactif':
        return <StatusBadge status="danger" text={statut} />;
      case 'En attente':
        return <StatusBadge status="pending" text={statut} />;
      default:
        return <StatusBadge status="default" text={statut} />;
    }
  };
  
  // Types de participants uniques pour le filtre
  const types = ['Tous', ...Array.from(new Set(participantsData.map(p => p.type)))];
  
  // Pays uniques pour le filtre
  const pays = ['Tous', ...Array.from(new Set(participantsData.map(p => p.pays)))];
  
  // Statuts uniques pour le filtre
  const statuts = ['Tous', ...Array.from(new Set(participantsData.map(p => p.statut)))];

  return (
    <div className="flex-1 bg-background dark:bg-gray-900 min-h-screen">
      <Header title="Gestion des Participants" />
      
      <main className="p-6">
        {/* Filtres et recherche */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 mb-6">
          <div className="flex flex-wrap gap-4">
            <SearchInput 
              placeholder="Rechercher un participant..." 
              value={searchQuery} 
              onChange={setSearchQuery} 
              className="flex-grow max-w-md"
            />
            
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-300">Filtres:</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 dark:text-gray-300">Type:</span>
              <select 
                className="border rounded p-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 dark:text-gray-300">Pays:</span>
              <select 
                className="border rounded p-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={paysFilter}
                onChange={(e) => setPaysFilter(e.target.value)}
              >
                {pays.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 dark:text-gray-300">Statut:</span>
              <select 
                className="border rounded p-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={statutFilter}
                onChange={(e) => setStatutFilter(e.target.value)}
              >
                {statuts.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Liste des participants */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">Liste des Participants</h2>
            
            <Button className="bg-primary hover:bg-primary/90 dark:bg-blue-600 dark:hover:bg-blue-700">
              Nouveau Participant
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="data-table min-w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
                  <th>Code Membre</th>
                  <th>Nom</th>
                  <th>Type</th>
                  <th>Pays</th>
                  <th>Accès</th>
                  <th>Statut</th>
                  <th>Date de création</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredParticipants.map((participant) => (
                  <tr key={participant.uuid} className="hover:bg-gray-50 dark:hover:bg-gray-700 border-b dark:border-gray-600">
                    <td className="font-medium">{participant.code_membre}</td>
                    <td>{participant.nom}</td>
                    <td>{participant.type}</td>
                    <td>{participant.pays}</td>
                    <td>
                      {participant.est_direct ? (
                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 py-1 px-2 rounded text-xs font-medium">
                          Direct
                        </span>
                      ) : (
                        <span className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 py-1 px-2 rounded text-xs font-medium">
                          Indirect
                        </span>
                      )}
                    </td>
                    <td>{getStatutBadge(participant.statut)}</td>
                    <td>{new Date(participant.date_creation).toLocaleDateString()}</td>
                    <td>
                      <div className="flex gap-2">
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <Eye size={16} className="text-gray-500 dark:text-gray-400" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <Edit size={16} className="text-gray-500 dark:text-gray-400" />
                        </Button>
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
              totalPages={Math.ceil(filteredParticipants.length / 10)}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Participants;
