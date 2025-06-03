
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Settings as SettingsIcon, Volume2, Bell, Palette, RotateCcw } from 'lucide-react';

const Settings: React.FC = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [volume, setVolume] = useState([75]);
  const [selectedTheme, setSelectedTheme] = useState('default');

  const themes = [
    { id: 'default', name: 'Default', color: 'bg-blue-500' },
    { id: 'nature', name: 'Nature', color: 'bg-green-500' },
    { id: 'sunset', name: 'Sunset', color: 'bg-orange-500' },
    { id: 'ocean', name: 'Ocean', color: 'bg-cyan-500' },
  ];

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all game data? This cannot be undone.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <>
      <Helmet>
        <title>Settings - Play with Droplink</title>
        <meta name="description" content="Customize your gaming experience" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              Settings
            </h1>
            <p className="text-lg text-gray-600">
              Customize your gaming experience
            </p>
          </div>

          <div className="space-y-6">
            {/* Audio Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Volume2 className="h-6 w-6" />
                  Audio Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Sound Effects</h4>
                    <p className="text-sm text-gray-600">Enable game sound effects</p>
                  </div>
                  <Switch 
                    checked={soundEnabled} 
                    onCheckedChange={setSoundEnabled}
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">Volume</h4>
                    <span className="text-sm text-gray-600">{volume[0]}%</span>
                  </div>
                  <Slider
                    value={volume}
                    onValueChange={setVolume}
                    max={100}
                    step={1}
                    disabled={!soundEnabled}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Bell className="h-6 w-6" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Pet Care Reminders</h4>
                    <p className="text-sm text-gray-600">Get notified when your pet needs attention</p>
                  </div>
                  <Switch 
                    checked={notificationsEnabled} 
                    onCheckedChange={setNotificationsEnabled}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Theme Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Palette className="h-6 w-6" />
                  Theme
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {themes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => setSelectedTheme(theme.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedTheme === theme.id
                          ? 'border-primary bg-primary/10'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-full h-8 ${theme.color} rounded mb-2`} />
                      <p className="text-sm font-medium">{theme.name}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Game Data */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <RotateCcw className="h-6 w-6" />
                  Game Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Reset Game Data</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      This will delete all your progress, items, and pet data. This action cannot be undone.
                    </p>
                    <Button 
                      variant="destructive" 
                      onClick={handleReset}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      Reset All Data
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Button 
              onClick={() => window.history.back()} 
              variant="outline"
              className="mr-4"
            >
              Back to Game
            </Button>
            <Button className="bg-gradient-to-r from-primary to-secondary">
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
