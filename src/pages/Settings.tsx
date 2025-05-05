
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import SearchInput from '@/components/SearchInput';
import Pagination from '@/components/Pagination';

// Données d'exemple pour les paramètres
const parametresData = [
  {
    uuid: '1',
    cle: 'MAX_TENTATIVES_CONNEXION',
    valeur: '3',
    description: 'Nombre maximum de tentatives de connexion avant verrouillage',
    modifiable: true,
    date_creation: '2023-01-10T08:30:00',
    date_modification: '2023-06-15T11:20:00'
  },
  {
    uuid: '2',
    cle: 'DUREE_SESSION',
    valeur: '30',
    description: 'Durée de session en minutes avant déconnexion automatique',
    modifiable: true,
    date_creation: '2023-01-10T08:35:00',
    date_modification: '2023-05-22T14:10:00'
  },
  {
    uuid: '3',
    cle: 'URL_API_SIP',
    valeur: 'https://api.sip.bceao.int/v1',
    description: 'URL de l\'API du Système de Paiement Instantané',
    modifiable: false,
    date_creation: '2023-01-10T08:40:00',
    date_modification: '2023-04-05T09:45:00'
  },
  {
    uuid: '4',
    cle: 'DELAI_RETRY_API',
    valeur: '5',
    description: 'Délai en secondes avant nouvelle tentative de connexion API',
    modifiable: true,
    date_creation: '2023-01-10T08:45:00',
    date_modification: '2023-07-18T16:30:00'
  }
];

const Settings = () => {
  // Paramètres d'interface utilisateur
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<number>(100);
  
  // État pour les paramètres système
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredParams, setFilteredParams] = useState(parametresData);
  
  // Appliquer le mode sombre
  useEffect(() => {
    // Vérifier si le mode sombre est déjà défini dans le localStorage
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    
    // Appliquer le mode sombre au chargement
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Vérifier si la taille de police est déjà définie dans le localStorage
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
      setFontSize(parseInt(savedFontSize));
      document.documentElement.style.fontSize = `${parseInt(savedFontSize)}%`;
    }
  }, []);
  
  // Filtrer les paramètres
  useEffect(() => {
    if (searchQuery) {
      setFilteredParams(
        parametresData.filter(
          param => param.cle.toLowerCase().includes(searchQuery.toLowerCase()) || 
                  param.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredParams(parametresData);
    }
  }, [searchQuery]);
  
  // Gérer le changement de mode sombre
  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      toast({
        title: "Mode sombre activé",
        description: "L'interface est maintenant en mode sombre",
      });
    } else {
      document.documentElement.classList.remove('dark');
      toast({
        title: "Mode clair activé",
        description: "L'interface est maintenant en mode clair",
      });
    }
  };
  
  // Gérer le changement de taille de police
  const handleFontSizeChange = (value: number[]) => {
    const newSize = value[0];
    setFontSize(newSize);
    localStorage.setItem('fontSize', newSize.toString());
    document.documentElement.style.fontSize = `${newSize}%`;
  };
  
  // Réinitialiser la taille de police
  const handleResetFontSize = () => {
    setFontSize(100);
    localStorage.setItem('fontSize', '100');
    document.documentElement.style.fontSize = '100%';
    toast({
      title: "Taille de police réinitialisée",
      description: "La taille de police a été réinitialisée à la valeur par défaut",
    });
  };
  
  // Enregistrer un paramètre système
  const handleSaveParam = (uuid: string, value: string) => {
    toast({
      title: "Paramètre enregistré",
      description: "Le paramètre a été mis à jour avec succès",
      variant: "success"
    });
  };

  return (
    <div className="flex-1 bg-background dark:bg-gray-900 min-h-screen">
      <Header title="Paramètres" />
      
      <main className="p-6">
        <Tabs defaultValue="interface" className="space-y-4">
          <TabsList className="bg-gray-100 dark:bg-gray-800">
            <TabsTrigger value="interface">Interface utilisateur</TabsTrigger>
            <TabsTrigger value="system">Paramètres système</TabsTrigger>
          </TabsList>
          
          <TabsContent value="interface" className="space-y-4">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg font-semibold dark:text-white">Apparence</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Personnalisez l'apparence de l'interface utilisateur
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Mode sombre */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="dark-mode" className="text-base font-medium dark:text-white">Mode sombre</Label>
                    <p className="text-sm text-muted-foreground dark:text-gray-400">
                      Réduire la fatigue oculaire pendant une utilisation prolongée
                    </p>
                  </div>
                  <Switch 
                    id="dark-mode"
                    checked={darkMode}
                    onCheckedChange={handleDarkModeToggle}
                  />
                </div>
                
                {/* Taille de police */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="font-size" className="text-base font-medium dark:text-white">Taille de police</Label>
                    <span className="text-sm font-medium dark:text-gray-300">{fontSize}%</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm dark:text-gray-400">A</span>
                    <Slider 
                      id="font-size"
                      defaultValue={[fontSize]} 
                      min={80} 
                      max={120} 
                      step={5}
                      onValueChange={handleFontSizeChange}
                      className="flex-1"
                    />
                    <span className="text-lg font-semibold dark:text-gray-300">A</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleResetFontSize}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                  >
                    Réinitialiser
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="system" className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 mb-6">
              <SearchInput
                placeholder="Rechercher un paramètre..."
                value={searchQuery}
                onChange={setSearchQuery}
                className="max-w-md"
              />
            </div>
            
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg font-semibold dark:text-white">Paramètres système</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Configuration des paramètres de l'application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="data-table min-w-full">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
                        <th>Clé</th>
                        <th>Valeur</th>
                        <th>Description</th>
                        <th>Modifiable</th>
                        <th>Date de modification</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredParams.map((param) => (
                        <tr key={param.uuid} className="hover:bg-gray-50 dark:hover:bg-gray-700 border-b dark:border-gray-600">
                          <td className="font-medium dark:text-white">{param.cle}</td>
                          <td className="dark:text-gray-300">
                            {param.modifiable ? (
                              <Input 
                                defaultValue={param.valeur} 
                                className="max-w-[200px] h-8 dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
                              />
                            ) : (
                              param.valeur
                            )}
                          </td>
                          <td className="dark:text-gray-300">{param.description}</td>
                          <td className="dark:text-gray-300">
                            {param.modifiable ? 
                              <span className="text-green-600 dark:text-green-400">Oui</span> : 
                              <span className="text-red-600 dark:text-red-400">Non</span>
                            }
                          </td>
                          <td className="dark:text-gray-300">{new Date(param.date_modification).toLocaleDateString()}</td>
                          <td>
                            {param.modifiable && (
                              <Button 
                                size="sm"
                                onClick={() => handleSaveParam(param.uuid, param.valeur)}
                                className="dark:bg-blue-600 dark:hover:bg-blue-700"
                              >
                                Enregistrer
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(filteredParams.length / 10)}
                    onPageChange={setCurrentPage}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Settings;
