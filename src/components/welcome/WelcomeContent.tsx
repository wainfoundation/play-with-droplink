
import React from 'react';

interface WelcomeContentProps {
  visible: boolean;
}

const WelcomeContent: React.FC<WelcomeContentProps> = ({ visible }) => {
  return (
    <div className={`transition-all duration-1000 delay-500 ${
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`}>
      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        <span className="bg-gradient-to-r from-primary via-blue-600 to-secondary bg-clip-text text-transparent">
          Welcome to Droplink! 🎮
        </span>
      </h1>
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
        Play with Droplink
      </h2>
      <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-2">
        Your ultimate Pi Network gaming platform with 50+ interactive games.
      </p>
      <p className="text-base text-gray-600 max-w-2xl mx-auto">
        Watch ads to earn Pi rewards, subscribe for unlimited access, or pay with Pi to unlock premium games instantly. Start your gaming adventure on Pi Network today!
      </p>
    </div>
  );
};

export default WelcomeContent;
