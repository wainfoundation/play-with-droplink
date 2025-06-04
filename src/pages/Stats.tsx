
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Award, Home, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@/components/ui/icon-button';

const Stats: React.FC = () => {
  const navigate = useNavigate();

  const statsCategories = [
    {
      id: 'pet',
      name: 'Pet Stats',
      icon: BarChart3,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      id: 'progress',
      name: 'Progress',
      icon: TrendingUp,
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      id: 'achievements',
      name: 'Achievements',
      icon: Award,
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      id: 'daily',
      name: 'Daily',
      icon: Calendar,
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Statistics - Play with Droplink</title>
        <meta name="description" content="View your pet care statistics and achievements" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              📊 Pet Statistics
            </h1>
            <p className="text-lg text-gray-600">
              Track your pet care journey and achievements
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="flex justify-center mb-8">
            <IconButton
              icon={Home}
              label="Back Home"
              onClick={() => navigate('/play')}
              className="bg-blue-500 hover:bg-blue-600"
            />
          </div>

          {/* Stats Categories */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {statsCategories.map((category) => (
              <IconButton
                key={category.id}
                icon={category.icon}
                label={category.name}
                onClick={() => console.log(`View ${category.name}`)}
                className={category.color}
                size="lg"
              />
            ))}
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Days Active</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-center text-blue-600">
                  15
                </div>
                <p className="text-center text-gray-600 text-sm">Keep it up!</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center">Care Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-center text-green-600">
                  127
                </div>
                <p className="text-center text-gray-600 text-sm">Total interactions</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center">Games Played</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-center text-purple-600">
                  47
                </div>
                <p className="text-center text-gray-600 text-sm">Mini games completed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center">Coins Earned</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-center text-yellow-600">
                  1,240
                </div>
                <p className="text-center text-gray-600 text-sm">Total collected</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stats;
