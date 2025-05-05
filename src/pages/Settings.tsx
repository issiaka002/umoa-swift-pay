
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Text } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check if dark mode is stored in localStorage
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  
  const [fontSize, setFontSize] = useState(() => {
    // Check if font size is stored in localStorage
    const savedSize = localStorage.getItem('fontSize');
    return savedSize ? [JSON.parse(savedSize)] : [16];
  });

  const { toast } = useToast();

  // Apply dark mode theme when component mounts or when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save to localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Apply font size changes and save to localStorage
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize[0]}px`;
    localStorage.setItem('fontSize', JSON.stringify(fontSize[0]));
  }, [fontSize]);

  const handleSaveChanges = () => {
    toast({
      title: "Paramètres sauvegardés",
      description: "Vos préférences ont été enregistrées avec succès.",
    });
  };

  return (
    <div className="flex-1 bg-background min-h-screen">
      <Header title="Paramètres" />
      
      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="display">
            <TabsList className="grid grid-cols-2 w-full max-w-md mb-8">
              <TabsTrigger value="display">Affichage</TabsTrigger>
              <TabsTrigger value="preferences">Préférences</TabsTrigger>
            </TabsList>
            
            <TabsContent value="display" className="space-y-6">
              <div className="bg-card rounded-lg shadow-sm p-6">
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
                      <div className="flex items-center gap-2">
                        <Text size={20} />
                        <Label htmlFor="font-size" className="text-base font-medium">Taille de police</Label>
                      </div>
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
                    <Button onClick={handleSaveChanges}>Appliquer les changements</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="preferences">
              <div className="bg-card rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-medium mb-6">Préférences utilisateur</h2>
                <p className="text-muted-foreground">Options supplémentaires de personnalisation à venir.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Settings;
