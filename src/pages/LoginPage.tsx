
import React from 'react';
import LoginForm from '@/components/LoginForm';
import { Card } from '@/components/ui/card';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
        <LoginForm />
      </Card>
    </div>
  );
};

export default LoginPage;
