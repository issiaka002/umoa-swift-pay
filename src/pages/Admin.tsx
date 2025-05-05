
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Moon, Sun, Users, Bell } from 'lucide-react';

const Admin = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState([16]);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sound: true,
  });

  useEffect(() => {
    // Apply dark mode theme when component mounts or when darkMode changes
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Apply font size changes
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize[0]}px`;
  }, [fontSize]);

  return (
    <div className="flex-1 bg-background min-h-screen">
      <Header title="Configuration" />
      
      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="appearance">
            <TabsList className="grid grid-cols-3 w-full max-w-md mb-8">
              <TabsTrigger value="appearance">Apparence</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Sécurité</TabsTrigger>
            </TabsList>
            
            <TabsContent value="appearance" className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-medium mb-6">Paramètres d'affichage</h2>
                
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {darkMode ? <Moon size={20} /> : <Sun size={20} />}
                        <Label htmlFor="dark-mode" className="text-base font-medium">Mode sombre</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Réduire la fatigue oculaire lors d'utilisation prolongée
                      </p>
                    </div>
                    <Switch
                      id="dark-mode"
                      checked={darkMode}
                      onCheckedChange={setDarkMode}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="font-size" className="text-base font-medium">Taille de police</Label>
                      <p className="text-sm text-muted-foreground mt-1 mb-6">
                        Ajuster la taille du texte pour une meilleure lisibilité
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm">A</span>
                      <Slider
                        id="font-size"
                        min={12}
                        max={24}
                        step={1}
                        value={fontSize}
                        onValueChange={setFontSize}
                        className="w-[60%]"
                      />
                      <span className="text-lg font-bold">A</span>
                      <span className="ml-4 text-sm font-medium">{fontSize[0]}px</span>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button>Appliquer les changements</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-medium mb-6">
                  <div className="flex items-center gap-2">
                    <Bell size={20} />
                    <span>Paramètres de notification</span>
                  </div>
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifs" className="text-base">Notifications par email</Label>
                      <p className="text-sm text-muted-foreground">Recevoir des rapports quotidiens par email</p>
                    </div>
                    <Switch
                      id="email-notifs"
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-notifs" className="text-base">Notifications push</Label>
                      <p className="text-sm text-muted-foreground">Recevoir des alertes directement dans le navigateur</p>
                    </div>
                    <Switch
                      id="push-notifs"
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sound-notifs" className="text-base">Sons de notification</Label>
                      <p className="text-sm text-muted-foreground">Jouer un son lors de la réception d'une alerte</p>
                    </div>
                    <Switch
                      id="sound-notifs"
                      checked={notifications.sound}
                      onCheckedChange={(checked) => setNotifications({...notifications, sound: checked})}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="security">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-medium mb-6">Sécurité du compte</h2>
                
                <div className="space-y-6">
                  <Button variant="outline" className="gap-2">
                    <Users size={18} />
                    <span>Gérer les accès utilisateurs</span>
                  </Button>
                  
                  <div className="pt-4 space-y-4">
                    <h3 className="font-medium">Autres paramètres de sécurité</h3>
                    <Button variant="outline">Changer le mot de passe</Button>
                    <Button variant="outline" className="ml-4">Configurer 2FA</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Admin;
