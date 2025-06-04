
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import IconButton from '@/components/ui/icon-button';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Page Not Found - PlayDrop</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <div className="text-8xl mb-6">💧</div>
            <h1 className="text-6xl font-bold text-gray-600 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Page Not Found
            </h2>
            <p className="text-gray-600 mb-8">
              Oops! Your droplet got lost. The page you're looking for doesn't exist.
            </p>
            
            <div className="flex gap-4 justify-center">
              <IconButton
                icon={Home}
                label="Go Home"
                onClick={() => navigate('/')}
                className="bg-blue-500 hover:bg-blue-600"
              />
              <IconButton
                icon={ArrowLeft}
                label="Go Back"
                onClick={() => navigate(-1)}
                className="bg-gray-500 hover:bg-gray-600"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default NotFound;
