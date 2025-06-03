
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ScreenshotCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const screenshots = [
    {
      title: "Interactive Rooms",
      description: "Explore different rooms with your pet",
      image: "🏠",
      color: "from-blue-200 to-blue-400"
    },
    {
      title: "Feeding Time",
      description: "Feed your pet delicious treats",
      image: "🍎",
      color: "from-green-200 to-green-400"
    },
    {
      title: "Coin Shop",
      description: "Buy items and upgrades",
      image: "🪙",
      color: "from-yellow-200 to-yellow-400"
    },
    {
      title: "Happy Moods",
      description: "Watch your pet express emotions",
      image: "😊",
      color: "from-pink-200 to-pink-400"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % screenshots.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  return (
    <div className="relative">
      <div className="flex justify-center mb-8">
        <div className="relative w-80 h-96 mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="w-full h-full bg-white shadow-2xl rounded-3xl overflow-hidden">
                <CardContent className="p-0 h-full">
                  <div className={`h-2/3 bg-gradient-to-br ${screenshots[currentIndex].color} flex items-center justify-center`}>
                    <div className="text-8xl">{screenshots[currentIndex].image}</div>
                  </div>
                  <div className="p-6 h-1/3">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {screenshots[currentIndex].title}
                    </h3>
                    <p className="text-gray-600">
                      {screenshots[currentIndex].description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex justify-center items-center gap-4">
        <Button
          onClick={prevSlide}
          variant="outline"
          size="sm"
          className="rounded-full"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex gap-2">
          {screenshots.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-purple-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <Button
          onClick={nextSlide}
          variant="outline"
          size="sm"
          className="rounded-full"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ScreenshotCarousel;
