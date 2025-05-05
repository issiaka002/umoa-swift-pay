
import React from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserAvatar from '@/components/UserAvatar';
import { 
  Users, 
  Lock, 
  ShieldCheck, 
  Settings,
  Pencil, 
  Trash2 
} from 'lucide-react';

// Sample statistics data
const stats = [
  {
    value: '15',
    label: 'Utilisateurs Actifs',
    icon: <Users size={24} className="text-blue-500" />,
    bgClass: 'bg-blue-50',
  },
  {
    value: '5',
    label: 'Rôles Configurés',
    icon: <Lock size={24} className="text-amber-500" />,
    bgClass: 'bg-amber-50',
  },
  {
    value: '3',
    label: 'Certificats Actifs',
    icon: <ShieldCheck size={24} className="text-red-500" />,
    bgClass: 'bg-red-50',
  },
  {
    value: '12',
    label: 'Paramètres Système',
    icon: <Settings size={24} className="text-purple-500" />,
    bgClass: 'bg-purple-50',
  },
];

// Sample users data
const users = [
  {
    id: '1',
    name: 'Admin CBAO',
    email: 'admin@cbao.sn',
    role: 'Administrateur',
    status: 'Actif',
    lastLogin: 'Aujourd\'hui à 10:23',
  },
  {
    id: '2',
    name: 'Superviseur CBAO',
    email: 'superviseur@cbao.sn',
    role: 'Superviseur',
    status: 'Actif',
    lastLogin: 'Hier à 16:45',
  },
];

const Admin = () => {
  return (
    <div className="flex-1 bg-background min-h-screen">
      <Header title="Administration du Système" />
      
      <main className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-5 flex items-center">
              <div className={`${stat.bgClass} p-3 rounded-lg mr-4`}>
                {stat.icon}
              </div>
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Main content with tabs */}
        <div className="bg-white rounded-lg shadow-sm p-5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-xl font-bold text-gray-800">Administration du Système</h2>
            <Button className="bg-primary hover:bg-primary/90">
              Ajouter un Utilisateur
            </Button>
          </div>
          
          <Tabs defaultValue="utilisateurs">
            <TabsList className="mb-6 border-b w-full justify-start rounded-none bg-transparent p-0">
              <TabsTrigger 
                value="utilisateurs" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Utilisateurs
              </TabsTrigger>
              <TabsTrigger 
                value="roles" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Rôles
              </TabsTrigger>
              <TabsTrigger 
                value="certificats" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Certificats
              </TabsTrigger>
              <TabsTrigger 
                value="configuration" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Configuration
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="utilisateurs" className="mt-0">
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="w-12"></th>
                      <th>Utilisateur</th>
                      <th>Email</th>
                      <th>Rôle</th>
                      <th>Statut</th>
                      <th>Dernière Connexion</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 border-b">
                        <td>
                          <UserAvatar name={user.name.charAt(0)} size="sm" />
                        </td>
                        <td className="font-medium">{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Actif
                          </span>
                        </td>
                        <td>{user.lastLogin}</td>
                        <td>
                          <div className="flex gap-2">
                            <button className="text-gray-500 hover:text-primary">
                              <Pencil size={16} />
                            </button>
                            <button className="text-gray-500 hover:text-red-500">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="roles">
              <div className="text-center py-12 text-gray-500">
                Contenu de la section Rôles à implémenter
              </div>
            </TabsContent>
            
            <TabsContent value="certificats">
              <div className="text-center py-12 text-gray-500">
                Contenu de la section Certificats à implémenter
              </div>
            </TabsContent>
            
            <TabsContent value="configuration">
              <div className="text-center py-12 text-gray-500">
                Contenu de la section Configuration à implémenter
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Admin;
