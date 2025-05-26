
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pi, Sparkles, Smile, Flame } from 'lucide-react';
import { useStickers } from '@/hooks/useStickers';
import { useUser } from '@/context/UserContext';
import { Helmet } from 'react-helmet-async';

const StickersCatalog = () => {
  const { stickers, purchasing, purchaseSticker, ownsSticker } = useStickers();
  const { user } = useUser();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredStickers = selectedCategory === 'all' 
    ? stickers 
    : stickers.filter(s => s.category === selectedCategory);

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

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Stickers & Effects Catalog | Droplink</title>
        <meta name="description" content="Browse and purchase animated stickers and profile effects for your Droplink profile" />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Sparkles className="h-8 w-8 text-purple-500" />
              Stickers & Effects Catalog
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Customize your profile with animated stickers and effects. Purchase once with Pi and use forever!
            </p>
          </div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Items</TabsTrigger>
              <TabsTrigger value="sticker">Stickers</TabsTrigger>
              <TabsTrigger value="profile_effect">Profile Effects</TabsTrigger>
              <TabsTrigger value="animation">Animations</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStickers.map((sticker) => {
              const owned = ownsSticker(sticker.id);
              const isPurchasing = purchasing === sticker.id;

              return (
                <Card key={sticker.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge className={`${getCategoryColor(sticker.category)} flex items-center gap-1`}>
                        {getCategoryIcon(sticker.category)}
                        {sticker.category.replace('_', ' ')}
                      </Badge>
                      {owned && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Owned
                        </Badge>
                      )}
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
                    <CardDescription className="text-sm">
                      {sticker.description}
                    </CardDescription>
                  </CardContent>
                  
                  <CardFooter className="pt-0">
                    <div className="w-full">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1 text-lg font-semibold">
                          <Pi className="w-5 h-5" />
                          {sticker.price_pi}
                        </div>
                      </div>
                      
                      <Button
                        onClick={() => purchaseSticker(sticker)}
                        disabled={owned || isPurchasing || !user}
                        className="w-full"
                        variant={owned ? "secondary" : "default"}
                      >
                        {!user ? (
                          "Login to Purchase"
                        ) : owned ? (
                          "✓ Owned"
                        ) : isPurchasing ? (
                          "Processing..."
                        ) : (
                          `Purchase for ${sticker.price_pi} π`
                        )}
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
          </div>

          {filteredStickers.length === 0 && (
            <div className="text-center py-12">
              <Sparkles className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No {selectedCategory === 'all' ? 'items' : selectedCategory.replace('_', ' ')} found
              </h3>
              <p className="text-gray-500">
                Check back later for new stickers and effects!
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default StickersCatalog;
