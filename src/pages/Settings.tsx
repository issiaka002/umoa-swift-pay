
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Moon, Sun, Search, Edit, Save, X } from 'lucide-react';

// Liste des paramètres système
interface Parametre {
  uuid: string;
  cle: string;
  valeur: string;
  description: string;
  modifiable: boolean;
  date_creation: string;
  date_modification: string;
}

const parametresSysteme: Parametre[] = [
  {
    uuid: '1',
    cle: 'timeout_session',
    valeur: '30',
    description: 'Durée de la session en minutes avant déconnexion automatique',
    modifiable: true,
    date_creation: '2024-01-01',
    date_modification: '2024-01-01',
  },
  {
    uuid: '2',
    cle: 'max_tentatives_login',
    valeur: '3',
    description: 'Nombre maximum de tentatives de connexion avant blocage',
    modifiable: true,
    date_creation: '2024-01-01',
    date_modification: '2024-02-15',
  },
  {
    uuid: '3',
    cle: 'duree_validite_otp',
    valeur: '5',
    description: 'Durée de validité du code OTP en minutes',
    modifiable: true,
    date_creation: '2024-01-01',
    date_modification: '2024-03-10',
  },
  {
    uuid: '4',
    cle: 'url_api',
    valeur: 'https://api.sip.bceao.int',
    description: 'URL de l\'API SIP',
    modifiable: false,
    date_creation: '2024-01-01',
    date_modification: '2024-01-01',
  },
  {
    uuid: '5',
    cle: 'mode_environnement',
    valeur: 'TEST',
    description: 'Mode d\'environnement (TEST ou PROD)',
    modifiable: false,
    date_creation: '2024-01-01',
    date_modification: '2024-01-01',
  }
];

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [parametres, setParametres] = useState(parametresSysteme);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredParametres, setFilteredParametres] = useState(parametres);
  const [editingParam, setEditingParam] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState('');
  
  // Chargement des préférences utilisateur au chargement du composant
  useEffect(() => {
    // Récupération du mode sombre depuis localStorage
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
    
    // Récupération de la taille de police depuis localStorage
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
      setFontSize(parseInt(savedFontSize));
    }
  }, []);
  
  // Mise à jour du mode sombre
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Sauvegarde de la préférence dans localStorage
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);
  
  // Mise à jour de la taille de police
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
    
    // Sauvegarde de la préférence dans localStorage
    localStorage.setItem('fontSize', fontSize.toString());
  }, [fontSize]);
  
  // Filtrer les paramètres selon la recherche
  useEffect(() => {
    if (searchQuery) {
      const filtered = parametres.filter(
        param => param.cle.toLowerCase().includes(searchQuery.toLowerCase()) || 
                param.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                param.valeur.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredParametres(filtered);
    } else {
      setFilteredParametres(parametres);
    }
  }, [searchQuery, parametres]);
  
  // Démarrer l'édition d'un paramètre
  const startEdit = (param: Parametre) => {
    if (param.modifiable) {
      setEditingParam(param.uuid);
      setTempValue(param.valeur);
    }
  };
  
  // Sauvegarder les modifications
  const saveEdit = (uuid: string) => {
    setParametres(prevParams => 
      prevParams.map(p => 
        p.uuid === uuid 
        ? { 
            ...p, 
            valeur: tempValue, 
            date_modification: new Date().toISOString().split('T')[0]
          } 
        : p
      )
    );
    setEditingParam(null);
    
    toast({
      title: "Paramètre mis à jour",
      description: "Le paramètre a été mis à jour avec succès.",
      variant: "default"
    });
  };
  
  // Annuler l'édition
  const cancelEdit = () => {
    setEditingParam(null);
  };
  
  return (
    <div className="flex-1 bg-background min-h-screen dark:bg-gray-900">
      <Header title="Paramètres" />
      
      <main className="p-6">
        <Tabs defaultValue="appearance" className="space-y-4">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="appearance">Apparence</TabsTrigger>
            <TabsTrigger value="system">Paramètres Système</TabsTrigger>
            <TabsTrigger value="security">Sécurité</TabsTrigger>
            <TabsTrigger value="account">Compte</TabsTrigger>
          </TabsList>
          
          {/* Onglet Apparence */}
          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Apparence</CardTitle>
                <CardDescription>
                  Personnalisez l'apparence de l'interface selon vos préférences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Mode Sombre */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium text-lg flex items-center gap-2">
                      {isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                      Mode Sombre
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Réduire la fatigue oculaire lors d'utilisation prolongée
                    </div>
                  </div>
                  <Switch 
                    checked={isDarkMode} 
                    onCheckedChange={setIsDarkMode}
                  />
                </div>
                
                {/* Taille de Police */}
                <div className="space-y-4">
                  <div className="space-y-0.5">
                    <div className="font-medium text-lg">Taille de Police</div>
                    <div className="text-sm text-muted-foreground">
                      Ajustez la taille du texte pour une meilleure lisibilité
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm">A</span>
                    <Slider 
                      value={[fontSize]} 
                      onValueChange={([value]) => setFontSize(value)} 
                      min={80} 
                      max={130} 
                      step={5}
                      className="flex-1"
                    />
                    <span className="text-lg font-medium">A</span>
                    <span className="text-sm bg-gray-100 py-1 px-2 rounded-md dark:bg-gray-700">
                      {fontSize}%
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => {
                  setFontSize(100);
                  setIsDarkMode(false);
                }}>
                  Réinitialiser
                </Button>
                <Button onClick={() => {
                  toast({
                    title: "Paramètres d'apparence enregistrés",
                    description: "Vos préférences d'apparence ont été sauvegardées avec succès.",
                    variant: "default",
                  });
                }}>
                  Enregistrer
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Onglet Paramètres Système */}
          <TabsContent value="system" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres Système</CardTitle>
                <CardDescription>
                  Consultez et modifiez les paramètres système de l'application.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex mb-4">
                  <div className="relative flex-grow max-w-md">
                    <input
                      type="text"
                      placeholder="Rechercher un paramètre..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                    />
                    <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Clé</TableHead>
                        <TableHead>Valeur</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Date Modification</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredParametres.length > 0 ? (
                        filteredParametres.map((param) => (
                          <TableRow key={param.uuid}>
                            <TableCell className="font-medium">{param.cle}</TableCell>
                            <TableCell>
                              {editingParam === param.uuid ? (
                                <input
                                  type="text"
                                  value={tempValue}
                                  onChange={(e) => setTempValue(e.target.value)}
                                  className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                                  autoFocus
                                />
                              ) : (
                                param.valeur
                              )}
                            </TableCell>
                            <TableCell>{param.description}</TableCell>
                            <TableCell>{param.date_modification}</TableCell>
                            <TableCell>
                              {editingParam === param.uuid ? (
                                <div className="flex gap-1">
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => saveEdit(param.uuid)}
                                  >
                                    <Save size={16} />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={cancelEdit}
                                  >
                                    <X size={16} />
                                  </Button>
                                </div>
                              ) : (
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => startEdit(param)}
                                  disabled={!param.modifiable}
                                >
                                  <Edit size={16} className={param.modifiable ? '' : 'text-gray-400'} />
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                            Aucun paramètre trouvé
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Onglet Sécurité */}
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres de Sécurité</CardTitle>
                <CardDescription>
                  Gérez les paramètres de sécurité et d'authentification.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertTitle>Information</AlertTitle>
                  <AlertDescription>
                    Cette page est en cours de développement. Les fonctionnalités de sécurité seront disponibles prochainement.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Onglet Compte */}
          <TabsContent value="account" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres de Compte</CardTitle>
                <CardDescription>
                  Gérez les informations de votre compte utilisateur.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertTitle>Information</AlertTitle>
                  <AlertDescription>
                    Cette page est en cours de développement. Les fonctionnalités de gestion de compte seront disponibles prochainement.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Settings;
