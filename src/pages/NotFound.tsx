
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, GamepadIcon } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="text-6xl mb-4">🎮</div>
          <CardTitle className="text-2xl">Game Over!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            Looks like you've wandered into uncharted territory. This page doesn't exist in our gaming universe!
          </p>
          <div className="flex gap-2 justify-center">
            <Button onClick={() => window.location.href = '/'} className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Back to Gaming Hub
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
