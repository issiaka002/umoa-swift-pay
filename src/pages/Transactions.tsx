
import React, { useState } from 'react';
import Header from '@/components/Header';
import StatCard from '@/components/StatCard';
import TransactionTable from '@/components/TransactionTable';
import ChartContainer from '@/components/ChartContainer';
import TransactionChart from '@/components/charts/TransactionChart';
import SearchInput from '@/components/SearchInput';
import Pagination from '@/components/Pagination';
import { Button } from '@/components/ui/button';
import { Filter, Download } from 'lucide-react';

// Sample data
const transactionData = [
  { name: '1 Mai', transactions: 100 },
  { name: '2 Mai', transactions: 150 },
  { name: '3 Mai', transactions: 200 },
  { name: '4 Mai', transactions: 300 },
  { name: '5 Mai', transactions: 250 },
  { name: '6 Mai', transactions: 350 },
  { name: '7 Mai', transactions: 400 },
];

// Sample transactions data
const transactionsData = [
  {
    id: 'ETGB0012023051245',
    date: '12/05/2023 15:42',
    type: 'Virement Sortant',
    from: 'CBAO',
    to: 'PSP EME CI 004',
    amount: '750,000 XOF',
    status: 'Succès' as const,
  },
  {
    id: 'ESNB0022023051230',
    date: '12/05/2023 15:30',
    type: 'Virement Entrant',
    from: 'PSP SFD ML 001',
    to: 'CBAO',
    amount: '250,000 XOF',
    status: 'Succès' as const,
  },
  {
    id: 'ETGB0022023051210',
    date: '12/05/2023 15:10',
    type: 'Virement Sortant',
    from: 'CBAO',
    to: 'PSP Banque TG 005',
    amount: '1,250,000 XOF',
    status: 'En attente' as const,
  },
  {
    id: 'ESNB0032023051255',
    date: '12/05/2023 14:55',
    type: 'Virement Entrant',
    from: 'PSP EME BF 001',
    to: 'CBAO',
    amount: '180,000 XOF',
    status: 'Échoué' as const,
  },
  {
    id: 'ETGB0032023051242',
    date: '12/05/2023 14:42',
    type: 'Virement Sortant',
    from: 'CBAO',
    to: 'PSP Tresor NE 001',
    amount: '500,000 XOF',
    status: 'Succès' as const,
  },
  {
    id: 'ESNB0042023051230',
    date: '12/05/2023 14:30',
    type: 'Virement Entrant',
    from: 'PSP EME GW 003',
    to: 'CBAO',
    amount: '320,000 XOF',
    status: 'Succès' as const,
  },
  {
    id: 'ETGB0042023051215',
    date: '12/05/2023 14:15',
    type: 'Virement Sortant',
    from: 'CBAO',
    to: 'PSP EME CI 001',
    amount: '150,000 XOF',
    status: 'Succès' as const,
  },
];

const Transactions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="flex-1 bg-background min-h-screen">
      <Header title="Monitoring des Transactions" />
      
      <main className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard
            title="Transactions Aujourd'hui"
            value="184"
            trend={{ value: "12%", positive: true }}
          />
          
          <StatCard
            title="Volume (XOF)"
            value="86,432,500"
            trend={{ value: "8%", positive: true }}
          />
          
          <StatCard
            title="Temps de Réponse Moyen"
            value="0.8s"
            trend={{ value: "0.2s plus long qu'hier", positive: false }}
          />
          
          <StatCard
            title="Taux de Succès"
            value="98.6%"
            trend={{ value: "0.8%", positive: true }}
          />
        </div>
        
        {/* Transaction Chart */}
        <div className="mb-8">
          <ChartContainer
            title="Volume de Transactions"
            actions={
              <div className="flex gap-2">
                <button className="px-3 py-1 rounded-full text-xs font-medium border border-gray-200 hover:bg-gray-50">24H</button>
                <button className="px-3 py-1 rounded-full text-xs font-medium bg-primary text-white">7J</button>
                <button className="px-3 py-1 rounded-full text-xs font-medium border border-gray-200 hover:bg-gray-50">30J</button>
                <button className="px-3 py-1 rounded-full text-xs font-medium border border-gray-200 hover:bg-gray-50">90J</button>
              </div>
            }
          >
            <TransactionChart data={transactionData} />
          </ChartContainer>
        </div>
        
        {/* Transactions Table */}
        <div className="bg-white rounded-lg shadow-sm p-5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <h3 className="font-medium text-gray-700">Transactions Récentes</h3>
            
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <SearchInput
                placeholder="Rechercher une transaction..."
                value={searchQuery}
                onChange={setSearchQuery}
                className="w-full sm:w-64"
              />
              
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter size={16} />
                <span>Filtrer</span>
              </Button>
              
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Download size={16} />
                <span>Exporter</span>
              </Button>
            </div>
          </div>
          
          <TransactionTable transactions={transactionsData} />
          
          <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
            <div>Affichage de 1-7 sur 184 transactions</div>
            <Pagination
              currentPage={currentPage}
              totalPages={26}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Transactions;
