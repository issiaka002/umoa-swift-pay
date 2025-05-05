
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StatusBadge from "@/components/StatusBadge";
import { 
  Search, 
  Filter, 
  ChevronDown, 
  Trash, 
  Edit, 
  Eye, 
  Plus 
} from 'lucide-react';

// Modèle de données pour les participants
interface Participant {
  uuid: string;
  code_membre: string;
  nom: string;
  type: string;
  pays: string;
  est_direct: boolean;
  id_sponsor: string;
  statut: string;
  date_creation: string;
  date_modification: string;
}

// Données de test pour les participants
const participantsData: Participant[] = [
  {
    uuid: '1',
    code_membre: 'CICI001',
    nom: 'PSP EME CI 001',
    type: 'PSP',
    pays: 'CI',
    est_direct: true,
    id_sponsor: '',
    statut: 'Actif',
    date_creation: '2024-01-15',
    date_modification: '2024-03-20',
  },
  {
    uuid: '2',
    code_membre: 'MLSP003',
    nom: 'PSP EME ML 003',
    type: 'PSP',
    pays: 'ML',
    est_direct: false,
    id_sponsor: 'CICI001',
    statut: 'Actif',
    date_creation: '2024-02-10',
    date_modification: '2024-03-25',
  },
  {
    uuid: '3',
    code_membre: 'SNSN002',
    nom: 'Banque SN 002',
    type: 'Banque',
    pays: 'SN',
    est_direct: true,
    id_sponsor: '',
    statut: 'Actif',
    date_creation: '2024-02-15',
    date_modification: '2024-02-15',
  },
  {
    uuid: '4',
    code_membre: 'BJBQ004',
    nom: 'Banque BJ 004',
    type: 'Banque',
    pays: 'BJ',
    est_direct: false,
    id_sponsor: 'CICI001',
    statut: 'Inactif',
    date_creation: '2024-03-01',
    date_modification: '2024-04-10',
  },
  {
    uuid: '5',
    code_membre: 'PIUMOA',
    nom: 'BCEAO',
    type: 'Banque Centrale',
    pays: 'UEMOA',
    est_direct: true,
    id_sponsor: '',
    statut: 'Actif',
    date_creation: '2023-12-01',
    date_modification: '2024-01-05',
  },
];

const Participants = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('Tous');
  const [paysFilter, setPaysFilter] = useState('Tous');
  const [statutFilter, setStatutFilter] = useState('Tous');
  const [filteredParticipants, setFilteredParticipants] = useState<Participant[]>(participantsData);

  // Types de participants uniques pour le filtre
  const types = ['Tous', ...Array.from(new Set(participantsData.map(p => p.type)))];
  
  // Pays uniques pour le filtre
  const pays = ['Tous', ...Array.from(new Set(participantsData.map(p => p.pays)))];
  
  // Statuts uniques pour le filtre
  const statuts = ['Tous', ...Array.from(new Set(participantsData.map(p => p.statut)))];

  // Filtrer les participants en fonction des critères
  useEffect(() => {
    let filtered = participantsData;
    
    // Filtre par recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        p => p.code_membre.toLowerCase().includes(query) || 
             p.nom.toLowerCase().includes(query)
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

  return (
    <div className="flex-1 bg-background min-h-screen dark:bg-gray-900">
      <Header title="Gestion des Participants" />
      
      <main className="p-6">
        {/* Filtres et recherche */}
        <div className="bg-white rounded-lg shadow-sm p-5 mb-6 dark:bg-gray-800">
          <div className="flex flex-wrap gap-4">
            <div className="relative flex-grow max-w-md">
              <Input
                type="text"
                placeholder="Rechercher un participant..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2"
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
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
                  <option key={type}>{type}</option>
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
                  <option key={p}>{p}</option>
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
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            
            <div className="ml-auto">
              <Button className="flex items-center gap-2">
                <Plus size={16} /> Nouveau Participant
              </Button>
            </div>
          </div>
        </div>
        
        {/* Liste des participants */}
        <div className="bg-white rounded-lg shadow-sm dark:bg-gray-800">
          <div className="p-5 border-b dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">Liste des Participants</h2>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code Membre</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Pays</TableHead>
                  <TableHead>Participation</TableHead>
                  <TableHead>Sponsor</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date Création</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredParticipants.map((participant) => (
                  <TableRow key={participant.uuid} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <TableCell className="font-medium">{participant.code_membre}</TableCell>
                    <TableCell>{participant.nom}</TableCell>
                    <TableCell>{participant.type}</TableCell>
                    <TableCell>{participant.pays}</TableCell>
                    <TableCell>
                      {participant.est_direct ? (
                        <span className="bg-blue-100 text-blue-800 py-1 px-2 rounded text-xs dark:bg-blue-900 dark:text-blue-300">
                          Direct
                        </span>
                      ) : (
                        <span className="bg-purple-100 text-purple-800 py-1 px-2 rounded text-xs dark:bg-purple-900 dark:text-purple-300">
                          Indirect
                        </span>
                      )}
                    </TableCell>
                    <TableCell>{participant.id_sponsor || 'N/A'}</TableCell>
                    <TableCell>
                      {participant.statut === 'Actif' ? (
                        <StatusBadge status="success" text="Actif" />
                      ) : (
                        <StatusBadge status="error" text="Inactif" />
                      )}
                    </TableCell>
                    <TableCell>{participant.date_creation}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon">
                          <Eye size={16} />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Edit size={16} />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Trash size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredParticipants.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-gray-500 dark:text-gray-400">
                      Aucun participant trouvé
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="p-4 flex justify-between items-center border-t dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Affichage de {filteredParticipants.length} sur {participantsData.length} participants
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Précédent
              </Button>
              <Button variant="outline" size="sm">
                Suivant
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Participants;
