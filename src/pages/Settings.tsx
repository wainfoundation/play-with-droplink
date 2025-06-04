
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { 
  Settings as SettingsIcon, 
  Home, 
  Volume2, 
  VolumeX, 
  Bell, 
  BellOff,
  Palette,
  User,
  Shield
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@/components/ui/icon-button';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [soundEnabled, setSoundEnabled] = React.useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  const settingsCategories = [
    {
      id: 'general',
      name: 'General',
      icon: SettingsIcon,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      id: 'appearance',
      name: 'Appearance',
      icon: Palette,
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      id: 'account',
      name: 'Account',
      icon: User,
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      id: 'privacy',
      name: 'Privacy',
      icon: Shield,
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Settings - Play with Droplink</title>
        <meta name="description" content="Customize your pet game experience" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              ⚙️ Settings
            </h1>
            <p className="text-lg text-gray-600">
              Customize your pet care experience
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

          {/* Settings Categories */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {settingsCategories.map((category) => (
              <IconButton
                key={category.id}
                icon={category.icon}
                label={category.name}
                onClick={() => console.log(`${category.name} settings`)}
                className={category.color}
                size="lg"
              />
            ))}
          </div>

          {/* Settings Panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Audio Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  {soundEnabled ? <Volume2 className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
                  Audio Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Sound Effects</span>
                  <Switch 
                    checked={soundEnabled} 
                    onCheckedChange={setSoundEnabled}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span>Background Music</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span>Voice Feedback</span>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  {notificationsEnabled ? <Bell className="h-6 w-6" /> : <BellOff className="h-6 w-6" />}
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Pet Needs Alerts</span>
                  <Switch 
                    checked={notificationsEnabled} 
                    onCheckedChange={setNotificationsEnabled}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span>Daily Rewards</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span>Mission Updates</span>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            {/* Game Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <SettingsIcon className="h-6 w-6" />
                  Game Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Auto-Save</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span>Tutorial Tips</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span>Advanced UI</span>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            {/* Account Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <User className="h-6 w-6" />
                  Account
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full">
                  Change Username
                </Button>
                <Button variant="outline" className="w-full">
                  Backup Save Data
                </Button>
                <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
                  Reset Game
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
