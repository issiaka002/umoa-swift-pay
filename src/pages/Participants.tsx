
import React, { useState } from 'react';
import Header from '@/components/Header';
import SearchInput from '@/components/SearchInput';
import Pagination from '@/components/Pagination';
import StatusBadge from '@/components/StatusBadge';
import { Eye, Edit, User, ChevronDown, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Sample participant data
const participantsList = [
  {
    uuid: '1',
    code_membre: 'BCEAO01',
    nom: 'Banque Centrale des États de l\'Afrique de l\'Ouest',
    type: 'Banque Centrale',
    pays: 'Régional',
    est_direct: true,
    id_sponsor: null,
    statut: 'Actif',
    date_creation: '2023-01-01',
    date_modification: '2023-12-01',
  },
  {
    uuid: '2',
    code_membre: 'BHCI001',
    nom: 'Banque de l\'Habitat de Côte d\'Ivoire',
    type: 'Banque Commerciale',
    pays: 'Côte d\'Ivoire',
    est_direct: true,
    id_sponsor: null,
    statut: 'Actif',
    date_creation: '2023-02-15',
    date_modification: '2023-11-20',
  },
  {
    uuid: '3',
    code_membre: 'SGBF001',
    nom: 'Société Générale Burkina Faso',
    type: 'Banque Commerciale',
    pays: 'Burkina Faso',
    est_direct: true,
    id_sponsor: null,
    statut: 'Actif',
    date_creation: '2023-03-10',
    date_modification: '2023-10-05',
  },
  {
    uuid: '4',
    code_membre: 'EMECI01',
    nom: 'EME Côte d\'Ivoire',
    type: 'Institution de Monnaie Électronique',
    pays: 'Côte d\'Ivoire',
    est_direct: false,
    id_sponsor: '2',
    statut: 'En attente',
    date_creation: '2023-04-20',
    date_modification: '2023-09-15',
  },
];

const Participants = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const getStatusBadge = (status: string) => {
    if (status === 'Actif') {
      return <StatusBadge status="success" text={status} />;
    } else if (status === 'En attente') {
      return <StatusBadge status="pending" text={status} />;
    } else {
      return <StatusBadge status="error" text={status} />;
    }
  };

  return (
    <div className="flex-1 bg-background min-h-screen">
      <Header title="Gestion des Participants" />
      
      <main className="p-6">
        {/* Search and filters */}
        <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
          <div className="flex flex-wrap gap-4 justify-between">
            <div className="flex flex-wrap gap-4 items-center">
              <SearchInput
                placeholder="Rechercher un participant..."
                value={searchQuery}
                onChange={setSearchQuery}
                className="w-80"
              />
              
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">Type:</span>
                <select className="border rounded p-2 text-sm">
                  <option>Tous</option>
                  <option>Banque Centrale</option>
                  <option>Banque Commerciale</option>
                  <option>Institution de Monnaie Électronique</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">Pays:</span>
                <select className="border rounded p-2 text-sm">
                  <option>Tous</option>
                  <option>Bénin</option>
                  <option>Burkina Faso</option>
                  <option>Côte d'Ivoire</option>
                  <option>Guinée-Bissau</option>
                  <option>Mali</option>
                  <option>Niger</option>
                  <option>Sénégal</option>
                  <option>Togo</option>
                  <option>Régional</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">Statut:</span>
                <select className="border rounded p-2 text-sm">
                  <option>Tous</option>
                  <option>Actif</option>
                  <option>En attente</option>
                  <option>Inactif</option>
                </select>
              </div>
            </div>

            <Button className="bg-primary hover:bg-primary/90">
              <Plus size={18} className="mr-2" /> Ajouter un participant
            </Button>
          </div>
        </div>
        
        {/* Participants List */}
        <div className="bg-white rounded-lg shadow-sm p-5">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Liste des Participants</h2>
          
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th>Code</th>
                  <th>Nom</th>
                  <th>Type</th>
                  <th>Pays</th>
                  <th>Direct</th>
                  <th>Statut</th>
                  <th>Date Création</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {participantsList.map((participant) => (
                  <tr key={participant.uuid} className="hover:bg-gray-50 border-b">
                    <td className="font-medium">{participant.code_membre}</td>
                    <td>{participant.nom}</td>
                    <td>{participant.type}</td>
                    <td>{participant.pays}</td>
                    <td>
                      {participant.est_direct ? (
                        <span className="bg-green-100 text-green-700 py-1 px-2 rounded text-xs font-medium">
                          Oui
                        </span>
                      ) : (
                        <span className="bg-blue-100 text-blue-700 py-1 px-2 rounded text-xs font-medium">
                          Non
                        </span>
                      )}
                    </td>
                    <td>{getStatusBadge(participant.statut)}</td>
                    <td>{new Date(participant.date_creation).toLocaleDateString('fr-FR')}</td>
                    <td>
                      <div className="flex gap-2">
                        <button className="p-1 hover:bg-gray-100 rounded text-blue-600" title="Voir détails">
                          <Eye size={18} />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded text-amber-600" title="Modifier">
                          <Edit size={18} />
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

export default Participants;
