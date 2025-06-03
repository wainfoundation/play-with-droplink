
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description, 
  color, 
  delay 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05 }}
      className="h-full"
    >
      <Card className="h-full bg-white/80 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6 text-center h-full flex flex-col justify-center">
          <div className={`bg-gradient-to-br ${color} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-white`}>
            {icon}
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FeatureCard;
