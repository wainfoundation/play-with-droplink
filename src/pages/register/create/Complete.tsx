import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { useUserProfile } from '@/hooks/useUserProfile';
import { Button } from "@/components/ui/button";
import { CheckCircle } from 'lucide-react';

const Complete = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { updateProfile } = useUserProfile();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleContinueBuilding = async () => {
    if (!user?.id) return;

    try {
      const success = await updateProfile({
        onboarding_completed: true
      });

      if (success) {
        navigate('/admin');
      }
    } catch (error) {
      console.error('Error completing onboarding:', error);
      navigate('/admin'); // Navigate anyway
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 text-center">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-4">
            All Done!
          </h1>
          <p className="text-gray-600 mb-6">
            Your Droplink profile is now live. Start sharing it with the world!
          </p>
          <Button onClick={handleContinueBuilding} className="w-full">
            Continue Building
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Complete;
