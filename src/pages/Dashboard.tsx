
import React from 'react';
import Header from '@/components/Header';
import StatCard from '@/components/StatCard';
import TransactionTable from '@/components/TransactionTable';
import ChartContainer from '@/components/ChartContainer';
import TransactionChart from '@/components/charts/TransactionChart';
import ServicesChart from '@/components/charts/ServicesChart';
import { BarChart3, DollarSign, BarChart, Clock } from 'lucide-react';

// Sample data for the charts
const transactionData = [
  { name: 'Lun', transactions: 400 },
  { name: 'Mar', transactions: 300 },
  { name: 'Mer', transactions: 600 },
  { name: 'Jeu', transactions: 800 },
  { name: 'Ven', transactions: 500 },
  { name: 'Sam', transactions: 200 },
  { name: 'Dim', transactions: 100 },
];

const servicesData = [
  { name: 'Virement', value: 45 },
  { name: 'Paiement', value: 25 },
  { name: 'Transfert', value: 15 },
  { name: 'Retrait', value: 10 },
  { name: 'Autres', value: 5 },
];

// Sample transactions data
const recentTransactions = [
  {
    id: 'TRX-2023052501',
    date: '15:25:30',
    from: 'PSP Banque SN 001',
    to: 'PSP EME CI 001',
    amount: '850,000 FCFA',
    status: 'Complété' as const,
  },
  {
    id: 'TRX-2023052502',
    date: '15:24:15',
    from: 'PSP EME BF 001',
    to: 'PSP Banque TG 001',
    amount: '1,200,000 FCFA',
    status: 'Complété' as const,
  },
  {
    id: 'TRX-2023052503',
    date: '15:22:47',
    from: 'PSP Banque TG 001',
    to: 'PSP EME CI 001',
    amount: '50,000 FCFA',
    status: 'En attente' as const,
  },
  {
    id: 'TRX-2023052504',
    date: '15:21:03',
    from: 'PSP SFD ML 001',
    to: 'PSP Banque SN 001',
    amount: '325,000 FCFA',
    status: 'Échoué' as const,
  },
];

const Dashboard = () => {
  return (
    <div className="flex-1 bg-background min-h-screen">
      <Header title="Tableau de bord" />
      
      <main className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard
            title="Transactions aujourd'hui"
            value="2,547"
            icon={<BarChart3 size={20} className="text-primary-light" />}
            trend={{ value: "15.3%", positive: true }}
          />
          
          <StatCard
            title="Montant total"
            value="458.6M FCFA"
            icon={<DollarSign size={20} className="text-green-500" />}
            trend={{ value: "8.7%", positive: true }}
            iconColor="bg-green-500/10"
          />
          
          <StatCard
            title="Taux de succès"
            value="99.7%"
            icon={<BarChart size={20} className="text-amber-500" />}
            trend={{ value: "0.2%", positive: true }}
            iconColor="bg-amber-500/10"
          />
          
          <StatCard
            title="Temps de réponse moyen"
            value="42ms"
            icon={<Clock size={20} className="text-red-500" />}
            trend={{ value: "3ms", positive: false }}
            iconColor="bg-red-500/10"
          />
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <ChartContainer 
            title="Volume de transactions" 
            className="lg:col-span-2"
            actions={
              <div className="flex gap-2">
                <button className="px-3 py-1 text-xs font-medium bg-primary text-white rounded-md">Jour</button>
                <button className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-md">Semaine</button>
                <button className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-md">Mois</button>
              </div>
            }
          >
            <TransactionChart data={transactionData} />
          </ChartContainer>
          
          <ChartContainer title="Répartition des services">
            <ServicesChart data={servicesData} />
          </ChartContainer>
        </div>
        
        {/* Recent Transactions Table */}
        <div className="bg-white rounded-lg shadow-sm p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-700">Transactions récentes</h3>
            <a href="/transactions" className="text-primary text-sm hover:underline">
              Voir tout
            </a>
          </div>
          
          <TransactionTable transactions={recentTransactions} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
