
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
  const [otpValue, setOtpValue] = useState("");
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
    
    if (otpValue.length < 6) {
      toast({
        title: "Code incomplet",
        description: "Veuillez saisir le code complet.",
        variant: "destructive"
      });
      return;
    }
    
    // Navigate to dashboard on successful verification
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-8">
        <div className="flex justify-center mb-6">
          <img src="/placeholder.svg" alt="Logo Banque" height="60" width="60" />
        </div>
        
        <h1 className="text-2xl font-bold text-center text-primary mb-6">
          Connexion au Système d'Interface
        </h1>
        
        {!showVerification ? (
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="identifier" className="block text-sm font-medium">
                Identifiant
              </label>
              <Input
                id="identifier"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium">
                Mot de passe
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
              />
            </div>
            
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              Se connecter
            </Button>
            
            <div className="text-center mt-4">
              <a href="#" className="text-primary text-sm hover:underline">
                Mot de passe oublié ?
              </a>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="relative py-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Authentification à deux facteurs
                </span>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800">Code de vérification</h3>
              <p className="text-gray-600 text-sm mt-1">
                Veuillez saisir le code reçu sur votre appareil mobile
              </p>
              
              <div className="mt-4">
                <form onSubmit={handleVerification}>
                  <InputOTP value={otpValue} onChange={setOtpValue} maxLength={6} className="flex justify-center gap-2">
                    <InputOTPGroup>
                      <InputOTPSlot index={0} className="h-12 w-12" />
                      <InputOTPSlot index={1} className="h-12 w-12" />
                      <InputOTPSlot index={2} className="h-12 w-12" />
                      <InputOTPSlot index={3} className="h-12 w-12" />
                      <InputOTPSlot index={4} className="h-12 w-12" />
                      <InputOTPSlot index={5} className="h-12 w-12" />
                    </InputOTPGroup>
                  </InputOTP>
                  
                  <Button 
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 mt-6"
                  >
                    Vérifier
                  </Button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
