
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Gamepad2, Sparkles, Heart } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 px-4">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Welcome to <span className="text-primary">Droplet Pet</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            Take care of your adorable virtual pet droplet! Feed, play, and watch it grow happy and healthy.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link to="/play" className="flex items-center gap-2">
                <Heart className="h-6 w-6" />
                Start Playing
              </Link>
            </Button>
            
            <Button variant="outline" asChild size="lg" className="text-lg px-8 py-6">
              <Link to="/games" className="flex items-center gap-2">
                <Gamepad2 className="h-6 w-6" />
                Mini Games
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl mb-4">💧</div>
              <h3 className="text-lg font-semibold mb-2">Care for Your Pet</h3>
              <p className="text-gray-600">Feed, clean, and play with your virtual droplet</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">🎮</div>
              <h3 className="text-lg font-semibold mb-2">Play Mini Games</h3>
              <p className="text-gray-600">Earn coins and boost your pet's happiness</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-lg font-semibold mb-2">Explore Rooms</h3>
              <p className="text-gray-600">Visit different rooms and discover new activities</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
