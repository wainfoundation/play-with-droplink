
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface HowItWorksStepProps {
  step: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  delay: number;
}

const HowItWorksStep: React.FC<HowItWorksStepProps> = ({ 
  step, 
  title, 
  description, 
  icon, 
  color, 
  delay 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <div className="relative mb-8">
        <div className={`bg-gradient-to-br ${color} rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4 text-white shadow-lg`}>
          {icon}
        </div>
        <div className="absolute -top-2 -right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md">
          <span className="text-sm font-bold text-gray-700">{step}</span>
        </div>
      </div>
      
      <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default HowItWorksStep;
