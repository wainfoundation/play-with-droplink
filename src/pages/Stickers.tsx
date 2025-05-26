
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@/context/UserContext";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Heart, Flame, Zap, Star, PartyPopper } from "lucide-react";
import { Helmet } from "react-helmet-async";
import StickerPurchaseModal from "@/components/stickers/StickerPurchaseModal";

interface Sticker {
  id: string;
  name: string;
  description: string;
  animation_url: string;
  price_pi: number;
  category: string;
  is_active: boolean;
}

interface UserSticker {
  id: string;
  sticker_id: string;
  unlocked_at: string;
}

const categoryIcons = {
  effects: <Sparkles className="h-4 w-4" />,
  love: <Heart className="h-4 w-4" />,
  celebration: <PartyPopper className="h-4 w-4" />,
  magic: <Sparkles className="h-4 w-4" />,
  luxury: <Star className="h-4 w-4" />,
  music: <Star className="h-4 w-4" />,
  space: <Zap className="h-4 w-4" />,
  nature: <Sparkles className="h-4 w-4" />,
  mystical: <Star className="h-4 w-4" />,
  tech: <Zap className="h-4 w-4" />,
  sticker: <Sparkles className="h-4 w-4" />
};

const Stickers = () => {
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [userStickers, setUserStickers] = useState<UserSticker[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSticker, setSelectedSticker] = useState<Sticker | null>(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const { user } = useUser();

  const categories = ["all", "effects", "love", "celebration", "magic", "luxury", "music", "space", "nature", "mystical", "tech"];

  useEffect(() => {
    fetchStickers();
    if (user) {
      fetchUserStickers();
    }
  }, [user]);

  const fetchStickers = async () => {
    try {
      const { data, error } = await supabase
        .from('stickers_effects')
        .select('*')
        .eq('is_active', true)
        .order('category', { ascending: true });

      if (error) throw error;
      setStickers(data || []);
    } catch (error) {
      console.error('Error fetching stickers:', error);
      toast({
        title: "Error",
        description: "Failed to load stickers",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUserStickers = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_stickers')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      setUserStickers(data || []);
    } catch (error) {
      console.error('Error fetching user stickers:', error);
    }
  };

  const filteredStickers = stickers.filter(sticker =>
    selectedCategory === "all" || sticker.category === selectedCategory
  );

  const isOwned = (stickerId: string) => {
    return userStickers.some(us => us.sticker_id === stickerId);
  };

  const handlePurchaseClick = (sticker: Sticker) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to purchase stickers",
        variant: "destructive",
      });
      return;
    }

    if (isOwned(sticker.id)) {
      toast({
        title: "Already Owned",
        description: "You already own this sticker!",
      });
      return;
    }

    setSelectedSticker(sticker);
    setShowPurchaseModal(true);
  };

  const handlePurchaseSuccess = () => {
    fetchUserStickers();
    setShowPurchaseModal(false);
    setSelectedSticker(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading stickers...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Animated Stickers - Droplink</title>
        <meta name="description" content="Enhance your profile with beautiful animated stickers and effects. Stand out with unique animations!" />
      </Helmet>
      
      <Navbar />
      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Animated Stickers
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Enhance your profile with beautiful animated stickers and effects. Stand out with unique animations that make your profile shine!
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category !== "all" && categoryIcons[category as keyof typeof categoryIcons]}
                {category}
              </Button>
            ))}
          </div>

          {/* Stickers Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredStickers.map((sticker) => (
              <Card key={sticker.id} className="group hover:shadow-lg transition-shadow">
                <CardHeader className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {sticker.category}
                    </Badge>
                    {isOwned(sticker.id) && (
                      <Badge variant="default" className="text-xs bg-green-500">
                        Owned
                      </Badge>
                    )}
                  </div>
                  
                  {/* Animated Sticker Preview */}
                  <div className="relative w-full h-20 flex items-center justify-center mb-3">
                    <img
                      src={sticker.animation_url}
                      alt={sticker.name}
                      className="w-16 h-16 object-contain animate-pulse group-hover:animate-bounce"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  
                  <CardTitle className="text-sm font-semibold truncate">
                    {sticker.name}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="p-4 pt-0">
                  <CardDescription className="text-xs mb-3 line-clamp-2">
                    {sticker.description}
                  </CardDescription>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-lg">π</span>
                      <span className="font-bold text-primary">{sticker.price_pi}</span>
                    </div>
                    
                    <Button
                      size="sm"
                      onClick={() => handlePurchaseClick(sticker)}
                      disabled={isOwned(sticker.id)}
                      className="text-xs"
                    >
                      {isOwned(sticker.id) ? "Owned" : "Buy"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredStickers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No stickers found in this category.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />

      {/* Purchase Modal */}
      {selectedSticker && (
        <StickerPurchaseModal
          isOpen={showPurchaseModal}
          onOpenChange={setShowPurchaseModal}
          sticker={selectedSticker}
          onSuccess={handlePurchaseSuccess}
        />
      )}
    </div>
  );
};

export default Stickers;
