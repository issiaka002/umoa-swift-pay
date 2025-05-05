
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

const LoginForm = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!identifier || !password) {
      toast({
        title: "Erreur de connexion",
        description: "Veuillez remplir tous les champs.",
        variant: "destructive"
      });
      return;
    }
    
    // Show verification step
    setShowVerification(true);
  };

  const handleVerification = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp || otp.length !== 6) {
      toast({
        title: "Code incomplet",
        description: "Veuillez saisir le code complet à 6 chiffres.",
        variant: "destructive"
      });
      return;
    }
    
    // Navigate to dashboard on successful verification
    navigate('/');
    
    toast({
      title: "Connexion réussie",
      description: "Bienvenue sur le système d'interface SIP.",
      variant: "default"
    });
  };

  return (
    <>
      <div className="flex justify-center mb-6">
        <img src="/placeholder.svg" alt="Logo Banque" height="60" width="60" />
      </div>
      
      <h1 className="text-2xl font-bold text-center text-primary mb-6 dark:text-white">
        Connexion au Système d'Interface
      </h1>
      
      {!showVerification ? (
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="identifier" className="block text-sm font-medium dark:text-gray-300">
              Identifiant
            </label>
            <Input
              id="identifier"
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              autoComplete="username"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium dark:text-gray-300">
              Mot de passe
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              autoComplete="current-password"
            />
          </div>
          
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 dark:bg-blue-600 dark:hover:bg-blue-700">
            Se connecter
          </Button>
          
          <div className="text-center mt-4">
            <a href="#" className="text-primary text-sm hover:underline dark:text-blue-400">
              Mot de passe oublié ?
            </a>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="relative py-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                Authentification à deux facteurs
              </span>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="font-medium text-gray-800 dark:text-gray-200">Code de vérification</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              Veuillez saisir le code reçu sur votre appareil mobile
            </p>
            
            <div className="mt-4">
              <InputOTP maxLength={6} value={otp} onChange={setOtp} className="justify-center">
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            
            <Button 
              onClick={handleVerification} 
              className="w-full bg-primary hover:bg-primary/90 mt-4 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Vérifier
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginForm;
