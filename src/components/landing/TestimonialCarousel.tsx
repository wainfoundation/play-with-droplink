
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Sarah Chen",
      username: "@sarahc",
      text: "My droplet is so adorable! I've already earned 15 Pi just by taking care of it daily. Best pet game ever!",
      rating: 5,
      avatar: "👩"
    },
    {
      name: "Mike Rodriguez",
      username: "@mikerod",
      text: "The room designs are amazing! My pet loves the nature room. Earning Pi while playing is incredible.",
      rating: 5,
      avatar: "👨"
    },
    {
      name: "Emma Johnson",
      username: "@emmaj",
      text: "So addictive! I check on my pet multiple times a day. The mood system is so realistic and cute.",
      rating: 5,
      avatar: "👩‍🦰"
    },
    {
      name: "Alex Kim",
      username: "@alexk",
      text: "Perfect integration with Pi Network. Smooth payments and the mini-games are super fun!",
      rating: 5,
      avatar: "👨‍💻"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <div className="max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm border-none shadow-lg">
              <CardContent className="p-8 text-center">
                <Quote className="h-8 w-8 text-purple-400 mx-auto mb-4" />
                
                <p className="text-lg text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonials[currentIndex].text}"
                </p>
                
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <div className="flex items-center justify-center gap-3">
                  <div className="text-3xl">{testimonials[currentIndex].avatar}</div>
                  <div>
                    <div className="font-semibold text-gray-800">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonials[currentIndex].username}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center mt-6 gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? 'bg-purple-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
