
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Smile, Flame, ShoppingBag } from 'lucide-react';
import { useStickers } from '@/hooks/useStickers';
import { useUser } from '@/context/UserContext';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const MyStickers = () => {
  const { userStickers, updateActiveStickers } = useStickers();
  const { user } = useUser();
  const [activeStickers, setActiveStickers] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    if (user?.active_sticker_ids) {
      setActiveStickers(Array.isArray(user.active_sticker_ids) ? user.active_sticker_ids : []);
    }
  }, [user]);

  const filteredStickers = selectedCategory === 'all' 
    ? userStickers 
    : userStickers.filter(us => us.sticker.category === selectedCategory);

  const toggleSticker = (stickerId: string) => {
    const newActiveStickers = activeStickers.includes(stickerId)
      ? activeStickers.filter(id => id !== stickerId)
      : [...activeStickers, stickerId];
    
    setActiveStickers(newActiveStickers);
    updateActiveStickers(newActiveStickers);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'sticker': return <Smile className="w-4 h-4" />;
      case 'profile_effect': return <Sparkles className="w-4 h-4" />;
      case 'animation': return <Flame className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'sticker': return 'bg-blue-100 text-blue-800';
      case 'profile_effect': return 'bg-purple-100 text-purple-800';
      case 'animation': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Login Required</h2>
            <p className="text-muted-foreground mb-6">Please log in to view your sticker collection</p>
            <Button asChild>
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>My Stickers Collection | Droplink</title>
        <meta name="description" content="Manage your stickers and profile effects collection" />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Sparkles className="h-8 w-8 text-purple-500" />
              My Sticker Collection
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Manage your stickers and effects. Toggle them on/off to customize your profile appearance.
            </p>
          </div>

          {userStickers.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No stickers in your collection yet
              </h3>
              <p className="text-gray-500 mb-6">
                Browse the catalog to purchase your first animated sticker or effect!
              </p>
              <Button asChild>
                <Link to="/stickers">Browse Catalog</Link>
              </Button>
            </div>
          ) : (
            <>
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">All ({userStickers.length})</TabsTrigger>
                  <TabsTrigger value="sticker">
                    Stickers ({userStickers.filter(us => us.sticker.category === 'sticker').length})
                  </TabsTrigger>
                  <TabsTrigger value="profile_effect">
                    Effects ({userStickers.filter(us => us.sticker.category === 'profile_effect').length})
                  </TabsTrigger>
                  <TabsTrigger value="animation">
                    Animations ({userStickers.filter(us => us.sticker.category === 'animation').length})
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredStickers.map((userSticker) => {
                  const sticker = userSticker.sticker;
                  const isActive = activeStickers.includes(sticker.id);

                  return (
                    <Card key={userSticker.id} className={`overflow-hidden transition-all ${isActive ? 'ring-2 ring-purple-500 shadow-lg' : 'hover:shadow-lg'}`}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <Badge className={`${getCategoryColor(sticker.category)} flex items-center gap-1`}>
                            {getCategoryIcon(sticker.category)}
                            {sticker.category.replace('_', ' ')}
                          </Badge>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={isActive}
                              onCheckedChange={() => toggleSticker(sticker.id)}
                            />
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="pb-3">
                        <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg mb-4 flex items-center justify-center">
                          <img 
                            src={sticker.animation_url} 
                            alt={sticker.name}
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/placeholder.svg';
                            }}
                          />
                        </div>
                        
                        <CardTitle className="text-lg mb-2">{sticker.name}</CardTitle>
                        <CardDescription className="text-sm mb-2">
                          {sticker.description}
                        </CardDescription>
                        <p className="text-xs text-muted-foreground">
                          Unlocked {new Date(userSticker.unlocked_at).toLocaleDateString()}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="text-center mt-12">
                <Button asChild variant="outline">
                  <Link to="/stickers">Browse More Stickers</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MyStickers;
