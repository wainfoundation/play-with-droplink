
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Coins, Star } from 'lucide-react';

interface CoinPackCardProps {
  name: string;
  piCost: number;
  coins: number;
  bonus: number;
  popular: boolean;
  color: string;
  delay: number;
}

const CoinPackCard: React.FC<CoinPackCardProps> = ({ 
  name, 
  piCost, 
  coins, 
  bonus, 
  popular, 
  color, 
  delay 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05 }}
      className="relative"
    >
      {popular && (
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 z-10">
          <Star className="h-3 w-3 mr-1" />
          Most Popular
        </Badge>
      )}
      
      <Card className={`h-full ${popular ? 'ring-2 ring-yellow-400 ring-offset-2' : ''} bg-white shadow-lg hover:shadow-xl transition-all duration-300`}>
        <CardContent className="p-6 text-center">
          <div className={`bg-gradient-to-br ${color} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-white`}>
            <Coins className="h-8 w-8" />
          </div>
          
          <h3 className="text-xl font-bold text-gray-800 mb-2">{name}</h3>
          
          <div className="mb-4">
            <div className="text-3xl font-bold text-gray-800">
              {piCost} <span className="text-lg text-orange-600">π</span>
            </div>
            <div className="text-lg text-gray-600">
              = {coins} coins
            </div>
            {bonus > 0 && (
              <div className="text-sm text-green-600 font-semibold">
                + {bonus} bonus coins!
              </div>
            )}
          </div>
          
          <Button className={`w-full bg-gradient-to-r ${color} hover:opacity-90 text-white`}>
            Buy Now
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CoinPackCard;
